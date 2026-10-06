import React, { Component, ErrorInfo, ReactNode } from 'react';
import { logAppError } from '../utils/errorMonitoring';
import { AlertCircle, RefreshCw, Home, HeartHandshake } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorId: string;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorId: ''
  };

  public static getDerivedStateFromError(): State {
    const errorId = `ERR-${Math.floor(100000 + Math.random() * 900000)}`;
    return { hasError: true, errorId };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logAppError(error, errorInfo.componentStack || undefined);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF4EE] flex items-center justify-center p-6 text-slate-800">
          <div className="max-w-lg w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-[#EADBCC] text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EADBCC]/50 text-[#0B2B26] text-xs font-semibold">
                <HeartHandshake className="w-3.5 h-3.5 text-[#C49A45]" />
                Kenah Wellness Services
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B2B26]">
                Something Unexpected Occurred
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                We apologize for the inconvenience. Our support and clinical team have been notified. You can safely refresh the page or return to the main portal.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 font-mono">
              Reference Code: <span className="font-bold text-slate-700">{this.state.errorId}</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>

              <button
                type="button"
                onClick={this.handleGoHome}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#FAF4EE] hover:bg-[#EADBCC] text-[#0B2B26] text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border border-[#EADBCC] transition-colors cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Return to Homepage</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400">
              Need immediate care coordination assistance? Call us directly at{' '}
              <a href="tel:4125461860" className="underline font-bold text-slate-600">
                (412) 546-1860
              </a>.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
