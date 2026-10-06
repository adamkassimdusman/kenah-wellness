import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Star, Quote, Heart, MapPin, Calendar, CheckCircle2, MessageSquare, Send } from 'lucide-react';
import { PageId, TestimonialItem } from '../types';

interface TestimonialsPageProps {
  onNavigate: (page: PageId) => void;
  onOpenAssessment: () => void;
}

const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    author: 'Margaret & David S.',
    location: 'Allison Park, PA',
    serviceType: 'Senior Home Care & Personal Assistance',
    rating: 5,
    quote:
      'Kenah Wellness has been an absolute blessing for my mother. Her caregiver is not just punctual and thoroughly professional; she treats my mother with the gentleness, warmth, and respect of a true family member. Knowing mom has loving support while I am at work brings me endless peace of mind.'
  },
  {
    id: 'test-2',
    author: 'The Gallagher Family',
    location: 'Canonsburg, PA',
    serviceType: 'Pennsylvania ODP Consolidated Waiver - In-Home Respite',
    rating: 5,
    quote:
      'Finding trustworthy, skilled respite for our 24-year-old son with autism was stressful until we connected with Kenah. Their Direct Support Professional is patient, dependable, and truly understands his sensory preferences. The coordination with our Washington County SC was completely seamless.'
  },
  {
    id: 'test-3',
    author: 'Patricia M.',
    location: 'Pittsburgh (Shadyside), PA',
    serviceType: 'Dementia Care Support',
    rating: 5,
    quote:
      'Navigating early-stage dementia with my husband felt overwhelming. The care team from Kenah introduced calming daily routines and gentle redirection techniques that dramatically reduced his afternoon agitation. They gave us back quiet, happy evenings together.'
  },
  {
    id: 'test-4',
    author: 'Marcus B.',
    location: 'Sewickley, PA',
    serviceType: 'ODP Community Participation Support (CPS)',
    rating: 5,
    quote:
      'Our daughter used to stay isolated at home all week. Through Kenah’s CPS program, she now volunteers at the local community library twice a week, attends arts classes, and has built genuine friendships. Her self-esteem and happiness have flourished beyond words.'
  },
  {
    id: 'test-5',
    author: 'Eleanor R.',
    location: 'Cranberry Township, PA',
    serviceType: 'Companionship & Meal Preparation',
    rating: 5,
    quote:
      'After my hip surgery, I was terrified of falling again and losing my independence. Kenah provided lovely companion caregivers who helped me prepare wholesome meals, kept my home spotless, and walked with me every morning. I am now thriving in my own home!'
  },
  {
    id: 'test-6',
    author: 'Thomas & Rebecca K.',
    location: 'Wexford, PA',
    serviceType: 'Family Respite & Weekend Relief',
    rating: 5,
    quote:
      'As full-time working parents caring for a family member with intellectual disabilities, burnout was becoming real. Kenah’s respite specialists gave us scheduled breathing room on weekends with complete trust that our loved one was safe, engaged, and cherished.'
  }
];

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({
  onNavigate,
  onOpenAssessment
}) => {
  const [filter, setFilter] = useState<'all' | 'senior' | 'odp'>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [serviceType, setServiceType] = useState('Senior Home Care');
  const [quote, setQuote] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const filteredTestimonials = INITIAL_TESTIMONIALS.filter((item) => {
    if (filter === 'senior') return item.serviceType.toLowerCase().includes('senior') || item.serviceType.toLowerCase().includes('dementia') || item.serviceType.toLowerCase().includes('companionship');
    if (filter === 'odp') return item.serviceType.toLowerCase().includes('odp') || item.serviceType.toLowerCase().includes('respite');
    return true;
  });

  const handleStorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot.trim()) {
      setIsFormOpen(false);
      return;
    }
    if (author.trim() && quote.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setIsFormOpen(false);
        setSubmitted(false);
        setAuthor('');
        setLocation('');
        setQuote('');
      }, 2500);
    }
  };

  return (
    <div className="space-y-16 pb-24 text-left font-sans">
      <Breadcrumbs items={[{ label: 'Client & Family Stories' }]} onNavigate={onNavigate} />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="rounded-[36px] sm:rounded-[44px] bg-[#F8EDE2] p-8 sm:p-14 border border-[#EADBCC] relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-sm text-[#0B2B26] text-xs font-bold uppercase tracking-wider border border-[#0B2B26]/10">
              <Heart className="w-3.5 h-3.5 text-[#E89A24]" />
              <span>Voice of Our Families</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B2B26] font-display tracking-tight text-balance leading-[1.12]">
              Heartfelt Stories from the Families We Serve
            </h1>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl pt-1">
              Read how Kenah Wellness Services brings peace of mind, personalized companionship, and empowering ODP supports to households throughout Canonsburg, Allison Park, Pittsburgh, and Southwestern Pennsylvania.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Share Story CTA */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            {[
              { id: 'all', label: 'All Stories' },
              { id: 'senior', label: 'Senior Home Care' },
              { id: 'odp', label: 'ODP Waiver & Respite' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filter === tab.id
                    ? 'bg-[#0B2B26] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsFormOpen(true)}
            className="px-5 py-2.5 rounded-full bg-[#E89A24] hover:bg-[#d68a18] text-white text-xs font-bold transition-all shadow-xs inline-flex items-center gap-2 cursor-pointer self-start sm:self-auto active:scale-95"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Share Your Family Story</span>
          </button>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[32px] p-7 sm:p-8 border border-slate-200/90 shadow-2xs flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="space-y-4">
                {/* Top Quote Icon & Rating */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-[#FAF4EE] text-[#0B2B26] flex items-center justify-center">
                    <Quote className="w-5 h-5 text-[#E89A24]" />
                  </div>
                  <div className="flex items-center gap-1 text-[#E89A24]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Service Badge */}
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#0B2B26] bg-[#F8EDE2] px-3 py-1 rounded-full">
                  {item.serviceType}
                </span>

                {/* Quote Body */}
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Author & Location */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <strong className="block font-bold text-slate-900 font-display">
                    {item.author}
                  </strong>
                  <span className="text-slate-500 inline-flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{item.location}</span>
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-100 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified Family</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Share Your Story Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-[32px] p-6 sm:p-10 max-w-lg w-full shadow-2xl border border-slate-100 animate-in fade-in duration-200">
            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#0B2B26] font-display">
                  Thank You for Sharing!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xs mx-auto">
                  Your heartfelt experience will be reviewed by our team and featured to encourage other local families.
                </p>
              </div>
            ) : (
              <form onSubmit={handleStorySubmit} className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-lg font-bold text-[#0B2B26] font-display">
                    Share Your Family’s Experience
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {/* Honeypot field */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="hp_story_check">Leave empty</label>
                  <input
                    type="text"
                    id="hp_story_check"
                    name="hp_story_check"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="story_author" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Your Name or Family *
                  </label>
                  <input
                    id="story_author"
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. The Anderson Family or Sarah M."
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#0B2B26]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="story_loc" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Town / Location *
                    </label>
                    <input
                      id="story_loc"
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Allison Park, PA"
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#0B2B26]"
                    />
                  </div>
                  <div>
                    <label htmlFor="story_service" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Service Received
                    </label>
                    <select
                      id="story_service"
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#0B2B26] bg-white"
                    >
                      <option>Senior Home Care</option>
                      <option>ODP Waiver In-Home Respite</option>
                      <option>Community Participation (CPS)</option>
                      <option>Dementia Care Support</option>
                      <option>Personal Care & Mobility</option>
                      <option>Companionship Care</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="story_quote" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Your Experience / Feedback *
                  </label>
                  <textarea
                    id="story_quote"
                    rows={4}
                    required
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    placeholder="Share how Kenah Wellness has helped your loved one..."
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#0B2B26]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-5 py-2.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5 text-[#E89A24]" />
                    <span>Submit Story</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="rounded-[36px] bg-[#0B2B26] text-white p-8 sm:p-14 flex flex-col sm:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 max-w-xl text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display">
              Ready to Experience the Same Dedicated Care?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Book a 100% free in-home consultation or talk to our care coordinator today.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenAssessment}
              className="px-8 py-3.5 rounded-full bg-[#E89A24] hover:bg-[#d68a18] text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center gap-2 active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Free Assessment</span>
            </button>
            <a
              href="tel:+14125461860"
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
            >
              Call +1 (412) 546-1860
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
