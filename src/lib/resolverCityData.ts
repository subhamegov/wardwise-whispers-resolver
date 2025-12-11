export interface Department {
  id: string;
  name: string;
  icon: string;
  rating: number;
  totalRatings: number;
  appreciations: number;
  responsibilities: string[];
  keyOutcomes: string[];
  escalationContacts: {
    role: string;
    name: string;
    phone: string;
  }[];
}

export interface CityMetric {
  id: string;
  label: string;
  value: string;
  description: string;
  icon: string;
}

export interface ServiceUpdate {
  id: string;
  service: string;
  status: 'normal' | 'partial' | 'outage';
  title: string;
  affectedAreas: string[];
  department: string;
  expectedFixTime: string;
  updatedAt: string;
}

export interface CityEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  type: 'hearing' | 'budget' | 'baraza' | 'consultation';
  agendaUrl?: string;
}

export interface QuickHelpItem {
  id: string;
  question: string;
  answer: string;
}

export const CITY_METRICS: CityMetric[] = [
  {
    id: 'population',
    label: 'Population Served',
    value: '4.3M',
    description: 'Nairobi County serves approximately 4.3 million residents across 17 sub-counties.',
    icon: 'Users',
  },
  {
    id: 'wards',
    label: 'Number of Wards',
    value: '85',
    description: 'The county is divided into 85 administrative wards for localized service delivery.',
    icon: 'MapPin',
  },
  {
    id: 'waste',
    label: 'Daily Waste Collection',
    value: '3,200',
    description: 'Over 3,200 tons of waste are collected daily from households and commercial areas.',
    icon: 'Trash2',
  },
  {
    id: 'calls',
    label: 'Daily Service Requests',
    value: '850+',
    description: 'Average of 850+ citizen service requests received daily across all channels.',
    icon: 'Phone',
  },
  {
    id: 'parking',
    label: 'Parking Revenue',
    value: 'KES 2.1B',
    description: 'Annual parking fee collection. Pay at any M-Pesa pay bill or county offices.',
    icon: 'Car',
  },
  {
    id: 'permits',
    label: 'Business Permits',
    value: '45,000+',
    description: 'Active business permits managed. Apply online at businesspermit.nairobi.go.ke',
    icon: 'FileText',
  },
];

export const CHARTER_RIGHTS = [
  'Right to timely service delivery within published standards',
  'Right to accessible information about all county services',
  'Right to complaint redress within 14 working days',
  'Right to fair and equal treatment without discrimination',
  'Right to privacy and protection of personal information',
  'Right to participate in county decision-making processes',
];

