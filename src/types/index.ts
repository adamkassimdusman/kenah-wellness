export type PageId =
  | 'home'
  | 'about'
  | 'home-care'
  | 'odp-waiver'
  | 'blog'
  | 'blog-detail'
  | 'contact'
  | 'faq'
  | 'testimonials'
  | 'careers'
  | 'service-detail'
  | 'get-started'
  | 'free-assessment'
  | 'privacy'
  | 'terms'
  | 'not-found'
  | 'admin';

export interface CookieConsentPreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

export const BLOG_CATEGORIES = [
  'Caregiver Tips',
  'ODP Updates',
  'Company News',
  'Senior Home Care',
  'Dementia Support',
  'Family Resources',
  'In-Home Respite'
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number] | string;

export interface ServiceItem {
  id: string;
  category: 'home-care' | 'odp-waiver';
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  bulletPoints: string[];
  whoItIsFor: string;
  howWeHelp: string[];
  paWaiverNote?: string;
  hourlyEstimate?: string;
  keyHighlights?: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  author: {
    name: string;
    role: string;
  };
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  location: string;
  serviceType: string;
  rating: number;
}

export interface FaqItem {
  id: string;
  category: 'odp' | 'home-care' | 'general' | 'eligibility';
  question: string;
  answer: string;
}

export interface ServiceArea {
  name: string;
  county: string;
  featured?: boolean;
}

export interface AssessmentSubmission {
  id: string;
  referenceCode: string;
  recipient: string;
  serviceCategory: 'both' | 'home-care' | 'odp-waiver';
  selectedServices: string[];
  timeframe: string;
  hoursPerWeek: string;
  name: string;
  phone: string;
  email: string;
  county: string;
  township: string;
  notes: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'scheduled' | 'completed' | 'archived';
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'PRN' | 'Flexible';
  payRange: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  status: 'active' | 'closed';
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantName: string;
  email: string;
  phone: string;
  city: string;
  experienceYears: string;
  availability: string;
  resumeOrBio: string;
  hasDriverLicense: boolean;
  hasClearances: boolean;
  submittedAt: string;
  status: 'new' | 'reviewing' | 'interview_scheduled' | 'hired' | 'declined';
}
