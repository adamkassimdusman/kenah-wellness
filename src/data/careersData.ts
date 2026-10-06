import { JobPosting } from '../types';

export const INITIAL_JOB_POSTINGS: JobPosting[] = [
  {
    id: 'job-1',
    title: 'Direct Support Professional (DSP) - ODP Waiver Program',
    department: 'ODP Waiver Services',
    location: 'Canonsburg, PA & Allegheny County',
    type: 'Full-time',
    payRange: '$17.50 - $22.00 / hr',
    description:
      'Join our compassionate team supporting adults with intellectual and developmental disabilities under the Pennsylvania ODP Consolidated and Community Living Waivers. Empower individuals with daily living skills, social outings, community participation, and meaningful friendships.',
    requirements: [
      'High school diploma or GED equivalent',
      'Valid PA Driver’s License with reliable transportation',
      'Clean background checks (PA State Police, FBI fingerprinting, Child Abuse clearance)',
      'Patient, empathetic demeanor with passion for person-centered care',
      'CPR & First Aid certification (or willingness to complete company-paid training)'
    ],
    benefits: [
      'Competitive weekly pay with direct deposit',
      'Flexible scheduling (day, evening, and weekend shifts available)',
      'Paid onboarding and ongoing clinical training',
      'Mileage reimbursement for community transport',
      'Health, dental, and vision insurance options for full-time staff'
    ],
    requiredUploads: [
      { id: 'cv', label: 'Resume / Curriculum Vitae (CV)', required: true, description: 'Your current work history and healthcare or direct support background.' },
      { id: 'license', label: "Driver's License / Photo ID", required: true, description: 'Valid Pennsylvania Driver’s License for community transport verification.' },
      { id: 'cpr', label: 'CPR & First Aid Certification', required: false, description: 'Current AHA or Red Cross card (if available, or complete company-paid course).' },
      { id: 'clearances', label: 'PA Background Clearances', required: false, description: 'State Police, Child Abuse, or FBI fingerprint report if completed within 12 months.' }
    ],
    postedDate: 'May 10, 2026',
    status: 'active'
  },
  {
    id: 'job-2',
    title: 'Certified Home Health Aide / Caregiver - Senior Care',
    department: 'Home Care Services',
    location: 'Allison Park, Pittsburgh & North Hills, PA',
    type: 'Part-time',
    payRange: '$16.50 - $20.00 / hr',
    description:
      'Provide compassionate one-on-one care for seniors in Allison Park and surrounding Pittsburgh communities. Assist with personal hygiene, medication reminders, light housekeeping, nutritious meal prep, and genuine companionship.',
    requirements: [
      'At least 1 year of professional or personal caregiving experience (CNA/HHA preferred)',
      'Reliable personal vehicle and auto insurance',
      'Compassionate, punctual, and dependable work ethic',
      'Passionate about helping older adults age safely in place'
    ],
    benefits: [
      'Flexible hours matched to your availability',
      'Paid time off accrual and holiday premium pay',
      'Warm supportive clinical team with 24/7 supervisor support',
      'Referral bonuses for bringing fellow caregivers'
    ],
    requiredUploads: [
      { id: 'cv', label: 'Resume / CV', required: true, description: 'Highlighting senior care, CNA/HHA experience, or personal caregiving history.' },
      { id: 'license', label: "Driver's License & Auto Insurance", required: true, description: 'For local travel between clients in Allegheny County.' },
      { id: 'certs', label: 'CNA / HHA Certification', required: false, description: 'Pennsylvania Nurse Aide registry or HHA certification certificate.' },
      { id: 'cpr', label: 'CPR & First Aid Card', required: false, description: 'Current certification copy.' }
    ],
    postedDate: 'May 20, 2026',
    status: 'active'
  },
  {
    id: 'job-3',
    title: 'Dementia Care Specialist & Memory Support Aide',
    department: 'Specialized Care',
    location: 'Canonsburg & Washington County, PA',
    type: 'Flexible',
    payRange: '$18.00 - $23.00 / hr',
    description:
      'Specialize in non-confrontational memory support, gentle redirection, sensory engagement, and safe routine management for clients navigating Alzheimer’s and progressive dementia in their homes.',
    requirements: [
      'Demonstrated experience working with Alzheimer’s or dementia patients',
      'Dementia care certification or background in specialized home care',
      'Exceptional patience, validation communication skills, and safety focus',
      'Clean background checks and drug screening'
    ],
    benefits: [
      'Advanced specialized training and certification subsidies',
      'Consistent client assignments for relationship building',
      'Competitive pay differential for specialized memory cases'
    ],
    requiredUploads: [
      { id: 'cv', label: 'Resume / CV', required: true, description: 'Documenting your Alzheimer’s, dementia, or memory care experience.' },
      { id: 'dementia_cert', label: 'Memory / Dementia Care Credentials', required: false, description: 'Certificates in CDP, CARES, or specialized dementia training.' },
      { id: 'license', label: "Driver's License / Photo ID", required: true, description: 'Valid government ID.' }
    ],
    postedDate: 'June 01, 2026',
    status: 'active'
  },
  {
    id: 'job-4',
    title: 'In-Home & Community Respite Specialist',
    department: 'ODP & Family Respite',
    location: 'Southwestern Pennsylvania (Multiple Counties)',
    type: 'Part-time',
    payRange: '$17.00 - $21.50 / hr',
    description:
      'Provide essential, rejuvenating relief for family caregivers while delivering engaging, person-centered support to individuals with intellectual disabilities and seniors.',
    requirements: [
      'High school diploma or equivalent',
      'Driver’s license and dependable vehicle',
      'Enthusiastic attitude toward recreation and community inclusion',
      'Pass all mandated PA Department of Human Services clearances'
    ],
    benefits: [
      'Flexible weekend and evening hours—great for students and healthcare aides',
      'Supportive mentorship and ongoing professional growth',
      'Rewarding environment making a direct difference for local families'
    ],
    requiredUploads: [
      { id: 'cv', label: 'Resume or Bio Summary', required: true, description: 'Summary of care experience and community involvement.' },
      { id: 'license', label: "Driver's License", required: true, description: 'Proof of PA driver’s license.' },
      { id: 'clearances', label: 'Background Clearances', required: false, description: 'PA State Police / Child Abuse / FBI clearances.' }
    ],
    postedDate: 'June 15, 2026',
    status: 'active'
  }
];
