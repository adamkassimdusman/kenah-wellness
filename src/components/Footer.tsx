import React from 'react';
import { Calendar, Phone, Lock } from 'lucide-react';
import { PageId } from '../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenAssessment: () => void;
  onOpenBooking?: () => void;
  onOpenCookieSettings?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenAssessment,
  onOpenBooking,
  onOpenCookieSettings
}) => {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-14 text-left font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Brand & Nav Links */}
          <div className="lg:col-span-6 space-y-10">
            <div>
              <button
                onClick={() => handleNav('home')}
                className="text-3xl font-extrabold text-[#0B2B26] tracking-tight font-display hover:opacity-90 transition-opacity cursor-pointer"
              >
                Kenah Wellness
              </button>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                Compassionate non-medical Home Care and Pennsylvania ODP Waiver Services. Licensed & insured across Southwestern PA.
              </p>
            </div>

            {/* 3-Column Navigation Grid */}
            <div className="grid grid-cols-3 gap-6 sm:gap-10 text-sm text-slate-700">
              {/* Col 1: Main Pages */}
              <div className="space-y-3 flex flex-col">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Navigation
                </span>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-[#0B2B26] transition-colors text-left cursor-pointer"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-[#0B2B26] transition-colors text-left cursor-pointer"
                >
                  About Us
                </button>
                <button
                  onClick={() => handleNav('home-care')}
                  className="hover:text-[#0B2B26] transition-colors text-left cursor-pointer"
                >
                  Home Care Services
                </button>
                <button
                  onClick={() => handleNav('odp-waiver')}
                  className="hover:text-[#0B2B26] transition-colors text-left cursor-pointer"
                >
                  ODP Waiver Services
                </button>
                <button
                  onClick={() => handleNav('faq')}
                  className="hover:text-[#0B2B26] transition-colors text-left cursor-pointer"
                >
                  FAQs
                </button>
                <button
                  onClick={() => handleNav('testimonials')}
                  className="hover:text-[#0B2B26] transition-colors text-left cursor-pointer"
                >
                  Testimonials
                </button>
                <button
                  onClick={() => handleNav('careers')}
                  className="hover:text-[#0B2B26] transition-colors text-left cursor-pointer font-medium"
                >
                  Careers & Hiring
                </button>
                <button
                  onClick={() => handleNav('blog')}
                  className="hover:text-[#0B2B26] transition-colors text-left cursor-pointer"
                >
                  Care Blog & Guides
                </button>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-[#0B2B26] transition-colors text-left cursor-pointer"
                >
                  Contact
                </button>
                <button
                  onClick={() => handleNav('admin')}
                  className="hover:text-[#0B2B26] transition-colors text-left cursor-pointer font-bold text-[#E89A24]"
                >
                  Admin Portal
                </button>
              </div>

              {/* Col 2: Social & Media */}
              <div className="space-y-3 flex flex-col">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Connect
                </span>
                <a
                  href="https://www.instagram.com/kenah_wellness/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0B2B26] transition-colors text-left"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61581451048202"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0B2B26] transition-colors text-left"
                >
                  Facebook
                </a>
                <a
                  href="https://www.youtube.com/channel/UCuQdrNxzdoSiIua4RCh2uMw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0B2B26] transition-colors text-left"
                >
                  YouTube
                </a>
                <a
                  href="https://www.linkedin.com/company/kenah-wellness-services-llc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0B2B26] transition-colors text-left"
                >
                  LinkedIn
                </a>
              </div>

              {/* Col 3: Legal & Support */}
              <div className="space-y-3 flex flex-col">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Legal & Office
                </span>
                <button
                  onClick={() => handleNav('terms')}
                  className="hover:text-[#0B2B26] transition-colors text-left cursor-pointer"
                >
                  Terms of Use
                </button>
                <button
                  onClick={() => handleNav('privacy')}
                  className="hover:text-[#0B2B26] transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => handleNav('faq')}
                  className="hover:text-[#0B2B26] transition-colors text-left cursor-pointer"
                >
                  FAQs
                </button>
                {onOpenCookieSettings && (
                  <button
                    onClick={onOpenCookieSettings}
                    className="hover:text-[#0B2B26] transition-colors text-left cursor-pointer text-slate-500 hover:text-slate-900"
                  >
                    Cookie Settings
                  </button>
                )}
                <div className="pt-2 text-xs text-slate-500 leading-snug">
                  2400 Ansys Dr, Suite 169<br />
                  Canonsburg, PA 15317
                </div>
              </div>
            </div>

            {/* Copyright Note & Confidential Portal Access */}
            <div className="pt-4 flex items-center justify-between text-xs text-slate-400">
              <span>
                © {new Date().getFullYear()} Kenah Wellness Services LLC. All Rights Reserved. Licensed in PA.
              </span>
              <button
                onClick={() => handleNav('admin')}
                className="text-slate-300 hover:text-slate-600 transition-colors p-1 cursor-pointer rounded-md focus:outline-hidden"
                title="Management Access"
                aria-label="Staff Portal"
              >
                <Lock className="w-3.5 h-3.5 opacity-40 hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>

          {/* Right Column: Dark Green Card matching Home.svg */}
          <div className="lg:col-span-6">
            <div className="rounded-[32px] bg-[#0B2B26] text-white p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between min-h-[320px] shadow-lg">
              
              {/* Decorative graphic matching Home.svg */}
              <div className="absolute top-0 right-0 w-36 h-36 pointer-events-none select-none">
                <svg viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path
                    d="M 60 0 A 70 70 0 0 1 150 90"
                    stroke="#E89A24"
                    strokeWidth="14"
                    fill="none"
                  />
                  <path
                    d="M 75 0 A 55 55 0 0 1 150 75"
                    stroke="#F6A8B8"
                    strokeWidth="14"
                    fill="none"
                  />
                  <path
                    d="M 90 0 A 40 40 0 0 1 150 60"
                    stroke="#3CB9A8"
                    strokeWidth="14"
                    fill="none"
                  />
                  <g transform="translate(60, 45) scale(0.65)">
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                      <ellipse
                        key={i}
                        cx="30"
                        cy="14"
                        rx="6"
                        ry="14"
                        fill="#3CB9A8"
                        transform={`rotate(${angle} 30 30)`}
                      />
                    ))}
                    <circle cx="30" cy="30" r="8" fill="#F2D701" />
                  </g>
                </svg>
              </div>

              {/* Headline */}
              <div className="relative z-10 max-w-sm pt-4">
                <h3 className="text-3xl sm:text-4xl font-extrabold font-display leading-[1.15] tracking-tight">
                  Find Support, Guidance, and Balance.
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 mt-2">
                  Schedule your free in-home consultation or speak with a care coordinator today.
                </p>
              </div>

              {/* Action Buttons: Free Assessment + Phone */}
              <div className="relative z-10 pt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenAssessment}
                  className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#E89A24] hover:bg-[#d68a18] active:scale-95 text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Free Assessment</span>
                </button>

                <a
                  href="tel:+14125461860"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition-all border border-white/20 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-[#F2D701]" />
                  <span>+1 (412) 546-1860</span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
