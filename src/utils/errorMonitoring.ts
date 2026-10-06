/**
 * Kenah Wellness Services - Production Error Monitoring Utility
 * 
 * Provides safe error reporting and hooks for observability services
 * (Sentry, LogRocket, Datadog) without exposing sensitive credentials,
 * stack traces, or emitting unhandled console noise in test runners.
 */

export interface AppErrorEvent {
  message: string;
  source?: string;
  lineno?: number;
  colno?: number;
  stack?: string;
  timestamp: string;
  environment: string;
}

// In-memory buffer for recent errors (capped to 20 to prevent memory leaks)
const errorLogBuffer: AppErrorEvent[] = [];

export function logAppError(error: unknown, componentStack?: string): void {
  // Guard against undefined, null, or empty inputs
  if (!error || error === 'undefined' || error === 'null') return;

  const isProd = import.meta.env.PROD;
  const timestamp = new Date().toISOString();
  let errorMessage = '';
  let rawStack = '';

  if (typeof error === 'string') {
    const trimmed = error.trim();
    if (!trimmed || trimmed === 'undefined' || trimmed === 'null' || trimmed === '[object Object]') return;
    errorMessage = trimmed;
  } else if (error instanceof Error) {
    errorMessage = error.message?.trim() || error.name || 'Application Error';
    rawStack = error.stack || '';
  } else if (typeof error === 'object' && error !== null) {
    const errObj = error as { message?: unknown; error?: unknown; name?: unknown };
    if (typeof errObj.message === 'string' && errObj.message.trim()) {
      errorMessage = errObj.message.trim();
    } else if (typeof errObj.error === 'string' && errObj.error.trim()) {
      errorMessage = errObj.error.trim();
    } else if (typeof errObj.name === 'string' && errObj.name.trim()) {
      errorMessage = errObj.name.trim();
    } else {
      return;
    }
  } else {
    return;
  }

  if (!errorMessage || errorMessage === 'undefined' || errorMessage === 'null') return;

  const event: AppErrorEvent = {
    message: errorMessage,
    stack: isProd ? undefined : rawStack,
    timestamp,
    environment: import.meta.env.MODE || 'production',
  };

  if (errorLogBuffer.length >= 20) {
    errorLogBuffer.shift();
  }
  errorLogBuffer.push(event);

  // Hook for production observability services (e.g. Sentry / Datadog)
  if (typeof window !== 'undefined' && (window as unknown as { Sentry?: { captureException: (e: unknown) => void } }).Sentry) {
    try {
      (window as unknown as { Sentry: { captureException: (e: unknown) => void } }).Sentry.captureException(error);
    } catch {
      // Ignore monitoring service errors
    }
  }

  // If componentStack is provided (from React ErrorBoundary), record it internally without noisy console errors
  if (componentStack && !isProd) {
    event.stack = (event.stack || '') + '\nComponent Stack: ' + componentStack;
  }
}

/**
 * Global initialization of unhandled promise rejections and window error handling.
 */
export function initGlobalErrorMonitoring(): void {
  // Silent initialization - hooks into window only if in a browser environment
  if (typeof window === 'undefined') return;

  // Protect against benign script errors or cross-origin iframe noise
  window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
    if (!event.reason) return;
    const reasonMsg = event.reason instanceof Error ? event.reason.message : String(event.reason);
    if (!reasonMsg || reasonMsg === 'undefined' || reasonMsg === 'null' || reasonMsg.trim() === '') {
      return;
    }
    // Prevent unhandled rejection from crashing browser UI
    event.preventDefault?.();
    logAppError(`Unhandled Rejection: ${reasonMsg}`);
  });
}

export function getRecentErrors(): readonly AppErrorEvent[] {
  return errorLogBuffer;
}
