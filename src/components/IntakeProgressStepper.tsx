import React from 'react';
import { Check, Clock, Sparkles } from 'lucide-react';

export interface StepItem {
  id: number;
  title: string;
  subtitle: string;
  shortLabel: string;
}

interface IntakeProgressStepperProps {
  currentStep: number;
  totalSteps?: number;
  onStepClick: (step: number) => void;
  className?: string;
}

export const INTAKE_STEPS: StepItem[] = [
  {
    id: 1,
    title: 'Care & Recipient',
    subtitle: 'Who & services needed',
    shortLabel: 'Care Needs'
  },
  {
    id: 2,
    title: 'Schedule & Location',
    subtitle: 'Weekly hours & PA county',
    shortLabel: 'Schedule'
  },
  {
    id: 3,
    title: 'Contact & Review',
    subtitle: 'Direct contact & intake',
    shortLabel: 'Contact'
  }
];

export const IntakeProgressStepper: React.FC<IntakeProgressStepperProps> = ({
  currentStep,
  totalSteps = 3,
  onStepClick,
  className = ''
}) => {
  const percentage = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100) || 0;
  // If at step 1, 33%, step 2: 67%, step 3: 100%
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className={`w-full bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs ${className}`}>
      {/* Top Meta Status Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-slate-100 text-xs">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F7F4] text-[#0B2B26] font-bold text-xs">
            <span className="w-2 h-2 rounded-full bg-[#E89A24] animate-pulse" />
            <span>Step {currentStep} of {totalSteps}</span>
          </span>
          <span className="text-slate-600 font-semibold hidden sm:inline">
            Intake Assessment Progress
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-500 font-medium text-xs">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#0B2B26]" />
            <span>~2 min to complete</span>
          </span>
          <span className="font-bold text-[#0B2B26] bg-slate-100 px-2.5 py-1 rounded-lg">
            {progressPercent}% Complete
          </span>
        </div>
      </div>

      {/* Visual Animated Progress Bar */}
      <div className="relative w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-gradient-to-r from-[#0B2B26] via-[#4EBAA8] to-[#E89A24] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Visual Stepper Nodes & Track */}
      <div className="relative">
        {/* Background Connecting Line */}
        <div className="hidden sm:block absolute top-5 left-10 right-10 h-0.5 bg-slate-200 -z-0" />
        <div
          className="hidden sm:block absolute top-5 left-10 h-0.5 bg-[#0B2B26] transition-all duration-500 -z-0"
          style={{
            width: `${Math.max(0, ((currentStep - 1) / (totalSteps - 1)) * 100)}%`
          }}
        />

        {/* Steps Grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 relative z-10">
          {INTAKE_STEPS.map((step) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            const isPending = currentStep < step.id;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  // Allow jumping to completed steps or current step
                  if (isCompleted || isCurrent) {
                    onStepClick(step.id);
                  }
                }}
                disabled={isPending}
                className={`group text-center sm:text-left flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3.5 p-2 sm:p-3 rounded-2xl transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[#FAF4EE] border border-[#EADBCC]'
                    : isCompleted
                    ? 'hover:bg-slate-50 cursor-pointer'
                    : 'opacity-60 cursor-not-allowed'
                }`}
              >
                {/* Step Circle / Badge */}
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-xs sm:text-sm transition-all shadow-2xs ${
                    isCompleted
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-50'
                      : isCurrent
                      ? 'bg-[#0B2B26] text-white ring-4 ring-[#0B2B26]/15 scale-105'
                      : 'bg-white border-2 border-slate-300 text-slate-500'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  ) : (
                    <span>0{step.id}</span>
                  )}
                </div>

                {/* Step Text Info */}
                <div className="text-left w-full">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-xs font-bold leading-tight block ${
                        isCurrent
                          ? 'text-[#0B2B26]'
                          : isCompleted
                          ? 'text-slate-800'
                          : 'text-slate-500'
                      }`}
                    >
                      <span className="hidden sm:inline">{step.title}</span>
                      <span className="sm:hidden">{step.shortLabel}</span>
                    </span>

                    {isCompleted && (
                      <span className="hidden lg:inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-md">
                        Done
                      </span>
                    )}
                    {isCurrent && (
                      <span className="hidden lg:inline-block text-[10px] font-bold text-[#E89A24] bg-amber-50 px-1.5 py-0.2 rounded-md">
                        Active
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-500 hidden sm:block truncate mt-0.5">
                    {step.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
