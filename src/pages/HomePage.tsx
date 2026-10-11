import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Phone,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Home,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { PageId, ServiceItem, BlogPost } from '../types';
import {
  ODP_WAIVER_SERVICES,
  HOME_CARE_SERVICES,
  ODP_HCSIS_DIRECTORY_URL,
  COMPANY_DETAILS,
  PAYMENT_OPTIONS
} from '../data/servicesData';
import { Testimonials } from '../components/Testimonials';
import {
  InHomeRespiteLineIcon,
  OutOfHomeRespiteLineIcon,
  HabilitationLineIcon,
  CommunityParticipationLineIcon,
  PersonalCareLineIcon,
  CompanionCareLineIcon,
  HomemakerLineIcon
} from '../components/icons/ServiceLineIcons';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenAssessment: () => void;
  onOpenBooking: (serviceTitle?: string) => void;
  onSelectService: (service: ServiceItem) => void;
  onSelectBlog: (post: BlogPost) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenAssessment
}) => {
  // Hero Carousel State: Slide 1 = Person with ODP, Slide 2 = Elderly seeking Home Care
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  const heroSlides = [
    {
      id: 'odp',
      tag: 'ODP Waiver Services',
      title: 'Person with ODP Receiving Dedicated Support',
      description: 'Person-centered habilitation, community participation (CPS), and respite for individuals and families.',
      image: '/odp_community_participation_1790585609197.jpg',
      alt: 'Person with ODP participating actively with supportive care'
    },
    {
      id: 'home-care',
      tag: 'Non-Medical Home Care',
      title: 'Elderly Individual Seeking Home Care',
      description: 'Dignified personal care, companionship, and homemaker assistance preserving senior independence at home.',
      image: '/home_care_support_1790585595209.jpg',
      alt: 'Elderly individual receiving compassionate home care support'
    }
  ];

  useEffect(() => {
    if (isCarouselPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isCarouselPaused, heroSlides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  // 3 Selected Home Care Services for the Home Section
  const homeCareHighlightCards = [
    {
      id: 'personal-care',
      title: 'Personal Care',
      tagline: 'Nurse-Supervised · 24/7 Available',
      desc: 'Bathing, grooming, dressing, toileting, hygiene, and safe mobility assistance preserving dignity and comfort.',
      icon: <PersonalCareLineIcon size={28} className="w-7 h-7" />
    },
    {
      id: 'companion-care',
      title: 'Companion Care',
      tagline: 'Emotional Wellness · Daily Check-Ins',
      desc: 'Warm social engagement, stimulating conversation, walk accompaniment, and comforting presence preventing loneliness.',
      icon: <CompanionCareLineIcon size={28} className="w-7 h-7" />
    },
    {
      id: 'homemaker-services',
      title: 'Homemaker Services',
      tagline: 'Clean Living Sanctuary · Safe Environment',
      desc: 'Light housekeeping, laundry, fresh linens, kitchen cleaning, dishwashing, and fall-hazard reduction.',
      icon: <HomemakerLineIcon size={28} className="w-7 h-7" />
    }
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 text-left font-sans">
      
      {/* =========================================================
          1. HERO SECTION:
             - Simple layout: Image behind the text
             - Just heading, paragraph, and ONLY two buttons:
               "Book Free Assessment" & "Explore Services"
             - Simple background carousel:
               (1) Person with ODP, (2) Elderly seeking home care
             - No generic top badges / pills ("ODP-Approved Provider...")
             - Normal readable typography, dominant brand green theme
         ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div
          className="relative rounded-3xl sm:rounded-4xl overflow-hidden min-h-[460px] sm:min-h-[500px] flex items-center shadow-lg border border-[#EADBCC]"
          onMouseEnter={() => setIsCarouselPaused(true)}
          onMouseLeave={() => setIsCarouselPaused(false)}
        >
          {/* Background Images Carousel Behind the Text */}
          {heroSlides.map((slide, index) => (
            <img
              key={slide.id}
              src={slide.image}
              alt={slide.alt}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== '/Hero.jpg') {
                  target.src = '/Hero.jpg';
                }
              }}
            />
          ))}

          {/* Clean Gradient Overlay for High Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B2B26]/92 via-[#0B2B26]/75 to-[#0B2B26]/40 sm:to-transparent" />
          <div className="absolute inset-0 bg-black/25" />

          {/* Foreground Content: Just the heading, paragraph, and the two buttons */}
          <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-2xl text-white space-y-5">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight leading-tight text-white drop-shadow-sm">
              Find Support, Guidance, and Balance.
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-100 font-normal leading-relaxed max-w-xl drop-shadow-xs">
              Compassionate non-medical Home Care and Pennsylvania ODP Waiver Services. Supporting individuals and families with dignity, purpose, and peace of mind.
            </p>

            {/* ONLY the two requested buttons: Book Free Assessment & Explore Services */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={onOpenAssessment}
                className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white hover:bg-slate-100 active:scale-95 text-[#0B2B26] font-bold text-sm sm:text-base transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#0B2B26]" />
                <span>Book Free Assessment</span>
              </button>

              <button
                onClick={() => onNavigate('services')}
                className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-sm sm:text-base border border-white/50 hover:border-white transition-all shadow-xs flex items-center gap-2 cursor-pointer backdrop-blur-xs"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Simple Carousel Slide Switcher */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-2 bg-[#0B2B26]/50 backdrop-blur-sm p-1.5 rounded-full border border-white/20">
            <button
              onClick={handlePrevSlide}
              className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-all cursor-pointer"
              aria-label="Previous slide"
              title="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 px-1.5">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    i === currentSlide ? 'w-5 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={handleNextSlide}
              className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-all cursor-pointer"
              aria-label="Next slide"
              title="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. CLEAN OVERVIEW BAR (NO NEGATIVE MARGINS / NO OVERLAPPING)
             Provider #104556630 & Tagline
         ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/90 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="px-3 py-1 rounded-full bg-[#EAF7F4] text-[#0B2B26] text-xs font-bold uppercase tracking-wider border border-[#0B2B26]/20">
                ODP-Approved Provider #104556630
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
                Serving Allegheny, Butler & Washington Counties
              </span>
            </div>
            <p className="text-sm sm:text-base text-slate-700 font-normal leading-relaxed">
              Kenah Wellness Services delivers person-centered support for individuals with intellectual disabilities and autism, older adults, adults with physical disabilities, and people recovering at home after a hospital stay.
            </p>
            <div className="text-xs sm:text-sm font-bold text-[#0B2B26] tracking-wide pt-0.5">
              ODP Waiver Services &nbsp;|&nbsp; Home Care &nbsp;|&nbsp; Respite &nbsp;|&nbsp; Community Participation &nbsp;|&nbsp; Habilitation
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0 w-full sm:w-auto">
            <button
              onClick={onOpenAssessment}
              className="px-6 py-2.5 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white font-bold text-xs sm:text-sm shadow-xs transition-all text-center cursor-pointer"
            >
              Book Free Assessment
            </button>
            <a
              href="tel:+14125461860"
              className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0B2B26] font-semibold text-xs sm:text-sm transition-colors text-center inline-flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#0B2B26]" />
              <span>+1 (412) 546-1860</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. CATEGORY 1 (FIRST): ODP WAIVER SERVICES HIGHLIGHTS
             - Kept first
             - NO counties mentioned
             - Clickable link: "View All Our ODP Services" pointing to PA HCSIS Directory
             - Normal readable font sizes
         ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#EAF7F4] border border-[#3CB9A8]/40 p-6 sm:p-8 space-y-6">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-5 border-b border-[#3CB9A8]/30">
            <div className="space-y-2 max-w-2xl">
              <span className="px-3 py-1 rounded-full bg-[#0B2B26] text-white text-xs font-bold uppercase tracking-wider inline-block">
                Category 1: ODP Waiver Services
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2B26] font-display tracking-tight">
                Pennsylvania ODP Waiver Services
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                ODP approved provider (Provider #104556630) delivering person-centered habilitation, respite, and community inclusion. We work closely with Supports Coordinators, individuals, and families.
              </p>
            </div>

            {/* MANDATORY HCSIS DIRECTORY LINK BUTTON */}
            <div className="shrink-0 flex flex-wrap gap-2.5">
              <a
                href={ODP_HCSIS_DIRECTORY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
                title="View All Our ODP Services on official Pennsylvania HCSIS portal"
              >
                <span>View All Our ODP Services</span>
                <ExternalLink className="w-4 h-4 text-emerald-300" />
              </a>

              <button
                onClick={() => onNavigate('services')}
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 text-[#0B2B26] text-xs sm:text-sm font-bold border border-[#0B2B26] transition-all cursor-pointer"
              >
                <span>Full ODP Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 4 Brief ODP Highlight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            
            {/* 1. In-Home Respite */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-3">
              <div className="space-y-2.5">
                <div className="p-2.5 w-fit rounded-xl bg-[#EAF7F4] text-[#0B2B26]">
                  <InHomeRespiteLineIcon size={28} className="w-7 h-7" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#0B2B26] font-display">
                  In-Home Respite
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Short-term relief for family caregivers in the individual’s familiar home environment with trained staff.
                </p>
              </div>
              <div className="pt-2 text-xs font-semibold text-[#0B2B26] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3CB9A8]" />
                <span>1:1 to 2:1 Staffing Ratios</span>
              </div>
            </div>

            {/* 2. Out-of-Home Respite */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-3">
              <div className="space-y-2.5">
                <div className="p-2.5 w-fit rounded-xl bg-[#EAF7F4] text-[#0B2B26]">
                  <OutOfHomeRespiteLineIcon size={28} className="w-7 h-7" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#0B2B26] font-display">
                  Out-of-Home Respite
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Safe, supervised care in a setting outside the family home while families recharge and routines continue.
                </p>
              </div>
              <div className="pt-2 text-xs font-semibold text-[#0B2B26] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3CB9A8]" />
                <span>Supervised External Care</span>
              </div>
            </div>

            {/* 3. Habilitation (HAB) */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-3">
              <div className="space-y-2.5">
                <div className="p-2.5 w-fit rounded-xl bg-[#EAF7F4] text-[#0B2B26]">
                  <HabilitationLineIcon size={28} className="w-7 h-7" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#0B2B26] font-display">
                  Habilitation (HAB)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Helps individuals learn and maintain everyday skills—such as cooking, household tasks, communication, and safety.
                </p>
              </div>
              <div className="pt-2 text-xs font-semibold text-[#0B2B26] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3CB9A8]" />
                <span>ISP Outcome Coaching</span>
              </div>
            </div>

            {/* 4. Community Participation Support (CPS) */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-3">
              <div className="space-y-2.5">
                <div className="p-2.5 w-fit rounded-xl bg-[#EAF7F4] text-[#0B2B26]">
                  <CommunityParticipationLineIcon size={28} className="w-7 h-7" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#0B2B26] font-display">
                  CPS Support
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Building friendships, social skills, and community independence through volunteering, recreation, and clubs.
                </p>
              </div>
              <div className="pt-2 text-xs font-semibold text-[#0B2B26] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3CB9A8]" />
                <span>Civic & Social Inclusion</span>
              </div>
            </div>

          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-slate-700">
            <span>Ready to coordinate with your Supports Coordinator? We are ready to accept referrals.</span>
            <button
              onClick={() => onNavigate('services')}
              className="font-bold text-[#0B2B26] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View full ODP descriptions on Services page</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================
          4. CATEGORY 2 (SECOND): NON-MEDICAL HOME CARE SERVICES
             - USER INSTRUCTION: Just list 3 at home section then link to Services page
             - 1. Personal Care, 2. Companion Care, 3. Homemaker Services
             - Dominant logo color
         ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#FAF4EE] border border-[#EADBCC] p-6 sm:p-8 space-y-6">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-5 border-b border-[#EADBCC]">
            <div className="space-y-2 max-w-2xl">
              <span className="px-3 py-1 rounded-full bg-[#0B2B26] text-white text-xs font-bold uppercase tracking-wider inline-block">
                Category 2: Home Care Services
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2B26] font-display tracking-tight">
                Non-Medical Home Care Services
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Compassionate non-medical care helping individuals remain safe and independent at home. Available up to 24 hours a day through Act 150, Medicaid, Insurance, and Private Pay.
              </p>
            </div>

            <div className="shrink-0">
              <button
                onClick={() => onNavigate('services')}
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
              >
                <span>View All Home Care Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* EXACTLY 3 HOME CARE HIGHLIGHT CARDS (AS REQUESTED) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {homeCareHighlightCards.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="p-2.5 w-fit rounded-xl bg-[#FAF4EE] text-[#0B2B26] mb-3">
                    {card.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0B2B26] font-display">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                    {card.desc}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0B2B26]">
                  <span>{card.tagline}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
              </div>
            ))}
          </div>

          {/* Clear prompt to see all 12+ home care offerings on dedicated services page */}
          <div className="pt-2 text-center">
            <button
              onClick={() => onNavigate('services')}
              className="py-2.5 px-6 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>Explore All Home Care Details on Services Page</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* Note: "Who We Serve" has been relocated to the dedicated About section as requested */}

      {/* =========================================================
          5. PAYMENT OPTIONS WE ACCEPT
             Normal readable cards, strong contrast
         ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="max-w-2xl space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Payment & Funding Options
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2B26] font-display tracking-tight">
            Payment Options We Accept
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We work with Pennsylvania state programs, insurers, and families directly to make care accessible:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {PAYMENT_OPTIONS.map((opt, i) => (
            <div
              key={i}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-3"
            >
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#EAF7F4] text-[#0B2B26] text-[11px] font-bold uppercase tracking-wider">
                  {opt.badge}
                </span>
                <h3 className="mt-2 text-base sm:text-lg font-bold text-[#0B2B26] font-display">
                  {opt.source}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {opt.description}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1">
                {opt.programs.map((p, pI) => (
                  <span
                    key={pI}
                    className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          6. TESTIMONIALS SECTION
         ========================================================= */}
      <Testimonials onOpenAssessment={onOpenAssessment} />

      {/* =========================================================
          7. CONTACT & GET STARTED SECTION
             Dominant brand green card, strictly company phone & email
         ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#0B2B26] text-white p-7 sm:p-10 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Get in Touch With Our Team
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display leading-tight">
                We’re Here to Support Your Family
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed">
                Speak directly with our care coordinators to verify waiver eligibility, arrange respite, or schedule a free assessment.
              </p>

              <div className="pt-2 space-y-2 text-xs sm:text-sm text-slate-100">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>
                    <strong>Phone:</strong>{' '}
                    <a href={`tel:${COMPANY_DETAILS.phoneClean}`} className="text-emerald-300 font-bold hover:underline">
                      {COMPANY_DETAILS.phone}
                    </a>
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold">@</span>
                  <span>
                    <strong>Email:</strong>{' '}
                    <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-emerald-300 font-bold hover:underline">
                      {COMPANY_DETAILS.email}
                    </a>
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Home className="w-4 h-4 text-emerald-400" />
                  <span>
                    <strong>Office:</strong> {COMPANY_DETAILS.address.street}, {COMPANY_DETAILS.address.city}, {COMPANY_DETAILS.address.state} {COMPANY_DETAILS.address.zip}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-3">
              <button
                onClick={onOpenAssessment}
                className="w-full py-3 px-6 rounded-full bg-white hover:bg-slate-100 active:scale-95 text-[#0B2B26] font-bold text-sm shadow-md transition-all cursor-pointer text-center"
              >
                Book Free Assessment
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="w-full py-3 px-6 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all cursor-pointer text-center"
              >
                Send Us a Message
              </button>

              <p className="text-[11px] text-slate-300 text-center pt-0.5">
                We typically respond within 12 hours. Rapid caregiver placement available.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
