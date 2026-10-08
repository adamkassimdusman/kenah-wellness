import { ServiceItem, FaqItem, ServiceArea } from '../types';

export interface PaymentOption {
  source: string;
  badge: string;
  description: string;
  programs: string[];
}

export interface WhoWeServeItem {
  title: string;
  description: string;
  category: 'odp' | 'senior' | 'recovery' | 'specialized';
  icon: string;
}

export interface WhyChooseUsItem {
  title: string;
  description: string;
}

export const COMPANY_DETAILS = {
  name: 'Kenah Wellness Services',
  legalName: 'Kenah Wellness Services LLC',
  tagline: 'ODP Waiver Services | Home Care | Respite | Community Participation | Habilitation',
  motto: 'Caring Beyond the Call',
  odpProviderNumber: '104556630',
  odpProviderDisplay: 'Provider #104556630',
  phone: '+1 (412) 546-1860',
  phoneClean: '+14125461860',
  email: 'info@kenahwellness.com',
  website: 'www.kenahwellness.com',
  address: {
    street: '2400 Ansys Drive, Suite 169',
    city: 'Canonsburg',
    state: 'PA',
    zip: '15317'
  },
  referralsContact: {
    name: 'Zephaniah Omweno',
    role: 'Operations Manager',
    phone: '+1 (412) 546-1860',
    email: 'info@kenahwellness.com'
  },
  countiesServed: ['Allegheny County', 'Butler County', 'Washington County']
};

export const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    source: 'ODP Waivers',
    badge: 'State Waiver',
    description: 'Consolidated, Community Living and P/FDS waivers through the Pennsylvania Office of Developmental Programs.',
    programs: ['Consolidated Waiver', 'Community Living Waiver', 'P/FDS Waiver']
  },
  {
    source: 'Act 150',
    badge: 'State Funded',
    description: "Pennsylvania’s state-funded Attendant Care program for adults with physical disabilities.",
    programs: ['Attendant Care', 'Physical Disability Support']
  },
  {
    source: 'Medicaid',
    badge: 'Medical Assistance',
    description: 'We accept Medicaid clients for home care services across Southwestern PA.',
    programs: ['PA Medicaid', 'Community HealthChoices (CHC)']
  },
  {
    source: 'Insurance Companies',
    badge: 'Commercial & LTC',
    description: 'We work with insurance companies, including long-term care (LTC) insurance plans and commercial policies.',
    programs: ['Long-Term Care Insurance', 'Commercial Health Plans']
  },
  {
    source: 'Private / Self Pay',
    badge: 'Flexible Plans',
    description: 'Flexible care plans built around each family’s specific schedule and monthly budget.',
    programs: ['Hourly Care', '24/7 Overnight', 'Customized Respite']
  }
];

export const WHO_WE_SERVE: WhoWeServeItem[] = [
  {
    title: 'Individuals with Intellectual Disabilities & Autism',
    description: 'Person-centered support through Pennsylvania ODP waivers (Provider #104556630) fostering community participation, daily living skills, and respite.',
    category: 'odp',
    icon: 'Users'
  },
  {
    title: 'Seniors & Older Adults',
    description: 'Compassionate assistance promoting dignity and independence so seniors can age in place safely and happily in their cherished homes.',
    category: 'senior',
    icon: 'Heart'
  },
  {
    title: 'Adults with Physical Disabilities',
    description: 'Dedicated personal care assistance, mobility support, and attendant care (including Act 150 participants).',
    category: 'specialized',
    icon: 'ShieldCheck'
  },
  {
    title: 'Post-Discharge & Surgical Recovery Patients',
    description: 'Supportive care coming home after hospital, rehab, surgery, or injury to prevent complications and reduce readmissions.',
    category: 'recovery',
    icon: 'Sparkles'
  },
  {
    title: 'People Needing End-of-Life & Dementia Care',
    description: 'Specialized memory support, gentle de-escalation, chronic condition management, and compassionate bedside hospice support.',
    category: 'specialized',
    icon: 'HeartHandshake'
  },
  {
    title: 'Families & Primary Unpaid Caregivers',
    description: 'Reliable In-Home and Out-of-Home Respite relief so devoted family caregivers can rest, recharge, and prevent burnout.',
    category: 'odp',
    icon: 'Coffee'
  }
];

