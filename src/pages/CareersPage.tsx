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
  ChevronRight,
  Filter,
  Search,
  Users,
  Upload,
  FileText,
  X,
  ArrowLeft,
  FileCheck2,
  AlertCircle
} from 'lucide-react';
import { PageId, JobPosting, JobApplication, UploadedFile } from '../types';
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

  // Full-page Application View state
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [isApplying, setIsApplying] = useState<boolean>(false);

  // Application Form Inputs
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

  // Uploaded Files / Certificates state
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [fileUploadError, setFileUploadError] = useState<string | null>(null);

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
    setFileUploadError(null);
    setSubmittedRef(null);
    setUploadedFiles([]);
    setIsApplying(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setIsApplying(false);
    setSelectedJob(null);
    setSubmittedRef(null);
    setValidationError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle document / certificate upload
  const handleFileUpload = (categoryLabel: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setFileUploadError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: 10MB
    if (file.size > 10 * 1024 * 1024) {
      setFileUploadError(`"${file.name}" exceeds 10MB limit. Please upload a smaller file.`);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = typeof reader.result === 'string' ? reader.result : undefined;
      const newFile: UploadedFile = {
        id: `upload-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        name: file.name,
        size: file.size,
        type: file.type || 'application/octet-stream',
        category: categoryLabel,
        dataUrl
      };

      setUploadedFiles((prev) => [
        ...prev.filter((f) => f.category !== categoryLabel),
        newFile
      ]);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    setValidationError(null);
    setFileUploadError(null);

    // Spam honeypot
    if (honeypot.trim()) {
      setSubmittedRef(`KW-CAREER-${Math.floor(100000 + Math.random() * 900000)}`);
      return;
    }

    if (!applicantName.trim()) {
      setValidationError('Please enter your full legal name.');
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

    if (!resumeOrBio.trim() && uploadedFiles.length === 0) {
      setValidationError('Please provide a brief bio or upload your resume/CV.');
      return;
    }

    // Verify required uploads specified for this job
    if (selectedJob.requiredUploads && selectedJob.requiredUploads.length > 0) {
      const missingRequired = selectedJob.requiredUploads.filter((req) => {
        if (!req.required) return false;
        return !uploadedFiles.some((f) => f.category === req.label);
      });

      if (missingRequired.length > 0) {
        setValidationError(
          `Please upload the required document: ${missingRequired.map((m) => m.label).join(', ')}`
        );
        return;
      }
    }

    setIsSubmitting(true);

    const res = await apiSubmitCareer({
      applicantName: applicantName.trim(),
      email: email.trim(),
      phone: phoneClean,
      jobTitle: selectedJob.title,
      resumeOrBio: resumeOrBio.trim() || 'Uploaded documents attached.',
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
      resumeOrBio: resumeOrBio.trim() || 'Documents uploaded.',
      hasDriverLicense,
      hasClearances,
      submittedAt:
        new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }) + ` at ` + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'new',
      uploadedDocuments: uploadedFiles
    };

    // Save to localStorage, immediately notifies Admin portal
    addJobApplication(newApplication);

    // Track analytics event
    trackEvent('job_application_submitted', {
      jobTitle: selectedJob.title,
      jobId: selectedJob.id,
      uploadedCount: uploadedFiles.length
    });

    setIsSubmitting(false);
    setSubmittedRef(refCode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // =========================================================
  // FULL PAGE VIEW: JOB ROLE APPLICATION
  // =========================================================
  if (isApplying && selectedJob) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] pb-24 text-left font-sans">
        <Breadcrumbs
          items={[
            { label: 'Careers', onClick: handleBackToList },
            { label: selectedJob.title },
            { label: 'Application' }
          ]}
          onNavigate={onNavigate}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          
          {/* Back button */}
          <button
            onClick={handleBackToList}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#0B2B26] mb-6 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Open Roles</span>
          </button>

          {submittedRef ? (
            /* Full-page Success Confirmation */
            <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#EADBCC] shadow-md text-center max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Application Submitted
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0B2B26] font-display">
                  Thank You, {applicantName}!
                </h1>
                <p className="text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
                  Your application for <strong>{selectedJob.title}</strong> has been received by our clinical recruiting director.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF4EE] border border-[#EADBCC] max-w-md mx-auto text-xs space-y-2 text-left">
                <div className="flex justify-between items-center pb-2 border-b border-[#EADBCC]/60">
                  <span className="text-slate-500">Reference Code:</span>
                  <span className="font-mono font-bold text-sm text-[#0B2B26]">{submittedRef}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-[#EADBCC]/60">
                  <span className="text-slate-500">Position:</span>
                  <span className="font-semibold text-slate-800">{selectedJob.title}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-[#EADBCC]/60">
                  <span className="text-slate-500">Contact Email:</span>
                  <span className="font-medium text-slate-800">{email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Uploaded Documents:</span>
                  <span className="font-bold text-emerald-700">{uploadedFiles.length} files attached</span>
                </div>
              </div>

              {/* What happens next section */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  What Happens Next:
                </span>
                <ol className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#0B2B26] text-white flex items-center justify-center font-bold text-[10px] shrink-0">1</span>
                    <span><strong>Clinical Review:</strong> Our hiring team evaluates your experience and certifications within 24 to 48 hours.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#0B2B26] text-white flex items-center justify-center font-bold text-[10px] shrink-0">2</span>
                    <span><strong>Phone Interview:</strong> A recruiting coordinator will contact you at <strong>{phone}</strong> for a brief introductory discussion.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#0B2B26] text-white flex items-center justify-center font-bold text-[10px] shrink-0">3</span>
                    <span><strong>In-Person Meeting:</strong> We schedule a face-to-face meeting at our Canonsburg office or via secure video.</span>
                  </li>
                </ol>
              </div>

              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <button
                  onClick={handleBackToList}
                  className="px-8 py-3.5 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white font-bold text-xs sm:text-sm cursor-pointer shadow-md transition-all active:scale-95"
                >
                  View Other Open Positions
                </button>
                <button
                  onClick={() => onNavigate('home')}
                  className="px-6 py-3.5 rounded-full border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm cursor-pointer transition-colors"
                >
                  Return to Homepage
                </button>
              </div>
            </div>
          ) : (
            /* Full-page Application Form */
            <div className="space-y-8 animate-in fade-in duration-200">
              
              {/* Role Header Banner */}
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EADBCC] shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#E89A24] block">
                      {selectedJob.department}
                    </span>
                    <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0B2B26] font-display pt-1">
                      {selectedJob.title}
                    </h1>
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-[#FAF4EE] border border-[#EADBCC] text-[#0B2B26] font-bold text-xs">
                    {selectedJob.type}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 font-bold text-[#0B2B26]">
                    <DollarSign className="w-4 h-4 text-[#E89A24]" />
                    <span>{selectedJob.payRange}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{selectedJob.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Clock className="w-4 h-4" />
                    <span>Posted {selectedJob.postedDate}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-2">
                  {selectedJob.description}
                </p>

                {/* Job requirements & benefits grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100 text-xs">
                  <div className="space-y-2">
                    <h4 className="font-bold text-[#0B2B26] uppercase tracking-wider text-[11px]">
                      Key Qualifications:
                    </h4>
                    <ul className="space-y-1.5 text-slate-600">
                      {selectedJob.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-[#0B2B26] uppercase tracking-wider text-[11px]">
                      Benefits & Perks:
                    </h4>
                    <ul className="space-y-1.5 text-slate-600">
                      {selectedJob.benefits.map((ben, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Award className="w-3.5 h-3.5 text-[#E89A24] shrink-0 mt-0.5" />
                          <span>{ben}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* The Full Application Form Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
                <form onSubmit={handleApplicationSubmit} className="space-y-8">
                  
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0B2B26] font-display">
                      Candidate Application Form
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Please provide your contact details, experience, and required documents. Our hiring team reviews all submissions promptly.
                    </p>
                  </div>

                  {/* Honeypot anti-spam field */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="hp_career_full_check">Leave empty</label>
                    <input
                      type="text"
                      id="hp_career_full_check"
                      name="hp_career_full_check"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {validationError && (
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-700 font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{validationError}</span>
                    </div>
                  )}

                  {fileUploadError && (
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800 font-medium">
                      {fileUploadError}
                    </div>
                  )}

                  {/* Section 1: Personal Details */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600 border-b border-slate-100 pb-2">
                      1. Contact & Identity Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="app_full_name" className="block text-xs font-semibold text-slate-700 mb-1">
                          Full Legal Name *
                        </label>
                        <input
                          id="app_full_name"
                          type="text"
                          required
                          value={applicantName}
                          onChange={(e) => setApplicantName(e.target.value)}
                          placeholder="e.g. Maria Gonzalez"
                          className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B2B26]"
                        />
                      </div>

                      <div>
                        <label htmlFor="app_phone" className="block text-xs font-semibold text-slate-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          id="app_phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. (412) 546-1860"
                          className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B2B26]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="app_email" className="block text-xs font-semibold text-slate-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          id="app_email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. maria@example.com"
                          className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B2B26]"
                        />
                      </div>

                      <div>
                        <label htmlFor="app_city" className="block text-xs font-semibold text-slate-700 mb-1">
                          City / Township of Residence
                        </label>
                        <input
                          id="app_city"
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="e.g. Canonsburg, PA or Allison Park"
                          className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B2B26]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Experience & Qualifications */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600 border-b border-slate-100 pb-2">
                      2. Care Background & Availability
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="app_exp" className="block text-xs font-semibold text-slate-700 mb-1">
                          Caregiving / Healthcare Experience
                        </label>
                        <select
                          id="app_exp"
                          value={experienceYears}
                          onChange={(e) => setExperienceYears(e.target.value)}
                          className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-300 bg-white"
                        >
                          <option>Entry Level / Willing to Train</option>
                          <option>1-2 years</option>
                          <option>3-5 years</option>
                          <option>5+ years</option>
                          <option>Certified Nursing Assistant (CNA)</option>
                          <option>Home Health Aide (HHA)</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="app_avail" className="block text-xs font-semibold text-slate-700 mb-1">
                          Preferred Schedule Availability
                        </label>
                        <select
                          id="app_avail"
                          value={availability}
                          onChange={(e) => setAvailability(e.target.value)}
                          className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-300 bg-white"
                        >
                          <option>Full-time (30-40 hrs/wk)</option>
                          <option>Part-time (15-25 hrs/wk)</option>
                          <option>PRN / As-Needed</option>
                          <option>Day Shifts (M-F)</option>
                          <option>Evenings & Overnights</option>
                          <option>Weekends Only</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={hasDriverLicense}
                          onChange={(e) => setHasDriverLicense(e.target.checked)}
                          className="w-4 h-4 text-[#0B2B26] rounded-sm focus:ring-[#0B2B26]"
                        />
                        <span className="text-xs font-medium text-slate-800">
                          I possess a valid Driver’s License & reliable vehicle
                        </span>
                      </label>

                      <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={hasClearances}
                          onChange={(e) => setHasClearances(e.target.checked)}
                          className="w-4 h-4 text-[#0B2B26] rounded-sm focus:ring-[#0B2B26]"
                        />
                        <span className="text-xs font-medium text-slate-800">
                          Able to pass PA state police & child abuse clearances
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Section 3: Document & Certificate Uploads */}
                  <div className="space-y-4">
                    <div className="border-b border-slate-100 pb-2">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600">
                        3. Required Uploads & Certifications
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Upload your CV/resume and healthcare certificates (PDF, Word, JPG, or PNG up to 10MB each).
                      </p>
                    </div>

                    {/* Dynamically display uploads specified for this job */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedJob.requiredUploads && selectedJob.requiredUploads.length > 0 ? (
                        selectedJob.requiredUploads.map((req) => {
                          const uploadedFile = uploadedFiles.find((f) => f.category === req.label);
                          return (
                            <div
                              key={req.id}
                              className={`p-4 rounded-2xl border transition-all ${
                                uploadedFile
                                  ? 'bg-emerald-50/60 border-emerald-300'
                                  : 'bg-slate-50/80 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-bold text-slate-800">
                                      {req.label}
                                    </span>
                                    {req.required && (
                                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-md">
                                        Required
                                      </span>
                                    )}
                                  </div>
                                  {req.description && (
                                    <p className="text-[11px] text-slate-500 mt-0.5">
                                      {req.description}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {uploadedFile ? (
                                <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-emerald-200 mt-2">
                                  <div className="flex items-center gap-2 overflow-hidden">
                                    <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                    <span className="text-xs font-medium text-slate-800 truncate">
                                      {uploadedFile.name}
                                    </span>
                                    <span className="text-[10px] text-slate-400 shrink-0">
                                      ({formatFileSize(uploadedFile.size)})
                                    </span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveFile(uploadedFile.id)}
                                    className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                                    title="Remove file"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ) : (
                                <label className="mt-2 flex items-center justify-center gap-2 p-3 bg-white hover:bg-slate-50 rounded-xl border border-dashed border-slate-300 text-xs font-semibold text-[#0B2B26] cursor-pointer transition-colors">
                                  <Upload className="w-3.5 h-3.5 text-[#E89A24]" />
                                  <span>Choose File to Upload</span>
                                  <input
                                    type="file"
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    className="hidden"
                                    onChange={(e) => handleFileUpload(req.label, e)}
                                  />
                                </label>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        /* Default uploads if none specified on legacy jobs */
                        <>
                          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                            <span className="text-xs font-bold text-slate-800 block mb-1">
                              Resume / CV *
                            </span>
                            <label className="flex items-center justify-center gap-2 p-3 bg-white hover:bg-slate-50 rounded-xl border border-dashed border-slate-300 text-xs font-semibold text-[#0B2B26] cursor-pointer">
                              <Upload className="w-3.5 h-3.5 text-[#E89A24]" />
                              <span>Upload Resume (.pdf, .doc)</span>
                              <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                className="hidden"
                                onChange={(e) => handleFileUpload('Resume / CV', e)}
                              />
                            </label>
                          </div>

                          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                            <span className="text-xs font-bold text-slate-800 block mb-1">
                              Certificates / Clearances
                            </span>
                            <label className="flex items-center justify-center gap-2 p-3 bg-white hover:bg-slate-50 rounded-xl border border-dashed border-slate-300 text-xs font-semibold text-[#0B2B26] cursor-pointer">
                              <Upload className="w-3.5 h-3.5 text-[#E89A24]" />
                              <span>Upload Certificate / ID</span>
                              <input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                className="hidden"
                                onChange={(e) => handleFileUpload('Certifications', e)}
                              />
                            </label>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Additional Document Upload Option */}
                    <div className="pt-2">
                      <label className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B2B26] hover:text-[#E89A24] cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>+ Upload Additional Certificate, Clearance or Reference Letter</span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          className="hidden"
                          onChange={(e) => handleFileUpload(`Additional Certificate ${uploadedFiles.length + 1}`, e)}
                        />
                      </label>
                    </div>

                    {/* Uploaded files summary badges */}
                    {uploadedFiles.length > 0 && (
                      <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap gap-2 text-xs">
                        <span className="text-slate-500 font-medium py-1">Ready to submit ({uploadedFiles.length}):</span>
                        {uploadedFiles.map((file) => (
                          <span
                            key={file.id}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-300 rounded-full font-medium text-slate-700"
                          >
                            <FileText className="w-3 h-3 text-[#E89A24]" />
                            <span>{file.name}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile(file.id)}
                              className="text-slate-400 hover:text-rose-600"
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Section 4: Caregiver Bio & Experience */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600 border-b border-slate-100 pb-2">
                      4. Personal Care Bio & Statement
                    </h3>

                    <div>
                      <label htmlFor="app_bio" className="block text-xs font-semibold text-slate-700 mb-1">
                        Tell us about your background and why you want to support clients at Kenah *
                      </label>
                      <textarea
                        id="app_bio"
                        rows={4}
                        value={resumeOrBio}
                        onChange={(e) => setResumeOrBio(e.target.value)}
                        placeholder="Describe your care experience, passion for working with seniors or individuals with intellectual disabilities, and any special skills..."
                        className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B2B26]"
                      />
                    </div>
                  </div>

                  {/* Privacy & EEO Disclosure */}
                  <div className="p-4 rounded-2xl bg-[#FAF4EE] border border-[#EADBCC] text-xs text-slate-600 leading-relaxed">
                    <p className="font-semibold text-[#0B2B26] mb-1">Equal Opportunity & Applicant Privacy:</p>
                    <p>
                      Kenah Wellness Services LLC is an Equal Opportunity Employer. We evaluate qualified applicants without regard to race, color, religion, sex, sexual orientation, gender identity, national origin, disability, or protected veteran status. All uploaded documents are kept confidential. Read our{' '}
                      <button
                        type="button"
                        onClick={() => onNavigate('privacy')}
                        className="text-[#0B2B26] font-bold underline cursor-pointer"
                      >
                        Privacy Policy
                      </button>.
                    </p>
                  </div>

                  {/* Submission Controls */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={handleBackToList}
                      className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
                    >
                      Cancel & Return to Job Directory
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-10 py-4 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white font-bold text-xs sm:text-sm cursor-pointer shadow-md flex items-center justify-center gap-2 disabled:opacity-50 transition-all active:scale-95"
                    >
                      {isSubmitting ? (
                        <span>Submitting Application...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#F2D701]" />
                          <span>Submit Official Application</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              </div>

            </div>
          )}

        </div>
      </div>
    );
  }

  // =========================================================
  // MAIN CAREERS DIRECTORY VIEW
  // =========================================================
  return (
    <div className="space-y-16 pb-24 text-left font-sans">
      <Breadcrumbs items={[{ label: 'Careers at Kenah' }]} onNavigate={onNavigate} />

      {/* Hero Header without AI badge */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="rounded-[36px] sm:rounded-[44px] bg-[#F8EDE2] p-8 sm:p-14 border border-[#EADBCC] relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B2B26] font-display tracking-tight text-balance leading-[1.12]">
              Build a Rewarding Career Caring for Others
            </h1>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl pt-1">
              At Kenah Wellness Services, exceptional care starts with supporting our team. Join an established Pennsylvania agency founded on compassion, respect, integrity, and excellence. We offer competitive pay, flexible hours, and ongoing clinical mentorship.
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
              Flexible Scheduling
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Choose shifts that fit your life: part-time, full-time, weekends, or PRN hours across Allegheny and Washington counties.
            </p>
          </div>

          <div className="p-7 rounded-[28px] bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF4EE] text-[#0B2B26] flex items-center justify-center">
              <Award className="w-6 h-6 text-[#E89A24]" />
            </div>
            <h3 className="font-bold text-base text-[#0B2B26] font-display">
              Paid Clinical Training
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Receive paid orientation, CPR/First Aid certification, and specialized ODP habilitation coaching led by registered nurses.
            </p>
          </div>

          <div className="p-7 rounded-[28px] bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF4EE] text-[#0B2B26] flex items-center justify-center">
              <Heart className="w-6 h-6 text-[#E89A24]" />
            </div>
            <h3 className="font-bold text-base text-[#0B2B26] font-display">
              Supportive Leadership
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              You are never alone on shift. Our clinical supervisors provide 24/7 on-call guidance, encouragement, and recognition.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter Toolbar */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by role title, keyword, or county..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2B26]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="text-xs font-semibold text-slate-500 shrink-0">Department:</span>
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedDept === dept
                    ? 'bg-[#0B2B26] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Available Openings Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2B26] font-display">
              Open Positions ({filteredJobs.length})
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select an open role to review requirements and complete your application.
            </p>
          </div>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
            <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-700">No positions match your search</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search terms or view all departments to see open opportunities.
            </p>
            <button
              onClick={() => {
                setSelectedDept('All');
                setSearchKeyword('');
              }}
              className="px-6 py-2 rounded-full bg-[#0B2B26] text-white text-xs font-bold mt-2 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-[32px] p-7 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#E89A24]">
                      {job.department}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#FAF4EE] border border-[#EADBCC] text-[#0B2B26] font-bold text-xs">
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
                      Key Qualifications:
                    </span>
                    {job.requirements.slice(0, 3).map((req, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>

                  {job.requiredUploads && job.requiredUploads.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[11px] font-semibold text-slate-500">
                        Required Uploads: {job.requiredUploads.map((r) => r.label).join(', ')}
                      </span>
                    </div>
                  )}
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

      {/* Questions section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="rounded-[36px] bg-[#0B2B26] text-white p-8 sm:p-12 border border-[#0B2B26] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-display">
              Have Questions About Caregiving at Kenah?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
              Speak directly with our recruiting coordinator about shifts, client matching, and waiver requirements.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:4125461860"
              className="px-6 py-3 rounded-full bg-[#E89A24] hover:bg-[#d68a18] text-white font-bold text-xs sm:text-sm transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Call (412) 546-1860</span>
            </a>
            <a
              href="mailto:info@kenahwellness.com?subject=Career%20Inquiry"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Email Recruiting</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