export const DEPARTMENTS: Department[] = [
  {
    id: 'environment',
    name: 'Environment Department',
    icon: 'Leaf',
    rating: 4.2,
    totalRatings: 1256,
    appreciations: 248,
    responsibilities: [
      'Garbage collection from households and commercial areas',
      'Street cleaning and public space maintenance',
      'Management of waste disposal facilities and landfills',
      'Pollution control and environmental compliance',
      'Green space development and tree planting',
      'Recycling programs and waste separation initiatives',
    ],
    keyOutcomes: [
      'Cleaner streets with daily sweeping coverage',
      'Reduced illegal dumping through enforcement',
      'Faster waste clearance turnarounds (24-48 hours)',
      'Improved air quality through emission control',
    ],
    escalationContacts: [
      { role: 'Team Lead', name: 'James Ochieng', phone: '+254 722 XXX XXX' },
      { role: 'Department Head', name: 'Dr. Mary Wanjiku', phone: '+254 733 XXX XXX' },
      { role: 'Director', name: 'Eng. Peter Kamau', phone: '+254 711 XXX XXX' },
    ],
  },
  {
    id: 'water',
    name: 'Water & Sewerage Department',
    icon: 'Droplets',
    rating: 3.8,
    totalRatings: 2341,
    appreciations: 312,
    responsibilities: [
      'Water supply maintenance and distribution',
      'Sewer line repairs and unblocking',
      'Burst pipe emergency response',
      'Water quality monitoring and testing',
      'New water connection applications',
      'Billing and meter management',
    ],
    keyOutcomes: [
      'Fewer water outages through preventive maintenance',
      'Faster sewage response (under 12 hours)',
      'Improved water pressure stability',
      'Reduced water losses through leak detection',
    ],
    escalationContacts: [
      { role: 'Team Lead', name: 'Sarah Njeri', phone: '+254 720 XXX XXX' },
      { role: 'Department Head', name: 'Eng. David Mwangi', phone: '+254 734 XXX XXX' },
      { role: 'Director', name: 'Eng. Grace Akinyi', phone: '+254 712 XXX XXX' },
    ],
  },
  {
    id: 'works',
    name: 'Works Department',
    icon: 'Hammer',
    rating: 3.5,
    totalRatings: 1878,
    appreciations: 189,
    responsibilities: [
      'Road maintenance and pothole repairs',
      'Drainage systems installation and cleaning',
      'Footpath and walkway construction',
      'Bridge and culvert maintenance',
      'Street furniture (benches, bins, barriers)',
      'Construction project oversight',
    ],
    keyOutcomes: [
      'Reduced road defects on major corridors',
      'Better stormwater flow during rainy seasons',
      'Safer public infrastructure',
      'Improved pedestrian accessibility',
    ],
    escalationContacts: [
      { role: 'Team Lead', name: 'Michael Otieno', phone: '+254 721 XXX XXX' },
      { role: 'Department Head', name: 'Eng. Alice Chebet', phone: '+254 735 XXX XXX' },
      { role: 'Director', name: 'Eng. John Kiprop', phone: '+254 713 XXX XXX' },
    ],
  },
  {
    id: 'health',
    name: 'Public Health Department',
    icon: 'Heart',
    rating: 4.0,
    totalRatings: 956,
    appreciations: 167,
    responsibilities: [
      'Health facility inspections and licensing',
      'Vector control (mosquitoes, rodents, pests)',
      'Food safety inspections and certifications',
      'Premises hygiene compliance',
      'Disease outbreak investigation',
      'Public health education and awareness',
    ],
    keyOutcomes: [
      'Fewer public health hazards reported',
      'Improved hygiene compliance in food establishments',
      'Faster outbreak management and containment',
      'Reduced vector-borne disease incidents',
    ],
    escalationContacts: [
      { role: 'Team Lead', name: 'Dr. Nancy Mutua', phone: '+254 722 XXX XXX' },
      { role: 'Department Head', name: 'Dr. Joseph Kimani', phone: '+254 736 XXX XXX' },
      { role: 'Director', name: 'Dr. Elizabeth Odhiambo', phone: '+254 714 XXX XXX' },
    ],
  },
  {
    id: 'mobility',
    name: 'Mobility & ICT Infrastructure',
    icon: 'Monitor',
    rating: 3.9,
    totalRatings: 645,
    appreciations: 98,
    responsibilities: [
      'Traffic lights installation and maintenance',
      'Road signage and markings',
      'County ICT systems and network infrastructure',
      'Digital service platforms management',
      'Parking systems and enforcement technology',
      'CCTV and security systems',
    ],
    keyOutcomes: [
      'Reduced traffic signal faults and downtime',
      'Reliable county digital services',
      'Stable municipal ICT operations',
      'Improved traffic flow through smart systems',
    ],
    escalationContacts: [
      { role: 'Team Lead', name: 'Brian Wekesa', phone: '+254 723 XXX XXX' },
      { role: 'Department Head', name: 'Eng. Faith Nyambura', phone: '+254 737 XXX XXX' },
      { role: 'Director', name: 'Dr. Samuel Omondi', phone: '+254 715 XXX XXX' },
    ],
  },
];

