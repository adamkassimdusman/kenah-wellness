import React, { useState, useEffect } from 'react';
import {
  Star,
  Quote,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Heart,
  LayoutGrid,
  SlidersHorizontal,
  MapPin,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  serviceCategory: 'Home Care' | 'Senior & Respite' | 'Post-Op Recovery' | 'PA ODP Waiver';
  serviceName: string;
  rating: number;
  date: string;
  verified: boolean;
  highlight: string;
}

// Genuine family feedback sourced from kenahwellness.com
export const REAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'robert-t',
    author: 'Robert T.',
    role: 'Family Member & Primary Contact',
    location: 'Allison Park, PA',
    serviceCategory: 'Home Care',
    serviceName: 'Companionship & Daily Living Care',
    rating: 5,
    date: 'February 2025',
    verified: true,
    highlight: 'Matched us with a caregiver who feels like family',
    quote:
      'From the very first phone call, the Kenah Wellness team listened carefully to our family’s needs and matched us with a caregiver who feels like family. They are reliable, compassionate, and always communicative. We couldn’t have asked for better home care in Allegheny County.'
  },
  {
    id: 'jessica-clark',
    author: 'Jessica Clark',
    role: 'Daughter of Senior Client',
    location: 'Allison Park, PA',
    serviceCategory: 'Senior & Respite',
    serviceName: 'Senior Care & Personal Assistance',
    rating: 5,
    date: 'January 2025',
    verified: true,
    highlight: 'Kenah Wellness Services has been a true blessing',
    quote:
      'Kenah Wellness Services has been an absolute blessing for our family. Their caregivers are kind, patient, and always reliable. Knowing my mother is in caring, safe hands gives all of us immense comfort and peace of mind every single day.'
  },
  {
    id: 'carlos-moya',
    author: 'Carlos Moya',
    role: 'Son of Recovering Patient',
    location: 'Pittsburgh, PA',
    serviceCategory: 'Post-Op Recovery',
    serviceName: 'Post-Surgery & Rehabilitation Support',
    rating: 5,
    date: 'November 2024',
    verified: true,
    highlight: 'Went above and beyond assisting my father’s recovery',
    quote:
      'The Kenah Wellness team went above and beyond in assisting my father’s recovery after his surgery. Their clinical professionalism, respect, and deep compassion made all the difference in his healing process at home. Outstanding team!'
  },
  {
    id: 'sarah-k',
    author: 'Sarah K.',
    role: 'Working Caregiver',
    location: 'Hampton Township, PA',
    serviceCategory: 'Senior & Respite',
    serviceName: 'In-Home Respite Care',
    rating: 5,
    date: 'October 2024',
    verified: true,
    highlight: 'Stepped in without hesitation when I had to travel',
    quote:
      'Kenah Wellness stepped in without hesitation when I needed reliable respite care while traveling for work. Their direct support staff treated my grandmother with the utmost dignity, kindness, and attentiveness. We are forever grateful.'
  },
  {
    id: 'michael-elena-r',
    author: 'Michael & Elena R.',
    role: 'Parents of Individual with ID/A',
    location: 'Cranberry Township, PA',
    serviceCategory: 'PA ODP Waiver',
    serviceName: 'ODP Consolidated Waiver & CPS',
    rating: 5,
    date: 'December 2024',
    verified: true,
    highlight: 'Genuinely understands person-centered planning & inclusion',
    quote:
      'Finding an ODP provider that genuinely understands person-centered planning and community inclusion was a game changer for our son. He looks forward to his community participation support days every single week. Highly recommend Kenah Wellness!'
  },
  {
    id: 'david-m',
    author: 'David & Linda M.',
    role: 'Family Caregivers',
    location: 'North Hills, Pittsburgh, PA',
    serviceCategory: 'Home Care',
    serviceName: 'Dementia Care & Specialized Support',
    rating: 5,
    date: 'January 2025',
    verified: true,
    highlight: 'Preserved my father’s dignity with trained expertise',
    quote:
      'Managing dementia care was becoming overwhelming until we partnered with Kenah Wellness. Their aides approach each day with calm, trained expertise and heartfelt empathy. They have helped preserve my father’s dignity and independence at home.'
  }
];

