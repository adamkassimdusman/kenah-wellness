import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  Minus,
  Linkedin,
  Facebook,
  Instagram,
  Phone,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Heart,
  BookOpen,
  ArrowUpRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Users,
  CreditCard,
  Award,
  Sparkles
} from 'lucide-react';
import { HowItWorksIllustration } from '../components/illustrations/HowItWorksIllustration';
import { MirrorIllustration } from '../components/illustrations/MirrorIllustration';
import { CommunityClusterIllustration } from '../components/illustrations/CommunityClusterIllustration';
import { FaqFlowerHeadIllustration } from '../components/illustrations/FaqFlowerHeadIllustration';
import { Testimonials } from '../components/Testimonials';
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
  CommunityParticipationLineIcon,
  InHomeCommunitySupportsLineIcon,
  PostDischargeRecoveryLineIcon,
  FacilityBasedCareLineIcon
} from '../components/icons/ServiceLineIcons';
import {
  FAQS,
  COMPANY_DETAILS,
  PAYMENT_OPTIONS,
  WHO_WE_SERVE,
  WHY_CHOOSE_US
} from '../data/servicesData';
import { PageId, ServiceItem, BlogPost } from '../types';
import {
  getStoredBlogs,
  getStoredHomeCareServices,
  getStoredOdpServices,
  DATA_CHANGE_EVENT
} from '../utils/storage';
import { trackEvent } from '../utils/analytics';
import { apiSubmitContact } from '../utils/api';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenAssessment: () => void;
  onOpenBooking: (serviceTitle?: string) => void;
  onSelectService: (service: ServiceItem) => void;
  onSelectBlog: (post: BlogPost) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenAssessment,
  onOpenBooking,
  onSelectService,
  onSelectBlog
}) => {
  const [serviceTab, setServiceTab] = useState<'all' | 'home-care' | 'odp-waiver'>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Hero Dual Carousel State: Senior Home Care & ODP Program
  const [heroSlide, setHeroSlide] = useState<0 | 1>(0);
  const [heroAutoplay, setHeroAutoplay] = useState(true);

  const heroSlides = [
    {
      id: 'senior-care',
      title: 'Compassionate Care. Greater Independence. Stronger Communities.',
      description:
        'Kenah Wellness Services provides quality in-home senior care designed to preserve dignity, promote safety, and empower older adults to age in place comfortably in their cherished homes.',
      image: '/Hero.jpg'
    },
    {
      id: 'odp-waiver',
      title: 'Empowering Adults with Intellectual & Developmental Disabilities.',
      description:
        'Comprehensive Pennsylvania ODP Waiver supports including In-Home & Out-of-Home Respite, Community Participation Support (CPS), and life-enriching Habilitation tailored to each individual.',
      image: '/odp_community_participation_1790585609197.jpg'
    }
  ];

  useEffect(() => {
    if (!heroAutoplay) return;
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev === 0 ? 1 : 0));
    }, 4000); // Cycles every 4 seconds as requested
    return () => clearInterval(timer);
  }, [heroAutoplay]);

  // Dynamic state loaded from storage (synced with admin updates)
  const [blogsList, setBlogsList] = useState<BlogPost[]>(() => getStoredBlogs());
  const [homeCareList, setHomeCareList] = useState<ServiceItem[]>(() => getStoredHomeCareServices());
  const [odpList, setOdpList] = useState<ServiceItem[]>(() => getStoredOdpServices());

  useEffect(() => {
    const handleDataUpdate = () => {
      setBlogsList(getStoredBlogs());
      setHomeCareList(getStoredHomeCareServices());
      setOdpList(getStoredOdpServices());
    };
    window.addEventListener(DATA_CHANGE_EVENT, handleDataUpdate);
    return () => window.removeEventListener(DATA_CHANGE_EVENT, handleDataUpdate);
  }, []);

  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactHoneypot, setContactHoneypot] = useState('');
  const [contactError, setContactError] = useState<string | null>(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactError(null);

    // Spam bot honeypot protection
    if (contactHoneypot.trim()) {
      // Silently pretend success to bots without processing
      setContactSubmitted(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail.trim())) {
      setContactError('Please provide a valid email address.');
      return;
    }

    if (!contactMessage.trim()) {
      setContactError('Please include a message describing how we can help.');
      return;
    }

    const res = await apiSubmitContact({
      name: 'Website Visitor',
      email: contactEmail.trim(),
      message: contactMessage.trim(),
      hp_contact_check: contactHoneypot.trim(),
    });

    if (!res.success && res.error) {
      setContactError(res.error);
      return;
    }

    trackEvent('contact_inquiry_submitted', { source: 'homepage' });
    setContactSubmitted(true);
    setContactEmail('');
    setContactMessage('');
  };

  const renderServiceLineIcon = (id: string, size = 44) => {
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
      case 'in-home-community-supports-ihcs':
        return <InHomeCommunitySupportsLineIcon size={size} />;
      case 'in-home-respite':
        return <InHomeRespiteLineIcon size={size} />;
      case 'out-of-home-respite':
        return <OutOfHomeRespiteLineIcon size={size} />;
      case 'habilitation-hab':
        return <HabilitationLineIcon size={size} />;
      case 'community-participation-support-cps':
        return <CommunityParticipationLineIcon size={size} />;
      case 'post-discharge-recovery-care':
        return <PostDischargeRecoveryLineIcon size={size} />;
      case 'facility-based-care':
        return <FacilityBasedCareLineIcon size={size} />;
      default:
        return <PersonalCareLineIcon size={size} />;
    }
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 text-left font-sans">
      {/* =========================================================
          1. HERO SECTION (Clean, Uncluttered 4-Second Carousel)
             ONLY Header, Paragraph, and Free Assessment button,
             with matching background picture behind the text!
         ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div
          className="relative w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] overflow-hidden p-8 sm:p-14 lg:p-20 shadow-lg border border-[#EADBCC] text-white min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] flex flex-col justify-center"
          onMouseEnter={() => setHeroAutoplay(false)}
          onMouseLeave={() => setHeroAutoplay(true)}
        >
          {/* Background Images for Carousel with smooth crossfade */}
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                heroSlide === index ? 'opacity-100 z-0' : 'opacity-0 -z-10'
              }`}
              style={{
                backgroundImage: `url('${slide.image}')`,
                backgroundPosition: index === 0 ? 'center 30%' : 'center 26%'
              }}
            />
          ))}

          {/* Contrast-Ensuring Brand Overlay (Deep Pine Teal) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B2B26]/95 via-[#0B2B26]/85 to-[#0B2B26]/60 z-1 pointer-events-none" />

          {/* Clean, Uncluttered Hero Content: ONLY Header, Paragraph, and Free Assessment Button */}
          <div className="relative z-10 max-w-3xl space-y-6 text-left">
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight font-display leading-[1.12] text-balance drop-shadow-sm">
              {heroSlides[heroSlide].title}
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-100 max-w-2xl leading-relaxed font-normal drop-shadow-xs">
              {heroSlides[heroSlide].description}
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenAssessment}
                className="px-9 py-4 rounded-full bg-[#E89A24] hover:bg-[#d68a18] active:scale-95 text-white font-bold text-base sm:text-lg transition-all shadow-xl cursor-pointer inline-flex items-center gap-2.5"
              >
                <Calendar className="w-5 h-5" />
                <span>Free Assessment</span>
              </button>
            </div>
          </div>

          {/* Minimal 4-Second Carousel Indicator Dots */}
          <div className="absolute bottom-6 right-8 sm:bottom-8 sm:right-12 z-10 flex items-center gap-2">
            <button
              onClick={() => {
                setHeroSlide(0);
                setHeroAutoplay(false);
              }}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                heroSlide === 0 ? 'w-8 bg-[#E89A24]' : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label="Slide 1: Senior Care"
            />
            <button
              onClick={() => {
                setHeroSlide(1);
                setHeroAutoplay(false);
              }}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                heroSlide === 1 ? 'w-8 bg-[#E89A24]' : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label="Slide 2: ODP Program"
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          OVERVIEW BAR: ODP PROVIDER #104556630 & TAGLINE
          Directly from Client Update Document (Section 1)
         ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#EADBCC] flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="px-3.5 py-1 rounded-full bg-[#E6F7F4] text-[#0B2B26] text-xs font-extrabold uppercase tracking-wider border border-[#4EBAA8]/40 shadow-2xs">
                ODP-Approved Provider #104556630
              </span>
              <span className="px-3 py-1 rounded-full bg-[#FAF4EE] text-[#0B2B26] text-xs font-semibold border border-[#EADBCC]">
                Allegheny · Butler · Washington Counties
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200/60">
                Caring Beyond the Call
              </span>
            </div>
            <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed pt-1">
              Kenah Wellness Services is an ODP-approved provider (Provider #104556630) and home care agency serving Allegheny, Butler and Washington Counties. We deliver person-centered support for individuals with intellectual disabilities and autism, older adults, adults with physical disabilities, and people recovering at home after a hospital stay.
            </p>
            <div className="text-xs sm:text-sm font-bold text-[#E89A24] tracking-wide pt-1">
              ODP Waiver Services &nbsp;|&nbsp; Home Care &nbsp;|&nbsp; Respite &nbsp;|&nbsp; Community Participation &nbsp;|&nbsp; Habilitation
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0 w-full sm:w-auto">
            <button
              onClick={onOpenAssessment}
              className="px-7 py-3.5 rounded-full bg-[#E89A24] hover:bg-[#d68a18] text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer text-center"
            >
              Book Free Assessment
            </button>
            <a
              href="tel:+14125461860"
              className="px-6 py-3 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white font-semibold text-xs sm:text-sm transition-colors text-center cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#E89A24]" />
              <span>+1 (412) 546-1860</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================
          SPOTLIGHT: WHO WE SUPPORT - ELDERS & PEOPLE WITH ODP
          Authentic imagery helping families feel at home, with mobile/tablet
          optimization to prevent scrolling fatigue!
         ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="bg-[#FAF4EE] rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 lg:p-12 border border-[#EADBCC] space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E89A24] block">
              COMMITTED TO OUR COMMUNITY
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B2B26] font-display tracking-tight">
              Compassionate Living for Elders & People with ODP
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We design our care around real people. Whether supporting older adults wishing to remain safely in their homes or guiding individuals with intellectual and developmental disabilities through ODP programs, our goal is true independence and peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Card 1: Our Elders & Seniors */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                {/* On mobile & tablet: clean compact image header that does NOT steal scrolling space */}
                <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src="/home_care_support_1790585595209.jpg"
                    alt="Elderly client receiving warm, dignified support from a Kenah Wellness caregiver"
                    className="w-full h-full object-cover object-[center_28%]"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B2B26]/85 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-full">
                    Senior Home Care
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#0B2B26] font-display pt-1">
                  Home Help for Seniors Across Western PA
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Seniors thrive best in familiar surroundings. Our dedicated Direct Care Workers assist with daily routines, hygiene, meal preparation, dementia care, and gentle fall prevention—giving families peace of mind.
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4EBAA8] shrink-0" />
                    <span>Personal hygiene, dressing & gentle bathing support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4EBAA8] shrink-0" />
                    <span>Dementia, Alzheimer’s & memory care routines</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4EBAA8] shrink-0" />
                    <span>Fall risk mitigation & home safety oversight</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onNavigate('home-care')}
                  className="text-xs sm:text-sm font-bold text-[#0B2B26] hover:text-[#E89A24] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Explore Senior Care Services</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onOpenAssessment}
                  className="px-4 py-2 rounded-full bg-[#E89A24] hover:bg-[#d68a18] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Book Free Assessment
                </button>
              </div>
            </div>

            {/* Card 2: Individuals with ODP */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                {/* On mobile & tablet: clean compact image header that does NOT steal scrolling space */}
                <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src="/odp_community_participation_1790585609197.jpg"
                    alt="Adult participant with intellectual disability engaging in community activity with Direct Support Professional"
                    className="w-full h-full object-cover object-[center_32%]"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B2B26]/85 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-full">
                    ODP Waiver Support
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#0B2B26] font-display pt-1">
                  Empowering Adults with Intellectual Disabilities
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Through Pennsylvania ODP waivers, we champion active community participation, skill development, and respite care. Our Direct Support Professionals help individuals build real friendships and life autonomy.
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E89A24] shrink-0" />
                    <span>In-Home & Out-of-Home Respite for family relief</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E89A24] shrink-0" />
                    <span>Community Participation Support (CPS) & volunteer trips</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E89A24] shrink-0" />
                    <span>Consolidated, Community Living & P/FDS coordination</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onNavigate('odp-waiver')}
                  className="text-xs sm:text-sm font-bold text-[#0B2B26] hover:text-[#E89A24] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Explore ODP Waiver Services</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onOpenAssessment}
                  className="px-4 py-2 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Book Free Assessment
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          2. HOW IT WORKS / OUR THREE-STEP PROCESS
         ========================================================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block">
              HOW IT WORKS
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0B2B26] tracking-tight font-display leading-[1.15]">
              Caring for You, Every Step of the Way
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md">
              Our person-centered care model ensures individuals and families receive the exact support they need with dignity and transparency.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#FAF4EE] text-[#0B2B26] flex items-center justify-center font-bold text-sm shrink-0 border border-[#EADBCC]">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-base text-[#0B2B26]">Free In-Home Assessment</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    We meet with you and your family to assess personal routines, preferences, and ODP waiver authorization.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E6F7F4] text-[#0B2B26] flex items-center justify-center font-bold text-sm shrink-0 border border-[#BDEEE5]">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-base text-[#0B2B26]">Personalized Care Plan</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    A tailored plan is created to fit your schedule, health needs, and goals for independent community living.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#FDEEF1] text-[#0B2B26] flex items-center justify-center font-bold text-sm shrink-0 border border-[#FAD6DE]">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-base text-[#0B2B26]">Compassionate Care Delivery</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Our certified Direct Support Professionals and caregivers deliver warm, reliable, nurse-supervised care.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenAssessment}
                className="px-8 py-3.5 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white font-medium text-sm transition-all cursor-pointer shadow-md"
              >
                Schedule Free Assessment
              </button>
            </div>
          </div>

          <div className="hidden lg:flex lg:col-span-7 justify-center lg:justify-end">
            <HowItWorksIllustration />
          </div>

        </div>
      </section>

      {/* =========================================================
          3. YOUR PATH TO WELL-BEING (SERVICES SECTION)
         ========================================================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-left">
        
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block">
            YOUR PATH TO WELL-BEING
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0B2B26] tracking-tight font-display">
            Comprehensive Services Tailored to You
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            From daily personal care and dementia support to Pennsylvania ODP waiver habilitation and respite, we provide the dedicated care you deserve. Click any service to view its complete full-page guide.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="pt-2 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0B2B26] font-display">
              {serviceTab === 'all'
                ? `All Services & Supports (${homeCareList.length + odpList.length})`
                : serviceTab === 'home-care'
                ? `Home Care Services (${homeCareList.length})`
                : `Pennsylvania ODP Waiver Services (${odpList.length})`}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Browse services below. Click "Open Full Page" to examine in-depth details, care scope, and coverage.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-full text-xs font-semibold self-start sm:self-auto">
            <button
              onClick={() => setServiceTab('all')}
              className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
                serviceTab === 'all'
                  ? 'bg-[#0B2B26] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({homeCareList.length + odpList.length})
            </button>
            <button
              onClick={() => setServiceTab('home-care')}
              className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
                serviceTab === 'home-care'
                  ? 'bg-[#0B2B26] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Home Care ({homeCareList.length})
            </button>
            <button
              onClick={() => setServiceTab('odp-waiver')}
              className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
                serviceTab === 'odp-waiver'
                  ? 'bg-[#0B2B26] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ODP Waiver ({odpList.length})
            </button>
          </div>
        </div>

        {/* Services Grid (Home Care + ODP Waiver) */}
        <div className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            ...(serviceTab === 'odp-waiver' ? [] : homeCareList),
            ...(serviceTab === 'home-care' ? [] : odpList)
          ].map((service) => (
            <div
              key={service.id}
              className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs hover:border-[#0B2B26]/30 transition-all hover:shadow-lg flex flex-col justify-between group"
            >
              <div>
                {/* Line-Art Icon with Soft Tinted Circle */}
                <div className="mb-4">
                  {renderServiceLineIcon(service.id, 48)}
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      service.category === 'odp-waiver'
                        ? 'bg-[#FAF4EE] text-amber-900 border border-amber-200/60'
                        : 'bg-[#E6F7F4] text-emerald-900 border border-emerald-200/60'
                    }`}
                  >
                    {service.category === 'odp-waiver' ? 'PA ODP Waiver' : 'Home Care'}
                  </span>
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-[#0B2B26] font-display group-hover:text-[#E89A24] transition-colors">
                  {service.title}
                </h4>

                <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {service.shortDesc}
                </p>
              </div>

              {/* Action Buttons: Open Full Page & Free Assessment */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => onSelectService(service)}
                  className="w-full py-2.5 px-4 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <span>Open Full Page</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onOpenAssessment()}
                  className="w-full py-2 px-3 rounded-full bg-[#FAF4EE] hover:bg-[#F8EDE2] text-[#0B2B26] text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#E89A24]" />
                  <span>Free Assessment</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Spotlight Banner */}
        <div className="mt-12 rounded-[32px] bg-gradient-to-r from-[#FAF4EE] to-[#F8EDE2] border border-[#EADBCC] p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E89A24]">
              Community Mentorship & Support Coordination
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0B2B26] font-display">
              Need Help Choosing the Right Service or Navigating ODP?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
              Our registered nurse and care coordinators guide you through state waiver eligibility, individualized support planning (ISP), and customized home care solutions.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={onOpenAssessment}
              className="px-7 py-3 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Book Free Assessment
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-[#0B2B26] border border-slate-300 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Ask a Coordinator
            </button>
          </div>
        </div>

        {/* =========================================================
            WHO WE SERVE (Client Update Document - Section 5)
           ========================================================= */}
        <div className="mt-16 pt-8 border-t border-slate-200/80">
          <div className="max-w-3xl mb-10 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E89A24] block mb-2">
              PERSON-CENTERED POPULATIONS
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#0B2B26] font-display tracking-tight">
              Who We Serve
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              We deliver compassionate, tailored care for individuals and families across Allegheny, Butler, and Washington Counties:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHO_WE_SERVE.map((item, index) => (
              <div
                key={index}
                className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs hover:border-[#0B2B26]/30 transition-all hover:shadow-md flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FAF4EE] text-[#0B2B26] flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-[#0B2B26] font-display">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-[#0B2B26]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4EBAA8]" />
                  <span>Person-Centered Care Plan</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================
            PAYMENT OPTIONS WE ACCEPT (Client Update Document - Section 6)
           ========================================================= */}
        <div className="mt-20 pt-8 border-t border-slate-200/80">
          <div className="max-w-3xl mb-10 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">
              FINANCIAL & PROGRAM FUNDING
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#0B2B26] font-display tracking-tight">
              Payment Options We Accept
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Kenah Wellness works with families, state agencies, and healthcare insurers to ensure access to essential support:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PAYMENT_OPTIONS.map((opt, i) => (
              <div
                key={i}
                className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E6F7F4] text-emerald-900 text-[10px] font-bold uppercase tracking-wider border border-emerald-200/60">
                      {opt.badge}
                    </span>
                    <CreditCard className="w-4 h-4 text-slate-400" />
                  </div>
                  <h4 className="text-lg font-bold text-[#0B2B26] font-display">
                    {opt.source}
                  </h4>
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
        </div>

        {/* =========================================================
            WHY CHOOSE KENAH WELLNESS SERVICES? (Section 8 Corrections)
           ========================================================= */}
        <div className="mt-20 pt-8 border-t border-slate-200/80">
          <div className="max-w-3xl mb-10 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E89A24] block mb-2">
              DEDICATED QUALITY CARE
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#0B2B26] font-display tracking-tight">
              Why Choose Kenah Wellness Services?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              We stand apart through clinical excellence, continuous training, and person-centered dedication:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-[#FAF4EE] border border-[#EADBCC] p-6 shadow-2xs hover:bg-white transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-white text-[#0B2B26] flex items-center justify-center font-bold text-xs mb-3 shadow-2xs border border-slate-200/60">
                  <Award className="w-4 h-4 text-[#E89A24]" />
                </div>
                <h4 className="text-base font-bold text-[#0B2B26] font-display mb-1.5">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* =========================================================
          4. TESTIMONIALS & SOCIAL PROOF COMPONENT (Real Feedback from kenahwellness.com)
         ========================================================= */}
      <Testimonials onOpenAssessment={onOpenAssessment} />

      {/* =========================================================
          5. PARTNERS LOGO BAR
         ========================================================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="rounded-full bg-slate-50 border border-slate-200/80 px-8 py-5 flex flex-wrap items-center justify-between gap-6 text-slate-600">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Our Partners
          </span>

          <div className="flex flex-wrap items-center justify-between gap-8 sm:gap-12 flex-1 font-semibold text-sm tracking-tight text-slate-700">
            <span className="font-display font-extrabold tracking-tight text-slate-800">Pennsylvania ODP</span>
            <span className="font-display font-bold">Consolidated Waiver</span>
            <span className="font-display font-bold">Allegheny MH/ID</span>
            <span className="font-display font-bold">PA DHS Certified</span>
            <span className="font-display font-extrabold tracking-wider">MEDICAID</span>
          </div>
        </div>
      </section>

      {/* =========================================================
          6. BLOG & CARE RESOURCES SECTION (NEW BLOG INTEGRATION)
         ========================================================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F7F4] text-[#0B2B26] text-xs font-bold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5 text-[#4EBAA8]" />
              <span>Family Care Blog & Insights</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0B2B26] tracking-tight font-display">
              Latest Articles & Resources
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mt-2">
              Expert advice on navigating Pennsylvania ODP waivers, memory care routines, and family caregiver burnout prevention.
            </p>
          </div>

          <button
            onClick={() => onNavigate('blog')}
            className="px-6 py-2.5 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer self-start sm:self-auto whitespace-nowrap"
          >
            Explore All Blog Posts →
          </button>
        </div>

        {/* 3 Featured Blog Cards - Dynamically loaded and opens full article page */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {blogsList.slice(0, 3).map((post) => (
            <article
              key={post.id}
              onClick={() => onSelectBlog(post)}
              className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/Hero.jpg';
                  }}
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-[#0B2B26]/85 backdrop-blur-sm text-white text-[11px] font-semibold">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#0B2B26] group-hover:text-[#E89A24] transition-colors leading-snug mb-2 font-display">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    By {post.author.name}
                  </span>
                  <span className="text-xs font-bold text-[#0B2B26] group-hover:text-[#E89A24] transition-colors">
                    Read Full Article →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================
          7. FREE ASSESSMENT CONSULTATION CALLOUT
         ========================================================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-left">
        <div className="rounded-[36px] bg-[#FAF4EE] border border-amber-200/80 p-8 sm:p-14 relative overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
                  <Calendar className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Schedule Free Assessment
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B2B26] font-display tracking-tight leading-[1.2]">
                Book a Free In-Home Assessment with Our Care Planning Team
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                Whether you need senior companion care, specialized dementia support, or respite relief under the Pennsylvania Consolidated Waiver, our care coordinators are ready to meet in person, over video, or by phone.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700 pt-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  No referral necessary
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Flexible in-home or virtual options
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-500" />
                  Certified PA ODP provider
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={onOpenAssessment}
                className="w-full py-4 px-8 rounded-full bg-[#E89A24] hover:bg-[#d68a18] active:scale-95 text-white font-bold text-sm sm:text-base transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Free Assessment</span>
              </button>
              <a
                href="tel:+14125461860"
                className="w-full py-3.5 px-8 rounded-full bg-white hover:bg-slate-50 text-[#0B2B26] border border-slate-300 font-semibold text-xs sm:text-sm transition-colors text-center cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#0B2B26]" />
                <span>Call +1 (412) 546-1860</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          8. FREQUENTLY ASKED QUESTIONS
         ========================================================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">
                NEED HELP?
              </span>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0B2B26] tracking-tight font-display leading-[1.15]">
                Frequently Asked Questions
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
                Find clear answers to common questions about our Home Care and Pennsylvania ODP Waiver services.
              </p>
            </div>

            <div className="hidden lg:block">
              <FaqFlowerHeadIllustration />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {FAQS.slice(0, 6).map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.id}
                  className="border-b border-slate-200 py-4 sm:py-5 transition-colors text-left"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group"
                  >
                    <span className="font-semibold text-sm sm:text-base text-slate-900 group-hover:text-[#0B2B26] transition-colors">
                      {faq.question}
                    </span>
                    <span className="w-6 h-6 flex items-center justify-center text-slate-800 shrink-0">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pt-3 text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line pr-6">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================
          9. GET IN TOUCH / WE’RE HERE TO SUPPORT YOU
         ========================================================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-left">
        
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block">
            GET IN TOUCH
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0B2B26] tracking-tight font-display">
            We’re Here to Support You
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Whether you have questions, need help getting started with an assessment, or want to learn more — reach out anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold text-[#0B2B26] font-display">
              Contact Details:
            </h3>

            <div className="space-y-3.5 text-sm text-slate-700">
              <div>
                <strong className="text-slate-900">Email:</strong>{' '}
                <a href="mailto:info@kenahwellness.com" className="hover:underline">
                  info@kenahwellness.com
                </a>
              </div>
              <div>
                <strong className="text-slate-900">Phone:</strong>{' '}
                <a href="tel:+14125461860" className="hover:underline">
                  +1 (412) 546-1860
                </a>
              </div>
              <div>
                <strong className="text-slate-900">Address:</strong>{' '}
                <span>2400 Ansys Drive, Suite 169, Canonsburg, PA 15317</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FAF4EE] border border-[#EADBCC] text-xs">
                <strong className="text-[#0B2B26] block font-bold mb-0.5">
                  Direct Referrals Contact:
                </strong>
                <span className="text-slate-700">
                  Zephaniah Omweno, Operations Manager
                </span>
                <span className="block text-[11px] text-slate-500 mt-0.5">
                  Direct SC coordination across Allegheny, Butler & Washington Counties
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2 text-slate-700">
              <a
                href="https://www.linkedin.com/company/kenah-wellness-services-llc/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0B2B26] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61581451048202"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0B2B26] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/kenah_wellness/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0B2B26] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="tel:+14125461860"
                className="hover:text-[#0B2B26] transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>

            <div className="pt-6 text-xs text-slate-400">
              We typically respond within 12 hours.
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-[32px] bg-[#F8EDE2] p-8 sm:p-12">
              <h3 className="text-xl font-bold text-[#0B2B26] font-display mb-6">
                Send Us a Message
              </h3>

              {contactSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="text-emerald-700 font-bold text-base">
                    Message Sent Successfully!
                  </div>
                  <p className="text-xs text-slate-600">
                    Thank you for reaching out. Our care coordinator will contact you shortly.
                  </p>
                  <button
                    onClick={() => setContactSubmitted(false)}
                    className="text-xs font-semibold text-[#0B2B26] underline pt-2 cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  {/* Honeypot anti-spam field (hidden from genuine users) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="hp_check_home">Leave this empty</label>
                    <input
                      type="text"
                      id="hp_check_home"
                      name="hp_check_home"
                      tabIndex={-1}
                      autoComplete="off"
                      value={contactHoneypot}
                      onChange={(e) => setContactHoneypot(e.target.value)}
                    />
                  </div>

                  {contactError && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                      {contactError}
                    </div>
                  )}

                  <div>
                    <label htmlFor="hp_contact_email" className="block text-xs font-medium text-slate-600 mb-1">
                      Email Address *
                    </label>
                    <input
                      id="hp_contact_email"
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="Your email address"
                      className="w-full bg-transparent border-b border-slate-400/70 pb-2 text-sm text-[#0B2B26] placeholder:text-slate-400 focus:outline-hidden focus:border-[#0B2B26]"
                    />
                  </div>

                  <div>
                    <label htmlFor="hp_contact_msg" className="block text-xs font-medium text-slate-600 mb-1">
                      Message *
                    </label>
                    <textarea
                      id="hp_contact_msg"
                      rows={3}
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="How can we assist you or your family?"
                      className="w-full bg-transparent border-b border-slate-400/70 pb-2 text-sm text-[#0B2B26] placeholder:text-slate-400 focus:outline-hidden focus:border-[#0B2B26] resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white font-medium text-sm transition-all cursor-pointer shadow-xs"
                    >
                      Send Message
                    </button>
                    <p className="text-[11px] text-slate-500 mt-3 text-center leading-snug">
                      Your privacy is protected. Submitted information is strictly used to answer your inquiry in accordance with our{' '}
                      <button
                        type="button"
                        onClick={() => onNavigate('privacy')}
                        className="text-[#0B2B26] font-semibold underline cursor-pointer"
                      >
                        Privacy Policy
                      </button>.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
