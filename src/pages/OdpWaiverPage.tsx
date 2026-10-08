import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building,
  Home,
  Phone,
  ArrowRight,
  Sparkles,
  CreditCard,
  Award,
  Users
} from 'lucide-react';
import {
  InHomeCommunitySupportsLineIcon,
  InHomeRespiteLineIcon,
  OutOfHomeRespiteLineIcon,
  HabilitationLineIcon,
  CommunityParticipationLineIcon
} from '../components/icons/ServiceLineIcons';
import { PageId, ServiceItem } from '../types';
import { getStoredOdpServices, DATA_CHANGE_EVENT } from '../utils/storage';
import {
  COMPANY_DETAILS,
  PAYMENT_OPTIONS,
  WHY_CHOOSE_US
} from '../data/servicesData';

interface OdpWaiverPageProps {
  onNavigate: (page: PageId) => void;
  onOpenAssessment: () => void;
  onOpenBooking?: (serviceTitle?: string) => void;
  onSelectService: (service: ServiceItem) => void;
}

export const OdpWaiverPage: React.FC<OdpWaiverPageProps> = ({
  onNavigate,
  onOpenAssessment,
  onOpenBooking,
  onSelectService
}) => {
  const [odpList, setOdpList] = React.useState<ServiceItem[]>(() => getStoredOdpServices());

  React.useEffect(() => {
    const handler = () => setOdpList(getStoredOdpServices());
    window.addEventListener(DATA_CHANGE_EVENT, handler);
    return () => window.removeEventListener(DATA_CHANGE_EVENT, handler);
  }, []);

  const renderOdpIcon = (id: string) => {
    switch (id) {
      case 'in-home-community-supports-ihcs':
        return <InHomeCommunitySupportsLineIcon size={48} className="w-12 h-12" />;
      case 'in-home-respite':
        return <InHomeRespiteLineIcon size={48} className="w-12 h-12" />;
      case 'out-of-home-respite':
        return <OutOfHomeRespiteLineIcon size={48} className="w-12 h-12" />;
      case 'habilitation-hab':
        return <HabilitationLineIcon size={48} className="w-12 h-12" />;
      case 'community-participation-support-cps':
        return <CommunityParticipationLineIcon size={48} className="w-12 h-12" />;
      default:
        return <InHomeCommunitySupportsLineIcon size={48} className="w-12 h-12" />;
    }
  };

  const inHomeService = odpList.find((s) => s.id === 'in-home-respite') || odpList[0];
  const outOfHomeService = odpList.find((s) => s.id === 'out-of-home-respite') || odpList[1] || odpList[0];

  return (
    <div className="space-y-16 pb-24 text-left font-sans">
      <Breadcrumbs items={[{ label: 'ODP Waiver Services' }]} onNavigate={onNavigate} />

      {/* Hero Header with Provider #104556630 and Counties */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="rounded-[36px] sm:rounded-[44px] bg-[#F8EDE2] p-8 sm:p-14 border border-[#EADBCC] relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-[#0B2B26] text-white text-xs font-bold uppercase tracking-wider">
                ODP Provider #104556630
              </span>
              <span className="px-3 py-1 rounded-full bg-white text-[#0B2B26] text-xs font-semibold border border-slate-200">
                Allegheny · Butler · Washington Counties
              </span>
              <span className="px-3 py-1 rounded-full bg-[#E89A24] text-white text-xs font-bold">
                Ready to Accept Referrals
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B2B26] font-display tracking-tight text-balance leading-[1.12]">
              Pennsylvania ODP Waiver Services
            </h1>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl pt-1">
              Kenah Wellness Services is an Office of Developmental Programs (ODP) approved provider (Provider #104556630). We work closely with Supports Coordinators, individuals and families to deliver person-centered In-Home & Community Supports (IHCS), Respite Services, Community Participation Support (CPS), and life-enriching Habilitation.
            </p>

            <div className="text-xs sm:text-sm font-bold text-[#E89A24] tracking-wide pt-1">
              Consolidated Waiver &nbsp;|&nbsp; Community Living Waiver &nbsp;|&nbsp; P/FDS Waiver
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3.5">
              <button
                onClick={onOpenAssessment}
                className="px-8 py-3.5 rounded-full bg-[#E89A24] hover:bg-[#d68a18] text-white font-bold text-sm transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Free Assessment</span>
              </button>
              <button
                onClick={onOpenAssessment}
                className="px-7 py-3.5 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white font-bold text-sm transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Verify Waiver Eligibility
              </button>
              <a
                href={`tel:${COMPANY_DETAILS.phoneClean}`}
                className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#0B2B26] border border-[#D8D2C9] font-medium text-sm transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#E89A24]" />
                <span>{COMPANY_DETAILS.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Clear Difference Comparison Callout: In-Home vs. Out-of-Home Respite */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="rounded-[32px] bg-[#FAF4EE] border border-slate-200/90 p-8 sm:p-10">
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E89A24] block mb-1">
              RESPITE CLARIFICATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2B26] font-display">
              The Difference Between In-Home and Out-of-Home Respite
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Short-term relief for families and unpaid caregivers with the same trained, dependable staff. Both options offer Levels 2–4 with 1:1, 1:2 and 2:1 staffing ratios, enhanced and non-enhanced options, and licensed (LPN/RN) & unlicensed respite:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-3">
                <InHomeRespiteLineIcon size={40} className="w-10 h-10 shrink-0" />
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-[#0B2B26]">
                    In-Home, Life Sharing & Day Respite
                  </h3>
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                    In Individual's Residence
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 font-medium">
                <strong>Setting:</strong> Support occurs within the individual’s own residence.
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Short-term relief for families and unpaid caregivers while individuals remain in their comforting, familiar environment with trained, dependable staff adhering strictly to their ISP.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onSelectService(inHomeService)}
                  className="text-xs font-bold text-[#0B2B26] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  View In-Home Respite Details →
                </button>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-3">
                <OutOfHomeRespiteLineIcon size={40} className="w-10 h-10 shrink-0" />
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-[#0B2B26]">
                    Out-of-Home Respite (NEW)
                  </h3>
                  <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full inline-block">
                    Licensed Approved Settings
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 font-medium">
                <strong>Setting:</strong> Support occurs in an approved setting outside the home.
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                When families need a break, or an individual benefits from time away from home, our Out-of-Home Respite provides safe, supervised care in a setting outside the family home. Individuals continue their routines with trained staff while families rest and recharge.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onSelectService(outOfHomeService)}
                  className="text-xs font-bold text-[#0B2B26] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  View Out-of-Home Respite Details →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid (All Authorized ODP Waiver Offerings) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">
            AUTHORIZED ODP SERVICES · PROVIDER #104556630
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2B26] font-display tracking-tight">
            Our Pennsylvania ODP Waiver Offerings ({odpList.length})
          </h2>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl">
            Administered in full compliance with Pennsylvania DHS Office of Developmental Programs standards, person-centered ISP outcomes, and the Everyday Lives framework.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {odpList.map((service) => (
            <div
              key={service.id}
              className="rounded-[32px] bg-white border border-slate-200/90 p-8 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all hover:shadow-md group"
            >
              <div>
                <div className="mb-5">
                  {renderOdpIcon(service.id)}
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#FAF4EE] text-amber-900 text-[10px] font-bold uppercase tracking-wider mb-2 border border-amber-200/60">
                  ODP Waiver
                </div>

                <h3 className="text-xl font-bold text-[#0B2B26] font-display group-hover:text-[#E89A24] transition-colors">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {service.shortDesc}
                </p>

                <div className="mt-5 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Key Features:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {service.bulletPoints.slice(0, 3).map((pt, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span className="truncate">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-400">Provider #104556630</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectService(service)}
                    className="px-4 py-2 rounded-full border border-slate-300 hover:border-slate-800 text-xs font-semibold text-[#0B2B26] transition-colors cursor-pointer"
                  >
                    Open Full Page
                  </button>
                  {onOpenBooking && (
                    <button
                      onClick={() => onOpenBooking(service.title)}
                      className="px-3.5 py-2 rounded-full bg-[#FAF4EE] hover:bg-[#F8EDE2] text-[#0B2B26] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      <span>Book</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4-Step How to Access ODP Waiver Services */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="rounded-[36px] bg-[#FAF4EE] border border-slate-200/80 p-8 sm:p-12">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-1">
              STEP-BY-STEP GUIDANCE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2B26] font-display">
              How to Access ODP Waiver Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Navigating the Pennsylvania waiver process can feel complex. Here is the direct pathway from diagnosis to receiving services:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2.5">
              <div className="w-8 h-8 rounded-full bg-[#0B2B26] text-white flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="font-bold text-sm text-[#0B2B26]">
                County MH/ID Contact
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reach out to your County Mental Health / Intellectual Disabilities (MH/ID) office in Allegheny, Butler, or Washington County to register.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2.5">
              <div className="w-8 h-8 rounded-full bg-[#0B2B26] text-white flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="font-bold text-sm text-[#0B2B26]">
                Eligibility & PUNS
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Undergo diagnostic assessment and complete the Prioritization of Urgency of Need for Services (PUNS) form.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2.5">
              <div className="w-8 h-8 rounded-full bg-[#0B2B26] text-white flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="font-bold text-sm text-[#0B2B26]">
                Assign Supports Coordinator
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                You will be assigned a Supports Coordinator (SC) through a Supports Coordination Organization (SCO) to develop an ISP.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2.5">
              <div className="w-8 h-8 rounded-full bg-[#0B2B26] text-white flex items-center justify-center font-bold text-sm">
                4
              </div>
              <h3 className="font-bold text-sm text-[#0B2B26]">
                Select Kenah Wellness
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose Kenah Wellness Services (Provider #104556630) as your authorized provider for IHCS, Respite, HAB, or CPS supports.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-600">
              Need assistance contacting your County MH/ID office? Our team helps guide families through every milestone.
            </div>
            <div className="flex items-center gap-3">
              {onOpenBooking && (
                <button
                  onClick={() => onOpenBooking('ODP Waiver Intake Guidance')}
                  className="px-6 py-2.5 rounded-full bg-[#E89A24] hover:bg-[#d68a18] text-white font-bold text-xs cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Guidance Session</span>
                </button>
              )}
              <button
                onClick={onOpenAssessment}
                className="px-6 py-2.5 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white font-bold text-xs cursor-pointer shadow-xs"
              >
                Request Free Guidance
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Referrals Coordinator Box with Zephaniah Omweno */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="rounded-[32px] bg-[#0B2B26] text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
          <div className="max-w-xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F2D701]">
              SUPPORTS COORDINATORS & FAMILIES
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display">
              Ready to Accept ODP Referrals
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Contact Zephaniah Omweno, Operations Manager, for rapid intake, staffing confirmations, and ISP alignment across Allegheny, Butler, and Washington Counties.
            </p>
            <div className="pt-2 text-xs sm:text-sm text-slate-100 space-y-1">
              <div><strong>Direct Phone:</strong> +1 (412) 546-1860</div>
              <div><strong>Email:</strong> info@kenahwellness.com</div>
              <div><strong>Office:</strong> 2400 Ansys Drive, Suite 169, Canonsburg, PA 15317</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {onOpenBooking && (
              <button
                onClick={() => onOpenBooking('ODP Waiver Referral Intake')}
                className="px-7 py-3 rounded-full bg-[#E89A24] hover:bg-[#d68a18] text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Session</span>
              </button>
            )}
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-full border border-slate-600 hover:border-slate-400 text-white font-medium text-xs sm:text-sm cursor-pointer"
            >
              Contact Us
            </button>
            <button
              onClick={onOpenAssessment}
              className="px-7 py-3 rounded-full bg-[#E89A24] hover:bg-[#d68a18] text-white font-bold text-xs sm:text-sm cursor-pointer shadow-md transition-all active:scale-95"
            >
              Book Free Assessment
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