export const SERVICE_UPDATES: ServiceUpdate[] = [
  {
    id: 'update_1',
    service: 'Water Supply',
    status: 'partial',
    title: 'Temporary outage in Upper Hill',
    affectedAreas: ['Upper Hill', 'Community', 'Ngong Road'],
    department: 'Water & Sewerage',
    expectedFixTime: 'Today, 8:00 PM',
    updatedAt: '2 hours ago',
  },
  {
    id: 'update_2',
    service: 'Electricity',
    status: 'partial',
    title: 'Scheduled transformer upgrade in Kilimani',
    affectedAreas: ['Kilimani', 'Hurlingham', 'Yaya Centre area'],
    department: 'Kenya Power (coordinated)',
    expectedFixTime: 'Today, 5:00 PM',
    updatedAt: '4 hours ago',
  },
  {
    id: 'update_3',
    service: 'Garbage Collection',
    status: 'partial',
    title: 'Collection delays in Lang\'ata',
    affectedAreas: ['Lang\'ata', 'Karen', 'Otiende'],
    department: 'Environment',
    expectedFixTime: 'Tomorrow, 6:00 AM',
    updatedAt: '1 hour ago',
  },
  {
    id: 'update_4',
    service: 'Traffic Lights',
    status: 'outage',
    title: 'Signal failure at Uhuru Highway/Kenyatta Ave junction',
    affectedAreas: ['CBD', 'Uhuru Highway'],
    department: 'Mobility & ICT',
    expectedFixTime: 'Today, 3:00 PM',
    updatedAt: '30 minutes ago',
  },
];

export const CITY_EVENTS: CityEvent[] = [
  {
    id: 'event_1',
    title: 'Public Budget Hearing – FY 2025/26',
    date: '2025-12-15',
    time: '10:00 AM - 1:00 PM',
    venue: 'Charter Hall, City Hall Way',
    type: 'budget',
    agendaUrl: 'https://nairobi.go.ke/budget-hearing-agenda',
  },
  {
    id: 'event_2',
    title: 'Westlands Sub-County Baraza',
    date: '2025-12-18',
    time: '2:00 PM - 5:00 PM',
    venue: 'Westlands District Commissioner\'s Office',
    type: 'baraza',
  },
  {
    id: 'event_3',
    title: 'Waste Management Policy Consultation',
    date: '2025-12-20',
    time: '9:00 AM - 12:00 PM',
    venue: 'County Assembly Hall',
    type: 'consultation',
    agendaUrl: 'https://nairobi.go.ke/waste-policy-consultation',
  },
  {
    id: 'event_4',
    title: 'Traffic Management Public Hearing',
    date: '2025-12-22',
    time: '10:00 AM - 2:00 PM',
    venue: 'KICC, Amphitheatre',
    type: 'hearing',
  },
];

export const QUICK_HELP: QuickHelpItem[] = [
  {
    id: 'help_1',
    question: 'Where do I report a streetlight issue?',
    answer: 'Report through the Resolver Dashboard under "Tasks" or direct citizens to use the Citizen Portal. Select category "Mobility & ICT" → "Street Lighting". Include exact location and pole number if visible.',
  },
  {
    id: 'help_2',
    question: 'Where do citizens pay parking fees?',
    answer: 'Citizens can pay via: 1) M-Pesa Paybill 222222, 2) JamboPay online, 3) Any county cashier office, 4) Designated parking attendants. Annual parking stickers available at Licensing offices.',
  },
  {
    id: 'help_3',
    question: 'What is the expected fix time for garbage collection complaints?',
    answer: 'Standard expected resolution: 24 hours for residential areas, 12 hours for commercial/market areas, 4 hours for health hazard situations. Delays during truck breakdowns are communicated via service updates.',
  },
  {
    id: 'help_4',
    question: 'How do departments coordinate field tasks?',
    answer: 'Use the "Multi-Department" tag on tickets requiring coordination. Weekly coordination meetings happen Tuesdays. For urgent cross-department issues, contact the County Operations Centre at 1553.',
  },
  {
    id: 'help_5',
    question: 'Where can citizens apply for business permits?',
    answer: 'Online at businesspermit.nairobi.go.ke, or in person at Licensing offices in City Hall Annex, Makadara, Embakasi, and Kasarani sub-county offices. Processing takes 3-5 working days.',
  },
  {
    id: 'help_6',
    question: 'How do I access the Service Charter?',
    answer: 'The Nairobi Citizen Service Charter 2025 is available at nairobi.go.ke/service-charter. Physical copies available at all county offices. It outlines all service standards and citizen rights.',
  },
];
