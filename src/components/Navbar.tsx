import React, { useState } from 'react';
import { Menu, X, Calendar, Phone } from 'lucide-react';
import { PageId } from '../types';
import kenahLogo from '../assets/images/kenah-logo.jpeg';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenAssessment: () => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenAssessment
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* FAR LEFT BRAND LOGO */}
          <div className="flex items-center shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center cursor-pointer focus:outline-hidden hover:opacity-95 transition-opacity"
              aria-label="Kenah Wellness Services Home"
            >
              <img
                src={kenahLogo}
                alt="Kenah Wellness Services - Caring Beyond the Call"
                className="h-10 sm:h-12 md:h-13 w-auto object-contain max-w-[190px] sm:max-w-[240px]"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== '/kenah-logo.jpeg' && target.src !== '/logo.jpeg') {
                    target.src = '/kenah-logo.jpeg';
                  }
                }}
              />
            </button>
          </div>

          {/* MAIN NAVIGATION LINKS (Clean normal readable text sizes) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm xl:text-[15px] font-semibold text-slate-700">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-[#0B2B26] transition-colors cursor-pointer py-1.5 ${
                currentPage === 'home'
                  ? 'text-[#0B2B26] font-bold border-b-2 border-[#0B2B26]'
                  : ''
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('services')}
              className={`hover:text-[#0B2B26] transition-colors cursor-pointer py-1.5 ${
                currentPage === 'services'
                  ? 'text-[#0B2B26] font-bold border-b-2 border-[#0B2B26]'
                  : ''
              }`}
            >
              Services
            </button>

            <button
              onClick={() => handleNavClick('odp-waiver')}
              className={`hover:text-[#0B2B26] transition-colors cursor-pointer py-1.5 ${
                currentPage === 'odp-waiver'
                  ? 'text-[#0B2B26] font-bold border-b-2 border-[#0B2B26]'
                  : ''
              }`}
            >
              ODP Waivers
            </button>

            <button
              onClick={() => handleNavClick('home-care')}
              className={`hover:text-[#0B2B26] transition-colors cursor-pointer py-1.5 ${
                currentPage === 'home-care'
                  ? 'text-[#0B2B26] font-bold border-b-2 border-[#0B2B26]'
                  : ''
              }`}
            >
              Home Care
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`hover:text-[#0B2B26] transition-colors cursor-pointer py-1.5 ${
                currentPage === 'about'
                  ? 'text-[#0B2B26] font-bold border-b-2 border-[#0B2B26]'
                  : ''
              }`}
            >
              About
            </button>

            <button
              onClick={() => handleNavClick('blog')}
              className={`hover:text-[#0B2B26] transition-colors cursor-pointer py-1.5 ${
                currentPage === 'blog'
                  ? 'text-[#0B2B26] font-bold border-b-2 border-[#0B2B26]'
                  : ''
              }`}
            >
              Blog
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`hover:text-[#0B2B26] transition-colors cursor-pointer py-1.5 ${
                currentPage === 'contact'
                  ? 'text-[#0B2B26] font-bold border-b-2 border-[#0B2B26]'
                  : ''
              }`}
            >
              Contact
            </button>
          </nav>

          {/* RIGHT ACTION CONTROLS */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 shrink-0">
            <a
              href="tel:+14125461860"
              className="flex items-center gap-1.5 text-xs xl:text-sm font-bold text-[#0B2B26] hover:text-[#E89A24] transition-colors cursor-pointer py-1.5 px-2.5 rounded-full hover:bg-slate-50"
              title="Call Kenah Wellness Services"
            >
              <Phone className="w-4 h-4 text-[#E89A24]" />
              <span className="whitespace-nowrap">+1 (412) 546-1860</span>
            </a>

            <button
              onClick={onOpenAssessment}
              className="px-5 py-2.5 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] active:scale-95 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
              title="Book a Free In-Home or Virtual Assessment"
            >
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span className="whitespace-nowrap">Free Assessment</span>
            </button>
          </div>

          {/* MOBILE ACTIONS & MENU TOGGLE */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <a
              href="tel:+14125461860"
              className="p-2.5 rounded-full bg-slate-100 text-[#0B2B26] font-bold"
              aria-label="Call Kenah Wellness"
            >
              <Phone className="w-5 h-5 text-[#E89A24]" />
            </a>

            <button
              onClick={onOpenAssessment}
              className="px-4 py-2 rounded-full bg-[#0B2B26] text-white text-sm font-bold flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
              aria-label="Free Assessment"
            >
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Assessment</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-[#0B2B26] hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE MENU DRAWER (High-contrast, large senior-friendly touch targets) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b-2 border-slate-200 px-6 py-6 shadow-2xl animate-in slide-in-from-top-2 duration-200 text-left">
          <div className="flex flex-col space-y-2 pb-6 border-b border-slate-100 text-lg font-bold">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left py-2.5 px-3 rounded-xl ${
                currentPage === 'home' ? 'bg-[#0B2B26] text-white' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className={`text-left py-2.5 px-3 rounded-xl ${
                currentPage === 'services' ? 'bg-[#0B2B26] text-white' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Dedicated Services Directory
            </button>
            <button
              onClick={() => handleNavClick('odp-waiver')}
              className={`text-left py-2.5 px-3 rounded-xl ${
                currentPage === 'odp-waiver' ? 'bg-[#0B2B26] text-white' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              1. ODP Waiver Services
            </button>
            <button
              onClick={() => handleNavClick('home-care')}
              className={`text-left py-2.5 px-3 rounded-xl ${
                currentPage === 'home-care' ? 'bg-[#0B2B26] text-white' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              2. Home Care Services
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`text-left py-2.5 px-3 rounded-xl ${
                currentPage === 'about' ? 'bg-[#0B2B26] text-white' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('blog')}
              className={`text-left py-2.5 px-3 rounded-xl ${
                currentPage === 'blog' ? 'bg-[#0B2B26] text-white' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Care Blog & Resources
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`text-left py-2.5 px-3 rounded-xl ${
                currentPage === 'contact' ? 'bg-[#0B2B26] text-white' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Contact Us
            </button>
          </div>

          <div className="pt-5 space-y-3">
            <button
              onClick={() => {
                onOpenAssessment();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3.5 rounded-full bg-[#0B2B26] text-white font-bold text-sm text-center shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Book Free Assessment</span>
            </button>

            <a
              href="tel:+14125461860"
              className="w-full py-4 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0B2B26] font-bold text-base text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-5 h-5 text-[#E89A24]" />
              <span>Call +1 (412) 546-1860</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
