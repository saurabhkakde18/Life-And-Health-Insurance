export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  iconName: 'shield' | 'heart' | 'activity' | 'briefcase' | 'umbrella';
  features: string[];
  ctaLabel: string;
  note: string;
}

export interface LifeStageItem {
  number: string;
  title: string;
  tagline: string;
  description: string;
  benefits: string[];
  icon: string;
}

export const CONTACT_INFO = {
  brandName: 'LifeExpress',
  advisorName: 'Nitin Agrawal',
  role: 'Life & Health Insurance Advisor',
  mobile: '8830662663',
  mobileDisplay: '+91 88306 62663',
  email: 'nitinagrawal6060@gmail.com',
  address: 'Corporate Office – In front of Sadar Bazar Police Station, Balaji Galli, Jalna (MS) – 431203',
  city: 'Jalna',
  state: 'Maharashtra',
  pincode: '431203',
  whatsappMessage: 'Hello Nitin Agrawal, I would like to know more about your Life & Health Insurance services.',
  googleMapsUrl: 'https://maps.google.com/?q=Sadar+Bazar+Police+Station+Jalna+Maharashtra+431203',
  hours: 'Monday – Saturday: 9:30 AM – 8:00 PM (Sunday by appointment)'
};

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'life-insurance',
    title: 'Life Insurance',
    subtitle: 'Financial Security & Legacy for Your Loved Ones',
    badge: 'Protection & Goals',
    description: 'Plan for your family\'s financial security with life insurance solutions designed around protection, long-term goals and future needs.',
    iconName: 'shield',
    features: [
      'Family Protection',
      'Child Education Planning',
      'Retirement Planning',
      'Long-Term Financial Planning',
      'Policy Assistance'
    ],
    ctaLabel: 'Explore Life Insurance',
    note: 'Subject to policy terms, conditions, underwriting, and respective insurer guidelines.'
  },
  {
    id: 'health-insurance',
    title: 'Health Insurance',
    subtitle: 'Comprehensive Coverage Against Medical Emergencies',
    badge: 'Medical Protection',
    description: 'Explore health insurance solutions that can help protect you and your family against unexpected medical expenses.',
    iconName: 'heart',
    features: [
      'Individual Health Insurance',
      'Family Health Insurance',
      'Accident Cover',
      'Maternity-related Coverage',
      'Health Protection Planning',
      'Policy Support'
    ],
    ctaLabel: 'Explore Health Insurance',
    note: 'Subject to policy terms, exclusions, pre-existing condition guidelines, and waiting periods.'
  }
];

export const LIFE_STAGES: LifeStageItem[] = [
  {
    number: '01',
    title: 'Child Education Plans',
    tagline: 'Plan ahead for your child\'s education and future goals.',
    description: 'Ensure higher education funding for medicine, engineering, management, or overseas studies stays protected regardless of life uncertainties.',
    benefits: ['Guaranteed financial support milestones', 'Waiver of premium benefits upon eventuality', 'Disciplined corpus creation for college degrees'],
    icon: 'GraduationCap'
  },
  {
    number: '02',
    title: 'Retirement Plans',
    tagline: 'Build a long-term financial protection strategy for retirement.',
    description: 'Create dependable pension streams and annuity options that protect your lifestyle, healthcare expenses, and independence after your working years.',
    benefits: ['Lifelong guaranteed annuity options', 'Tax benefits under prevailing IT laws', 'Hedge against medical inflation in golden years'],
    icon: 'Palmtree'
  },
  {
    number: '03',
    title: 'Family Protection',
    tagline: 'Help protect your family\'s financial future.',
    description: 'Adequate pure protection and term insurance to safeguard your household expenses, home loans, and family lifestyle if you are not around.',
    benefits: ['Substantial sum assured at affordable premiums', 'Critical illness & accidental death riders', 'Financial safety net for home & business liabilities'],
    icon: 'Users'
  },
  {
    number: '04',
    title: 'Health Protection',
    tagline: 'Explore health insurance options for medical and unexpected expenses.',
    description: 'Shield family savings against rising hospitalization costs, specialized treatments, modern daycare procedures, and critical ailments.',
    benefits: ['Cashless treatment at network hospitals', 'Coverage for pre & post-hospitalization costs', 'Annual health checkups and restore benefits'],
    icon: 'Activity'
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Understand Your Needs',
    description: 'We listen to your life stage, financial dependents, liabilities, and future milestones through a friendly one-on-one consultation.'
  },
  {
    step: '02',
    title: 'Explore Suitable Options',
    description: 'Receive an honest, transparent breakdown of suitable plans from trusted insurers (like LIC and Care Health Insurance) without biased push.'
  },
  {
    step: '03',
    title: 'Complete Documentation',
    description: 'Hassle-free guidance for proposal forms, KYC documents, medical scheduling, and seamless policy submission.'
  },
  {
    step: '04',
    title: 'Get Ongoing Policy Support',
    description: 'Long-term relationship assistance with annual renewal reminders, address/nominee updates, and dedicated claim guidance.'
  }
];

