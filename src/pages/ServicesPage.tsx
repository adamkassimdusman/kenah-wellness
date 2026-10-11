import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  ExternalLink,
  Calendar,
  Phone,
  CheckCircle2
} from 'lucide-react';
import { PageId, ServiceItem } from '../types';
import {
  ODP_WAIVER_SERVICES,
  HOME_CARE_SERVICES,
  ODP_HCSIS_DIRECTORY_URL,
  COMPANY_DETAILS
} from '../data/servicesData';
import {
  InHomeRespiteLineIcon,
  OutOfHomeRespiteLineIcon,
  HabilitationLineIcon,
  CommunityParticipationLineIcon,
  PersonalCareLineIcon,
  CompanionCareLineIcon,
  HomemakerLineIcon,
  SeniorCareLineIcon,
  RespiteCareLineIcon,
  DementiaCareLineIcon,
  EndOfLifeCareLineIcon,
  PostDischargeRecoveryLineIcon,
  MedicationRemindersLineIcon,
  AdditionalServicesLineIcon,
  FacilityBasedCareLineIcon
} from '../components/icons/ServiceLineIcons';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenAssessment: (serviceTitle?: string) => void;
  onSelectService?: (service: ServiceItem) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onOpenAssessment
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'odp' | 'home-care'>('all');

  const renderServiceIcon = (id: string) => {
    switch (id) {
      // ODP Services
      case 'in-home-respite':
        return <InHomeRespiteLineIcon size={36} className="w-9 h-9" />;
      case 'out-of-home-respite':
        return <OutOfHomeRespiteLineIcon size={36} className="w-9 h-9" />;
      case 'habilitation-hab':
        return <HabilitationLineIcon size={36} className="w-9 h-9" />;
      case 'community-participation-support-cps':
        return <CommunityParticipationLineIcon size={36} className="w-9 h-9" />;

      // Home Care Services
      case 'personal-care':
        return <PersonalCareLineIcon size={36} className="w-9 h-9" />;
      case 'companion-care':
        return <CompanionCareLineIcon size={36} className="w-9 h-9" />;
      case 'homemaker-services':
        return <HomemakerLineIcon size={36} className="w-9 h-9" />;
      case 'senior-care':
        return <SeniorCareLineIcon size={36} className="w-9 h-9" />;
      case 'respite-care':
        return <RespiteCareLineIcon size={36} className="w-9 h-9" />;
      case 'dementia-care':
        return <DementiaCareLineIcon size={36} className="w-9 h-9" />;
      case 'end-of-life-care':
        return <EndOfLifeCareLineIcon size={36} className="w-9 h-9" />;
      case 'specialized-support':
        return <PostDischargeRecoveryLineIcon size={36} className="w-9 h-9" />;
      case 'medication-reminders':
        return <MedicationRemindersLineIcon size={36} className="w-9 h-9" />;
      case 'facility-based-care':
        return <FacilityBasedCareLineIcon size={36} className="w-9 h-9" />;
      default:
        return <AdditionalServicesLineIcon size={36} className="w-9 h-9" />;
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 text-left font-sans">
      <Breadcrumbs items={[{ label: 'All Services' }]} onNavigate={onNavigate} />

      {/* Page Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#F8EDE2] p-6 sm:p-10 border border-[#EADBCC] text-left">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B2B26] text-white text-xs font-bold uppercase tracking-wider">
              <span>Person-Centered Care & Waiver Programs</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0B2B26] font-display tracking-tight leading-tight">
              Dedicated Services Directory
            </h1>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Kenah Wellness Services provides specialized Pennsylvania ODP Waiver Services and comprehensive non-medical Home Care. Explore our two separate programs below with full service descriptions, qualifications, and care details.
            </p>

            {/* Quick Filter Jump Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setActiveCategoryFilter('all')}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeCategoryFilter === 'all'
                    ? 'bg-[#0B2B26] text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                }`}
              >
                All Programs
              </button>
              <button
                onClick={() => setActiveCategoryFilter('odp')}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeCategoryFilter === 'odp'
                    ? 'bg-[#0B2B26] text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                }`}
              >
                1. ODP Waiver Services
              </button>
              <button
                onClick={() => setActiveCategoryFilter('home-care')}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeCategoryFilter === 'home-care'
                    ? 'bg-[#0B2B26] text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                }`}
              >
                2. Home Care Services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: ODP WAIVER SERVICES (ALWAYS DISPLAYED FIRST - NO COUNTIES)
         ========================================================================= */}
      {(activeCategoryFilter === 'all' || activeCategoryFilter === 'odp') && (
        <section id="odp-services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#EAF7F4] border border-[#3CB9A8]/40 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#0B2B26] text-white text-xs font-bold uppercase tracking-wider">
                  Program 1: ODP Waiver Services
                </span>
                <span className="px-3 py-1 rounded-full bg-white text-[#0B2B26] text-xs font-bold border border-[#3CB9A8]/40">
                  ODP Provider #104556630
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2B26] font-display tracking-tight">
                Pennsylvania ODP Waiver Services
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Approved provider delivering person-centered support for individuals with intellectual disabilities and autism through Pennsylvania Office of Developmental Programs (ODP) waivers. We work closely with Supports Coordinators (SCs), individuals, and families.
              </p>
            </div>

            {/* MANDATORY DIRECTORY LINK */}
            <div className="shrink-0 w-full lg:w-auto">
              <a
                href={ODP_HCSIS_DIRECTORY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
                title="View All Our ODP Services on the official PA HCSIS Directory"
              >
                <span>View All Our ODP Services</span>
                <ExternalLink className="w-4 h-4 text-[#F2D701]" />
              </a>
            </div>
          </div>

          {/* ODP Services Full Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ODP_WAIVER_SERVICES.map((service) => (
              <div
                key={service.id}
                className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-2xs hover:border-[#0B2B26] transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="p-2.5 rounded-xl bg-[#EAF7F4] text-[#0B2B26] border border-[#3CB9A8]/30">
                      {renderServiceIcon(service.id)}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold uppercase tracking-wider">
                      ODP Waiver
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#0B2B26] font-display">
                      {service.title}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {service.fullDesc}
                    </p>
                  </div>

                  {/* Bullet Points */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Key Program Inclusions:
                    </h4>
                    {service.bulletPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#4EBAA8] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Who It Is For */}
                  <div className="p-3 rounded-xl bg-[#FAF4EE] border border-[#EADBCC] text-xs text-slate-700">
                    <strong className="block text-[#0B2B26] font-bold mb-0.5">
                      Who This Service Is For:
                    </strong>
                    <span>{service.whoItIsFor}</span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
                  <button
                    onClick={() => onOpenAssessment(service.title)}
                    className="flex-1 py-2.5 px-4 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer text-center"
                  >
                    Request Free Assessment
                  </button>
                  <a
                    href={`tel:${COMPANY_DETAILS.phoneClean}`}
                    className="py-2.5 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0B2B26] text-xs sm:text-sm font-semibold transition-all cursor-pointer inline-flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#0B2B26]" />
                    <span>Call Us</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* ODP Directory Bottom Callout */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
            <span className="text-slate-700 font-medium">
              Want to view our verified state provider registration on the official Pennsylvania HCSIS portal?
            </span>
            <a
              href={ODP_HCSIS_DIRECTORY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0B2B26] text-white text-xs sm:text-sm font-bold hover:bg-[#071E1A] transition-colors shrink-0"
            >
              <span>View All Our ODP Services</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#F2D701]" />
            </a>
          </div>
        </section>
      )}

      {/* =========================================================
          SECTION 2: HOME CARE SERVICES (ALWAYS DISPLAYED SECOND)
         ========================================================= */}
      {(activeCategoryFilter === 'all' || activeCategoryFilter === 'home-care') && (
        <section id="home-care-services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF4EE] border border-[#EADBCC] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#0B2B26] text-white text-xs font-bold uppercase tracking-wider">
                  Program 2: Home Care Services
                </span>
                <span className="px-3 py-1 rounded-full bg-white text-[#0B2B26] text-xs font-bold border border-[#EADBCC]">
                  Available 24/7
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2B26] font-display tracking-tight">
                Non-Medical Home Care Services
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Compassionate in-home assistance that helps older adults and recovering individuals stay safe and independent at home. Covered through Act 150, Medicaid, Insurance, and Private Pay.
              </p>
            </div>

            <div className="shrink-0 w-full lg:w-auto">
              <button
                onClick={() => onOpenAssessment('Home Care Services')}
                className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#E89A24] hover:bg-[#d68a18] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Free Home Assessment</span>
              </button>
            </div>
          </div>

          {/* Home Care Services Full Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {HOME_CARE_SERVICES.map((service) => (
              <div
                key={service.id}
                className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-2xs hover:border-[#0B2B26] transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="p-2.5 rounded-xl bg-[#FAF4EE] text-[#0B2B26] border border-[#EADBCC]">
                      {renderServiceIcon(service.id)}
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                      Home Care
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#0B2B26] font-display">
                      {service.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                      {service.fullDesc}
                    </p>
                  </div>

                  {/* Bullet Highlights */}
                  <div className="space-y-1 pt-2 border-t border-slate-100">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Service Includes:
                    </h4>
                    {service.bulletPoints.slice(0, 4).map((pt, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4EBAA8] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>

                  {/* Who It Is For */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-[11px] text-slate-600">
                    <strong className="block text-[#0B2B26] font-bold mb-0.5">
                      Recommended For:
                    </strong>
                    <span>{service.whoItIsFor}</span>
                  </div>
                </div>

                {/* Card Button */}
                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => onOpenAssessment(service.title)}
                    className="w-full py-2.5 px-4 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer text-center"
                  >
                    Select This Care Service
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Common Contact & Assessment CTA (Preserving only company info, NO personal name) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="rounded-3xl bg-[#0B2B26] text-white p-7 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="max-w-xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F2D701]">
              Compassionate, Accessible Care
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
              Ready to Discuss Care Options for Your Loved One?
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              Our clinical and care intake team is available 24/7 to answer questions, guide waiver authorizations, or schedule your complimentary in-home assessment.
            </p>
            <div className="pt-1 text-xs sm:text-sm text-slate-100 flex flex-wrap gap-x-5 gap-y-1">
              <div>
                <strong>Phone:</strong>{' '}
                <a href={`tel:${COMPANY_DETAILS.phoneClean}`} className="text-[#F2D701] hover:underline">
                  {COMPANY_DETAILS.phone}
                </a>
              </div>
              <div>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-[#F2D701] hover:underline">
                  {COMPANY_DETAILS.email}
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto shrink-0">
            <button
              onClick={() => onOpenAssessment()}
              className="py-3 px-6 rounded-full bg-white hover:bg-slate-100 text-[#0B2B26] text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer text-center"
            >
              Book Free Assessment
            </button>
            <a
              href={`tel:${COMPANY_DETAILS.phoneClean}`}
              className="py-3 px-6 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-semibold transition-all cursor-pointer text-center"
            >
              Call {COMPANY_DETAILS.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
