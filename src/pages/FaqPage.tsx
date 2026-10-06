import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Search, Plus, Minus, HelpCircle, Phone } from 'lucide-react';
import { FAQS } from '../data/servicesData';
import { PageId } from '../types';

interface FaqPageProps {
  onNavigate: (page: PageId) => void;
  onOpenAssessment: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate, onOpenAssessment }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'odp' | 'home-care' | 'eligibility'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-3']);

  const toggleFaq = (id: string) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((item) => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCat = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-16 pb-24 text-left font-sans">
      <Breadcrumbs items={[{ label: 'Frequently Asked Questions' }]} onNavigate={onNavigate} />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="rounded-[36px] sm:rounded-[44px] bg-[#F8EDE2] p-8 sm:p-14 border border-[#EADBCC] relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block">
              QUESTIONS & GUIDANCE
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B2B26] font-display tracking-tight text-balance leading-[1.12]">
              Frequently Asked Questions
            </h1>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl pt-1">
              Find answers to common questions about our services, Pennsylvania ODP Consolidated Waiver, Respite options, Habilitation (HAB), Community Participation Support (CPS), and Home Care.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 space-y-6">
        <div className="space-y-4">
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by topic (e.g. Respite, HAB, Consolidated Waiver, Home Care)..."
              className="w-full text-xs sm:text-sm rounded-2xl border border-slate-200 pl-11 pr-4 py-3.5 bg-white shadow-2xs focus:outline-hidden focus:border-[#0B2B26]"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'odp', label: 'Pennsylvania ODP Waiver' },
              { id: 'home-care', label: 'Home Care Services' },
              { id: 'eligibility', label: 'Eligibility & Getting Started' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-[#0B2B26] text-white shadow-2xs'
                    : 'bg-[#FAF4EE] hover:bg-slate-100 text-slate-700 border border-slate-200/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* FAQs List matching Home.svg style */}
        <div className="pt-4 divide-y divide-slate-200">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
              <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">No matching questions found.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
                className="text-xs font-semibold text-[#0B2B26] underline"
              >
                Clear search filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div key={faq.id} className="py-5 text-left">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group"
                  >
                    <span className="font-semibold text-base text-slate-900 group-hover:text-[#0B2B26] transition-colors">
                      {faq.question}
                    </span>
                    <span className="w-6 h-6 flex items-center justify-center text-slate-800 shrink-0">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pt-3 text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line pr-8">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Still Have Questions Box */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="rounded-[32px] bg-[#0B2B26] text-white p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-display">
              Have More Questions?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Our clinical and waiver intake team is available 24/7 to discuss your family’s situation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:+14125461860"
              className="px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-[#0B2B26] font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Call +1 (412) 546-1860
            </a>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-full border border-slate-600 hover:border-slate-400 text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Send Message
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
