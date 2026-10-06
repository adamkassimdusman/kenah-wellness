import React, { useState } from 'react';
import { Menu, X, Calendar, Phone, BookOpen } from 'lucide-react';
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
  onOpenAssessment,
  onOpenBooking
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* Left Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium text-slate-700">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-[#0B2B26] transition-colors cursor-pointer ${
                currentPage === 'home' ? 'text-[#0B2B26] font-bold' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`hover:text-[#0B2B26] transition-colors cursor-pointer ${
                currentPage === 'about' ? 'text-[#0B2B26] font-bold' : ''
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('home-care')}
              className={`hover:text-[#0B2B26] transition-colors cursor-pointer ${
                currentPage === 'home-care' ? 'text-[#0B2B26] font-bold' : ''
              }`}
            >
              Home Care
            </button>
            <button
              onClick={() => handleNavClick('odp-waiver')}
              className={`hover:text-[#0B2B26] transition-colors cursor-pointer ${
                currentPage === 'odp-waiver' ? 'text-[#0B2B26] font-bold' : ''
              }`}
            >
              ODP Waivers
            </button>
          </nav>

          {/* Center Brand Header: Official Kenah Wellness Logo Image */}
          <div className="flex justify-center items-center py-1 sm:py-2">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 cursor-pointer focus:outline-hidden hover:opacity-95 transition-opacity"
              aria-label="Kenah Wellness Services Home"
            >
              <img
                src={kenahLogo}
                alt="Kenah Wellness Services - Caring Beyond the Call"
                className="h-11 sm:h-14 md:h-16 w-auto object-contain max-w-[210px] sm:max-w-[270px] md:max-w-[320px]"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== '/kenah-logo.jpeg' && target.src !== '/logo.jpeg') {
                    target.src = '/kenah-logo.jpeg';
                  }
                }}
              />
            </button>
          </div>

          {/* Right Navigation Links & Free Assessment CTA */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-5 text-sm font-medium text-slate-700">
            <nav className="flex items-center gap-4 xl:gap-5">
              <button
                onClick={() => handleNavClick('faq')}
                className={`hover:text-[#0B2B26] transition-colors cursor-pointer ${
                  currentPage === 'faq' ? 'text-[#0B2B26] font-bold' : ''
                }`}
              >
                FAQs
              </button>
              <button
                onClick={() => handleNavClick('testimonials')}
                className={`hover:text-[#0B2B26] transition-colors cursor-pointer ${
                  currentPage === 'testimonials' ? 'text-[#0B2B26] font-bold' : ''
                }`}
              >
                Testimonials
              </button>
              <button
                onClick={() => handleNavClick('careers')}
                className={`hover:text-[#0B2B26] transition-colors cursor-pointer ${
                  currentPage === 'careers' ? 'text-[#0B2B26] font-bold' : ''
                }`}
              >
                Careers
              </button>
              <button
                onClick={() => handleNavClick('blog')}
                className={`hover:text-[#0B2B26] transition-colors cursor-pointer flex items-center gap-1 ${
                  currentPage === 'blog' ? 'text-[#0B2B26] font-bold' : ''
                }`}
              >
                <span>Blog</span>
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className={`hover:text-[#0B2B26] transition-colors cursor-pointer ${
                  currentPage === 'contact' ? 'text-[#0B2B26] font-bold' : ''
                }`}
              >
                Contact
              </button>
            </nav>

            {/* Primary Action Button: Free Assessment CTA */}
            <div className="flex items-center">
              <button
                onClick={onOpenAssessment}
                className="px-5 py-2.5 rounded-full bg-[#E89A24] hover:bg-[#d68a18] active:scale-95 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-sm flex items-center gap-2"
                title="Book a Free In-Home or Virtual Assessment"
              >
                <Calendar className="w-4 h-4" />
                <span>Free Assessment</span>
              </button>
            </div>
          </div>

          {/* Mobile Actions & Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenAssessment}
              className="px-3 py-1.5 rounded-full bg-[#E89A24] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
              aria-label="Free Assessment"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Assessment</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#0B2B26] hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 shadow-xl animate-in slide-in-from-top-2 duration-200 text-left">
          <div className="flex flex-col space-y-3 pb-6 border-b border-slate-100 text-base font-medium">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left py-2 ${currentPage === 'home' ? 'text-[#0B2B26] font-bold' : 'text-slate-700'}`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`text-left py-2 ${currentPage === 'about' ? 'text-[#0B2B26] font-bold' : 'text-slate-700'}`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('home-care')}
              className={`text-left py-2 ${currentPage === 'home-care' ? 'text-[#0B2B26] font-bold' : 'text-slate-700'}`}
            >
              Home Care Services
            </button>
            <button
              onClick={() => handleNavClick('odp-waiver')}
              className={`text-left py-2 ${currentPage === 'odp-waiver' ? 'text-[#0B2B26] font-bold' : 'text-slate-700'}`}
            >
              ODP Waiver Services
            </button>
            <button
              onClick={() => handleNavClick('faq')}
              className={`text-left py-2 ${currentPage === 'faq' ? 'text-[#0B2B26] font-bold' : 'text-slate-700'}`}
            >
              FAQs & Guidance
            </button>
            <button
              onClick={() => handleNavClick('testimonials')}
              className={`text-left py-2 ${currentPage === 'testimonials' ? 'text-[#0B2B26] font-bold' : 'text-slate-700'}`}
            >
              Testimonials & Stories
            </button>
            <button
              onClick={() => handleNavClick('careers')}
              className={`text-left py-2 ${currentPage === 'careers' ? 'text-[#0B2B26] font-bold' : 'text-slate-700'}`}
            >
              Careers & Job Openings
            </button>
            <button
              onClick={() => handleNavClick('blog')}
              className={`text-left py-2 ${currentPage === 'blog' ? 'text-[#0B2B26] font-bold' : 'text-slate-700'}`}
            >
              Care Blog & Resources
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`text-left py-2 ${currentPage === 'contact' ? 'text-[#0B2B26] font-bold' : 'text-slate-700'}`}
            >
              Contact Us
            </button>
          </div>

          <div className="pt-4 space-y-2.5">
            <button
              onClick={() => {
                onOpenAssessment();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-full bg-[#E89A24] text-white font-bold text-sm text-center shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Free Assessment</span>
            </button>

            <a
              href="tel:+14125461860"
              className="w-full py-3 rounded-full border border-slate-300 text-[#0B2B26] font-semibold text-sm text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#E89A24]" />
              <span>Call +1 (412) 546-1860</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
