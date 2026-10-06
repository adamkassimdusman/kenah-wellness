import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { IntakeProgressStepper } from '../components/IntakeProgressStepper';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { PageId, AssessmentSubmission, ServiceItem } from '../types';
import {
  getStoredHomeCareServices,
  getStoredOdpServices,
  addAssessmentSubmission,
  DATA_CHANGE_EVENT
} from '../utils/storage';
import { trackEvent } from '../utils/analytics';
import { apiSubmitAssessment } from '../utils/api';

interface GetStartedPageProps {
  onNavigate: (page: PageId) => void;
  preselectedService?: string;
}

export const GetStartedPage: React.FC<GetStartedPageProps> = ({
  onNavigate,
  preselectedService = ''
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [recipient, setRecipient] = useState<string>('Parent / Senior');
  const [serviceCategory, setServiceCategory] = useState<'both' | 'home-care' | 'odp-waiver'>(
    preselectedService.includes('ODP') ? 'odp-waiver' : 'both'
  );

  // Dynamic services loaded from storage (matches exactly what is offered)
  const [homeCareServices, setHomeCareServices] = useState<ServiceItem[]>(() => getStoredHomeCareServices());
  const [odpServices, setOdpServices] = useState<ServiceItem[]>(() => getStoredOdpServices());

  useEffect(() => {
    const handleUpdate = () => {
      setHomeCareServices(getStoredHomeCareServices());
      setOdpServices(getStoredOdpServices());
    };
    window.addEventListener(DATA_CHANGE_EVENT, handleUpdate);
    return () => window.removeEventListener(DATA_CHANGE_EVENT, handleUpdate);
  }, []);

  const [selectedServices, setSelectedServices] = useState<string[]>(
    preselectedService ? [preselectedService] : ['Personal Care']
  );
  const [timeframe, setTimeframe] = useState<string>('Immediately (Within 48 hours)');
  const [hoursPerWeek, setHoursPerWeek] = useState<string>('10 - 20 hours/week');
  
  // Contact details
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [county, setCounty] = useState<string>('Allegheny County');
  const [township, setTownship] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [honeypot, setHoneypot] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [referenceCode, setReferenceCode] = useState<string>('');

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      setSelectedServices(selectedServices.filter((s) => s !== srv));
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Spam honeypot detection
    if (honeypot.trim()) {
      setIsSubmitted(true);
      return;
    }

    if (!name.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    const phoneClean = phone.replace(/\D/g, '');
    if (phoneClean.length < 10) {
      setValidationError('Please provide a valid 10-digit telephone number.');
      return;
    }

    setIsSubmitting(true);

    const res = await apiSubmitAssessment({
      name: name.trim(),
      email: email.trim(),
      phone: phoneClean,
      serviceType: serviceCategory,
      careFor: recipient,
      hp_asmt_check: honeypot.trim(),
    });

    if (!res.success && res.error) {
      setIsSubmitting(false);
      setValidationError(res.error);
      return;
    }

    const newRefCode = res.reference || `KW-START-${Math.floor(100000 + Math.random() * 900000)}`;

    const submission: AssessmentSubmission = {
      id: `asmt-${Date.now()}`,
      referenceCode: newRefCode,
      recipient,
      serviceCategory,
      selectedServices,
      timeframe,
      hoursPerWeek,
      name: name.trim() || 'Valued Client',
      phone: phone.trim(),
      email: email.trim(),
      county,
      township: township.trim() || 'Local Area',
      notes: notes.trim(),
      submittedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }) + ` at ` + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'new'
    };

    // Store in localStorage so Admin immediately receives it
    addAssessmentSubmission(submission);

    // Track analytics event with user consent
    trackEvent('assessment_submitted', {
      serviceCategory,
      selectedServicesCount: selectedServices.length,
      county
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
    setReferenceCode(newRefCode);
  };

  const stepsList = [
    {
      num: 1,
      title: 'Step 1: Contact Kenah Wellness',
      desc: 'Reach out via our simple online form or call +1 (412) 546-1860 to initiate your inquiry with our intake staff.'
    },
    {
      num: 2,
      title: 'Step 2: Discuss Support Needs',
      desc: 'We conduct a personalized consultation to review daily living goals, medical routines, and schedule preferences.'
    },
    {
      num: 3,
      title: 'Step 3: Verify Eligibility',
      desc: 'We coordinate with your county ODP Supports Coordinator or assist with private pay / insurance arrangements.'
    },
    {
      num: 4,
      title: 'Step 4: Develop Individualized Support Plan',
      desc: 'A tailored care plan or Individualized Support Plan (ISP) is crafted around your individual goals and comfort.'
    },
    {
      num: 5,
      title: 'Step 5: Begin Services',
      desc: 'We match you with vetted Direct Support Professionals and caregivers and launch care with complete continuity.'
    }
  ];

  return (
    <div className="space-y-16 pb-24 text-left font-sans">
      <Breadcrumbs items={[{ label: 'Free Assessment' }]} onNavigate={onNavigate} />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="rounded-[36px] sm:rounded-[44px] bg-[#F8EDE2] p-8 sm:p-14 border border-[#EADBCC] relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-sm text-[#0B2B26] text-xs font-bold uppercase tracking-wider border border-[#0B2B26]/10">
              <span className="w-2 h-2 rounded-full bg-[#E89A24] animate-pulse" />
              <span>100% Free In-Home or Virtual Assessment</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B2B26] font-display tracking-tight text-balance leading-[1.12]">
              Book Your Free Care Assessment
            </h1>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl pt-1">
              Start your journey toward personalized support. Our licensed coordinators conduct a thorough, complimentary evaluation to verify Pennsylvania ODP waiver eligibility, assess daily living goals, and tailor an individualized support plan.
            </p>
          </div>
        </div>
      </section>

      {/* 5-Step Process Timeline Cards */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-left mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-1">
            HOW IT WORKS
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2B26] font-display">
            The 5-Step Process
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {stepsList.map((step) => (
            <div
              key={step.num}
              className="p-6 rounded-[28px] bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <span className="w-9 h-9 rounded-full bg-[#0B2B26] text-white font-bold text-xs flex items-center justify-center mb-3">
                  0{step.num}
                </span>
                <h3 className="font-bold text-sm text-[#0B2B26] font-display">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Inquiry Form with Visual Progress Stepper */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <IntakeProgressStepper
          currentStep={currentStep}
          totalSteps={3}
          onStepClick={(step) => setCurrentStep(step)}
          className="mb-8"
        />

        <div className="bg-[#FAF4EE] border border-slate-200/90 rounded-[36px] p-6 sm:p-12 shadow-xs">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2B26] font-display">
                Intake Request Confirmed!
              </h2>
              <p className="text-sm text-slate-600 max-w-lg mx-auto">
                Thank you, <strong className="text-slate-900">{name}</strong>. Our clinical and waiver intake team will contact you within 24 hours to review your individualized support plan.
              </p>
              
              <div className="p-5 rounded-2xl bg-white border border-slate-200 max-w-md mx-auto text-xs space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-slate-500">Reference:</span>
                  <span className="font-mono font-bold text-[#0B2B26]">{referenceCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Service Line:</span>
                  <span className="font-semibold text-slate-900 capitalize">{serviceCategory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">County:</span>
                  <span className="font-semibold text-slate-900">{county}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => onNavigate('home')}
                  className="px-8 py-3 rounded-full bg-[#0B2B26] text-white font-medium text-xs hover:bg-[#071E1A] cursor-pointer"
                >
                  Return Home
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="border-b border-slate-200/80 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#E89A24]">
                    <span>Stage {currentStep} of 3</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 font-semibold lowercase">
                      {currentStep === 1 && 'needs assessment'}
                      {currentStep === 2 && 'scheduling & location'}
                      {currentStep === 3 && 'contact details'}
                    </span>
                  </span>
                  <h2 className="text-2xl font-bold text-[#0B2B26] font-display mt-0.5">
                    {currentStep === 1 && '1. Choose Services & Care Recipient'}
                    {currentStep === 2 && '2. Schedule & Location Details'}
                    {currentStep === 3 && '3. Contact Information'}
                  </h2>
                </div>
                
                <div className="flex items-center gap-2">
                  {[
                    { num: 1, label: 'Care' },
                    { num: 2, label: 'Schedule' },
                    { num: 3, label: 'Contact' }
                  ].map((s) => (
                    <button
                      key={s.num}
                      type="button"
                      onClick={() => setCurrentStep(s.num)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        currentStep === s.num
                          ? 'bg-[#0B2B26] text-white shadow-xs'
                          : currentStep > s.num
                          ? 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                          : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      <span>0{s.num}</span>
                      <span className="hidden sm:inline font-normal">{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* STEP 1: Recipient & Services */}
                {currentStep === 1 && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Who is receiving support?
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {['Parent / Senior', 'Adult with ID/A', 'Myself', 'Spouse / Partner'].map((opt) => (
                          <button
                            type="button"
                            key={opt}
                            onClick={() => setRecipient(opt)}
                            className={`p-3 rounded-2xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                              recipient === opt
                                ? 'bg-[#0B2B26] text-white border-[#0B2B26]'
                                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Select Service Category
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        <button
                          type="button"
                          onClick={() => setServiceCategory('home-care')}
                          className={`p-3.5 rounded-2xl border text-xs font-bold text-center cursor-pointer transition-all ${
                            serviceCategory === 'home-care'
                              ? 'bg-[#0B2B26] text-white border-[#0B2B26]'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          Home Care Services
                        </button>
                        <button
                          type="button"
                          onClick={() => setServiceCategory('odp-waiver')}
                          className={`p-3.5 rounded-2xl border text-xs font-bold text-center cursor-pointer transition-all ${
                            serviceCategory === 'odp-waiver'
                              ? 'bg-[#0B2B26] text-white border-[#0B2B26]'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          PA ODP Waiver Services
                        </button>
                        <button
                          type="button"
                          onClick={() => setServiceCategory('both')}
                          className={`p-3.5 rounded-2xl border text-xs font-bold text-center cursor-pointer transition-all ${
                            serviceCategory === 'both'
                              ? 'bg-[#0B2B26] text-white border-[#0B2B26]'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          Both / Need Guidance
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                          Select Specific Services of Interest ({
                            (serviceCategory === 'home-care'
                              ? homeCareServices
                              : serviceCategory === 'odp-waiver'
                              ? odpServices
                              : [...homeCareServices, ...odpServices]).length
                          } available)
                        </label>
                        <span className="text-[11px] text-slate-400">
                          {selectedServices.length} selected
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {(serviceCategory === 'home-care'
                          ? homeCareServices
                          : serviceCategory === 'odp-waiver'
                          ? odpServices
                          : [...homeCareServices, ...odpServices]
                        ).map((srv) => {
                          const isChecked = selectedServices.includes(srv.title);
                          return (
                            <button
                              type="button"
                              key={srv.id}
                              onClick={() => toggleService(srv.title)}
                              className={`p-3 rounded-xl border text-left flex items-start justify-between cursor-pointer transition-all ${
                                isChecked
                                  ? 'bg-white border-[#0B2B26] text-[#0B2B26] font-bold shadow-xs ring-1 ring-[#0B2B26]'
                                  : 'bg-white/80 border-slate-200 text-slate-700 hover:bg-white'
                              }`}
                            >
                              <div className="pr-2">
                                <span className="block font-bold text-slate-900">{srv.title}</span>
                                <span className="block text-[11px] font-normal text-slate-500 line-clamp-1">
                                  {srv.shortDesc}
                                </span>
                              </div>
                              <div
                                className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                                  isChecked ? 'bg-[#0B2B26] border-[#0B2B26] text-white' : 'border-slate-300'
                                }`}
                              >
                                {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="px-7 py-3 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white font-medium text-xs sm:text-sm cursor-pointer flex items-center gap-1.5 shadow-xs"
                      >
                        <span>Next: Schedule & Location</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Schedule & Timeline */}
                {currentStep === 2 && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Desired Weekly Hours
                        </label>
                        <select
                          value={hoursPerWeek}
                          onChange={(e) => setHoursPerWeek(e.target.value)}
                          className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-hidden focus:border-[#0B2B26]"
                        >
                          <option value="Under 10 hours/week">Under 10 hours/week (Part-time)</option>
                          <option value="10 - 20 hours/week">10 - 20 hours/week</option>
                          <option value="20 - 35 hours/week">20 - 35 hours/week</option>
                          <option value="35+ hours/week">35+ hours/week (Full coverage)</option>
                          <option value="As Needed / Respite Only">As Needed / Occasional Respite</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          When would you like to start?
                        </label>
                        <select
                          value={timeframe}
                          onChange={(e) => setTimeframe(e.target.value)}
                          className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-hidden focus:border-[#0B2B26]"
                        >
                          <option value="Immediately (Within 48 hours)">Immediately (Within 48 hours)</option>
                          <option value="Within 1 to 2 weeks">Within 1 to 2 weeks</option>
                          <option value="Within 1 month">Within 1 month</option>
                          <option value="Planning for the future">Planning for the future</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Pennsylvania County *
                        </label>
                        <select
                          value={county}
                          onChange={(e) => setCounty(e.target.value)}
                          className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-hidden focus:border-[#0B2B26]"
                        >
                          <option value="Allegheny County">Allegheny County</option>
                          <option value="Washington County">Washington County</option>
                          <option value="Butler County">Butler County</option>
                          <option value="Westmoreland County">Westmoreland County</option>
                          <option value="Beaver County">Beaver County</option>
                          <option value="Other PA County">Other Pennsylvania County</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Township or Municipality
                        </label>
                        <input
                          type="text"
                          value={township}
                          onChange={(e) => setTownship(e.target.value)}
                          placeholder="e.g. Allison Park, Canonsburg, Shaler"
                          className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-hidden focus:border-[#0B2B26]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Any specific goals, hobbies, or needs? (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Tell us about daily routines, mobility requirements, or community interests..."
                        className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-hidden focus:border-[#0B2B26]"
                      />
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-xs font-medium text-slate-600 hover:text-[#0B2B26] cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="px-7 py-3 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white font-medium text-xs sm:text-sm cursor-pointer flex items-center gap-1.5 shadow-xs"
                      >
                        <span>Next: Contact Information</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Contact & Submit */}
                {currentStep === 3 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    {/* Honeypot field */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="hp_asmt_check">Leave empty</label>
                      <input
                        type="text"
                        id="hp_asmt_check"
                        name="hp_asmt_check"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    {validationError && (
                      <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                        {validationError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="asmt_name" className="block text-xs font-semibold text-slate-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          id="asmt_name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Maria Gonzalez"
                          className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-hidden focus:border-[#0B2B26]"
                        />
                      </div>

                      <div>
                        <label htmlFor="asmt_phone" className="block text-xs font-semibold text-slate-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          id="asmt_phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. (412) 546-1860"
                          className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-hidden focus:border-[#0B2B26]"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="asmt_email" className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        id="asmt_email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. maria@example.com"
                        className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-hidden focus:border-[#0B2B26]"
                      />
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#FAF4EE] border border-[#EADBCC] text-xs text-slate-600 leading-relaxed">
                      <p className="font-semibold text-[#0B2B26] mb-0.5">Confidentiality & HIPAA Commitment:</p>
                      <p>
                        Your assessment responses are kept strictly private and used solely by our clinical intake team to evaluate care options and Pennsylvania ODP waiver eligibility. We never share or sell client records. Read our{' '}
                        <button
                          type="button"
                          onClick={() => onNavigate('privacy')}
                          className="text-[#0B2B26] font-bold underline cursor-pointer"
                        >
                          Privacy Policy
                        </button>.
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="text-xs font-medium text-slate-600 hover:text-[#0B2B26] cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3.5 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white font-medium text-xs sm:text-sm cursor-pointer shadow-md flex items-center gap-2 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Submitting Request...</span>
                        ) : (
                          <>
                            <span>Submit & Begin Services</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

              </form>
            </div>
          )}
        </div>
      </section>

    </div>
  );
};