export const WHY_CHOOSE_US: WhyChooseUsItem[] = [
  {
    title: 'Continuous Professional Training',
    description: 'Our caregivers and Direct Support Professionals undergo continuous professional training in person-centered care, safety practices, and compassionate communication.'
  },
  {
    title: 'Experience in Assisting',
    description: 'Deep, hands-on experience in assisting individuals with autism, intellectual disabilities, seniors, and recovering adults across Western PA.'
  },
  {
    title: 'Trained in Safety Practices',
    description: 'Thoroughly certified in safe transfer mechanics, CPR, emergency preparedness, fall risk mitigation, and infection control.'
  },
  {
    title: 'Client Confidentiality & HIPAA Compliance',
    description: 'Rigorous client confidentiality and strict HIPAA compliance safeguarding every medical and personal record with absolute integrity.'
  },
  {
    title: 'Person-Centered Care & RN Oversight',
    description: 'Nurse-supervised individualized support plans designed with each person, family, and County Supports Coordinator.'
  },
  {
    title: '24/7 Availability & Responsive Coordination',
    description: 'Around-the-clock availability for family updates, urgent schedule adjustments, and emergency respite coverage.'
  }
];

export const HOME_CARE_SERVICES: ServiceItem[] = [
  {
    id: 'personal-care',
    category: 'home-care',
    title: 'Personal Care',
    shortDesc: 'Compassionate assistance with bathing, grooming, dressing, toileting, and mobility assistance to preserve dignity and comfort at home.',
    fullDesc: 'Our certified personal care aides assist individuals with their most sensitive daily living routines with patience, gentle touch, and complete respect for privacy and autonomy. We tailor every care plan to your exact preferences, sleep patterns, and comfort needs, available up to 24 hours a day, 7 days a week.',
    iconName: 'PersonalCare',
    bulletPoints: [
      'Bathing, showering & gentle bed bath assistance',
      'Personal grooming, hair care, shaving & oral hygiene',
      'Dressing assistance & dignified wardrobe selection',
      'Toileting, sanitation & incontinence care with total dignity',
      'Safe transfer techniques & fall prevention mobility',
      'Medication reminders and routine monitoring'
    ],
    whoItIsFor: 'Seniors, adults recovering from illness or injury, and individuals with physical mobility limitations who need compassionate, hands-on personal hygiene support.',
    howWeHelp: [
      'PA-certified and thoroughly background-checked caregivers',
      'Registered nurse-supervised individualized care plans',
      'Safe transfer mechanics that reduce in-home fall risk',
      'Preservation of personal autonomy, dignity, and client choice'
    ],
    keyHighlights: ['Nurse Supervised', 'Flexible Hours', 'Fall Prevention Trained']
  },
  {
    id: 'senior-care',
    category: 'home-care',
    title: 'Senior Care & Companionship',
    shortDesc: 'Compassionate support for older adults that promotes dignity and independence and helps them keep their everyday routines.',
    fullDesc: 'Senior care at Kenah Wellness enables elderly loved ones to maintain their independence without sacrificing safety or quality of life. From daily wellness check-ins to nutritious meals, mobility oversight, and friendly conversation, our attentive caregivers provide the loving support seniors deserve in their familiar home.',
    iconName: 'SeniorCare',
    bulletPoints: [
      'Daily wellness check-ins & vitals monitoring reminders',
      'Fall risk reduction & safe home navigation',
      'Nutritious meal preparation tailored to senior dietary needs',
      'Light housekeeping, laundry, fresh linens & tidy living spaces',
      'Companionship, engaging conversation & mentally stimulating hobbies',
      'Transportation and escort to medical appointments and errands'
    ],
    whoItIsFor: 'Aging adults who wish to remain in their own homes, couples wanting supportive daily help, and adult children seeking reliable local support for aging parents.',
    howWeHelp: [
      'Dedicated care coordinators who understand geriatric wellness',
      'Regular communication updates to family members near or far',
      'Holistic approach encouraging physical activity and social vitality',
      'Seamless coordination with primary physicians and visiting nurses'
    ],
    keyHighlights: ['Aging-In-Place Focus', 'Dietary Customization', 'Family Portal Updates']
  },
  {
    id: 'post-discharge-recovery-care',
    category: 'home-care',
    title: 'Post-Discharge / Recovery Care at Home',
    shortDesc: 'Attentive support coming home from the hospital, rehab, or surgery—following discharge orders, providing medication reminders, and reducing readmission risk.',
    fullDesc: 'Coming home from the hospital, rehab, or surgery is a critical time. Our caregivers help with daily tasks, follow discharge instructions, provide medication reminders, and watch for condition changes—supporting a safe recovery and reducing the risk of readmission.',
    iconName: 'PostDischargeRecovery',
    bulletPoints: [
      'Strict adherence to physician discharge plans and recovery protocols',
      'Timely medication reminders, symptom logs & hydration checks',
      'Safe mobility assistance, slide board transfers & fall prevention',
      'Wholesome recovery meal preparation and pantry restocking',
      'Assistance with personal grooming, dressing & gentle hygiene',
      'Coordination with visiting physical, occupational & speech therapists'
    ],
    whoItIsFor: 'Individuals transitioning home after surgery (hip/knee replacement, cardiac, abdominal), hospital stays, rehab facility discharges, or acute illness recovery.',
    howWeHelp: [
      'Close alignment with physician and therapist instructions to accelerate healing',
      'Caregivers experienced in advanced transfer mechanics and mobility aids',
      'Proactive observation that catches warning signs before readmission is necessary',
      'Covered under Medicaid, Insurance, Private Pay, and Act 150'
    ],
    keyHighlights: ['Hospital-to-Home Care', 'Reduces Readmission', 'Rehab Coordination']
  },
  {
    id: 'dementia-care',
    category: 'home-care',
    title: 'Dementia Care',
    shortDesc: 'Specialized memory support, gentle de-escalation, and predictable comforting routines for individuals with Alzheimer’s and dementia.',
    fullDesc: 'Caring for someone experiencing memory loss requires specialized empathy, predictable routines, and patience. Our dementia care specialists are trained in validation therapy, sensory engagement, and positive redirection techniques that preserve confidence and minimize agitation, anxiety, and sundowning.',
    iconName: 'DementiaCare',
    bulletPoints: [
      'Structured daily routines designed to reduce anxiety & confusion',
      'Cognitive stimulation, music therapy & memory reminiscing',
      'Safety monitoring & wandering prevention protocols',
      'Gentle de-escalation techniques for agitation and sundowning',
      'Nutrition and hydration support with simple meal cues',
      'Family coaching and guidance on dementia communication'
    ],
    whoItIsFor: 'Individuals diagnosed with Alzheimer’s disease, vascular dementia, Lewy body dementia, or mild cognitive impairment (MCI).',
    howWeHelp: [
      'Dementia-certified caregivers trained in person-first communication',
      'Calm, safe home environment modifications to prevent wandering',
      'Meaningful sensory connection that stimulates joyful memories',
      'Support that helps individuals stay at home longer in comfort'
    ],
    keyHighlights: ['Memory Care Certified', 'Sundowning Support', 'Wandering Prevention']
  },
  {
    id: 'end-of-life-care',
    category: 'home-care',
    title: 'End-of-Life Care & Hospice Support',
    shortDesc: 'Compassionate bedside presence, palliative comfort care, and gentle respite to support individuals and families during life’s most delicate chapter.',
    fullDesc: 'During end-of-life transitions, emotional warmth, peaceful comfort, and unwavering respect are paramount. Working seamlessly alongside hospice providers and medical teams, our palliative aides offer quiet comfort, pain relief positioning, soothing companionship, and dependable relief for weary family members.',
    iconName: 'EndOfLifeCare',
    bulletPoints: [
      'Gentle repositioning for comfort & pressure sore prevention',
      'Oral hydration, mouth care & soothing skin hydration',
      'Continuous quiet bedside presence and active listening',
      'Coordination with hospice nurses and palliative care teams',
      'Compassionate emotional support & respite for family caregivers',
      'Creating a peaceful, dignified, and serene home atmosphere'
    ],
    whoItIsFor: 'Individuals receiving hospice or palliative care, and families facing terminal illness who need steady, compassionate guidance and physical relief.',
    howWeHelp: [
      'Caregivers specially trained in gentle palliative touch and quiet dignity',
      '24/7 on-call coordinator support and flexible bedside scheduling',
      'Allowing family members to step back from care tasks to cherish meaningful moments',
      'Unbroken coordination with your chosen hospice or palliative agency'
    ],
    keyHighlights: ['Hospice Collaboration', 'Quiet Bedside Presence', '24/7 Availability']
  },
  {
    id: 'respite-care',
    category: 'home-care',
    title: 'Respite Care for Family Caregivers',
    shortDesc: 'Reliable, flexible relief for dedicated family caregivers, preventing burnout while ensuring uninterrupted, loving care for your loved one.',
    fullDesc: 'Being a primary family caregiver is one of the most generous yet exhausting responsibilities. Kenah Wellness Respite Care gives parents, spouses, and adult children the freedom to take a well-deserved rest, attend work, run errands, or take a vacation, knowing their loved one is in safe, professional, and affectionate hands.',
    iconName: 'RespiteCare',
    bulletPoints: [
      'Flexible hourly, daily, weekend, or overnight care sessions',
      'Caregiver rest for vacations, business trips, or personal health',
      'Complete continuity of daily routines, meals, and medications',
      'Engaging recreational activities and warm companionship',
      'Emergency or short-notice coverage when caregiver illness strikes',
      'Detailed handover logs and updates after every shift'
    ],
    whoItIsFor: 'Spouses, parents, and adult children caring for an elderly parent or family member with special needs who require scheduled or emergency breaks.',
    howWeHelp: [
      'Eliminates caregiver stress, chronic exhaustion, and emotional burnout',
      'Smooth transition protocols with familiar face consistency',
      'Customized scheduling that fits your exact work and family rhythm',
      'Available across Allegheny, Butler, and Washington counties'
    ],
    keyHighlights: ['Burnout Prevention', 'Overnight & Weekend Care', 'Emergency Short-Notice']
  },
  {
    id: 'facility-based-care',
    category: 'home-care',
    title: 'Facility-Based Care (Assisted Living Contracts)',
    shortDesc: 'Through facility contracts, our caregivers also support clients in assisted living facilities—so we can follow your loved one wherever they live.',
    fullDesc: 'When your loved one resides in an assisted living community, personal care home, or residential facility, additional one-on-one companionship and hands-on assistance can make all the difference. Kenah Wellness contracts with facilities and families to provide dedicated private caregivers so familiar, loving support follows your loved one anywhere.',
    iconName: 'FacilityBasedCare',
    bulletPoints: [
      'Dedicated one-on-one caregiver attention inside assisted living communities',
      'Follows clients across facility moves, rehab stays, or aging transitions',
      'Assistance with dining, socializing, personal grooming and walking',
      'Warm companion presence when family cannot be on site',
      'Facility contract coordination and direct communication with family',
      'Supplemental overnight monitoring and fall prevention oversight'
    ],
    whoItIsFor: 'Residents of assisted living facilities, memory care units, or nursing communities who need additional one-on-one companionship, supervision, or specialized hands-on care.',
    howWeHelp: [
      'Seamless partnership with facility staff and administration',
      'Ensures continuous familiar faces even when living outside the family home',
      'Personalized private-duty care tailored to individual routines'
    ],
    keyHighlights: ['Assisted Living Contracts', 'Follows Clients Anywhere', 'One-on-One Attention']
  },
  {
    id: 'additional-services',
    category: 'home-care',
    title: 'Additional Domestic & Errand Supports',
    shortDesc: 'Flexible household management, errand assistance, meal planning, grocery shopping, and customized domestic supports.',
    fullDesc: 'Life involves countless small practical details that keep a home peaceful and functional. Our additional services cover everything from grocery shopping and prescription pick-up to healthy meal planning, home organization, and seasonal safety adjustments.',
    iconName: 'AdditionalServices',
    bulletPoints: [
      'Grocery shopping, pantry stocking & nutritious meal prep',
      'Prescription pick-up at the local pharmacy & errand running',
      'Light housekeeping, vacuuming, dusting & kitchen sanitization',
      'Bed linen changes, laundry washing, drying & folding',
      'Mail organization, appointment reminders & scheduling help',
      'Transportation to community events, social clubs & church'
    ],
    whoItIsFor: 'Anyone needing dependable extra hands to manage domestic tasks, errands, and household upkeep smoothly and reliably.',
    howWeHelp: [
      'Flexible hourly blocks tailored to your exact weekly preferences',
      'Maintains a spotless, sanitary, hazard-free living sanctuary',
      'Frees up client and family energy for rest and joyful moments'
    ],
    keyHighlights: ['Errands & Shopping', 'Custom Domestic Help', 'Flexible Hours']
  }
];

