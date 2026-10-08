import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  Target,
  Eye,
  Heart,
  Users,
  ShieldCheck,
  Award,
  CheckCircle2,
  CreditCard,
  Phone,
  Calendar,
  Sparkles
} from 'lucide-react';
import { PageId } from '../types';
import {
  COMPANY_DETAILS,
  WHO_WE_SERVE,
  PAYMENT_OPTIONS,
  WHY_CHOOSE_US
} from '../data/servicesData';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenAssessment: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenAssessment }) => {
  return (
    <div className="space-y-16 pb-24 text-left font-sans">
      <Breadcrumbs items={[{ label: 'About Us' }]} onNavigate={onNavigate} />

      {/* Hero Banner with Official Overview & Provider # */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="rounded-[36px] sm:rounded-[44px] bg-[#F8EDE2] p-8 sm:p-14 border border-[#EADBCC] relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-[#0B2B26] text-white text-xs font-bold uppercase tracking-wider">
                ODP Provider #104556630
              </span>
              <span className="px-3 py-1 rounded-full bg-white text-[#0B2B26] text-xs font-semibold border border-slate-200">
                Serving Allegheny, Butler & Washington Counties
              </span>
              <span className="px-3 py-1 rounded-full bg-[#E89A24] text-white text-xs font-bold">
                Caring Beyond the Call
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B2B26] font-display tracking-tight text-balance leading-[1.12]">
              Caring for You with Compassion, Dignity & Purpose
            </h1>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl pt-1">
              Kenah Wellness Services is an ODP-approved provider (Provider #104556630) and home care agency serving Allegheny, Butler and Washington Counties. We deliver person-centered support for individuals with intellectual disabilities and autism, older adults, adults with physical disabilities, and people recovering at home after a hospital stay.
            </p>

            <div className="text-xs sm:text-sm font-bold text-[#E89A24] tracking-wide pt-2">
              ODP Waiver Services &nbsp;|&nbsp; Home Care &nbsp;|&nbsp; Respite &nbsp;|&nbsp; Community Participation &nbsp;|&nbsp; Habilitation
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="p-8 sm:p-10 rounded-[32px] bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#F8EDE2] text-[#0B2B26] flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-[#E89A24]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                OUR PURPOSE
              </span>
              <h2 className="text-2xl font-bold text-[#0B2B26] font-display">
                Our Mission
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                To deliver compassionate, person-centered support that improves quality of life, honors individual choice, and promotes lifelong independence.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-medium text-slate-500">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Compassion · Quality of Life · Everyday Independence</span>
            </div>
          </div>

          <div className="p-8 sm:p-10 rounded-[32px] bg-[#0B2B26] text-white shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#F2D701] flex items-center justify-center mb-5">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#F2D701] block mb-1">
                OUR HORIZON
              </span>
              <h2 className="text-2xl font-bold text-white font-display">
                Our Vision
              </h2>
              <p className="mt-3 text-slate-200 text-sm sm:text-base leading-relaxed">
                To empower individuals and families through exceptional care, meaningful supports, and vibrant community engagement across Western Pennsylvania.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-medium text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-[#F2D701]" />
              <span>Empowerment · Community Inclusion · Dignified Choice</span>
            </div>
          </div>

        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">
            ORGANIZATIONAL PILLARS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2B26] font-display tracking-tight">
            Our Core Values
          </h2>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl">
            Focusing on independence, choice, dignity, respect, inclusion, community participation, and quality of life.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-7 rounded-[28px] bg-white border border-slate-200/90 shadow-2xs">
            <div className="w-11 h-11 rounded-2xl bg-[#F8EDE2] text-[#0B2B26] flex items-center justify-center mb-4">
              <Heart className="w-5 h-5 text-[#E89A24]" />
            </div>
            <h3 className="text-lg font-bold text-[#0B2B26] font-display">Compassion</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Delivering every service with kindness, empathy, and genuine commitment to improving quality of life for clients and families.
            </p>
          </div>

          <div className="p-7 rounded-[28px] bg-white border border-slate-200/90 shadow-2xs">
            <div className="w-11 h-11 rounded-2xl bg-[#E6F7F4] text-[#0B2B26] flex items-center justify-center mb-4">
              <Users className="w-5 h-5 text-[#4EBAA8]" />
            </div>
            <h3 className="text-lg font-bold text-[#0B2B26] font-display">Respect & Choice</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Honoring personal autonomy, individual dignity, and the freedom to make meaningful daily choices in care and community life.
            </p>
          </div>

          <div className="p-7 rounded-[28px] bg-white border border-slate-200/90 shadow-2xs">
            <div className="w-11 h-11 rounded-2xl bg-[#FDEEF1] text-[#0B2B26] flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5 text-[#F28FA5]" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">Inclusion & Community</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Fostering natural friendships, civic membership, and active participation in local clubs, events, and volunteer activities.
            </p>
          </div>

          <div className="p-7 rounded-[28px] bg-white border border-slate-200/90 shadow-2xs">
            <div className="w-11 h-11 rounded-2xl bg-[#FAF4EE] text-[#0B2B26] flex items-center justify-center mb-4">
              <Award className="w-5 h-5 text-[#E89A24]" />
            </div>
            <h3 className="text-lg font-bold text-[#0B2B26] font-display">Excellence & Trust</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Upholding strict state compliance, background clearances, HIPAA security, and continuous caregiver professional training.
            </p>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE (Section 5) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#E89A24] block mb-1">
            PEOPLE & POPULATIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2B26] font-display tracking-tight">
            Who We Serve
          </h2>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl">
            Our person-centered services are tailored to individuals across every stage of need in Allegheny, Butler, and Washington Counties.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHO_WE_SERVE.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-[28px] bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="w-8 h-8 rounded-full bg-[#FAF4EE] text-[#0B2B26] flex items-center justify-center font-bold text-xs">
                  0{index + 1}
                </span>
                <h3 className="font-bold text-[#0B2B26] text-base font-display">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE KENAH WELLNESS SERVICES? (Section 8 Corrections) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="rounded-[36px] bg-[#FAF4EE] border border-[#EADBCC] p-8 sm:p-12 space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#E89A24] block mb-1">
              THE KENAH DIFFERENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2B26] font-display tracking-tight">
              Why Choose Kenah Wellness Services?
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              From continuous training to strict compliance and heartfelt empathy, our standard of care goes above and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2"
              >
                <div className="flex items-center gap-2 text-[#E89A24]">
                  <CheckCircle2 className="w-4 h-4 text-[#4EBAA8]" />
                  <h3 className="font-bold text-sm sm:text-base text-[#0B2B26]">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAYMENT OPTIONS WE ACCEPT (Section 6) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-1">
            COVERAGE & FUNDING
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2B26] font-display tracking-tight">
            Payment Options We Accept
          </h2>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl">
            We work with state programs, insurance providers, and families directly to make care accessible:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PAYMENT_OPTIONS.map((opt, i) => (
            <div
              key={i}
              className="p-6 rounded-[28px] bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#E6F7F4] text-emerald-900 text-[10px] font-bold uppercase tracking-wider mb-3 inline-block">
                  {opt.badge}
                </span>
                <h3 className="text-lg font-bold text-[#0B2B26] font-display">
                  {opt.source}
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {opt.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                {opt.programs.map((prog, pIdx) => (
                  <span
                    key={pIdx}
                    className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 text-[10px] font-medium"
                  >
                    {prog}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Direct Referrals Box for Supports Coordinators & Families */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="rounded-[32px] bg-[#0B2B26] text-white p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-lg">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F2D701]">
              SC & FAMILY REFERRALS READY
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display">
              Ready to Accept New Referrals
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              We work closely with Supports Coordinators, families, and individuals across Allegheny, Butler, and Washington counties. Connect directly with our intake team:
            </p>
            <div className="pt-2 text-xs sm:text-sm text-slate-100 flex flex-col sm:flex-row sm:items-center gap-4">
              <div>
                <strong>Referrals Contact:</strong> {COMPANY_DETAILS.referralsContact.name}, {COMPANY_DETAILS.referralsContact.role}
              </div>
              <div>
                <strong>Email:</strong> <a href={`mailto:${COMPANY_DETAILS.email}`} className="hover:underline">{COMPANY_DETAILS.email}</a>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={onOpenAssessment}
              className="px-7 py-3 rounded-full bg-[#E89A24] hover:bg-[#d68a18] text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
            >
              Book Free Assessment
            </button>
            <a
              href={`tel:${COMPANY_DETAILS.phoneClean}`}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition-all border border-white/20 cursor-pointer flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#F2D701]" />
              <span>{COMPANY_DETAILS.phone}</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
