import React, { useState } from 'react';
import { Search, X, ArrowRight, ShieldCheck, HeartHandshake, HelpCircle } from 'lucide-react';
import { ALL_SERVICES, FAQS, SERVICE_AREAS } from '../data/servicesData';
import { ServiceItem, PageId } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (service: ServiceItem) => void;
  onNavigate: (page: PageId) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectService,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const matchingServices = cleanQuery
    ? ALL_SERVICES.filter(
        (s) =>
          s.title.toLowerCase().includes(cleanQuery) ||
          s.shortDesc.toLowerCase().includes(cleanQuery) ||
          s.bulletPoints.some((b) => b.toLowerCase().includes(cleanQuery))
      )
    : ALL_SERVICES.slice(0, 4);

  const matchingFaqs = cleanQuery
    ? FAQS.filter(
        (f) =>
          f.question.toLowerCase().includes(cleanQuery) ||
          f.answer.toLowerCase().includes(cleanQuery)
      )
    : FAQS.slice(0, 3);

  const matchingTownships = cleanQuery
    ? SERVICE_AREAS.filter((a) => a.name.toLowerCase().includes(cleanQuery)).slice(0, 4)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Home Care, ODP Waiver services, In-Home vs Out-of-Home Respite, FAQs..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="p-6 overflow-y-auto space-y-6 text-left">
          {/* Services Results */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Services & Supports {matchingServices.length > 0 && `(${matchingServices.length})`}
              </span>
              <span className="text-[11px] text-slate-500">Home Care & ODP Waiver</span>
            </div>

            {matchingServices.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No matching services found.</p>
            ) : (
              <div className="space-y-2">
                {matchingServices.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => {
                      onSelectService(service);
                      onClose();
                    }}
                    className="w-full p-3 rounded-2xl border border-slate-150 hover:border-amber-300 hover:bg-amber-50/40 transition-all text-left flex items-start justify-between gap-3 group cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 group-hover:text-amber-700">
                          {service.title}
                        </span>
                        <span
                          className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                            service.category === 'odp-waiver'
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-blue-50 text-blue-900'
                          }`}
                        >
                          {service.category === 'odp-waiver' ? 'PA ODP Waiver' : 'Home Care'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-1">
                        {service.shortDesc}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-transform shrink-0 mt-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Township Matches */}
          {matchingTownships.length > 0 && (
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Service Area Matches
              </span>
              <div className="flex flex-wrap gap-2">
                {matchingTownships.map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onNavigate('contact');
                      onClose();
                    }}
                    className="text-xs px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-800 font-medium transition-colors cursor-pointer"
                  >
                    {t.name} ({t.county})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* FAQs */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
              Helpful Answers & FAQs
            </span>
            <div className="space-y-2">
              {matchingFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-150 text-xs"
                >
                  <div className="font-semibold text-slate-900 mb-1 flex items-start gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{faq.question}</span>
                  </div>
                  <p className="text-slate-600 line-clamp-2 pl-5 whitespace-pre-line">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500">
          Tip: You can also reach our care team 24/7 at <a href="tel:+14125461860" className="text-slate-900 font-semibold hover:underline">+1 (412) 546-1860</a>
        </div>
      </div>
    </div>
  );
};