export const ODP_WAIVER_SERVICES: ServiceItem[] = [
  {
    id: 'in-home-community-supports-ihcs',
    category: 'odp-waiver',
    title: 'In-Home & Community Supports (IHCS)',
    shortDesc: 'One-on-one support in the home and community that helps individuals build skills, stay safe and live as independently as possible.',
    fullDesc: 'Kenah Wellness Services delivers person-centered In-Home & Community Supports (IHCS) under Pennsylvania Office of Developmental Programs (ODP) waivers. Our direct support staff works one-on-one with individuals inside their home and out in the community to foster self-sufficiency, daily life skills, health and safety, and social integration.',
    iconName: 'InHomeCommunitySupports',
    bulletPoints: [
      'Basic, Level 1, Level 2 and Level 3 support staffing',
      'Level 2 Enhanced (Caregiver / LPN / RN options)',
      'Level 3 Enhanced (Caregiver / LPN / RN options)',
      'One-on-one skill building for home and community independence',
      'Support with personal routines, hygiene, nutrition and safety',
      'Supports Coordinator (SC) alignment and ISP outcome tracking'
    ],
    whoItIsFor: 'Individuals with intellectual disabilities and autism enrolled in PA ODP Consolidated, Community Living, or P/FDS waivers seeking one-on-one support to thrive at home and in the community.',
    howWeHelp: [
      'Staffing tailored from Basic through Enhanced Level 3 with RN/LPN coverage',
      'Person-centered skill progression based on ISP outcomes',
      'Dedicated care coordinators working hand-in-hand with County SCs'
    ],
    paWaiverNote: 'Office of Developmental Programs (ODP) approved provider — Provider #104556630.',
    keyHighlights: ['ODP Provider #104556630', 'Basic to Level 3 Enhanced', 'RN / LPN Support']
  },
  {
    id: 'in-home-respite',
    category: 'odp-waiver',
    title: 'In-Home, Life Sharing & Day Respite',
    shortDesc: 'Short-term relief for families and unpaid caregivers, with the same trained, dependable staff in the individual’s familiar residence.',
    fullDesc: 'In-Home Respite occurs directly inside the individual’s own home. This service gives unpaid primary caregivers (parents, siblings, guardians) essential time to rest, attend medical appointments, go to work, or manage personal responsibilities, while the individual remains in their comforting, familiar environment with a qualified Kenah support specialist.',
    iconName: 'InHomeRespite',
    bulletPoints: [
      'Support delivered directly within the individual’s home',
      'Includes In-Home Respite, Life Sharing Respite, and Day Respite',
      'Levels 2–4 with 1:1, 1:2 and 2:1 staffing ratios',
      'Enhanced and non-enhanced options with licensed (LPN/RN) & unlicensed staff',
      'Caregiver relief for work, appointments, or rest with familiar staff consistency',
      'Authorized under PA ODP Consolidated & Community Living Waivers'
    ],
    whoItIsFor: 'Individuals with intellectual and developmental disabilities (ID/A) whose family caregivers need temporary relief and peace of mind.',
    howWeHelp: [
      'Trained direct support professionals (DSPs) certified in person-centered practices',
      'Adherence to the individual’s Individualized Support Plan (ISP)',
      'Flexible scheduling including evenings, weekends, and planned relief periods'
    ],
    paWaiverNote: 'Billed through Pennsylvania ODP Consolidated and Community Living Waivers (Provider #104556630).',
    keyHighlights: ['ODP Certified #104556630', 'In-Home & Day Respite', '1:1, 1:2 & 2:1 Ratios']
  },
  {
    id: 'out-of-home-respite',
    category: 'odp-waiver',
    title: 'Out-of-Home Respite',
    shortDesc: 'Safe, supervised care in a setting outside the family home—individuals continue their routines with trained staff while families rest and recharge.',
    fullDesc: 'When families need a break, or an individual benefits from time away from home, our Out-of-Home Respite provides safe, supervised care in a setting outside the family home. Individuals continue their routines with trained staff while families rest and recharge.',
    iconName: 'OutOfHomeRespite',
    bulletPoints: [
      'Safe, supervised care in approved community and retreat settings outside the home',
      'Individuals continue their daily routines with qualified, caring staff',
      'Levels 2–4 with 1:1, 1:2 and 2:1 staffing ratios',
      'Enhanced and non-enhanced options with licensed (LPN/RN) & unlicensed respite',
      'Positive change of scenery, peer social connection, and recreation',
      'Authorized under PA ODP Consolidated and Community Living Waivers'
    ],
    whoItIsFor: 'Individuals with ID/A whose families need extended relief periods, weekend respites, or scheduled coverage during family events or emergencies.',
    howWeHelp: [
      'Carefully vetted and licensed partner locations ensuring high standards of safety',
      'Engaging recreational programming tailored to individual sensory preferences',
      'Peace of mind for families during vacations, medical leaves, or personal emergencies'
    ],
    paWaiverNote: 'Authorized under PA ODP Consolidated Waiver and Community Living Waiver (Provider #104556630).',
    keyHighlights: ['Licensed Retreats', 'Peer Socialization', '1:1 & 2:1 Staffing Ratios']
  },
  {
    id: 'community-participation-support-cps',
    category: 'odp-waiver',
    title: 'Community Participation Support (CPS)',
    shortDesc: 'Community Participation Support helps individuals take part in community life in meaningful ways — building friendships, skills and independence through activities they choose.',
    fullDesc: 'Community Participation Support helps individuals take part in community life in meaningful ways — building friendships, skills and independence through activities they choose. Kenah Wellness connects participants with local cultural centers, volunteering, public recreation, and civic clubs across Allegheny, Butler, and Washington counties.',
    iconName: 'CommunityParticipation',
    bulletPoints: [
      'Participation in community activities, events, clubs and recreation',
      'Volunteering and exploring work-related interests',
      'Building social, communication and daily living skills in real community settings',
      'Person-centered goals developed with the individual, family and Supports Coordinator',
      'Community-based and facility-based participation options',
      'Public transit training, street safety & community navigation'
    ],
    whoItIsFor: 'Individuals with ID/A who desire active involvement in their community, social growth, and meaningful daytime engagement outside the home.',
    howWeHelp: [
      'Small group ratios or 1-on-1 support depending on individual needs',
      'Careful transportation coordination and community safety oversight',
      'Building genuine connections that extend beyond professional service boundaries'
    ],
    paWaiverNote: 'Available under PA ODP Consolidated, Community Living, and P/FDS Waivers (Provider #104556630).',
    keyHighlights: ['Community Inclusion', 'Volunteer Outings', 'Friendship Building']
  },
  {
    id: 'habilitation-hab',
    category: 'odp-waiver',
    title: 'Habilitation Services',
    shortDesc: 'Habilitation services help individuals learn, keep and improve the skills they need to live as independently as possible — such as self-care, household tasks, money management, communication and safety.',
    fullDesc: 'Habilitation services help individuals learn, keep and improve the skills they need to live as independently as possible — such as self-care, household tasks, money management, communication and safety. Rather than doing tasks for the person, our Direct Support Professionals coach and encourage individuals to master essential life skills with dignity and choice.',
    iconName: 'Habilitation',
    bulletPoints: [
      'Individualized skill-building based on each person’s plan',
      'Delivered by trained staff with RN / LPN support where needed',
      'Focus on independence, dignity and choice',
      'Cooking, nutrition, meal planning & grocery budgeting',
      'Personal hygiene, dressing & self-care independence',
      'Household chores, laundry, safety habits & public transit navigation'
    ],
    whoItIsFor: 'Individuals with intellectual and developmental disabilities seeking to build practical life skills, foster confidence, and achieve greater autonomy.',
    howWeHelp: [
      'Patient, structured coaching tailored to individual learning styles',
      'Data collection and progress reporting shared with Supports Coordinators (SCs)',
      'Empowering the individual to take pride in everyday achievements'
    ],
    paWaiverNote: 'Covered under Consolidated, Community Living, and P/FDS Waivers (Provider #104556630).',
    keyHighlights: ['Skill Acquisition', 'ISP Outcome Tracking', 'RN / LPN Support']
  }
];

