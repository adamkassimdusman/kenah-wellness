/**
 * Kenah Wellness Services - Production Error Monitoring Utility
 * 
 * Provides safe error reporting and hooks for observability services
 * (Sentry, LogRocket, Datadog) without exposing sensitive credentials or stack traces.
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

export function logAppError(error: Error | string, componentStack?: string): void {
  const isProd = import.meta.env.PROD;
  const timestamp = new Date().toISOString();
  const errorMessage = typeof error === 'string' ? error : error.message;
  const rawStack = typeof error === 'string' ? '' : error.stack || '';

  const event: AppErrorEvent = {
    message: errorMessage,
    stack: isProd ? undefined : rawStack, // Don't expose stack traces to end-users or clients
    timestamp,
    environment: import.meta.env.MODE || 'production',
  };

  if (errorLogBuffer.length >= 20) {
    errorLogBuffer.shift();
  }
  errorLogBuffer.push(event);

  // Hook for production observability services (e.g. Sentry / Datadog)
  // If a global monitoring object or window.reportError is present, invoke it safely
  if (typeof window !== 'undefined' && (window as unknown as { Sentry?: { captureException: (e: unknown) => void } }).Sentry) {
    try {
      (window as unknown as { Sentry: { captureException: (e: unknown) => void } }).Sentry.captureException(error);
    } catch {
      // Ignore monitoring failures
    }
  }

  // Safe developer logging in development mode only
  if (!isProd) {
    // eslint-disable-next-line no-console
    console.error('[Kenah Error Monitor]', errorMessage, componentStack);
  }
}

/**
 * Global initialization of unhandled promise rejections and window error handling.
 */
export function initGlobalErrorMonitoring(): void {
  if (typeof window === 'undefined') return;

  window.addEventListener('error', (event) => {
    logAppError(event.error || event.message);
  });

  window.addEventListener('unhandledrejection', (event) => {
    logAppError(`Unhandled Rejection: ${event.reason?.message || event.reason}`);
  });
}

export function getRecentErrors(): readonly AppErrorEvent[] {
  return errorLogBuffer;
}
