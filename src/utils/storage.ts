import { BlogPost, ServiceItem, AssessmentSubmission, JobPosting, JobApplication } from '../types';
import { BLOG_POSTS as INITIAL_BLOGS } from '../data/blogData';
import { HOME_CARE_SERVICES as INITIAL_HOME_CARE, ODP_WAIVER_SERVICES as INITIAL_ODP } from '../data/servicesData';
import { INITIAL_JOB_POSTINGS } from '../data/careersData';

const STORAGE_KEYS = {
  BLOGS: 'kenah_blogs_data',
  HOME_CARE: 'kenah_home_care_services',
  ODP: 'kenah_odp_services',
  ADMIN_AUTH: 'kenah_admin_authenticated',
  ASSESSMENTS: 'kenah_assessments_data',
  JOBS: 'kenah_jobs_data',
  JOB_APPLICATIONS: 'kenah_job_applications_data'
};

export const DATA_CHANGE_EVENT = 'kenah_data_updated';

function notifyDataChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(DATA_CHANGE_EVENT));
  }
}

// ========================
// BLOGS STORAGE
// ========================
export function getStoredBlogs(): BlogPost[] {
  if (typeof window === 'undefined') return INITIAL_BLOGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BLOGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(INITIAL_BLOGS));
      return INITIAL_BLOGS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_BLOGS;
  } catch (e) {
    console.error('Failed to load stored blogs:', e);
    return INITIAL_BLOGS;
  }
}

export function saveStoredBlogs(blogs: BlogPost[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(blogs));
    notifyDataChange();
  } catch (e) {
    console.error('Failed to save blogs:', e);
  }
}

export function addStoredBlog(newBlog: BlogPost): void {
  const current = getStoredBlogs();
  const updated = [newBlog, ...current];
  saveStoredBlogs(updated);
}

export function updateStoredBlog(updatedBlog: BlogPost): void {
  const current = getStoredBlogs();
  const updated = current.map((b) => (b.id === updatedBlog.id ? updatedBlog : b));
  saveStoredBlogs(updated);
}

export function deleteStoredBlog(id: string): void {
  const current = getStoredBlogs();
  const updated = current.filter((b) => b.id !== id);
  saveStoredBlogs(updated);
}

// ========================
// HOME CARE SERVICES STORAGE
// ========================
export function getStoredHomeCareServices(): ServiceItem[] {
  if (typeof window === 'undefined') return INITIAL_HOME_CARE;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HOME_CARE);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.HOME_CARE, JSON.stringify(INITIAL_HOME_CARE));
      return INITIAL_HOME_CARE;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEYS.HOME_CARE, JSON.stringify(INITIAL_HOME_CARE));
      return INITIAL_HOME_CARE;
    }
    // Ensure all updated services from October 2026 document are represented
    const missing = INITIAL_HOME_CARE.filter((init) => !parsed.some((p: ServiceItem) => p.id === init.id));
    if (missing.length > 0) {
      const merged = [...parsed, ...missing];
      localStorage.setItem(STORAGE_KEYS.HOME_CARE, JSON.stringify(merged));
      return merged;
    }
    return parsed;
  } catch {
    return INITIAL_HOME_CARE;
  }
}

export function saveStoredHomeCareServices(services: ServiceItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.HOME_CARE, JSON.stringify(services));
    notifyDataChange();
  } catch {
    // silently catch storage quota errors
  }
}

export function addStoredHomeCareService(newService: ServiceItem): void {
  const current = getStoredHomeCareServices();
  const updated = [...current, newService];
  saveStoredHomeCareServices(updated);
}

export function updateStoredHomeCareService(updatedService: ServiceItem): void {
  const current = getStoredHomeCareServices();
  const updated = current.map((s) => (s.id === updatedService.id ? updatedService : s));
  saveStoredHomeCareServices(updated);
}

export function deleteStoredHomeCareService(id: string): void {
  const current = getStoredHomeCareServices();
  const updated = current.filter((s) => s.id !== id);
  saveStoredHomeCareServices(updated);
}

// ========================
// ODP SERVICES STORAGE
// ========================
export function getStoredOdpServices(): ServiceItem[] {
  if (typeof window === 'undefined') return INITIAL_ODP;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ODP);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ODP, JSON.stringify(INITIAL_ODP));
      return INITIAL_ODP;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEYS.ODP, JSON.stringify(INITIAL_ODP));
      return INITIAL_ODP;
    }
    // Ensure all updated ODP services (IHCS, Respite, CPS, HAB) are represented
    const missing = INITIAL_ODP.filter((init) => !parsed.some((p: ServiceItem) => p.id === init.id));
    if (missing.length > 0) {
      const merged = [...parsed, ...missing];
      localStorage.setItem(STORAGE_KEYS.ODP, JSON.stringify(merged));
      return merged;
    }
    return parsed;
  } catch {
    return INITIAL_ODP;
  }
}

