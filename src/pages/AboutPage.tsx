import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Target, Eye, Heart, Users, ShieldCheck, Award, CheckCircle2 } from 'lucide-react';
import { PageId } from '../types';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenAssessment: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenAssessment }) => {
  return (
    <div className="space-y-16 pb-24 text-left font-sans">
      <Breadcrumbs items={[{ label: 'About Us' }]} onNavigate={onNavigate} />

      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="rounded-[36px] sm:rounded-[44px] bg-[#F8EDE2] p-8 sm:p-14 border border-[#EADBCC] relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block">
              OUR MISSION & VALUES
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B2B26] font-display tracking-tight text-balance leading-[1.12]">
              Caring for You with Compassion, Dignity & Purpose
            </h1>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl pt-1">
              Kenah Wellness Services is committed to helping individuals live safely, independently, and meaningfully within their homes and communities. We provide both <strong>Home Care Services</strong> and <strong>Pennsylvania ODP Waiver Services</strong> designed to support personal goals, independence, dignity, choice, and community inclusion.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="p-8 sm:p-10 rounded-[32px] bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#F8EDE2] text-[#0B2B26] flex items-center justify-center mb-5">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                OUR PURPOSE
              </span>
              <h2 className="text-2xl font-bold text-[#0B2B26] font-display">
                Our Mission
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                To deliver compassionate, person-centered support that improves quality of life and promotes independence.
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
                To empower individuals and families through exceptional care, meaningful supports, and community engagement.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-medium text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-[#F2D701]" />
              <span>Empowerment · Community Inclusion · Dignified Choice</span>
            </div>
          </div>

        </div>
      </section>

      {/* Core Values matching Home.svg aesthetic */}
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
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0B2B26] font-display">Compassion</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Delivering every service with kindness, empathy, and genuine commitment to improving quality of life.
            </p>
          </div>

          <div className="p-7 rounded-[28px] bg-white border border-slate-200/90 shadow-2xs">
            <div className="w-11 h-11 rounded-2xl bg-[#E6F7F4] text-[#0B2B26] flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0B2B26] font-display">Respect & Choice</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Honoring personal autonomy, individual dignity, and the freedom to make meaningful daily choices.
            </p>
          </div>

          <div className="p-7 rounded-[28px] bg-white border border-slate-200/90 shadow-2xs">
            <div className="w-11 h-11 rounded-2xl bg-[#FDEEF1] text-[#0B2B26] flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">Inclusion & Community</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Fostering natural friendships, civic membership, and full participation in local community life.
            </p>
          </div>

          <div className="p-7 rounded-[28px] bg-white border border-slate-200/90 shadow-2xs">
            <div className="w-11 h-11 rounded-2xl bg-[#FAF4EE] text-[#0B2B26] flex items-center justify-center mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0B2B26] font-display">Excellence & Trust</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Upholding strict state compliance, background clearances, and continuous caregiver mentorship.
            </p>
          </div>
        </div>
      </section>

      {/* Real Community & Care Spotlight: Seniors & ODP Participants */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src="/home_care_support_1790585595209.jpg"
                  alt="Senior care and companionship at Kenah Wellness Services"
                  className="w-full h-full object-cover object-[center_28%]"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-bold text-[#0B2B26] font-display">
                Supporting Seniors with Family-Centered Care
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We believe aging in place should be a positive, joyful experience. Our caregivers treat every senior with deep respect, gentle assistance, and genuine warmth.
              </p>
            </div>
            <div className="pt-4 mt-2">
              <button
                onClick={() => onNavigate('home-care')}
                className="text-xs font-bold text-[#0B2B26] hover:text-[#E89A24] cursor-pointer"
              >
                Learn about Senior Home Care →
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src="/odp_community_participation_1790585609197.jpg"
                  alt="ODP participant and caregiver participating in community life"
                  className="w-full h-full object-cover object-[center_32%]"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-bold text-[#0B2B26] font-display">
                Building Real Community Inclusion for ODP Participants
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                From public transit navigation to life skill development and social recreation, our Direct Support Professionals guide adults toward genuine autonomy.
              </p>
            </div>
            <div className="pt-4 mt-2">
              <button
                onClick={() => onNavigate('odp-waiver')}
                className="text-xs font-bold text-[#0B2B26] hover:text-[#E89A24] cursor-pointer"
              >
                Learn about ODP Waiver Services →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="rounded-[32px] bg-[#FAF4EE] border border-slate-200/90 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0B2B26] font-display">
              Learn More About Our Programs
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Contact our coordinators to discuss Home Care or Pennsylvania ODP Waiver eligibility and intake.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-full border border-slate-300 hover:border-slate-800 text-[#0B2B26] font-medium text-xs sm:text-sm cursor-pointer"
            >
              Contact Us
            </button>
            <button
              onClick={onOpenAssessment}
              className="px-7 py-3 rounded-full bg-[#E89A24] hover:bg-[#d68a18] text-white font-bold text-xs sm:text-sm cursor-pointer shadow-xs"
            >
              Book Free Assessment
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
