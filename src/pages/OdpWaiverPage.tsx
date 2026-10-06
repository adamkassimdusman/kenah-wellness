import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building,
  Home
} from 'lucide-react';
import {
  InHomeRespiteLineIcon,
  OutOfHomeRespiteLineIcon,
  HabilitationLineIcon,
  CommunityParticipationLineIcon
} from '../components/icons/ServiceLineIcons';
import { PageId, ServiceItem } from '../types';
import { getStoredOdpServices, DATA_CHANGE_EVENT } from '../utils/storage';

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

  const inHomeService = odpList.find((s) => s.id === 'in-home-respite') || odpList[0];
  const outOfHomeService = odpList.find((s) => s.id === 'out-of-home-respite') || odpList[1] || odpList[0];
  const habService = odpList.find((s) => s.id === 'habilitation-hab') || odpList[2] || odpList[0];
  const cpsService = odpList.find((s) => s.id === 'community-participation-support-cps') || odpList[3] || odpList[0];

  return (
    <div className="space-y-16 pb-24 text-left font-sans">
      <Breadcrumbs items={[{ label: 'ODP Waiver Services' }]} onNavigate={onNavigate} />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="rounded-[36px] sm:rounded-[44px] bg-[#F8EDE2] p-8 sm:p-14 border border-[#EADBCC] relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block">
              PENNSYLVANIA ODP CONSOLIDATED WAIVER
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B2B26] font-display tracking-tight text-balance leading-[1.12]">
              ODP Waiver Services
            </h1>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl pt-1">
              Kenah Wellness Services provides supports through Pennsylvania's Office of Developmental Programs (ODP) under the Consolidated Waiver. Our services help individuals with intellectual and developmental disabilities achieve greater independence, community inclusion, and improved quality of life.
            </p>

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
                href="tel:+14125461860"
                className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#0B2B26] border border-[#D8D2C9] font-medium text-sm transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>+1 (412) 546-1860</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Clear Difference Comparison Callout */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="rounded-[32px] bg-[#FAF4EE] border border-slate-200/90 p-8 sm:p-10">
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-1">
              RESPITE CLARIFICATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2B26] font-display">
              The Difference Between In-Home and Out-of-Home Respite
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Pennsylvania’s ODP Consolidated Waiver distinguishes respite care by where services are delivered:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-3">
                <InHomeRespiteLineIcon size={40} className="w-10 h-10 shrink-0" />
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-[#0B2B26]">
                    In-Home Respite
                  </h3>
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                    In Individual's Home
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 font-medium">
                <strong>Setting:</strong> Support occurs within the individual’s residence.
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Temporary support provided in the individual's home while caregivers attend to work, appointments, personal responsibilities, or rest while ensuring comfort and continuous care in familiar surroundings.
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
                    Out-of-Home Respite
                  </h3>
                  <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full inline-block">
                    Licensed Approved Settings
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 font-medium">
                <strong>Setting:</strong> Support occurs in an approved setting outside the residence.
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Temporary support provided in an approved setting outside the individual's residence while maintaining safety, care, and support, offering caregivers extended relief and giving individuals safe community social experiences.
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

      {/* Services Grid (4 Key Services) with Line-Art Icons */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">
            AUTHORIZED ODP SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2B26] font-display tracking-tight">
            Our Pennsylvania ODP Waiver Offerings
          </h2>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl">
            Administered in full compliance with Pennsylvania DHS Office of Developmental Programs standards and the Everyday Lives framework.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* 1. In-Home Respite */}
          <div className="rounded-[32px] bg-white border border-slate-200/90 p-8 sm:p-10 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all hover:shadow-md">
            <div>
              <div className="mb-5">
                <InHomeRespiteLineIcon size={48} className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-[#0B2B26] font-display">
                In-Home Respite
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Temporary support provided in the individual's home while caregivers attend to work, appointments, personal responsibilities, or rest.
              </p>

              <div className="mt-6 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Service Highlights:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Support occurs within the individual's residence</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Primary caregiver relief for errands, rest, and work</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Preserves comforting, familiar home routines</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Authorized under PA ODP Consolidated Waiver</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-xs text-slate-400">Consolidated Waiver</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectService(inHomeService)}
                  className="px-4 py-2 rounded-full border border-slate-300 hover:border-slate-800 text-xs font-semibold text-[#0B2B26] transition-colors cursor-pointer"
                >
                  Open Full Page
                </button>
                {onOpenBooking && (
                  <button
                    onClick={() => onOpenBooking('In-Home Respite Planning')}
                    className="px-3.5 py-2 rounded-full bg-[#FAF4EE] hover:bg-[#F8EDE2] text-[#0B2B26] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>Book</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 2. Out-of-Home Respite */}
          <div className="rounded-[32px] bg-white border border-slate-200/90 p-8 sm:p-10 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all hover:shadow-md">
            <div>
              <div className="mb-5">
                <OutOfHomeRespiteLineIcon size={48} className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-[#0B2B26] font-display">
                Out-of-Home Respite
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Temporary support provided in an approved setting outside the individual's residence while maintaining safety, care, and support.
              </p>

              <div className="mt-6 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Service Highlights:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Support occurs in an approved setting outside residence</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Extended overnight or weekend caregiver relief</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Engaging social and recreational opportunities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Safe, licensed, and state-approved facilities</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-xs text-slate-400">Approved Settings</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectService(outOfHomeService)}
                  className="px-4 py-2 rounded-full border border-slate-300 hover:border-slate-800 text-xs font-semibold text-[#0B2B26] transition-colors cursor-pointer"
                >
                  Open Full Page
                </button>
                {onOpenBooking && (
                  <button
                    onClick={() => onOpenBooking('Out-of-Home Respite Consultation')}
                    className="px-3.5 py-2 rounded-full bg-[#FAF4EE] hover:bg-[#F8EDE2] text-[#0B2B26] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>Book</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 3. Habilitation (HAB) */}
          <div className="rounded-[32px] bg-white border border-slate-200/90 p-8 sm:p-10 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all hover:shadow-md">
            <div>
              <div className="mb-5">
                <HabilitationLineIcon size={48} className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-[#0B2B26] font-display">
                Habilitation (HAB)
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Services focused on developing, improving, and maintaining skills that support independence, self-care, communication, and community participation.
              </p>

              <div className="mt-6 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Skill Development Areas:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Daily living skills (cooking, cleaning, self-care)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Communication and self-advocacy coaching</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Money management & functional budgeting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Community transit and mobility practice</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-xs text-slate-400">Everyday Lives Goals</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectService(habService)}
                  className="px-4 py-2 rounded-full border border-slate-300 hover:border-slate-800 text-xs font-semibold text-[#0B2B26] transition-colors cursor-pointer"
                >
                  Open Full Page
                </button>
                {onOpenBooking && (
                  <button
                    onClick={() => onOpenBooking('Habilitation (HAB) Exploration')}
                    className="px-3.5 py-2 rounded-full bg-[#FAF4EE] hover:bg-[#F8EDE2] text-[#0B2B26] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>Book</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 4. Community Participation Support (CPS) */}
          <div className="rounded-[32px] bg-white border border-slate-200/90 p-8 sm:p-10 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all hover:shadow-md">
            <div>
              <div className="mb-5">
                <CommunityParticipationLineIcon size={48} className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-[#0B2B26] font-display">
                Community Participation Support (CPS)
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Services that facilitate community involvement, vocational exploration, volunteer work, socialization, and active citizenship.
              </p>

              <div className="mt-6 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Inclusion Focus Areas:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Civic engagement & volunteer opportunities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Pre-vocational & job exploration activities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Community recreational & cultural outings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Meaningful peer relationships & active citizenship</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-xs text-slate-400">Active Community Inclusion</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectService(cpsService)}
                  className="px-4 py-2 rounded-full border border-slate-300 hover:border-slate-800 text-xs font-semibold text-[#0B2B26] transition-colors cursor-pointer"
                >
                  Open Full Page
                </button>
                {onOpenBooking && (
                  <button
                    onClick={() => onOpenBooking('Community Participation Support')}
                    className="px-3.5 py-2 rounded-full bg-[#FAF4EE] hover:bg-[#F8EDE2] text-[#0B2B26] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>Book</span>
                  </button>
                )}
              </div>
            </div>
          </div>

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
                Reach out to your County Mental Health / Intellectual Disabilities (MH/ID) office (e.g. Allegheny County DHS) to register.
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
                Choose Kenah Wellness Services as your authorized provider for Respite, HAB, or CPS supports in your ISP.
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

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="rounded-[32px] bg-[#0B2B26] text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-bold font-display">
              Ready to Explore ODP Supports?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Contact our Allegheny and Washington County intake team to discuss your Individual Support Plan (ISP).
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {onOpenBooking && (
              <button
                onClick={() => onOpenBooking('ODP Waiver Intake')}
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