export const ALL_SERVICES: ServiceItem[] = [
  ...HOME_CARE_SERVICES,
  ...ODP_WAIVER_SERVICES
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'eligibility',
    question: 'How do I know if my loved one qualifies for Pennsylvania ODP Waiver services?',
    answer: 'To qualify for ODP waivers (Consolidated, Community Living, or P/FDS), the individual must have a diagnosed intellectual disability or autism spectrum disorder diagnosed prior to age 22, meet Medicaid financial eligibility criteria, and be assessed by county developmental programs. Kenah Wellness Services is an approved ODP provider (Provider #104556630) and coordinates directly with your County Supports Coordinator (SC) across Allegheny, Butler, and Washington counties to initiate services.'
  },
  {
    id: 'faq-2',
    category: 'general',
    question: 'How does your Free Assessment work?',
    answer: 'Our Free Assessment is a 100% complimentary, no-obligation consultation conducted at your home or virtually. A dedicated care coordinator evaluates daily routines, verifies Pennsylvania ODP waiver, Act 150, Medicaid, or insurance coverage, answers all family questions, and designs a person-centered care plan tailored to your goals.'
  },
  {
    id: 'faq-3',
    category: 'home-care',
    question: 'Can families interview and choose their caregivers?',
    answer: 'Yes! At Kenah Wellness, we offer families the opportunity to meet and interview potential caregivers before services commence. We believe mutual trust and chemistry are fundamental to dignified care. If at any time you feel a match is not ideal, we gladly provide an alternate caregiver without delay.'
  },
  {
    id: 'faq-4',
    category: 'general',
    question: 'What are your operating hours and how quickly can services begin?',
    answer: 'Kenah Wellness Services operates 24 Hours a day, 7 days a week (Monday through Sunday). We offer flexible scheduling including day shifts, evening routines, overnight awake monitoring, and 24/7 care. Rapid intake allows care to begin within 24 to 48 hours following your assessment.'
  },
  {
    id: 'faq-5',
    category: 'home-care',
    question: 'What payment and funding options do you accept?',
    answer: 'We accept Pennsylvania ODP Waivers (Consolidated, Community Living, and P/FDS), Act 150 Attendant Care, Medicaid, commercial and long-term care insurance policies, and flexible private/self-pay plans.'
  },
  {
    id: 'faq-6',
    category: 'odp',
    question: 'Do you work directly with our County Supports Coordinator (SC)?',
    answer: 'Yes. For all ODP Waiver services, we partner closely with your assigned County Supports Coordinator across Allegheny, Butler, and Washington counties. Operations Manager Zephaniah Omweno and our team participate in team meetings, align notes with your Individualized Support Plan (ISP), and submit documentation in full compliance with PA ODP regulations.'
  },
  {
    id: 'faq-7',
    category: 'general',
    question: 'What are Kenah Wellness Services’ core values and motto?',
    answer: 'Our motto is "Caring Beyond the Call". Our care delivery is grounded in Compassion, Respect & Choice, Inclusion & Community, and Excellence & Trust. We honor the individuality, dignity, and choices of every senior and person with disabilities under our care.'
  },
  {
    id: 'faq-8',
    category: 'general',
    question: 'Where is your main office located and what areas do you serve?',
    answer: 'Our main office is located at 2400 Ansys Drive, Suite 169, Canonsburg, PA 15317. We serve Allegheny, Butler, and Washington Counties, including Pittsburgh, Allison Park, Cranberry Township, Wexford, Canonsburg, Butler, Washington, McCandless, and surrounding communities.'
  }
];

