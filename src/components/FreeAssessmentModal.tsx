import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { addAssessmentSubmission } from '../utils/storage';
import { trackEvent } from '../utils/analytics';
import { AssessmentSubmission } from '../types';

interface FreeAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const FreeAssessmentModal: React.FC<FreeAssessmentModalProps> = ({
  isOpen,
  onClose,
  defaultService = ''
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState(defaultService || 'Both / Unsure');
  const [recipient, setRecipient] = useState('Parent / Senior');
  const [township, setTownship] = useState('');
  const [notes, setNotes] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Spam honeypot
    if (honeypot.trim()) {
      setIsSubmitted(true);
      setReferenceId(`KW-${Math.floor(100000 + Math.random() * 900000)}`);
      return;
    }

    if (!name.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    const phoneClean = phone.replace(/\D/g, '');
    if (phoneClean.length < 10) {
      setValidationError('Please enter a valid 10-digit telephone number.');
      return;
    }

    setIsSubmitting(true);
    const newRef = `KW-${Math.floor(100000 + Math.random() * 900000)}`;

    const submission: AssessmentSubmission = {
      id: `asmt-${Date.now()}`,
      referenceCode: newRef,
      recipient,
      serviceCategory: serviceType.includes('ODP') ? 'odp-waiver' : 'both',
      selectedServices: [serviceType],
      timeframe: 'Standard schedule',
      hoursPerWeek: '10 - 20 hrs/week',
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      county: 'Western PA',
      township: township.trim() || 'Local Area',
      notes: notes.trim(),
      submittedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }) + ` at ` + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'new'
    };

    addAssessmentSubmission(submission);
    trackEvent('assessment_submitted', { serviceType, reference: newRef });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setReferenceId(newRef);
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setTownship('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div
        className="bg-white rounded-[32px] max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-10 relative text-left"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-[#0B2B26] hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-extrabold text-[#0B2B26] font-display">
              Assessment Request Received!
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Thank you, <strong className="text-slate-900">{name}</strong>. A Kenah Wellness Care Coordinator will reach out to you within 24 hours to review support options and schedule your complimentary assessment.
            </p>
            <div className="bg-[#FAF4EE] border border-slate-200 rounded-2xl p-4 text-xs text-slate-700 max-w-sm mx-auto">
              <div className="font-semibold text-slate-900 mb-1">Assessment Reference:</div>
              <div className="font-mono text-base font-bold text-[#0B2B26]">{referenceId}</div>
              <div className="mt-2 text-slate-500">Need immediate assistance? Call us directly:</div>
              <a href="tel:+14125461860" className="text-[#0B2B26] font-bold hover:underline block mt-0.5">
                +1 (412) 546-1860 (Available 24/7)
              </a>
            </div>
            <button
              onClick={handleReset}
              className="mt-4 px-8 py-3 bg-[#0B2B26] hover:bg-[#071E1A] text-white font-medium text-xs sm:text-sm rounded-full cursor-pointer transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="space-y-1 mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block">
                COMPLIMENTARY CONSULTATION
              </span>
              <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold text-[#0B2B26] font-display">
                Request Free Assessment
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Our clinical and waiver specialists design personalized support plans tailored to your exact family needs with zero obligation.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot anti-spam field */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="hp_modal_asmt">Leave empty</label>
                <input
                  type="text"
                  id="hp_modal_asmt"
                  name="hp_modal_asmt"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="modal_asmt_name" className="block text-xs font-medium text-slate-600 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    id="modal_asmt_name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah Miller"
                    className="w-full text-xs sm:text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 focus:outline-hidden focus:border-[#0B2B26]"
                  />
                </div>

                <div>
                  <label htmlFor="modal_asmt_phone" className="block text-xs font-medium text-slate-600 mb-1">
                    Phone Number *
                  </label>
                  <input
                    id="modal_asmt_phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. (412) 555-0199"
                    className="w-full text-xs sm:text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 focus:outline-hidden focus:border-[#0B2B26]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. sarah@example.com"
                    className="w-full text-xs sm:text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 focus:outline-hidden focus:border-[#0B2B26]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Township / City (PA)
                  </label>
                  <input
                    type="text"
                    value={township}
                    onChange={(e) => setTownship(e.target.value)}
                    placeholder="e.g. Allison Park, Canonsburg"
                    className="w-full text-xs sm:text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 focus:outline-hidden focus:border-[#0B2B26]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Primary Service Needed
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full text-xs sm:text-sm rounded-xl border border-slate-200 px-3 py-2.5 bg-white focus:outline-hidden focus:border-[#0B2B26]"
                  >
                    <option value="Home Care - Personal Care">Home Care: Personal Care</option>
                    <option value="Home Care - Senior Care">Home Care: Senior & Elderly Care</option>
                    <option value="Home Care - Companion Care">Home Care: Companion Care</option>
                    <option value="Home Care - Homemaker Services">Home Care: Homemaker Services</option>
                    <option value="ODP - In-Home Respite">PA ODP: In-Home Respite</option>
                    <option value="ODP - Out-of-Home Respite">PA ODP: Out-of-Home Respite</option>
                    <option value="ODP - Habilitation (HAB)">PA ODP: Habilitation (HAB)</option>
                    <option value="ODP - Community Participation (CPS)">PA ODP: Community Participation (CPS)</option>
                    <option value="Both / Unsure">Both / Need Guidance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Who Is Receiving Care?
                  </label>
                  <select
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full text-xs sm:text-sm rounded-xl border border-slate-200 px-3 py-2.5 bg-white focus:outline-hidden focus:border-[#0B2B26]"
                  >
                    <option value="Parent / Senior">Parent / Senior</option>
                    <option value="Adult with ID/A">Adult with ID/A</option>
                    <option value="Myself">Myself</option>
                    <option value="Spouse">Spouse / Partner</option>
                    <option value="Other Family Member">Other Family Member</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Briefly describe your schedule or care goals (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Looking for 15 hours/week of respite care on weekdays..."
                  className="w-full text-xs sm:text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 focus:outline-hidden focus:border-[#0B2B26]"
                />
              </div>

              <div className="pt-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Confidential · HIPAA Compliant</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-7 py-3 bg-[#0B2B26] hover:bg-[#071E1A] text-white font-medium text-xs sm:text-sm rounded-full transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