interface TestimonialsProps {
  onOpenAssessment?: () => void;
  className?: string;
}

export const Testimonials: React.FC<TestimonialsProps> = ({
  onOpenAssessment,
  className = ''
}) => {
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const categories = ['All', 'Home Care', 'Senior & Respite', 'Post-Op Recovery', 'PA ODP Waiver'];

  const filteredTestimonials =
    activeCategory === 'All'
      ? REAL_TESTIMONIALS
      : REAL_TESTIMONIALS.filter((t) => t.serviceCategory === activeCategory);

  // Auto advance carousel if not paused
  useEffect(() => {
    if (viewMode !== 'carousel' || !isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [viewMode, isAutoPlaying, filteredTestimonials.length]);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? filteredTestimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const activeItem = filteredTestimonials[currentIndex] || filteredTestimonials[0];
  const nextItem =
    filteredTestimonials[(currentIndex + 1) % filteredTestimonials.length];

  return (
    <section
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left ${className}`}
      aria-label="Family and Client Testimonials"
    >
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F4] text-[#0B2B26] text-xs font-bold uppercase tracking-wider border border-[#0B2B26]/10">
            <Sparkles className="w-3.5 h-3.5 text-[#E89A24]" />
            <span>Real Family Social Proof</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2B26] tracking-tight font-display leading-[1.15]">
            Trusted by Families Across Pennsylvania
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Real feedback from individuals and families in Allegheny, Butler, and Washington counties who rely on Kenah Wellness for compassionate home care and ODP waiver supports.
          </p>
        </div>

        {/* View Mode & Rating Pill */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Aggregate Rating Badge */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#FAF4EE] border border-[#EADBCC] shadow-2xs">
            <div className="flex items-center text-[#E89A24]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#E89A24]" />
              ))}
            </div>
            <div className="text-left text-xs font-bold text-[#0B2B26] leading-tight">
              <span>4.9 / 5.0</span>
              <span className="block text-[10px] text-slate-500 font-medium">
                Verified Reviews
              </span>
            </div>
          </div>

          {/* Toggle View Mode */}
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button
              onClick={() => setViewMode('carousel')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'carousel'
                  ? 'bg-white text-[#0B2B26] shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Carousel View"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Carousel</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-[#0B2B26] shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>All Reviews</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Pills (Active in both modes) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 sm:mb-8 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#0B2B26] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-slate-200/60'
            }`}
          >
            {cat === 'All' ? 'All Feedback' : cat}
          </button>
        ))}
      </div>

      {/* CAROUSEL VIEW */}
      {viewMode === 'carousel' && (
        <div
          className="space-y-6"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Primary Featured Card */}
            <div className="lg:col-span-7 bg-[#FAF4EE] border border-[#EADBCC] rounded-3xl sm:rounded-[36px] p-7 sm:p-10 flex flex-col justify-between shadow-sm relative overflow-hidden">
              <Quote className="absolute top-6 right-6 w-16 h-16 text-[#EADBCC]/60 pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-[#E89A24]">
                    {[...Array(activeItem.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#E89A24]" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E6F7F4] text-[#0B2B26] text-[11px] font-bold border border-[#0B2B26]/10">
                    <CheckCircle2 className="w-3 h-3 text-[#4EBAA8]" />
                    <span>Verified Family Review</span>
                  </span>
                </div>

                <div className="inline-block px-3 py-1 rounded-lg bg-white/80 text-[#0B2B26] text-xs font-bold border border-slate-200">
                  {activeItem.serviceName}
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B2B26] font-display">
                  “{activeItem.highlight}”
                </h3>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic">
                  “{activeItem.quote}”
                </p>
              </div>

              <div className="pt-6 sm:pt-8 border-t border-[#EADBCC]/80 flex flex-wrap items-center justify-between gap-4 relative z-10">
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-[#0B2B26]">
                    {activeItem.author}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium">
                    {activeItem.role}
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#E89A24]" />
                    <span>{activeItem.location} • {activeItem.date}</span>
                  </p>
                </div>

                {onOpenAssessment && (
                  <button
                    onClick={onOpenAssessment}
                    className="px-5 py-2.5 rounded-full bg-[#E89A24] hover:bg-[#d68a18] text-white font-bold text-xs shadow-xs active:scale-95 transition-all cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Free Assessment</span>
                  </button>
                )}
              </div>
            </div>

            {/* Secondary Preview Card (Dark Forest Brand Aesthetic) */}
            <div className="lg:col-span-5 bg-[#0B2B26] text-white rounded-3xl sm:rounded-[36px] p-7 sm:p-10 flex flex-col justify-between shadow-sm relative overflow-hidden">
              <Quote className="absolute top-6 right-6 w-16 h-16 text-white/10 pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-[#E89A24]">
                    {[...Array(nextItem.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#E89A24]" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-300">
                    Next Story
                  </span>
                </div>

                <div className="inline-block px-3 py-1 rounded-lg bg-white/10 text-white text-xs font-semibold border border-white/15">
                  {nextItem.serviceName}
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                  “{nextItem.highlight}”
                </h3>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic line-clamp-4">
                  “{nextItem.quote}”
                </p>
              </div>

              <div className="pt-6 border-t border-white/15 flex items-center justify-between gap-4 relative z-10">
                <div>
                  <h4 className="font-bold text-sm text-white">
                    {nextItem.author}
                  </h4>
                  <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#E89A24]" />
                    <span>{nextItem.location}</span>
                  </p>
                </div>

                <button
                  onClick={handleNext}
                  className="px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-1"
                >
                  <span>View Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Carousel Controls & Pagination Dots */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              {filteredTestimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx
                      ? 'w-8 bg-[#0B2B26]'
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-slate-300 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 shadow-2xs hover:border-slate-800 transition-colors cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white flex items-center justify-center shadow-2xs transition-colors cursor-pointer"
                aria-label="Next testimonial"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all group"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-[#E89A24]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#E89A24]" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-[#0B2B26] bg-[#E6F7F4] px-2 py-0.5 rounded-full">
                    {item.serviceCategory}
                  </span>
                </div>

                <div className="text-xs font-semibold text-[#0B2B26] line-clamp-1">
                  {item.serviceName}
                </div>

                <h4 className="font-bold text-sm text-[#0B2B26] font-display">
                  “{item.highlight}”
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                  “{item.quote}”
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="font-bold text-xs text-[#0B2B26]">{item.author}</p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#E89A24]" />
                    <span>{item.location}</span>
                  </p>
                </div>
                <div className="w-7 h-7 rounded-full bg-[#FAF4EE] flex items-center justify-center text-[#0B2B26]">
                  <CheckCircle2 className="w-4 h-4 text-[#4EBAA8]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Trust Footnote */}
      <div className="mt-10 rounded-2xl bg-slate-50 border border-slate-200/80 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#E6F7F4] flex items-center justify-center text-[#0B2B26] shrink-0">
            <ShieldCheck className="w-5 h-5 text-[#4EBAA8]" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-bold text-[#0B2B26]">
              Licensed by PA Department of Human Services & PA Department of Health
            </p>
            <p className="text-[11px] text-slate-500">
              Provider of Consolidated Waiver, Community Living Waiver, and Private Home Care services in PA.
            </p>
          </div>
        </div>

        {onOpenAssessment && (
          <button
            onClick={onOpenAssessment}
            className="px-5 py-2.5 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white text-xs font-bold transition-all shadow-xs cursor-pointer self-start sm:self-auto shrink-0"
          >
            Start Free Assessment →
          </button>
        )}
      </div>
    </section>
  );
};