export const WHY_CHOOSE_US_POINTS = [
  {
    title: 'Personalised Guidance',
    description: 'Every recommendation is customized to your exact family requirements, budget, and long-term financial milestones.'
  },
  {
    title: 'Easy Policy Assistance',
    description: 'We handle the paperwork, KYC compliance, documentation, and coordination so you experience zero stress.'
  },
  {
    title: 'Life Insurance Support',
    description: 'Comprehensive advice on term plans, endowment savings, retirement pensions, and child career protection.'
  },
  {
    title: 'Health Insurance Support',
    description: 'Guidance across individual mediclaim, family floater shields, critical illness covers, and cashless networks.'
  },
  {
    title: 'Customer-Focused Service',
    description: 'Honest comparisons, clear disclosure of waiting periods and policy clauses—no hidden surprises or pushy sales.'
  },
  {
    title: 'Long-Term Relationship',
    description: 'We stand by your family through yearly renewals, nominee updates, and crucial claim-time assistance.'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What types of insurance services do you provide?',
    answer: 'LifeExpress provides end-to-end advisory and policy servicing for both Life Insurance (term plans, child education plans, retirement & pension solutions, guaranteed savings) and Health Insurance (individual mediclaim, family floater plans, critical illness, and personal accident covers). We help you identify the right plan, complete documentation, and assist with claims.'
  },
  {
    id: 'faq-2',
    question: 'How do I choose the right life insurance plan?',
    answer: 'Choosing the right plan depends on your age, number of financial dependents, ongoing loans (like home loans), and future milestones (children’s higher education, marriage, and retirement). We conduct a structured needs assessment to determine the ideal Sum Assured and recommend options that balance pure protection with long-term financial security.'
  },
  {
    id: 'faq-3',
    question: 'What type of health insurance may be suitable for my family?',
    answer: 'For a young family with parents and children, a comprehensive Family Floater Health Insurance policy is often the most cost-effective. For senior citizen parents, separate individual policies with tailored coverage and restoration benefits may be advised. Key factors include hospital network in Jalna & Maharashtra, room rent limits, pre-existing disease waiting periods, and restoration features.'
  },
  {
    id: 'faq-4',
    question: 'Can I get help understanding policy documents?',
    answer: 'Yes, absolutely. Insurance contracts can be filled with complex terminology, exclusions, co-payments, and waiting periods. Nitin Agrawal provides clear, plain-language walkthroughs of your existing or new policy brochures and terms so you know exactly what is covered and what is not before making any commitment.'
  },
  {
    id: 'faq-5',
    question: 'How can I request a consultation?',
    answer: 'You can request a free consultation anytime by submitting the enquiry form on this website, calling Nitin Agrawal directly at 8830662663, or clicking the WhatsApp button. We can consult over phone, video call, or in-person at our Jalna corporate office.'
  },
  {
    id: 'faq-6',
    question: 'How can I contact Nitin Agrawal?',
    answer: 'You can reach Nitin Agrawal via direct phone call or WhatsApp at +91 8830662663, by email at nitinagrawal6060@gmail.com, or by visiting our office located in front of Sadar Bazar Police Station, Balaji Galli, Jalna (MS) – 431203.'
  }
];
