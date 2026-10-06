import React from 'react';
import { X, Check, ArrowRight, ShieldCheck, Phone, Calendar } from 'lucide-react';
import { ServiceItem } from '../types';
import {
  PersonalCareLineIcon,
  CompanionCareLineIcon,
  HomemakerLineIcon,
  MedicationRemindersLineIcon,
  DailyLivingLineIcon,
  AdditionalSupportsLineIcon,
  InHomeRespiteLineIcon,
  OutOfHomeRespiteLineIcon,
  HabilitationLineIcon,
  CommunityParticipationLineIcon
} from './icons/ServiceLineIcons';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onGetStartedWithService: (serviceTitle: string) => void;
  onOpenBooking?: (serviceTitle?: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onGetStartedWithService,
  onOpenBooking
}) => {
  if (!service) return null;

  const renderIcon = (id: string) => {
    switch (id) {
      case 'personal-care':
        return <PersonalCareLineIcon size={48} className="w-12 h-12" />;
      case 'companion-care':
        return <CompanionCareLineIcon size={48} className="w-12 h-12" />;
      case 'homemaker-services':
        return <HomemakerLineIcon size={48} className="w-12 h-12" />;
      case 'medication-reminders':
        return <MedicationRemindersLineIcon size={48} className="w-12 h-12" />;
      case 'daily-living-assistance':
        return <DailyLivingLineIcon size={48} className="w-12 h-12" />;
      case 'additional-home-care':
        return <AdditionalSupportsLineIcon size={48} className="w-12 h-12" />;
      case 'in-home-respite':
        return <InHomeRespiteLineIcon size={48} className="w-12 h-12" />;
      case 'out-of-home-respite':
        return <OutOfHomeRespiteLineIcon size={48} className="w-12 h-12" />;
      case 'habilitation-hab':
        return <HabilitationLineIcon size={48} className="w-12 h-12" />;
      case 'community-participation-support-cps':
        return <CommunityParticipationLineIcon size={48} className="w-12 h-12" />;
      default:
        return <PersonalCareLineIcon size={48} className="w-12 h-12" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div
        className="bg-white rounded-[32px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-10 relative text-left"
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-title"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-[#0B2B26] hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header with Icon and Category */}
        <div className="flex items-start gap-4 mb-4">
          <div className="shrink-0 p-1">
            {renderIcon(service.id)}
          </div>
          <div>
            <span
              className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block ${
                service.category === 'odp-waiver'
                  ? 'bg-[#F8EDE2] text-[#0B2B26]'
                  : 'bg-[#E6F7F4] text-[#0B2B26]'
              }`}
            >
              {service.category === 'odp-waiver'
                ? 'Pennsylvania ODP Consolidated Waiver'
                : 'Kenah Home Care Services'}
            </span>
            <h2 id="service-title" className="text-2xl sm:text-3xl font-extrabold text-[#0B2B26] font-display mt-2">
              {service.title}
            </h2>
          </div>
        </div>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {service.fullDesc}
        </p>

        {/* Waiver Note if present */}
        {service.paWaiverNote && (
          <div className="mt-4 p-4 rounded-2xl bg-[#FAF4EE] border border-amber-200/70 flex items-start gap-2.5 text-xs text-slate-800">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold text-slate-900">Pennsylvania ODP Verification:</strong>{' '}
              {service.paWaiverNote}
            </div>
          </div>
        )}

        {/* Key Features & Support Details */}
        <div className="mt-6 space-y-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Key Components Included
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {service.bulletPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Who This Service Supports
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              {service.whoItIsFor}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              The Kenah Wellness Advantage
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
              {service.howWeHelp.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0B2B26]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-8 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <a
            href="tel:+14125461860"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-[#0B2B26]"
          >
            <Phone className="w-3.5 h-3.5 text-slate-600" />
            <span>Speak with Intake: (412) 546-1860</span>
          </a>

          <div className="flex flex-wrap items-center gap-2">
            {onOpenBooking && (
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking(service.title);
                }}
                className="px-4 py-2.5 rounded-full bg-[#E89A24] hover:bg-[#d68a18] text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book a Session</span>
              </button>
            )}

            <button
              onClick={() => {
                onGetStartedWithService(service.title);
                onClose();
              }}
              className="px-5 py-2.5 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white font-medium text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
