import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Video, Phone, CheckCircle2, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import { apiSubmitBooking } from '../utils/api';

interface BookSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const BookSessionModal: React.FC<BookSessionModalProps> = ({
  isOpen,
  onClose,
  defaultService = ''
}) => {
  const [step, setStep] = useState<number>(1);
  const [serviceType, setServiceType] = useState<string>(
    defaultService || 'In-Home Care & Waiver Assessment'
  );
  const [format, setFormat] = useState<'in-home' | 'video' | 'phone' | 'office'>('in-home');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');
  
  // Contact details
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [honeypot, setHoneypot] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');

  if (!isOpen) return null;

  // Generate next 7 selectable weekdays
  const availableDates: { label: string; value: string }[] = [];
  const today = new Date();
  for (let i = 1; i <= 10; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const monthName = d.toLocaleDateString('en-US', { month: 'short' });
    const dayNum = d.getDate();
    availableDates.push({
      label: `${dayName}, ${monthName} ${dayNum}`,
      value: d.toISOString().split('T')[0]
    });
  }

  const timeSlots = [
    '09:00 AM',
    '10:30 AM',
    '01:00 PM',
    '02:30 PM',
    '04:00 PM',
    '05:30 PM'
  ];

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Spam honeypot detection
    if (honeypot.trim()) {
      setIsBooked(true);
      setBookingRef(`KW-APPT-${Math.floor(100000 + Math.random() * 900000)}`);
      return;
    }

    if (!name.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setValidationError('Please provide a valid email address.');
      return;
    }

    const phoneClean = phone.replace(/\D/g, '');
    if (phoneClean.length < 10) {
      setValidationError('Please provide a valid 10-digit telephone number.');
      return;
    }

    setIsSubmitting(true);

    const res = await apiSubmitBooking({
      name: name.trim(),
      email: email.trim(),
      phone: phoneClean,
      serviceType,
      format,
      selectedDate: selectedDate || 'Preferred Soonest',
      selectedTime: selectedTime || '10:00 AM',
      honeypot: honeypot.trim(),
    });

    setIsSubmitting(false);

    if (!res.success && res.error) {
      setValidationError(res.error);
      return;
    }

    const newRef = res.reference || `KW-APPT-${Math.floor(100000 + Math.random() * 900000)}`;

    trackEvent('assessment_submitted', {
      serviceType,
      format,
      reference: newRef
    });

    setIsBooked(true);
    setBookingRef(newRef);
  };

  const handleDownloadCalendar = () => {
    const title = `Kenah Wellness Session: ${serviceType}`;
    const desc = `Consultation with Kenah Wellness Services Care Team. Reference: ${bookingRef}`;
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Kenah Wellness Services//EN\nBEGIN:VEVENT\nSUMMARY:${title}\nDESCRIPTION:${desc}\nSTATUS:CONFIRMED\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Kenah-Session-${bookingRef}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setIsBooked(false);
    setStep(1);
    setName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative text-left"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {isBooked ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-extrabold text-[#0B2B26] font-display">
              Session Booked Successfully!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              We look forward to meeting with you, <strong className="text-slate-900">{name}</strong>. A confirmation email and calendar link have been prepared for your session.
            </p>

            <div className="bg-[#FAF4EE] border border-amber-200 rounded-2xl p-5 text-xs text-slate-700 max-w-md mx-auto space-y-2 text-left">
              <div className="flex justify-between items-center border-b border-amber-200/60 pb-2">
                <span className="text-slate-500">Booking Reference:</span>
                <span className="font-mono font-bold text-[#0B2B26] text-sm">{bookingRef}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Session Type:</span>
                <span className="font-semibold text-slate-900">{serviceType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Format:</span>
                <span className="font-semibold text-slate-900 capitalize">
                  {format === 'in-home' ? 'In-Home Visit' : format === 'video' ? 'Video Consultation' : format === 'phone' ? 'Phone Consultation' : 'Canonsburg Office'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Date & Time:</span>
                <span className="font-semibold text-slate-900">{selectedDate || availableDates[0]?.label} at {selectedTime}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <button
                onClick={handleDownloadCalendar}
                className="px-5 py-2.5 rounded-full border border-slate-300 text-slate-800 font-semibold text-xs hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>Download Calendar (.ics)</span>
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header Badge */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
                <Calendar className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Book a Session · Kenah Wellness
              </span>
            </div>

            <h2 id="booking-title" className="text-2xl font-extrabold text-[#0B2B26] font-display">
              Schedule Your Consultation
            </h2>
            <p className="text-xs text-slate-500 mt-1 mb-5">
              Choose your service focus, pick a convenient time, and connect with our care team with zero obligation.
            </p>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              
              {/* Step indicator */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs font-semibold text-slate-500">
                <span>Step {step} of 2</span>
                <span>{step === 1 ? 'Service & Time Slot' : 'Your Details'}</span>
              </div>

              {step === 1 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  {/* Service selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Session Topic / Service
                    </label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full text-xs sm:text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-hidden focus:border-[#0B2B26]"
                    >
                      <option value="Home Care - Personal Care Consultation">Home Care: Personal Care Consultation</option>
                      <option value="Home Care - Senior & Companion Care">Home Care: Senior & Companion Care</option>
                      <option value="PA ODP - In-Home Respite Planning">PA ODP: In-Home Respite Planning</option>
                      <option value="PA ODP - Out-of-Home Respite">PA ODP: Out-of-Home Respite Consultation</option>
                      <option value="PA ODP - Habilitation (HAB)">PA ODP: Habilitation (HAB) Exploration</option>
                      <option value="PA ODP - Community Participation (CPS)">PA ODP: Community Participation (CPS)</option>
                      <option value="General Waiver & Care Assessment">General Waiver & Care Assessment</option>
                    </select>
                  </div>

                  {/* Format selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Session Format
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      {[
                        { id: 'in-home', label: 'In-Home Visit', icon: MapPin },
                        { id: 'video', label: 'Video Call', icon: Video },
                        { id: 'phone', label: 'Phone Call', icon: Phone },
                        { id: 'office', label: 'Office Visit', icon: Calendar }
                      ].map((item) => {
                        const Icon = item.icon;
                        const isSel = format === item.id;
                        return (
                          <button
                            type="button"
                            key={item.id}
                            onClick={() => setFormat(item.id as any)}
                            className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                              isSel
                                ? 'bg-amber-100/70 border-amber-400 text-[#0B2B26] font-bold shadow-2xs'
                                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Date selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Select Preferred Date
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 text-xs">
                      {availableDates.slice(0, 5).map((d) => (
                        <button
                          type="button"
                          key={d.value}
                          onClick={() => setSelectedDate(d.label)}
                          className={`py-2 px-1 rounded-xl border text-center cursor-pointer transition-all ${
                            (selectedDate === d.label || (!selectedDate && d === availableDates[0]))
                              ? 'bg-[#0B2B26] text-white border-[#0B2B26] font-semibold'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time slots */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Select Time Slot
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 text-xs">
                      {timeSlots.map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`py-2 px-1 rounded-xl border text-center cursor-pointer transition-all ${
                            selectedTime === slot
                              ? 'bg-[#E89A24] text-white border-[#E89A24] font-bold'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-2.5 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span>Continue to Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3.5 animate-in fade-in duration-150">
                  {/* Honeypot field */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="hp_book_check">Leave empty</label>
                    <input
                      type="text"
                      id="hp_book_check"
                      name="hp_book_check"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {validationError && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                      {validationError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="book_name" className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        id="book_name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Eleanor Vance"
                        className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 focus:outline-hidden focus:border-[#0B2B26]"
                      />
                    </div>

                    <div>
                      <label htmlFor="book_phone" className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        id="book_phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. (412) 555-0188"
                        className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 focus:outline-hidden focus:border-[#0B2B26]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="book_email" className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        id="book_email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. eleanor@example.com"
                        className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 focus:outline-hidden focus:border-[#0B2B26]"
                      />
                    </div>

                    <div>
                      <label htmlFor="book_address" className="block text-xs font-semibold text-slate-700 mb-1">
                        Township / Address (PA)
                      </label>
                      <input
                        id="book_address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. Allison Park, Canonsburg"
                        className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 focus:outline-hidden focus:border-[#0B2B26]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="book_notes" className="block text-xs font-semibold text-slate-700 mb-1">
                      Notes or Care Goals (Optional)
                    </label>
                    <textarea
                      id="book_notes"
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Share any special questions or care recipient details..."
                      className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2 focus:outline-hidden focus:border-[#0B2B26]"
                    />
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Free confidential scheduling · No cancellation fee · 24/7 support</span>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs disabled:opacity-50"
                    >
                      {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
                    </button>
                  </div>
                </div>
              )}

            </form>
          </div>
        )}
      </div>
    </div>
  );
};
