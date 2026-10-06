import React, { useState, useEffect } from 'react';
import { Cookie, Shield, Check, X, Sliders, ExternalLink } from 'lucide-react';
import { CookieConsentPreferences, PageId } from '../types';

const STORAGE_KEY = 'kenah_cookie_consent';
export const COOKIE_CONSENT_EVENT = 'kenah_cookie_consent_updated';

export function getCookieConsent(): CookieConsentPreferences | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function saveCookieConsent(prefs: CookieConsentPreferences): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: prefs }));
    }
  } catch (e) {
    console.error('Failed to save cookie preferences', e);
  }
}

interface CookieConsentBannerProps {
  onNavigate: (page: PageId) => void;
  forceOpenModal?: boolean;
  onCloseModal?: () => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onNavigate,
  forceOpenModal = false,
  onCloseModal
}) => {
  const [hasDecided, setHasDecided] = useState<boolean>(true); // start true to avoid layout flicker
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  // Preferences state
  const [analyticsAllowed, setAnalyticsAllowed] = useState<boolean>(true);
  const [marketingAllowed, setMarketingAllowed] = useState<boolean>(false);

  useEffect(() => {
    const existing = getCookieConsent();
    if (!existing) {
      setHasDecided(false);
    } else {
      setAnalyticsAllowed(existing.analytics);
      setMarketingAllowed(existing.marketing);
    }
  }, []);

  useEffect(() => {
    if (forceOpenModal) {
      setIsModalOpen(true);
    }
  }, [forceOpenModal]);

  const handleAcceptAll = () => {
    const prefs: CookieConsentPreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    };
    saveCookieConsent(prefs);
    setHasDecided(true);
    setIsModalOpen(false);
    if (onCloseModal) onCloseModal();
  };

  const handleRejectNonEssential = () => {
    const prefs: CookieConsentPreferences = {
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    };
    saveCookieConsent(prefs);
    setHasDecided(true);
    setIsModalOpen(false);
    if (onCloseModal) onCloseModal();
  };

  const handleSaveCustom = () => {
    const prefs: CookieConsentPreferences = {
      essential: true,
      analytics: analyticsAllowed,
      marketing: marketingAllowed,
      timestamp: new Date().toISOString()
    };
    saveCookieConsent(prefs);
    setHasDecided(true);
    setIsModalOpen(false);
    if (onCloseModal) onCloseModal();
  };

  return (
    <>
      {/* Floating Bottom Banner (only shown if not yet decided and modal not open) */}
      {!hasDecided && !isModalOpen && (
        <aside
          role="dialog"
          aria-label="Cookie consent banner"
          aria-describedby="cookie-desc"
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xl z-50 animate-in slide-in-from-bottom-4 duration-300"
        >
          <div className="bg-[#0B2B26] text-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-white/20 text-left">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-white/10 text-[#E89A24] flex items-center justify-center shrink-0 mt-0.5">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-sm font-bold font-display tracking-tight text-white flex items-center gap-2">
                  <span>Your Privacy & Cookie Choices</span>
                </h3>
                <p id="cookie-desc" className="text-xs text-slate-200 leading-relaxed">
                  We use essential cookies to ensure our website functions securely and reliably. With your consent, we also use anonymous analytics to improve client intake experiences.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleAcceptAll}
                    className="px-4 py-2 rounded-full bg-[#E89A24] hover:bg-[#d68a18] active:scale-95 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={handleRejectNonEssential}
                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs font-semibold border border-white/20 transition-all cursor-pointer"
                  >
                    Reject Non-Essential
                  </button>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-3.5 py-2 rounded-full text-slate-300 hover:text-white text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Sliders className="w-3 h-3" />
                    <span>Customize</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Preferences Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
        >
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col text-left font-sans">
            {/* Modal Header */}
            <div className="px-6 py-5 bg-[#0B2B26] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-[#E89A24]" />
                <h2 id="cookie-modal-title" className="text-base font-bold font-display">
                  Cookie & Privacy Preferences
                </h2>
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  if (onCloseModal) onCloseModal();
                }}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
                aria-label="Close preferences"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600">
              <p className="leading-relaxed">
                Choose which categories of cookies you allow while visiting Kenah Wellness Services. You can review our full{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    if (onCloseModal) onCloseModal();
                    onNavigate('privacy');
                  }}
                  className="text-[#0B2B26] font-bold underline cursor-pointer"
                >
                  Privacy Policy
                </button>{' '}
                for details on our HIPAA awareness and confidentiality practices.
              </p>

              {/* Category 1: Essential */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Strictly Necessary (Always Active)
                  </strong>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Required
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Essential for basic site navigation, security verification, and remembering your assessment questionnaire progress. These cannot be switched off.
                </p>
              </div>

              {/* Category 2: Analytics */}
              <div className="p-4 rounded-2xl border border-slate-200 space-y-1.5 hover:border-slate-300 transition-colors">
                <div className="flex items-center justify-between">
                  <label htmlFor="analytics-toggle" className="text-xs font-bold uppercase tracking-wider text-slate-900 cursor-pointer">
                    Analytics & Performance
                  </label>
                  <input
                    type="checkbox"
                    id="analytics-toggle"
                    checked={analyticsAllowed}
                    onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                    className="w-4 h-4 text-[#0B2B26] rounded focus:ring-[#0B2B26] cursor-pointer"
                  />
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Helps us anonymously understand how families find and navigate our home care and ODP waiver resources, allowing us to enhance service delivery.
                </p>
              </div>

              {/* Category 3: Marketing */}
              <div className="p-4 rounded-2xl border border-slate-200 space-y-1.5 hover:border-slate-300 transition-colors">
                <div className="flex items-center justify-between">
                  <label htmlFor="marketing-toggle" className="text-xs font-bold uppercase tracking-wider text-slate-900 cursor-pointer">
                    Personalized Community Outreach
                  </label>
                  <input
                    type="checkbox"
                    id="marketing-toggle"
                    checked={marketingAllowed}
                    onChange={(e) => setMarketingAllowed(e.target.checked)}
                    className="w-4 h-4 text-[#0B2B26] rounded focus:ring-[#0B2B26] cursor-pointer"
                  />
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Allows relevant care guides and announcements to be surfaced when visiting community partner platforms.
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="px-4 py-2 rounded-full border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Reject All Non-Essential
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="px-5 py-2 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Save Preferences
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-5 py-2 rounded-full bg-[#E89A24] hover:bg-[#d68a18] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