export function saveStoredOdpServices(services: ServiceItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ODP, JSON.stringify(services));
    notifyDataChange();
  } catch (e) {
    console.error('Failed to save ODP services:', e);
  }
}

export function addStoredOdpService(newService: ServiceItem): void {
  const current = getStoredOdpServices();
  const updated = [...current, newService];
  saveStoredOdpServices(updated);
}

export function updateStoredOdpService(updatedService: ServiceItem): void {
  const current = getStoredOdpServices();
  const updated = current.map((s) => (s.id === updatedService.id ? updatedService : s));
  saveStoredOdpServices(updated);
}

export function deleteStoredOdpService(id: string): void {
  const current = getStoredOdpServices();
  const updated = current.filter((s) => s.id !== id);
  saveStoredOdpServices(updated);
}

// ========================
// ASSESSMENTS SUBMISSIONS STORAGE (Received in Admin)
// ========================
const SAMPLE_ASSESSMENTS: AssessmentSubmission[] = [
  {
    id: 'asmt-sample-1',
    referenceCode: 'KW-START-392817',
    recipient: 'Parent / Senior',
    serviceCategory: 'home-care',
    selectedServices: ['Personal Care & Grooming', 'Dementia Care'],
    timeframe: 'Immediately (Within 48 hours)',
    hoursPerWeek: '20 - 30 hours/week',
    name: 'Robert Thornton',
    phone: '(412) 546-1860',
    email: 'rthornton@gmail.com',
    county: 'Allegheny County',
    township: 'Allison Park',
    notes: 'Father needs morning assistance with bathing and breakfast prep. Dementia support required.',
    submittedAt: 'Today at 09:15 AM',
    status: 'new'
  },
  {
    id: 'asmt-sample-2',
    referenceCode: 'KW-START-841920',
    recipient: 'Adult with ID/A',
    serviceCategory: 'odp-waiver',
    selectedServices: ['In-Home Respite', 'Community Participation Support (CPS)'],
    timeframe: 'Within 2 weeks',
    hoursPerWeek: '15 - 20 hours/week',
    name: 'Jessica & Carlos Clark',
    phone: '(724) 584-2817',
    email: 'jclark.family@outlook.com',
    county: 'Washington County',
    township: 'Canonsburg',
    notes: 'Looking for a dedicated DSP for our son who loves volunteering and community outings. Has Consolidated Waiver approval.',
    submittedAt: 'Yesterday at 04:30 PM',
    status: 'contacted'
  }
];

export function getStoredAssessments(): AssessmentSubmission[] {
  if (typeof window === 'undefined') return SAMPLE_ASSESSMENTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ASSESSMENTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(SAMPLE_ASSESSMENTS));
      return SAMPLE_ASSESSMENTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SAMPLE_ASSESSMENTS;
  } catch (e) {
    console.error('Failed to load assessments:', e);
    return SAMPLE_ASSESSMENTS;
  }
}

export function saveStoredAssessments(assessments: AssessmentSubmission[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(assessments));
    notifyDataChange();
  } catch (e) {
    console.error('Failed to save assessments:', e);
  }
}

export function addAssessmentSubmission(sub: AssessmentSubmission): void {
  const current = getStoredAssessments();
  const updated = [sub, ...current];
  saveStoredAssessments(updated);
}

export function updateAssessmentStatus(id: string, status: AssessmentSubmission['status']): void {
  const current = getStoredAssessments();
  const updated = current.map((a) => (a.id === id ? { ...a, status } : a));
  saveStoredAssessments(updated);
}

export function deleteAssessmentSubmission(id: string): void {
  const current = getStoredAssessments();
  const updated = current.filter((a) => a.id !== id);
  saveStoredAssessments(updated);
}

// ========================
// CAREERS / JOB POSTINGS STORAGE
// ========================
export function getStoredJobs(): JobPosting[] {
  if (typeof window === 'undefined') return INITIAL_JOB_POSTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.JOBS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(INITIAL_JOB_POSTINGS));
      return INITIAL_JOB_POSTINGS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_JOB_POSTINGS;
  } catch (e) {
    console.error('Failed to load jobs:', e);
    return INITIAL_JOB_POSTINGS;
  }
}

export function saveStoredJobs(jobs: JobPosting[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
    notifyDataChange();
  } catch (e) {
    console.error('Failed to save jobs:', e);
  }
}

