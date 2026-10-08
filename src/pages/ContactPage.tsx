import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  ExternalLink,
  Linkedin,
  Facebook,
  Instagram
} from 'lucide-react';
import { SERVICE_AREAS } from '../data/servicesData';
import { PageId } from '../types';
import { trackEvent } from '../utils/analytics';
import { apiSubmitContact } from '../utils/api';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
  onOpenAssessment: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, onOpenAssessment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Both / General Inquiry');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [searchTownship, setSearchTownship] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Spam honeypot detection
    if (honeypot.trim()) {
      setSubmitted(true);
      return;
    }

    if (!name.trim()) {
      setFormError('Please enter your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setFormError('Please provide a valid email address.');
      return;
    }

    const phoneClean = phone.replace(/\D/g, '');
    if (phoneClean.length < 10) {
      setFormError('Please provide a valid 10-digit phone number so we can reach you.');
      return;
    }

    if (!message.trim()) {
      setFormError('Please enter a message or question.');
      return;
    }

    const res = await apiSubmitContact({
      name: name.trim(),
      email: email.trim(),
      phone: phoneClean,
      subject: service,
      message: message.trim(),
      hp_contact_check: honeypot.trim(),
    });

    if (!res.success && res.error) {
      setFormError(res.error);
      return;
    }

    trackEvent('contact_inquiry_submitted', { service, source: 'contact_page' });
    setSubmitted(true);
  };

  const filteredAreas = searchTownship.trim()
    ? SERVICE_AREAS.filter(
        (a) =>
          a.name.toLowerCase().includes(searchTownship.toLowerCase()) ||
          a.county.toLowerCase().includes(searchTownship.toLowerCase())
      )
    : SERVICE_AREAS;

  return (
    <div className="space-y-16 pb-24 text-left font-sans">
      <Breadcrumbs items={[{ label: 'Contact Us' }]} onNavigate={onNavigate} />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="rounded-[36px] sm:rounded-[44px] bg-[#F8EDE2] p-8 sm:p-14 border border-[#EADBCC] relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block">
              GET IN TOUCH
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B2B26] font-display tracking-tight text-balance leading-[1.12]">
              We’re Here to Support You
            </h1>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl pt-1">
              Have questions about Home Care, Respite, Habilitation, or Pennsylvania ODP Consolidated Waiver eligibility? Our friendly intake specialists are ready to help.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Grid matching Home.svg */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Details Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-[#0B2B26] font-display mb-4">
                Contact Details:
              </h3>
              <div className="space-y-3.5 text-sm text-slate-700">
                <div>
                  <strong className="text-slate-900 block text-xs uppercase tracking-wider text-slate-400">Email:</strong>
                  <a href="mailto:info@kenahwellness.com" className="text-base text-[#0B2B26] font-semibold hover:underline">
                    info@kenahwellness.com
                  </a>
                </div>
                <div>
                  <strong className="text-slate-900 block text-xs uppercase tracking-wider text-slate-400">Phone:</strong>
                  <a href="tel:+14125461860" className="text-base text-[#0B2B26] font-semibold hover:underline">
                    +1 (412) 546-1860
                  </a>
                  <span className="text-xs text-slate-500 block mt-0.5">24/7 on-call care coordinator available</span>
                </div>
                <div>
                  <strong className="text-slate-900 block text-xs uppercase tracking-wider text-slate-400">Main Office:</strong>
                  <span className="text-sm text-slate-800 leading-relaxed block">
                    2400 Ansys Drive, Suite 169<br />
                    Canonsburg, PA 15317<br />
                    United States
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF4EE] border border-[#EADBCC] text-xs">
                  <strong className="text-[#0B2B26] block font-bold text-sm mb-1">
                    Referrals & Intake Coordination:
                  </strong>
                  <div className="text-slate-800 font-medium">
                    Zephaniah Omweno, Operations Manager
                  </div>
                  <div className="text-slate-500 text-[11px] mt-0.5">
                    Direct line for County Supports Coordinators (SCs), hospital discharge planners & families across Allegheny, Butler and Washington Counties.
                  </div>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-4 pt-6 text-slate-700">
                <a
                  href="https://www.linkedin.com/company/kenah-wellness-services-llc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0B2B26] transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61581451048202"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0B2B26] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/kenah_wellness/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0B2B26] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="tel:+14125461860"
                  className="hover:text-[#0B2B26] transition-colors"
                  aria-label="Phone"
                >
                  <Phone className="w-5 h-5" />
                </a>
              </div>

              <div className="pt-6 text-xs text-slate-400">
                We typically respond within 12 hours.
              </div>
            </div>

            {/* Hours card */}
            <div className="p-6 rounded-[28px] bg-white border border-slate-200/90 shadow-2xs space-y-2">
              <h4 className="font-bold text-sm text-[#0B2B26] font-display">
                Operating & Caregiver Hours
              </h4>
              <p className="text-xs text-slate-600">
                Care services are provided 24 hours a day, 7 days a week, including holidays and emergency respite periods.
              </p>
            </div>
          </div>

          {/* Right Message Card: Sand Container with Minimal Underline Inputs */}
          <div className="lg:col-span-7">
            <div className="rounded-[32px] bg-[#F8EDE2] p-8 sm:p-12">
              <h3 className="text-xl sm:text-2xl font-bold text-[#0B2B26] font-display mb-6">
                Send Us a Message
              </h3>

              {submitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="text-emerald-900 font-bold text-base">
                    Message Received!
                  </div>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Thank you, {name}. A member of our clinical intake team will respond to {email} or call you at {phone} within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="text-xs font-semibold text-[#0B2B26] underline pt-2"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot anti-spam field */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="hp_contact_check">Leave empty</label>
                    <input
                      type="text"
                      id="hp_contact_check"
                      name="hp_contact_check"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {formError && (
                    <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                      {formError}
                    </div>
                  )}

                  <div>
                    <label htmlFor="contact_name" className="block text-xs font-medium text-slate-600 mb-1">
                      Your Name *
                    </label>
                    <input
                      id="contact_name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. David Williams"
                      className="w-full bg-transparent border-b border-slate-400/70 pb-2 text-sm text-[#0B2B26] placeholder:text-slate-400 focus:outline-hidden focus:border-[#0B2B26]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact_phone" className="block text-xs font-medium text-slate-600 mb-1">
                      Phone Number *
                    </label>
                    <input
                      id="contact_phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. (412) 546-1860"
                      className="w-full bg-transparent border-b border-slate-400/70 pb-2 text-sm text-[#0B2B26] placeholder:text-slate-400 focus:outline-hidden focus:border-[#0B2B26]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact_email" className="block text-xs font-medium text-slate-600 mb-1">
                      Email Address *
                    </label>
                    <input
                      id="contact_email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. david@example.com"
                      className="w-full bg-transparent border-b border-slate-400/70 pb-2 text-sm text-[#0B2B26] placeholder:text-slate-400 focus:outline-hidden focus:border-[#0B2B26]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact_service" className="block text-xs font-medium text-slate-600 mb-1">
                      Program of Interest
                    </label>
                    <select
                      id="contact_service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full bg-transparent border-b border-slate-400/70 pb-2 text-sm text-[#0B2B26] focus:outline-hidden focus:border-[#0B2B26]"
                    >
                      <option value="Both / General Inquiry">Both Home Care & ODP Waiver</option>
                      <option value="ODP - In-Home & Community Supports (IHCS)">PA ODP: In-Home & Community Supports (IHCS)</option>
                      <option value="ODP - In-Home, Life Sharing & Day Respite">PA ODP: In-Home, Life Sharing & Day Respite</option>
                      <option value="ODP - Out-of-Home Respite">PA ODP: Out-of-Home Respite</option>
                      <option value="ODP - Community Participation (CPS)">PA ODP: Community Participation (CPS)</option>
                      <option value="ODP - Habilitation Services">PA ODP: Habilitation Services</option>
                      <option value="Home Care - Personal Care">Home Care: Personal Care</option>
                      <option value="Home Care - Senior Care & Companionship">Home Care: Senior Care & Companionship</option>
                      <option value="Home Care - Post-Discharge / Recovery Care">Home Care: Post-Discharge / Recovery Care</option>
                      <option value="Home Care - Dementia Care">Home Care: Dementia Care</option>
                      <option value="Home Care - End-of-Life & Hospice">Home Care: End-of-Life & Hospice Support</option>
                      <option value="Home Care - Facility-Based Care">Home Care: Facility-Based Care (Assisted Living)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact_message" className="block text-xs font-medium text-slate-600 mb-1">
                      Message *
                    </label>
                    <textarea
                      id="contact_message"
                      rows={3}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can Kenah Wellness support your family?"
                      className="w-full bg-transparent border-b border-slate-400/70 pb-2 text-sm text-[#0B2B26] placeholder:text-slate-400 focus:outline-hidden focus:border-[#0B2B26] resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white font-medium text-sm transition-all cursor-pointer shadow-xs"
                    >
                      Send Message
                    </button>
                    <p className="text-[11px] text-slate-500 mt-3 text-center leading-snug">
                      Your privacy is protected. Submitted information is strictly used to answer your inquiry in accordance with our{' '}
                      <button
                        type="button"
                        onClick={() => onNavigate('privacy')}
                        className="text-[#0B2B26] font-semibold underline cursor-pointer"
                      >
                        Privacy Policy
                      </button>.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Service Area Township Checker */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="rounded-[32px] bg-[#FAF4EE] border border-slate-200/90 p-8 sm:p-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-1">
                SERVICE DIRECTORY
              </span>
              <h3 className="text-2xl font-bold text-[#0B2B26] font-display">
                Check Your Western Pennsylvania Community
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Type your town or county below to check our service availability:
              </p>
            </div>

            <div className="w-full md:w-72">
              <input
                type="text"
                value={searchTownship}
                onChange={(e) => setSearchTownship(e.target.value)}
                placeholder="Search township or county..."
                className="w-full text-xs rounded-xl border border-slate-300 px-3.5 py-2.5 bg-white focus:outline-hidden focus:border-[#0B2B26]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 max-h-56 overflow-y-auto pr-2">
            {filteredAreas.map((area, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-white border border-slate-200/80 text-xs font-medium text-slate-800 flex items-center justify-between"
              >
                <span className="truncate">{area.name}</span>
                <span className="text-[10px] text-slate-400 truncate shrink-0 ml-1">
                  {area.county}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
