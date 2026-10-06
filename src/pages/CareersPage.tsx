import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle2,
  Send,
  Heart,
  ShieldCheck,
  Award,
  Sparkles,
  ChevronRight,
  Filter,
  Search,
  Users
} from 'lucide-react';
import { PageId, JobPosting, JobApplication } from '../types';
import {
  getStoredJobs,
  addJobApplication,
  DATA_CHANGE_EVENT
} from '../utils/storage';
import { trackEvent } from '../utils/analytics';
import { apiSubmitCareer } from '../utils/api';

interface CareersPageProps {
  onNavigate: (page: PageId) => void;
  onOpenAssessment: () => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onNavigate, onOpenAssessment }) => {
  const [jobs, setJobs] = useState<JobPosting[]>(() => getStoredJobs());
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  
  // Application Modal state
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [isApplying, setIsApplying] = useState<boolean>(false);
  const [applicantName, setApplicantName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [experienceYears, setExperienceYears] = useState<string>('1-2 years');
  const [availability, setAvailability] = useState<string>('Full-time');
  const [hasDriverLicense, setHasDriverLicense] = useState<boolean>(true);
  const [hasClearances, setHasClearances] = useState<boolean>(true);
  const [resumeOrBio, setResumeOrBio] = useState<string>('');
  const [honeypot, setHoneypot] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Sync immediately when jobs are modified in the Admin portal
  useEffect(() => {
    const handleDataUpdate = () => {
      setJobs(getStoredJobs());
    };
    window.addEventListener(DATA_CHANGE_EVENT, handleDataUpdate);
    return () => window.removeEventListener(DATA_CHANGE_EVENT, handleDataUpdate);
  }, []);

  const departments = ['All', ...Array.from(new Set(jobs.map((j) => j.department)))];

  const filteredJobs = jobs.filter((job) => {
    const matchesDept = selectedDept === 'All' || job.department === selectedDept;
    const matchesSearch =
      job.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      job.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      job.location.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchesDept && matchesSearch && job.status === 'active';
  });

  const handleOpenApply = (job: JobPosting) => {
    setSelectedJob(job);
    setValidationError(null);
    setIsApplying(true);
    setSubmittedRef(null);
  };

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    setValidationError(null);

    // Spam honeypot
    if (honeypot.trim()) {
      setSubmittedRef(`KW-CAREER-${Math.floor(100000 + Math.random() * 900000)}`);
      return;
    }

    if (!applicantName.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setValidationError('Please provide a valid email address.');
      return;
    }

    const phoneClean = phone.replace(/\D/g, '');
    if (phoneClean.length < 10) {
      setValidationError('Please enter a valid 10-digit telephone number.');
      return;
    }

    if (!resumeOrBio.trim()) {
      setValidationError('Please provide a brief bio or description of your care experience.');
      return;
    }

    setIsSubmitting(true);

    const res = await apiSubmitCareer({
      applicantName: applicantName.trim(),
      email: email.trim(),
      phone: phoneClean,
      jobTitle: selectedJob.title,
      resumeOrBio: resumeOrBio.trim(),
      experienceYears,
      honeypot: honeypot.trim(),
    });

    if (!res.success && res.error) {
      setIsSubmitting(false);
      setValidationError(res.error);
      return;
    }

    const refCode = res.reference || `KW-CAREER-${Math.floor(100000 + Math.random() * 900000)}`;

    const newApplication: JobApplication = {
      id: `app-${Date.now()}`,
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      applicantName: applicantName.trim(),
      email: email.trim(),
      phone: phoneClean,
      city: city.trim() || 'Southwestern PA',
      experienceYears,
      availability,
      resumeOrBio: resumeOrBio.trim(),
      hasDriverLicense,
      hasClearances,
      submittedAt:
        new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }) + ` at ` + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'new'
    };

    // Save to localStorage, immediately notifies Admin portal
    addJobApplication(newApplication);

    // Track analytics event
    trackEvent('job_application_submitted', {
      jobTitle: selectedJob.title,
      jobId: selectedJob.id
    });

    setIsSubmitting(false);
    setSubmittedRef(refCode);
  };

  return (
    <div className="space-y-16 pb-24 text-left font-sans">
      <Breadcrumbs items={[{ label: 'Careers at Kenah' }]} onNavigate={onNavigate} />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="rounded-[36px] sm:rounded-[44px] bg-[#F8EDE2] p-8 sm:p-14 border border-[#EADBCC] relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-sm text-[#0B2B26] text-xs font-bold uppercase tracking-wider border border-[#0B2B26]/10">
              <Sparkles className="w-3.5 h-3.5 text-[#E89A24]" />
              <span>We Are Hiring Compassionate Caregivers & DSPs</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B2B26] font-display tracking-tight text-balance leading-[1.12]">
              Build a Rewarding Career Caring for Others
            </h1>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl pt-1">
              At Kenah Wellness Services, we believe that exceptional care starts with supporting our team. Join a company founded on compassion, respect, integrity, and excellence. We offer competitive pay, flexible hours, and ongoing clinical mentorship.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Kenah Wellness Cards */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-left mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-1">
            WHY JOIN US
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2B26] font-display">
            The Kenah Caregiver Experience
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-7 rounded-[28px] bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF4EE] text-[#0B2B26] flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-[#E89A24]" />
            </div>
            <h3 className="font-bold text-base text-[#0B2B26] font-display">
              Competitive Pay & Direct Deposit
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We value your hard work with hourly wages starting from $16.50 to $23.00/hr, with overtime, holiday bonuses, and weekly direct deposit.
            </p>
          </div>

          <div className="p-7 rounded-[28px] bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF4EE] text-[#0B2B26] flex items-center justify-center">
              <Clock className="w-6 h-6 text-[#E89A24]" />
            </div>
            <h3 className="font-bold text-base text-[#0B2B26] font-display">
              Flexible Schedules
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Full-time, part-time, morning, evening, or weekend shifts that adapt to your family life, studies, or personal schedule.
            </p>
          </div>

          <div className="p-7 rounded-[28px] bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF4EE] text-[#0B2B26] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#E89A24]" />
            </div>
            <h3 className="font-bold text-base text-[#0B2B26] font-display">
              Paid Training & Mentorship
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Paid onboarding, CPR certification assistance, dementia care techniques, and 24/7 supervisory nurse backing whenever you need help.
            </p>
          </div>

          <div className="p-7 rounded-[28px] bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF4EE] text-[#0B2B26] flex items-center justify-center">
              <Heart className="w-6 h-6 text-[#E89A24]" />
            </div>
            <h3 className="font-bold text-base text-[#0B2B26] font-display">
              Purpose-Driven Work
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Help local seniors and adults with intellectual disabilities live fuller, happier, and more dignified lives in Southwestern PA.
            </p>
          </div>
        </div>
      </section>

      {/* Job Listings Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#E89A24] block mb-1">
              CURRENT OPPORTUNITIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2B26] font-display">
              Open Positions ({filteredJobs.length})
            </h2>
          </div>

          {/* Department Filter & Search */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Search jobs..."
                className="pl-9 pr-4 py-2 text-xs rounded-full border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0B2B26] w-48 sm:w-56"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedDept === dept
                      ? 'bg-[#0B2B26] text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Job Cards */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No positions found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              No open positions match your current filter. Try selecting "All" or submit a general inquiry.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-[32px] p-7 sm:p-8 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Tags */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B2B26] bg-[#F8EDE2] px-3 py-1 rounded-full">
                      {job.department}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      {job.type}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0B2B26] font-display">
                    {job.title}
                  </h3>

                  {/* Meta details */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1 font-semibold text-[#0B2B26]">
                      <DollarSign className="w-3.5 h-3.5 text-[#E89A24]" />
                      <span>{job.payRange}</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.location}</span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {job.description}
                  </p>

                  {/* Highlights / Requirements preview */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Key Highlights:
                    </span>
                    {job.requirements.slice(0, 3).map((req, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Posted: {job.postedDate}
                  </span>
                  <button
                    onClick={() => handleOpenApply(job)}
                    className="px-6 py-2.5 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white text-xs font-bold transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5 active:scale-95"
                  >
                    <span>Apply for Role</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#E89A24]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Interactive Application Modal */}
      {isApplying && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-[32px] p-6 sm:p-10 max-w-xl w-full shadow-2xl border border-slate-100 my-8 animate-in fade-in duration-200">
            {submittedRef ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B2B26] font-display">
                  Application Received!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, <strong className="text-slate-900">{applicantName}</strong>. Your application for <strong>{selectedJob.title}</strong> has been received by our clinical recruiting team.
                </p>

                <div className="p-4 rounded-2xl bg-[#FAF4EE] border border-[#EADBCC] max-w-xs mx-auto text-xs space-y-1 text-left">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Application Ref:</span>
                    <span className="font-mono font-bold text-[#0B2B26]">{submittedRef}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Status:</span>
                    <span className="font-semibold text-emerald-700">In Clinical Review</span>
                  </div>
                </div>

                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setIsApplying(false);
                      setSubmittedRef(null);
                      setApplicantName('');
                      setEmail('');
                      setPhone('');
                      setResumeOrBio('');
                    }}
                    className="px-8 py-3 rounded-full bg-[#0B2B26] text-white font-medium text-xs hover:bg-[#071E1A] cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleApplicationSubmit} className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#E89A24] block">
                      APPLYING FOR:
                    </span>
                    <h3 className="text-lg font-bold text-[#0B2B26] font-display">
                      {selectedJob.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsApplying(false)}
                    className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {/* Honeypot anti-spam field */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="hp_career_check">Leave empty</label>
                  <input
                    type="text"
                    id="hp_career_check"
                    name="hp_career_check"
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="job_app_name" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      id="job_app_name"
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="e.g. Jane Doe"
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#0B2B26]"
                    />
                  </div>

                  <div>
                    <label htmlFor="job_app_phone" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Phone Number *
                    </label>
                    <input
                      id="job_app_phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(412) 000-0000"
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#0B2B26]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="job_app_email" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Email Address *
                    </label>
                    <input
                      id="job_app_email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#0B2B26]"
                    />
                  </div>

                  <div>
                    <label htmlFor="job_app_city" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Current City / Area
                    </label>
                    <input
                      id="job_app_city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Allison Park or Canonsburg, PA"
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#0B2B26]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="job_app_exp" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Care Experience
                    </label>
                    <select
                      id="job_app_exp"
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#0B2B26] bg-white"
                    >
                      <option>Entry Level / Willing to Train</option>
                      <option>1-2 years</option>
                      <option>3-5 years</option>
                      <option>5+ years</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="job_app_avail" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Availability
                    </label>
                    <select
                      id="job_app_avail"
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#0B2B26] bg-white"
                    >
                      <option>Full-time (30-40 hrs/wk)</option>
                      <option>Part-time (15-29 hrs/wk)</option>
                      <option>Weekends & Evenings</option>
                      <option>PRN / As-Needed</option>
                    </select>
                  </div>
                </div>

                {/* Clearances & Driver License Checkboxes */}
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <span className="font-bold text-slate-700 block">
                    PA DHS Qualifications:
                  </span>
                  <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                    <input
                      type="checkbox"
                      checked={hasDriverLicense}
                      onChange={(e) => setHasDriverLicense(e.target.checked)}
                      className="rounded text-[#0B2B26] focus:ring-[#0B2B26] w-4 h-4"
                    />
                    <span>I have a valid Driver’s License and reliable transportation</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                    <input
                      type="checkbox"
                      checked={hasClearances}
                      onChange={(e) => setHasClearances(e.target.checked)}
                      className="rounded text-[#0B2B26] focus:ring-[#0B2B26] w-4 h-4"
                    />
                    <span>I have current PA background clearances (or willing to complete)</span>
                  </label>
                </div>

                <div>
                  <label htmlFor="job_app_bio" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Bio, Experience & Relevant Skills *
                  </label>
                  <textarea
                    id="job_app_bio"
                    rows={4}
                    required
                    value={resumeOrBio}
                    onChange={(e) => setResumeOrBio(e.target.value)}
                    placeholder="Tell us about your background, certifications (CNA, HHA, CPR), or why you are passionate about caregiving..."
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#0B2B26]"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 leading-snug">
                  Applicant privacy is guaranteed. Submitted information is reviewed strictly for employment evaluation at Kenah Wellness Services LLC in accordance with our{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsApplying(false);
                      onNavigate('privacy');
                    }}
                    className="text-[#0B2B26] font-semibold underline cursor-pointer"
                  >
                    Privacy Policy
                  </button>.
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsApplying(false)}
                    className="px-5 py-2.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-7 py-2.5 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5 text-[#E89A24]" />
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Application'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Support or Questions Banner */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="rounded-[32px] bg-[#0B2B26] text-white p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-display">
              Have Questions About Joining Our Team?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Speak directly with our HR and clinical recruiting team at our Canonsburg headquarters.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:+14125461860"
              className="px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-[#0B2B26] font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Call +1 (412) 546-1860
            </a>
            <a
              href="mailto:info@kenahwellness.com"
              className="px-6 py-3 rounded-full border border-slate-500 hover:border-slate-300 text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Email Recruiting
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
