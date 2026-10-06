import { ServiceItem, FaqItem, ServiceArea } from '../types';

export const HOME_CARE_SERVICES: ServiceItem[] = [
  {
    id: 'personal-care',
    category: 'home-care',
    title: 'Personal Care',
    shortDesc: 'Compassionate assistance with daily personal routines, bathing, grooming, and mobility to preserve dignity, safety, and comfort at home.',
    fullDesc: 'Our certified personal care aides assist individuals with their most sensitive daily living routines with patience, gentle touch, and complete respect for privacy and autonomy. We tailor every care plan to your exact preferences, sleep patterns, and comfort needs.',
    iconName: 'PersonalCare',
    bulletPoints: [
      'Assistance with bathing, showering & bed baths',
      'Personal grooming, hair care & oral hygiene',
      'Dressing assistance & wardrobe selection',
      'Safe transfer techniques & fall prevention mobility',
      'Incontinence care, toileting & sanitation dignity',
      'Skin care & positioning assistance'
    ],
    whoItIsFor: 'Seniors, adults recovering from surgery or illness, and individuals with physical mobility limitations who need compassionate, hands-on personal hygiene support.',
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
    title: 'Senior Care',
    shortDesc: 'Comprehensive aging-in-place assistance empowering older adults to live safely, comfortably, and happily in their cherished homes.',
    fullDesc: 'Senior care at Kenah Wellness enables elderly loved ones to maintain their independence without sacrificing safety or quality of life. From daily wellness check-ins to nutrition and mobility oversight, our attentive caregivers provide the loving support seniors deserve.',
    iconName: 'SeniorCare',
    bulletPoints: [
      'Daily wellness check-ins & vitals monitoring reminders',
      'Fall risk reduction & safe home navigation',
      'Nutritious meal preparation tailored to senior dietary needs',
      'Light housekeeping, laundry & fresh linens',
      'Transportation to medical appointments and local errands',
      'Support with mobility, walking & gentle stretching'
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
    id: 'end-of-life-care',
    category: 'home-care',
    title: 'End of Life Care',
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
    title: 'Respite Care',
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
      'Available across Allegheny, Washington, Westmoreland, and Butler counties'
    ],
    keyHighlights: ['Burnout Prevention', 'Overnight & Weekend Care', 'Emergency Short-Notice']
  },
  {
    id: 'dementia-care',
    category: 'home-care',
    title: 'Dementia Care Service',
    shortDesc: 'Specialized memory support, gentle de-escalation, and cognitively stimulating routines for individuals with Alzheimer’s and dementia.',
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
    id: 'companionship-care',
    category: 'home-care',
    title: 'Companionship Care',
    shortDesc: 'Heartfelt social connection, engaging conversation, and uplifting friendship that banishes loneliness and brightens everyday life.',
    fullDesc: 'Social isolation is one of the greatest threats to senior health and well-being. Our companion caregivers provide the warmth of genuine friendship, engaging clients in their favorite hobbies, lively conversations, neighborhood walks, cards, crafts, and trips into the community.',
    iconName: 'CompanionCare',
    bulletPoints: [
      'Friendly conversation, active listening & reminiscence',
      'Accompaniment on neighborhood walks and light exercise',
      'Playing cards, board games, crossword puzzles, and crafts',
      'Escort to church services, community clubs & family events',
      'Mealtime companionship and sharing wholesome recipes',
      'Technology assistance for video calling family and friends'
    ],
    whoItIsFor: 'Seniors living alone, individuals experiencing loneliness or grief, and adults seeking friendly connection and active engagement.',
    howWeHelp: [
      'Caregiver matching based on mutual interests, hobbies, and temperament',
      'Consistent familiar faces to foster lasting, trusting relationships',
      'Encouraging mental acuity, joyful spirits, and emotional stability'
    ],
    keyHighlights: ['Interest-Matched Caregivers', 'Community Outings', 'Reduces Isolation']
  },
  {
    id: 'specialized-support',
    category: 'home-care',
    title: 'Specialized Support',
    shortDesc: 'Targeted care for complex medical recoveries, post-surgical transitions, physical disabilities, and progressive chronic conditions.',
    fullDesc: 'When health needs require specialized attention, Kenah Wellness delivers skilled, observant care. Whether you are transitioning home after a joint replacement surgery, living with Parkinson’s disease, or managing ALS or stroke recovery, our team coordinates with your clinicians to ensure a safe, steady recuperation.',
    iconName: 'SpecializedSupport',
    bulletPoints: [
      'Post-surgical discharge recovery & mobility reinforcement',
      'Care for chronic conditions (Parkinson’s, Stroke, ALS, MS)',
      'Medication reminder adherence and symptom observation',
      'Safe transfer assistance utilizing slide boards or gait belts',
      'Coordination with physical, occupational, and speech therapists',
      'Adaptive equipment assistance and home hazard modifications'
    ],
    whoItIsFor: 'Individuals recovering from hospital stays, those with chronic neurological conditions, or adults living with physical disabilities.',
    howWeHelp: [
      'Caregivers experienced in advanced transfer mechanics and mobility aids',
      'Comprehensive post-discharge care protocols that prevent hospital readmissions',
      'Close alignment with your therapy goals to rebuild strength and confidence'
    ],
    keyHighlights: ['Hospital-to-Home Care', 'Rehab Coordination', 'Mobility Safety']
  },
  {
    id: 'additional-services',
    category: 'home-care',
    title: 'Additional Services',
    shortDesc: 'Flexible household management, errand assistance, meal planning, grocery shopping, and customized domestic supports.',
    fullDesc: 'Life involves countless small practical details that keep a home peaceful and functional. Our additional services cover everything from grocery shopping and prescription pick-up to healthy meal planning, home organization, and seasonal safety adjustments.',
    iconName: 'AdditionalServices',
    bulletPoints: [
      'Grocery shopping, pantry stocking & nutritious meal prep',
      'Prescription pick-up at the local pharmacy & errand running',
      'Light housekeeping, vacuuming, dusting & kitchen sanitization',
      'Bed linen changes, laundry washing, drying & folding',
      'Mail organization, appointment reminders & scheduling help',
      'Pet care assistance (feeding, walks, fresh water)'
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
    id: 'in-home-respite',
    category: 'odp-waiver',
    title: 'In-Home Respite',
    shortDesc: 'Temporary, compassionate support provided within the individual’s residence, giving primary caregivers vital time to rest while ensuring uninterrupted continuity of care.',
    fullDesc: 'In-Home Respite occurs directly inside the individual’s own home. This service gives unpaid primary caregivers (parents, siblings, guardians) essential time to rest, attend medical appointments, go to work, or manage personal responsibilities, while the individual remains in their comforting, familiar environment with a qualified Kenah support specialist.',
    iconName: 'InHomeRespite',
    bulletPoints: [
      'Support delivered directly within the individual’s home',
      'Caregiver relief for work, appointments, or rest',
      'Consistent routines and familiar home environment',
      'Personal care, meal assistance, and safety oversight',
      'Authorized under the Pennsylvania ODP Consolidated Waiver'
    ],
    whoItIsFor: 'Individuals with intellectual and developmental disabilities (ID/A) whose family caregivers need temporary relief and peace of mind.',
    howWeHelp: [
      'Trained direct support professionals (DSPs) certified in person-centered practices',
      'Adherence to the individual’s Individualized Support Plan (ISP)',
      'Flexible scheduling including evenings, weekends, and planned relief periods'
    ],
    paWaiverNote: 'Billed through Pennsylvania ODP Consolidated Waiver under approved Respite codes.',
    keyHighlights: ['ODP Certified', 'In-Home Comfort', 'ISP Compliant']
  },
  {
    id: 'out-of-home-respite',
    category: 'odp-waiver',
    title: 'Out-of-Home Respite',
    shortDesc: 'Short-term care provided outside the home in approved community settings, giving families necessary relief while offering individuals engaging new social experiences.',
    fullDesc: 'Out-of-Home Respite takes place in certified community locations, licensed care homes, or approved retreat settings. This service provides unpaid primary caregivers significant relief periods while giving the individual a positive change of scenery, opportunities to socialize with peers, and access to new community activities in a secure, supervised environment.',
    iconName: 'OutOfHomeRespite',
    bulletPoints: [
      'Provided in licensed and approved community settings',
      'Positive change of environment and social opportunities',
      '24-hour supervision and qualified professional support',
      'Structured activities, recreation, and social connection',
      'Authorized under PA ODP Consolidated & Community Living Waivers'
    ],
    whoItIsFor: 'Individuals with ID/A whose families need extended relief periods, weekend respites, or scheduled coverage during family events or emergencies.',
    howWeHelp: [
      'Carefully vetted and licensed partner locations ensuring high standards of safety',
      'Engaging recreational programming tailored to individual sensory preferences',
      'Peace of mind for families during vacations, medical leaves, or personal emergencies'
    ],
    paWaiverNote: 'Authorized under PA ODP Consolidated Waiver and Community Living Waiver.',
    keyHighlights: ['Licensed Retreats', 'Peer Socialization', '24-Hour Supervision']
  },
  {
    id: 'habilitation-hab',
    category: 'odp-waiver',
    title: 'Habilitation (HAB)',
    shortDesc: 'Goal-oriented skill-building services designed to acquire, maintain, and improve the skills needed for independent daily living.',
    fullDesc: 'Habilitation services focus on practical skill acquisition, maintenance, and growth. Rather than doing tasks for the person, our Direct Support Professionals coach and encourage individuals to learn and master essential daily life skills—fostering confidence, autonomy, and lifelong self-reliance.',
    iconName: 'Habilitation',
    bulletPoints: [
      'Cooking, meal planning, and nutrition skills',
      'Money management, budgeting, and shopping',
      'Personal hygiene and self-care independence',
      'Household chores, laundry, and home maintenance',
      'Community safety and public transit navigation',
      'Structured goal progression aligned with ISP outcomes'
    ],
    whoItIsFor: 'Individuals with intellectual and developmental disabilities seeking to build practical life skills and increase self-determination.',
    howWeHelp: [
      'Patient, structured coaching tailored to individual learning styles',
      'Data collection and progress reporting shared with Supports Coordinators (SCs)',
      'Empowering the individual to take pride in everyday achievements'
    ],
    paWaiverNote: 'Covered under Consolidated, Community Living, and P/FDS Waivers.',
    keyHighlights: ['Skill Acquisition', 'ISP Outcome Tracking', 'Self-Determination']
  },
  {
    id: 'community-participation-support-cps',
    category: 'odp-waiver',
    title: 'Community Participation Support (CPS)',
    shortDesc: 'Community-based inclusion activities that foster meaningful social connections, volunteering, hobbies, and civic engagement.',
    fullDesc: 'Community Participation Support (CPS) connects individuals with intellectual disabilities to the rich fabric of their local Pittsburgh and surrounding communities. Through volunteer projects, recreational centers, arts, libraries, and public events, we build authentic social relationships and full community inclusion.',
    iconName: 'CommunityParticipation',
    bulletPoints: [
      'Volunteering at local non-profits, animal shelters, and food banks',
      'Recreation at community centers, parks, and YMCA facilities',
      'Exploring libraries, museums, and cultural venues',
      'Social networking with peers and community members',
      'Learning public transit routes and community navigation',
      'Developing pre-employment interests and soft skills'
    ],
    whoItIsFor: 'Individuals with ID/A who desire active involvement in their community, social growth, and meaningful daytime engagement outside the home.',
    howWeHelp: [
      'Small group ratios or 1-on-1 support depending on individual needs',
      'Careful transportation coordination and community safety oversight',
      'Building genuine connections that extend beyond professional service boundaries'
    ],
    paWaiverNote: 'Available under PA ODP Consolidated, Community Living, and P/FDS Waivers.',
    keyHighlights: ['Community Inclusion', 'Volunteer Outings', 'Transit Training']
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
    answer: 'To qualify for ODP waivers (Consolidated, Community Living, or P/FDS), the individual must have a diagnosed intellectual disability or autism spectrum disorder diagnosed prior to age 22, meet Medicaid financial eligibility criteria, and be assessed by the county. Kenah Wellness coordinates directly with your County Supports Coordinator (SC) to verify waiver status and allocate authorized service hours.'
  },
  {
    id: 'faq-2',
    category: 'general',
    question: 'How does your Free Assessment work?',
    answer: 'Our Free Assessment is a 100% complimentary, no-obligation consultation conducted at your home or virtually. A dedicated care coordinator evaluates daily routines, verifies Pennsylvania ODP waiver or insurance coverage, answers all family questions, and designs an Individualized Support Plan tailored to your goals.'
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
    question: 'What is the difference between Home Care and ODP Waiver Services?',
    answer: 'Home Care encompasses personal hygiene, senior care, companionship, respite, dementia support, and homemaker assistance available to any individual through private pay, long-term care insurance, or Medicaid. ODP Waiver Services are specialized Pennsylvania state-authorized supports (Consolidated, Community Living, and P/FDS Waivers) tailored for individuals with intellectual disabilities and autism.'
  },
  {
    id: 'faq-6',
    category: 'odp',
    question: 'Do you work directly with our Supports Coordinator (SC)?',
    answer: 'Yes. For all ODP Waiver services, we partner closely with your assigned County Supports Coordinator across Allegheny, Washington, and Butler counties. We participate in team meetings, align notes with your Individualized Support Plan (ISP), and submit documentation in full compliance with PA ODP regulations.'
  },
  {
    id: 'faq-7',
    category: 'general',
    question: 'What are Kenah Wellness Services’ core values?',
    answer: 'Our mission and care delivery are grounded in four core values: Compassion, Respect, Integrity, and Excellence. We honor the individuality, dignity, and choices of every senior and person with disabilities under our care.'
  },
  {
    id: 'faq-8',
    category: 'general',
    question: 'Where is your main office located and what areas do you serve?',
    answer: 'Our main office is located at 2400 Ansys Drive, Suite 169, Canonsburg, PA 15317. We serve clients throughout Allison Park, Pittsburgh, Sewickley, Wexford, Fox Chapel, Canonsburg, Cranberry Township, Peters Township, and surrounding communities in Allegheny, Washington, and Butler counties.'
  }
];

export const SERVICE_AREAS: ServiceArea[] = [
  { name: 'Canonsburg (Main Office)', county: 'Washington County', featured: true },
  { name: 'Allison Park & Hampton', county: 'Allegheny County', featured: true },
  { name: 'Pittsburgh & Greater Allegheny', county: 'Allegheny County', featured: true },
  { name: 'Sewickley & Fox Chapel', county: 'Allegheny County', featured: true },
  { name: 'Cranberry Township & Butler', county: 'Butler County', featured: true },
  { name: 'Wexford & North Hills', county: 'Allegheny County', featured: false },
  { name: 'Peters Township & Washington', county: 'Washington County', featured: false },
  { name: 'Upper St. Clair & South Hills', county: 'Allegheny County', featured: false }
];