export const SERVICE_AREAS: ServiceArea[] = [
  // Allegheny County
  { name: 'City of Pittsburgh (All Neighborhoods)', county: 'Allegheny County', featured: true },
  { name: 'Allison Park', county: 'Allegheny County', featured: true },
  { name: 'Bellevue', county: 'Allegheny County', featured: false },
  { name: 'East Liberty', county: 'Allegheny County', featured: false },
  { name: 'Franklin Park', county: 'Allegheny County', featured: true },
  { name: 'Gibsonia', county: 'Allegheny County', featured: false },
  { name: 'Glenshaw', county: 'Allegheny County', featured: false },
  { name: 'Hampton Township', county: 'Allegheny County', featured: true },
  { name: 'McCandless', county: 'Allegheny County', featured: true },
  { name: 'Monroeville', county: 'Allegheny County', featured: false },
  { name: 'North Side', county: 'Allegheny County', featured: false },
  { name: 'Oakland', county: 'Allegheny County', featured: false },
  { name: 'Pine Township', county: 'Allegheny County', featured: false },
  { name: 'Ross Township', county: 'Allegheny County', featured: true },
  { name: 'Shaler', county: 'Allegheny County', featured: false },
  { name: 'West View', county: 'Allegheny County', featured: false },
  { name: 'Wexford', county: 'Allegheny County', featured: true },

  // Butler County
  { name: 'Butler', county: 'Butler County', featured: true },
  { name: 'Cranberry Township', county: 'Butler County', featured: true },
  { name: 'Evans City', county: 'Butler County', featured: false },
  { name: 'Mars', county: 'Butler County', featured: false },

  // Washington County
  { name: 'Canonsburg (Main Office)', county: 'Washington County', featured: true },
  { name: 'Washington', county: 'Washington County', featured: true },
  { name: 'Peters Township', county: 'Washington County', featured: false },
  { name: 'Murrysville & Surrounding', county: 'Westmoreland County', featured: false }
];
