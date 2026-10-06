import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Check, Calendar, ArrowRight, ShieldCheck, Heart, Clock, Phone, Sparkles } from 'lucide-react';
import {
  PersonalCareLineIcon,
  SeniorCareLineIcon,
  EndOfLifeCareLineIcon,
  RespiteCareLineIcon,
  DementiaCareLineIcon,
  CompanionCareLineIcon,
  SpecializedSupportLineIcon,
  AdditionalServicesLineIcon
} from '../components/icons/ServiceLineIcons';
import { PageId, ServiceItem } from '../types';
import { getStoredHomeCareServices, DATA_CHANGE_EVENT } from '../utils/storage';

interface HomeCarePageProps {
  onNavigate: (page: PageId) => void;
  onOpenAssessment: () => void;
  onOpenBooking?: (serviceTitle?: string) => void;
  onSelectService: (service: ServiceItem) => void;
}

export const HomeCarePage: React.FC<HomeCarePageProps> = ({
  onNavigate,
  onOpenAssessment,
  onOpenBooking,
  onSelectService
}) => {
  const [estimatedHours, setEstimatedHours] = useState<number>(20);
  const [servicesList, setServicesList] = useState<ServiceItem[]>(() => getStoredHomeCareServices());

  React.useEffect(() => {
    const handler = () => setServicesList(getStoredHomeCareServices());
    window.addEventListener(DATA_CHANGE_EVENT, handler);
    return () => window.removeEventListener(DATA_CHANGE_EVENT, handler);
  }, []);

  const renderHomeCareIcon = (id: string) => {
    switch (id) {
      case 'personal-care':
        return <PersonalCareLineIcon size={48} className="w-12 h-12" />;
      case 'senior-care':
        return <SeniorCareLineIcon size={48} className="w-12 h-12" />;
      case 'end-of-life-care':
        return <EndOfLifeCareLineIcon size={48} className="w-12 h-12" />;
      case 'respite-care':
        return <RespiteCareLineIcon size={48} className="w-12 h-12" />;
      case 'dementia-care':
        return <DementiaCareLineIcon size={48} className="w-12 h-12" />;
      case 'companionship-care':
        return <CompanionCareLineIcon size={48} className="w-12 h-12" />;
      case 'specialized-support':
        return <SpecializedSupportLineIcon size={48} className="w-12 h-12" />;
      case 'additional-services':
        return <AdditionalServicesLineIcon size={48} className="w-12 h-12" />;
      default:
        return <PersonalCareLineIcon size={48} className="w-12 h-12" />;
    }
  };

  return (
    <div className="space-y-16 pb-24 text-left font-sans">
      <Breadcrumbs items={[{ label: 'Home Care Services' }]} onNavigate={onNavigate} />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="rounded-[36px] sm:rounded-[44px] bg-[#F8EDE2] p-8 sm:p-14 border border-[#EADBCC] relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#0B2B26] text-xs font-bold uppercase tracking-wider border border-[#0B2B26]/10">
              <Sparkles className="w-3.5 h-3.5 text-[#E89A24]" />
              <span>Licensed Pennsylvania Home Care Agency</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B2B26] font-display tracking-tight text-balance leading-[1.12]">
              Quality Home Care in Greater Pittsburgh & Western PA
            </h1>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl pt-1">
              Helping seniors and individuals remain in the place they love most—their own home. Our trained caregivers deliver personalized personal care, senior support, dementia care, and reliable household assistance with unmatched compassion and dignity.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-3.5">
              <button
                onClick={onOpenAssessment}
                className="px-8 py-3.5 rounded-full bg-[#E89A24] hover:bg-[#d68a18] text-white font-bold text-sm sm:text-base transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Free Assessment</span>
              </button>

              <a
                href="tel:+14125461860"
                className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#0B2B26] border border-[#D8D2C9] font-medium text-sm sm:text-base transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#E89A24]" />
                <span>Call +1 (412) 546-1860</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid (All 8 exact Home Care Services) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">
            CORE SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2B26] font-display tracking-tight">
            Our Home Care Specialties ({servicesList.length})
          </h2>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl">
            Click any service to open its dedicated full-page guide with complete care scopes, daily living tasks, and scheduling options.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {servicesList.map((service) => (
            <div
              key={service.id}
              className="rounded-[32px] bg-white border border-slate-200/90 p-7 shadow-xs flex flex-col justify-between hover:border-[#0B2B26]/30 transition-all hover:shadow-lg group"
            >
              <div>
                {/* Modern Line-Art Icon */}
                <div className="mb-5">
                  {renderHomeCareIcon(service.id)}
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#E6F7F4] text-emerald-900 text-[10px] font-bold uppercase tracking-wider mb-2 border border-emerald-200/60">
                  Home Care
                </div>

                <h3 className="text-xl font-bold text-[#0B2B26] font-display group-hover:text-[#E89A24] transition-colors">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {service.shortDesc}
                </p>

                <div className="mt-5 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    What's Included:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {service.bulletPoints.slice(0, 3).map((pt, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#4EBAA8] shrink-0" />
                        <span className="truncate">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons: Full Page & Free Assessment */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => onSelectService(service)}
                  className="w-full py-2.5 px-4 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <span>Open Full Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onOpenAssessment}
                  className="w-full py-2 px-3 rounded-full bg-[#FAF4EE] hover:bg-[#F8EDE2] text-[#0B2B26] text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#E89A24]" />
                  <span>Free Assessment</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Hours Estimator */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="rounded-[36px] bg-[#FAF4EE] p-8 sm:p-12 border border-[#EADBCC] flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E89A24]">
              Planning Your Support
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0B2B26] font-display">
              Estimate Weekly Home Care Hours
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Whether you need 4 hours of weekly respite or round-the-clock senior support, we match caregivers to your exact routine.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <input
                type="range"
                min="4"
                max="60"
                step="4"
                value={estimatedHours}
                onChange={(e) => setEstimatedHours(Number(e.target.value))}
                aria-label="Estimated weekly home care hours"
                className="w-64 accent-[#0B2B26] cursor-pointer"
              />
              <span className="text-lg font-bold text-[#0B2B26]">
                {estimatedHours} hrs / week
              </span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 text-center w-full max-w-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Estimated Schedule
            </p>
            <div className="text-3xl font-extrabold text-[#0B2B26] font-display mb-1">
              {Math.round(estimatedHours / 4)} shifts / week
            </div>
            <p className="text-xs text-slate-500 mb-6">
              Approx. 4–8 hours per shift • Nurse supervised
            </p>
            <button
              onClick={onOpenAssessment}
              className="w-full py-3 rounded-full bg-[#E89A24] hover:bg-[#d68a18] text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Book Free Assessment
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