export function addStoredJob(newJob: JobPosting): void {
  const current = getStoredJobs();
  const updated = [newJob, ...current];
  saveStoredJobs(updated);
}

export function updateStoredJob(updatedJob: JobPosting): void {
  const current = getStoredJobs();
  const updated = current.map((j) => (j.id === updatedJob.id ? updatedJob : j));
  saveStoredJobs(updated);
}

export function deleteStoredJob(id: string): void {
  const current = getStoredJobs();
  const updated = current.filter((j) => j.id !== id);
  saveStoredJobs(updated);
}

// ========================
// JOB APPLICATIONS STORAGE (Received in Admin)
// ========================
const SAMPLE_APPLICATIONS: JobApplication[] = [
  {
    id: 'app-sample-1',
    jobId: 'job-1',
    jobTitle: 'Direct Support Professional (DSP) - ODP Waiver Program',
    applicantName: 'Samantha Myers',
    email: 's.myers.care@gmail.com',
    phone: '(412) 670-3419',
    city: 'Allison Park, PA',
    experienceYears: '3 years',
    availability: 'Full-time (Weekdays & Alternate Weekends)',
    resumeOrBio: 'Experienced Direct Support Professional with 3 years supporting adults with ID/A in Allegheny County. Current PA clearances and CPR certified.',
    hasDriverLicense: true,
    hasClearances: true,
    submittedAt: 'Today at 10:20 AM',
    status: 'new'
  },
  {
    id: 'app-sample-2',
    jobId: 'job-2',
    jobTitle: 'Certified Home Health Aide / Caregiver - Senior Care',
    applicantName: 'David K. Lawson',
    email: 'dlawson.cna@yahoo.com',
    phone: '(724) 490-2184',
    city: 'Canonsburg, PA',
    experienceYears: '5 years',
    availability: 'Part-time (Mornings)',
    resumeOrBio: 'Certified Nursing Assistant specializing in senior memory care and mobility assistance. Passionate about compassionate home health.',
    hasDriverLicense: true,
    hasClearances: true,
    submittedAt: 'Yesterday at 02:45 PM',
    status: 'reviewing'
  }
];

export function getStoredJobApplications(): JobApplication[] {
  if (typeof window === 'undefined') return SAMPLE_APPLICATIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.JOB_APPLICATIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.JOB_APPLICATIONS, JSON.stringify(SAMPLE_APPLICATIONS));
      return SAMPLE_APPLICATIONS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SAMPLE_APPLICATIONS;
  } catch (e) {
    console.error('Failed to load applications:', e);
    return SAMPLE_APPLICATIONS;
  }
}

export function saveStoredJobApplications(apps: JobApplication[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.JOB_APPLICATIONS, JSON.stringify(apps));
    notifyDataChange();
  } catch (e) {
    console.error('Failed to save applications:', e);
  }
}

export function addJobApplication(app: JobApplication): void {
  const current = getStoredJobApplications();
  const updated = [app, ...current];
  saveStoredJobApplications(updated);
}

export function updateJobApplicationStatus(id: string, status: JobApplication['status']): void {
  const current = getStoredJobApplications();
  const updated = current.map((a) => (a.id === id ? { ...a, status } : a));
  saveStoredJobApplications(updated);
}

export function deleteJobApplication(id: string): void {
  const current = getStoredJobApplications();
  const updated = current.filter((a) => a.id !== id);
  saveStoredJobApplications(updated);
}

// ========================
// ADMIN AUTHORIZATION
// Uses cryptographic hashing (SHA-256) to verify authorization without storing secrets in plaintext.
// Configurable via VITE_ADMIN_PIN_HASH in production.
// ========================
const DEFAULT_AUTH_HASH = 'd0ab864a17dbd8a07dda05a58ac74d4894b7effa8e1c5152d71adf8b1fcc24d9';

async function computeSHA256(str: string): Promise<string> {
  if (typeof window === 'undefined' || !window.crypto || !window.crypto.subtle) {
    return '';
  }
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
}

export function setAdminAuthenticated(val: boolean): void {
  if (typeof window === 'undefined') return;
  if (val) {
    sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
  } else {
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  }
}

export async function verifyAdminCode(inputCode: string): Promise<boolean> {
  if (!inputCode || typeof inputCode !== 'string') return false;
  const targetHash = (import.meta as any).env?.VITE_ADMIN_PIN_HASH || DEFAULT_AUTH_HASH;
  const hash = await computeSHA256(inputCode.trim());
  return hash.toLowerCase() === targetHash.toLowerCase();
}
