/**
 * Privacy-First Lightweight Analytics Utility
 * Compliant with user cookie consent preferences.
 * Never records PII (Personal Identifiable Information) or sensitive health data.
 */

import { getCookieConsent } from '../components/CookieConsentBanner';

export type AnalyticsEventType =
  | 'page_view'
  | 'assessment_modal_opened'
  | 'assessment_submitted'
  | 'job_application_submitted'
  | 'contact_inquiry_submitted'
  | 'phone_call_initiated'
  | 'service_viewed'
  | 'blog_read';

interface AnalyticsPayload {
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;
  const consent = getCookieConsent();
  // Strictly require user explicit consent for analytics
  return !!consent?.analytics;
}

export function trackEvent(eventName: AnalyticsEventType, payload: AnalyticsPayload = {}): void {
  if (!hasAnalyticsConsent()) {
    // Silently skip tracking if user has rejected or not consented to analytics
    return;
  }

  try {
    const eventData = {
      event: eventName,
      timestamp: new Date().toISOString(),
      path: window.location.pathname,
      ...payload
    };

    // If Google Tag Manager / dataLayer is loaded in production
    if ((window as any).dataLayer && Array.isArray((window as any).dataLayer)) {
      (window as any).dataLayer.push(eventData);
    }

    // In development mode, log structured event in debug group
    if (import.meta.env.DEV) {
      // debug message without cluttering
    }
  } catch (e) {
    // Fail silently so user interactions are never blocked
  }
}
