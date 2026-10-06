import React from 'react';
import { Home, Search, Calendar, Phone, ArrowLeft, Heart, ShieldCheck, HelpCircle } from 'lucide-react';
import { PageId } from '../types';

interface NotFoundPageProps {
  onNavigate: (page: PageId) => void;
  onOpenAssessment: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate, onOpenAssessment }) => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 font-sans text-left">
      <div className="max-w-2xl w-full bg-white rounded-[36px] p-8 sm:p-14 border border-slate-200 shadow-xl space-y-8 text-center sm:text-left">
        
        {/* Top Badge & 404 Visual */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF4EE] text-[#0B2B26] text-xs font-bold uppercase tracking-wider border border-[#EADBCC]">
            <span className="w-2 h-2 rounded-full bg-[#E89A24]" />
            <span>Page Not Found</span>
          </div>
          <span className="text-4xl sm:text-6xl font-extrabold text-[#EADBCC] font-mono select-none">
            404
          </span>
        </div>

        {/* Headline & Description */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0B2B26] font-display tracking-tight leading-tight">
            We Can’t Seem to Find the Page You’re Looking For
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg">
            The link you clicked may be outdated, moved, or mistyped. Don't worry—our team is still here to assist you and your family with compassionate home care and Pennsylvania ODP waiver services.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-3 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <Home className="w-4 h-4 text-[#E89A24]" />
            <span>Return to Homepage</span>
          </button>

          <button
            onClick={onOpenAssessment}
            className="px-6 py-3 rounded-full bg-[#E89A24] hover:bg-[#d68a18] text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Free Assessment</span>
          </button>
        </div>

        {/* Quick Links Grid */}
        <div className="pt-6 border-t border-slate-100 space-y-3 text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Popular Destinations:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <button
              onClick={() => onNavigate('home-care')}
              className="p-3 rounded-2xl bg-slate-50 hover:bg-[#FAF4EE] border border-slate-200 text-left transition-colors cursor-pointer flex items-center gap-2.5 text-slate-700 hover:text-[#0B2B26]"
            >
              <Heart className="w-4 h-4 text-[#E89A24] shrink-0" />
              <span className="font-semibold">Home Care Services</span>
            </button>

            <button
              onClick={() => onNavigate('odp-waiver')}
              className="p-3 rounded-2xl bg-slate-50 hover:bg-[#FAF4EE] border border-slate-200 text-left transition-colors cursor-pointer flex items-center gap-2.5 text-slate-700 hover:text-[#0B2B26]"
            >
              <ShieldCheck className="w-4 h-4 text-[#E89A24] shrink-0" />
              <span className="font-semibold">ODP Waiver Services</span>
            </button>

            <button
              onClick={() => onNavigate('faq')}
              className="p-3 rounded-2xl bg-slate-50 hover:bg-[#FAF4EE] border border-slate-200 text-left transition-colors cursor-pointer flex items-center gap-2.5 text-slate-700 hover:text-[#0B2B26]"
            >
              <HelpCircle className="w-4 h-4 text-[#E89A24] shrink-0" />
              <span className="font-semibold">FAQs & Guidance</span>
            </button>
          </div>
        </div>

        {/* Immediate Support Note */}
        <div className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-2 pt-2">
          <span>Need immediate assistance? Call us 24/7 at</span>
          <a href="tel:+14125461860" className="font-bold text-[#0B2B26] hover:underline">
            +1 (412) 546-1860
          </a>
        </div>

      </div>
    </div>
  );
};
