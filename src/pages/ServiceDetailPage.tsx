import React, { useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  ShieldCheck,
  Heart,
  FileText,
  Phone,
  Sparkles,
  ChevronRight,
  Info,
  Award,
  Users
} from 'lucide-react';
import { ServiceItem, PageId } from '../types';
import { ALL_SERVICES, HOME_CARE_SERVICES, ODP_WAIVER_SERVICES } from '../data/servicesData';
import {
  PersonalCareLineIcon,
  SeniorCareLineIcon,
  EndOfLifeCareLineIcon,
  RespiteCareLineIcon,
  DementiaCareLineIcon,
  CompanionCareLineIcon,
  SpecializedSupportLineIcon,
  AdditionalServicesLineIcon,
  InHomeRespiteLineIcon,
  OutOfHomeRespiteLineIcon,
  HabilitationLineIcon,
  CommunityParticipationLineIcon
} from '../components/icons/ServiceLineIcons';

interface ServiceDetailPageProps {
  service: ServiceItem | null;
  onNavigate: (page: PageId) => void;
  onSelectService: (service: ServiceItem) => void;
  onOpenAssessment: () => void;
  onOpenBooking: (serviceTitle?: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  onNavigate,
  onSelectService,
  onOpenAssessment,
  onOpenBooking
}) => {
  // Fallback to first service if none selected
  const activeService = service || ALL_SERVICES[0];

  // Scroll to top when service changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeService.id]);

  // Find index in ALL_SERVICES for previous / next navigation
  const currentIndex = ALL_SERVICES.findIndex((s) => s.id === activeService.id);
  const prevService = currentIndex > 0 ? ALL_SERVICES[currentIndex - 1] : ALL_SERVICES[ALL_SERVICES.length - 1];
  const nextService = currentIndex < ALL_SERVICES.length - 1 ? ALL_SERVICES[currentIndex + 1] : ALL_SERVICES[0];

  const renderServiceIcon = (id: string, size = 64) => {
    switch (id) {
      case 'personal-care':
        return <PersonalCareLineIcon size={size} />;
      case 'senior-care':
        return <SeniorCareLineIcon size={size} />;
      case 'end-of-life-care':
        return <EndOfLifeCareLineIcon size={size} />;
      case 'respite-care':
        return <RespiteCareLineIcon size={size} />;
      case 'dementia-care':
        return <DementiaCareLineIcon size={size} />;
      case 'companionship-care':
        return <CompanionCareLineIcon size={size} />;
      case 'specialized-support':
        return <SpecializedSupportLineIcon size={size} />;
      case 'additional-services':
        return <AdditionalServicesLineIcon size={size} />;
      case 'in-home-respite':
        return <InHomeRespiteLineIcon size={size} />;
      case 'out-of-home-respite':
        return <OutOfHomeRespiteLineIcon size={size} />;
      case 'habilitation-hab':
        return <HabilitationLineIcon size={size} />;
      case 'community-participation-support-cps':
        return <CommunityParticipationLineIcon size={size} />;
      default:
        return <PersonalCareLineIcon size={size} />;
    }
  };

  const isWaiver = activeService.category === 'odp-waiver';

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-left font-sans pb-24">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="bg-white border-b border-slate-200/80 sticky top-16 z-20 backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#0B2B26] font-medium cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <button
              onClick={() => onNavigate(isWaiver ? 'odp-waiver' : 'home-care')}
              className="hover:text-[#0B2B26] font-medium cursor-pointer"
            >
              {isWaiver ? 'PA ODP Waiver Services' : 'Home Care Services'}
            </button>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[#0B2B26] font-bold truncate max-w-[200px] sm:max-w-none">
              {activeService.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate(isWaiver ? 'odp-waiver' : 'home-care')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to All Services</span>
              <span className="sm:hidden">Back</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section of Service */}
      <section className="bg-gradient-to-b from-[#0B2B26] to-[#12463F] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F2D701_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#F2D701] text-xs font-bold uppercase tracking-wider border border-white/15">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isWaiver ? 'Pennsylvania ODP Waiver Service' : 'Home Care Service Category'}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
                {activeService.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-3xl">
                {activeService.fullDesc}
              </p>

              {activeService.paWaiverNote && (
                <div className="p-4 rounded-2xl bg-white/10 border border-white/20 text-xs sm:text-sm text-slate-200 flex items-start gap-3 max-w-2xl">
                  <Info className="w-5 h-5 text-[#F2D701] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Pennsylvania State Authorization:</span>
                    {activeService.paWaiverNote}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => onOpenAssessment()}
                  className="px-7 py-3.5 rounded-full bg-[#E89A24] hover:bg-[#d68a18] text-white font-bold text-sm sm:text-base transition-all shadow-lg active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Free Assessment</span>
                </button>

                <a
                  href="tel:7245842817"
                  className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base transition-all border border-white/20 inline-flex items-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#F2D701]" />
                  <span>Call (724) 584-2817</span>
                </a>
              </div>
            </div>

            {/* Icon Card & Highlights */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start lg:items-center">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-white/20 w-full max-w-sm text-center">
                <div className="w-24 h-24 mx-auto rounded-2xl bg-[#FAF8F5] flex items-center justify-center p-3 mb-4 shadow-inner">
                  {renderServiceIcon(activeService.id, 64)}
                </div>

                <h3 className="text-xl font-bold text-[#0B2B26] mb-1 font-display">
                  {activeService.title}
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  {isWaiver ? 'State-Authorized ODP Program' : 'Licensed Non-Medical Home Care'}
                </p>

                <div className="space-y-2 text-left pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-[#4EBAA8]" />
                    <span>Background-Checked Caregivers</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#E89A24]" />
                    <span>Nurse-Supervised Care Plan</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <Clock className="w-4 h-4 text-[#0B2B26]" />
                    <span>Flexible Schedules & Respite</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Service Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Details, Bullet Points, Who It's For, How We Help */}
          <div className="lg:col-span-8 space-y-10">
            {/* What is Included Checklist */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#E6F7F4] flex items-center justify-center text-[#0B2B26]">
                  <CheckCircle2 className="w-5 h-5 text-[#4EBAA8]" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#0B2B26] font-display">
                    What Is Included in {activeService.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Personalized tasks and support delivered during every care visit
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {activeService.bulletPoints.map((point, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#FAF8F5] border border-slate-200/60 flex items-start gap-3 hover:border-[#4EBAA8]/40 transition-colors"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#4EBAA8] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium text-slate-800 leading-snug">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Who It Is For */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#F8EDE2] flex items-center justify-center text-[#E89A24]">
                  <Users className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B2B26] font-display">
                  Who This Service Is For
                </h2>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed bg-[#FAF8F5] p-5 rounded-2xl border border-slate-200/60">
                {activeService.whoItIsFor}
              </p>
            </div>

            {/* How Kenah Wellness Delivers Care */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#FDEEF1] flex items-center justify-center text-[#F28FA5]">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#0B2B26] font-display">
                    How We Help & Protect Your Family
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Our safety standards and personalized care philosophy
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {activeService.howWeHelp.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/70 shadow-2xs"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#0B2B26] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <span className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4-Step Care Journey */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B2B26] font-display mb-2">
                Getting Started with {activeService.title} in 4 Easy Steps
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mb-8">
                We make the intake process simple, stress-free, and rapid.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-slate-200">
                  <span className="text-2xl font-extrabold text-[#E89A24] font-display">01</span>
                  <h4 className="font-bold text-sm text-[#0B2B26] mt-2 mb-1">Free Assessment</h4>
                  <p className="text-xs text-slate-600">
                    We meet at your home or via video to understand daily routines, preferences, and safety needs.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-slate-200">
                  <span className="text-2xl font-extrabold text-[#4EBAA8] font-display">02</span>
                  <h4 className="font-bold text-sm text-[#0B2B26] mt-2 mb-1">Custom Care Plan</h4>
                  <p className="text-xs text-slate-600">
                    Our registered nurse crafts an individualized plan coordinating with your doctor or Supports Coordinator.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-slate-200">
                  <span className="text-2xl font-extrabold text-[#F28FA5] font-display">03</span>
                  <h4 className="font-bold text-sm text-[#0B2B26] mt-2 mb-1">Caregiver Match</h4>
                  <p className="text-xs text-slate-600">
                    We introduce a certified, background-checked professional chosen for personality and skill compatibility.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-slate-200">
                  <span className="text-2xl font-extrabold text-[#0B2B26] font-display">04</span>
                  <h4 className="font-bold text-sm text-[#0B2B26] mt-2 mb-1">Ongoing Oversight</h4>
                  <p className="text-xs text-slate-600">
                    Regular supervisory check-ins, routine adjustments, and continuous family communication.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Contact, Payment Options & All Services Jump Menu */}
          <div className="lg:col-span-4 space-y-6">
            {/* Free Assessment Action Card */}
            <div className="bg-[#0B2B26] text-white rounded-3xl p-6 sm:p-8 shadow-md">
              <span className="px-3 py-1 rounded-full bg-[#E89A24] text-white text-[11px] font-bold uppercase tracking-wider mb-4 inline-block">
                No Obligation
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display mb-2 text-white">
                Book a Free Assessment
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 mb-6 leading-relaxed">
                Schedule a 45-minute in-home consultation for {activeService.title} with our care team in Canonsburg, Pittsburgh, or surrounding areas.
              </p>

              <button
                onClick={() => onOpenAssessment()}
                className="w-full py-3.5 rounded-full bg-[#E89A24] hover:bg-[#d68a18] text-white font-bold text-sm transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2 mb-3"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Free Assessment</span>
              </button>

              <a
                href="tel:7245842817"
                className="w-full py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all border border-white/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#F2D701]" />
                <span>Call Us: (724) 584-2817</span>
              </a>
            </div>

            {/* Payment & Funding Guidance */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
              <div className="flex items-center gap-2.5 mb-4 text-[#0B2B26]">
                <FileText className="w-5 h-5 text-[#E89A24]" />
                <h3 className="text-base sm:text-lg font-bold font-display">
                  Payment & Coverage Options
                </h3>
              </div>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                We accept multiple funding options to ensure care is accessible for Pennsylvania families:
              </p>

              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4EBAA8] shrink-0 mt-0.5" />
                  <span><strong>PA ODP Waivers:</strong> Consolidated, Community Living, and P/FDS authorized billing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4EBAA8] shrink-0 mt-0.5" />
                  <span><strong>Private Pay:</strong> Transparent hourly rates with no hidden fees or contracts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4EBAA8] shrink-0 mt-0.5" />
                  <span><strong>Long-Term Care Insurance:</strong> Direct claim filing and documentation support.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4EBAA8] shrink-0 mt-0.5" />
                  <span><strong>Veterans (VA) Benefits:</strong> Aid and Attendance supportive care programs.</span>
                </li>
              </ul>
            </div>

            {/* Browse All Services Jump Menu */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
              <h3 className="text-base sm:text-lg font-bold text-[#0B2B26] font-display mb-4">
                Browse All Services
              </h3>

              <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
                <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider py-1">
                  Home Care Services (8)
                </div>
                {HOME_CARE_SERVICES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => onSelectService(s)}
                    className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                      s.id === activeService.id
                        ? 'bg-[#0B2B26] text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="truncate">{s.title}</span>
                    <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
                  </button>
                ))}

                <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider pt-3 pb-1">
                  PA ODP Waiver Services (4)
                </div>
                {ODP_WAIVER_SERVICES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => onSelectService(s)}
                    className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                      s.id === activeService.id
                        ? 'bg-[#0B2B26] text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="truncate">{s.title}</span>
                    <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Previous & Next Service Navigation (Let user go through it smoothly) */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <button
            onClick={() => onSelectService(prevService)}
            className="flex-1 p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-[#0B2B26] transition-all flex items-center gap-3 text-left group shadow-xs cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-[#0B2B26] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                Previous Service
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#0B2B26] group-hover:text-[#E89A24] transition-colors truncate block">
                {prevService.title}
              </span>
            </div>
          </button>

          <button
            onClick={() => onSelectService(nextService)}
            className="flex-1 p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-[#0B2B26] transition-all flex items-center justify-end gap-3 text-right group shadow-xs cursor-pointer"
          >
            <div className="overflow-hidden">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                Next Service
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#0B2B26] group-hover:text-[#E89A24] transition-colors truncate block">
                {nextService.title}
              </span>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-[#0B2B26] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </section>
    </div>
  );
};
