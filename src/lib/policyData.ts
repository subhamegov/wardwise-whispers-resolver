import { Policy } from '@/types/policy';

export const MOCK_POLICIES: Policy[] = [
  {
    id: 'POL-2025-ENV-001',
    title: 'Plastic Waste Management Policy',
    summary: 'Proposes a phased ban on single-use plastics in public areas, markets, and bus stations by 2026.',
    fullDescription: `This draft Plastic Waste Management Policy proposes a comprehensive strategy to reduce plastic pollution across Nairobi County. The policy introduces a phased ban on single-use plastics in public markets, bus termini, and county-managed facilities starting January 2026.

Key provisions include:
• Mandatory use of biodegradable packaging in all county markets
• Establishment of plastic collection and recycling centers in each sub-county
• Incentives for businesses transitioning to sustainable packaging
• Penalties for non-compliance after the transition period

The policy aims to reduce plastic waste by 60% within three years of implementation and create over 5,000 green jobs in the recycling sector.`,
    department: 'Environment & Natural Resources',
    status: 'open',
    deadline: '2025-12-28',
    documentUrl: '/docs/plastic-policy-draft-2025.pdf',
    documentName: 'Plastic Waste Management Policy Draft 2025',
    documentSize: '2.4 MB',
    publishedDate: '2025-11-15',
    comments: [
      {
        id: 'c1',
        author: 'Resident of Lang\'ata',
        authorType: 'resident',
        comment: 'This is a good step, but the timeline is too short for small traders to adapt. Many kiosk owners rely on affordable plastic bags. Consider a longer transition period or subsidies for alternatives.',
        timestamp: '2025-12-09T14:10:00Z',
        reactions: { helpful: 12, insightful: 5, concern: 2 }
      },
      {
        id: 'c2',
        author: 'Kilimani Youth Network',
        authorType: 'community',
        comment: 'Consider including recycling hubs in all sub-counties. Youth groups can partner with the county to run these facilities and create employment opportunities.',
        timestamp: '2025-12-10T09:45:00Z',
        reactions: { helpful: 24, insightful: 18, concern: 0 }
      },
      {
        id: 'c3',
        author: 'Business Owner - Westlands',
        authorType: 'business',
        comment: 'My restaurant already uses paper packaging. Happy to share our supplier contacts with other businesses. The county should create a database of approved eco-friendly suppliers.',
        timestamp: '2025-12-08T11:30:00Z',
        reactions: { helpful: 31, insightful: 8, concern: 0 }
      },
      {
        id: 'c4',
        author: 'Mama Mboga - Gikomba Market',
        authorType: 'trader',
        comment: 'We need affordable alternatives before banning plastics. Paper bags tear easily and cost more. Please provide subsidies for small traders like us.',
        timestamp: '2025-12-07T08:20:00Z',
        reactions: { helpful: 45, insightful: 12, concern: 8 }
      },
      {
        id: 'c5',
        author: 'Environmental Activist - Lavington',
        authorType: 'community',
        comment: 'Long overdue! I fully support this policy. We need to protect our rivers and environment from plastic pollution. Nairobi River is choking with plastic waste.',
        timestamp: '2025-12-06T15:30:00Z',
        reactions: { helpful: 38, insightful: 22, concern: 0 }
      },
      {
        id: 'c6',
        author: 'Student - University of Nairobi',
        authorType: 'youth',
        comment: 'Can the county partner with universities for research on biodegradable alternatives? Students can contribute innovative solutions.',
        timestamp: '2025-12-05T11:00:00Z',
        reactions: { helpful: 19, insightful: 28, concern: 0 }
      },
      {
        id: 'c7',
        author: 'Supermarket Manager - Karen',
        authorType: 'business',
        comment: 'We switched to reusable bags last year. Sales of cloth bags are growing. Customers adapt when given good alternatives.',
        timestamp: '2025-12-04T14:45:00Z',
        reactions: { helpful: 33, insightful: 15, concern: 0 }
      }
    ],
    engagement: {
      supportCount: 156,
      opposeCount: 23,
      commentCount: 7
    }
  },
  {
    id: 'POL-2025-TRN-002',
    title: 'Matatu Stage Improvement Guidelines',
    summary: 'New standards for matatu termini including safety requirements, passenger amenities, and traffic flow management.',
    fullDescription: `The Matatu Stage Improvement Guidelines establish minimum standards for all public service vehicle termini within Nairobi County. This policy responds to citizen feedback about overcrowding, safety concerns, and poor facilities at major bus stages.

Key provisions include:
• Mandatory shelter structures with seating at all designated stages
• Proper lighting and CCTV coverage for security
• Clear lane markings and traffic flow patterns
• Public toilet facilities within 100 meters of major stages
• Designated hawking zones to reduce congestion

Implementation will begin with major termini (Railways, Kencom, Ngong Road) and expand to all stages within 18 months.`,
    department: 'Transport & Infrastructure',
    status: 'open',
    deadline: '2026-01-15',
    documentUrl: '/docs/matatu-stage-guidelines-2025.pdf',
    documentName: 'Matatu Stage Improvement Guidelines',
    documentSize: '1.8 MB',
    publishedDate: '2025-12-01',
    comments: [
      {
        id: 'c8',
        author: 'Daily Commuter - Umoja',
        authorType: 'resident',
        comment: 'Finally! The Eastlands stages are chaotic. Please prioritize Buruburu and Dandora stages. We need proper shelters especially during rainy season.',
        timestamp: '2025-12-07T07:15:00Z',
        reactions: { helpful: 45, insightful: 3, concern: 0 }
      },
      {
        id: 'c9',
        author: 'Matatu Sacco Representative',
        authorType: 'business',
        comment: 'We support this initiative. Request that saccos be consulted on lane markings and loading zones to ensure smooth operations.',
        timestamp: '2025-12-06T16:00:00Z',
        reactions: { helpful: 18, insightful: 12, concern: 5 }
      },
      {
        id: 'c10',
        author: 'Hawker - CBD',
        authorType: 'trader',
        comment: 'Please consider us hawkers in the designated zones. We also need to earn a living. Include us in the planning.',
        timestamp: '2025-12-05T09:30:00Z',
        reactions: { helpful: 52, insightful: 8, concern: 3 }
      },
      {
        id: 'c11',
        author: 'Woman Commuter - Kayole',
        authorType: 'resident',
        comment: 'Security is my main concern. CCTV and proper lighting will help. Too many incidents happen at dark stages late evening.',
        timestamp: '2025-12-04T18:20:00Z',
        reactions: { helpful: 67, insightful: 15, concern: 0 }
      },
      {
        id: 'c12',
        author: 'PWD Advocate',
        authorType: 'community',
        comment: 'Please include accessibility features for persons with disabilities. Ramps, tactile paving, and priority seating areas are essential.',
        timestamp: '2025-12-03T10:00:00Z',
        reactions: { helpful: 41, insightful: 35, concern: 0 }
      },
      {
        id: 'c13',
        author: 'Boda Boda Rider - Ngara',
        authorType: 'business',
        comment: 'What about motorcycle parking areas near stages? We provide last-mile transport and need designated waiting zones too.',
        timestamp: '2025-12-02T14:30:00Z',
        reactions: { helpful: 28, insightful: 18, concern: 2 }
      }
    ],
    engagement: {
      supportCount: 234,
      opposeCount: 12,
      commentCount: 6
    }
  },
  {
    id: 'POL-2025-HSG-003',
    title: 'Affordable Housing Allocation Framework',
    summary: 'Criteria and process for allocating county-built affordable housing units to qualifying residents.',
    fullDescription: `This framework establishes transparent criteria for the allocation of affordable housing units constructed under the Nairobi County Housing Program. The policy aims to ensure fair access to housing for low and middle-income residents.

Allocation criteria include:
• Residency requirement (minimum 5 years in Nairobi)
• Income threshold (household income below KES 100,000/month)
• First-time homebuyer preference
• Special consideration for persons with disabilities
• Points system based on family size and housing need

The framework also establishes an appeals process and anti-corruption measures to ensure transparency.`,
    department: 'Housing & Urban Development',
    status: 'closing_soon',
    deadline: '2025-12-18',
    documentUrl: '/docs/housing-allocation-framework.pdf',
    documentName: 'Affordable Housing Allocation Framework',
    documentSize: '3.1 MB',
    publishedDate: '2025-11-01',
    comments: [
      {
        id: 'c14',
        author: 'Resident of Mathare',
        authorType: 'resident',
        comment: 'The 5-year residency requirement is fair. But how will you verify this? Many of us don\'t have formal documentation of our stay in informal settlements.',
        timestamp: '2025-12-05T10:20:00Z',
        reactions: { helpful: 67, insightful: 23, concern: 15 }
      },
      {
        id: 'c15',
        author: 'Single Mother - Kibera',
        authorType: 'resident',
        comment: 'Please prioritize single mothers and widows. We struggle the most with housing. Our children deserve better living conditions.',
        timestamp: '2025-12-04T08:45:00Z',
        reactions: { helpful: 89, insightful: 12, concern: 0 }
      },
      {
        id: 'c16',
        author: 'Youth Leader - Korogocho',
        authorType: 'youth',
        comment: 'What about young people who were born here but parents don\'t have documents? We are Nairobians too and deserve consideration.',
        timestamp: '2025-12-03T16:00:00Z',
        reactions: { helpful: 54, insightful: 31, concern: 0 }
      },
      {
        id: 'c17',
        author: 'Civil Society Representative',
        authorType: 'community',
        comment: 'The anti-corruption measures are good but need independent oversight. Consider involving civil society in the allocation process.',
        timestamp: '2025-12-02T11:30:00Z',
        reactions: { helpful: 43, insightful: 38, concern: 5 }
      },
      {
        id: 'c18',
        author: 'Tenant - Eastleigh',
        authorType: 'resident',
        comment: 'Income threshold is reasonable. But please verify carefully to prevent rich people from pretending to qualify.',
        timestamp: '2025-12-01T09:15:00Z',
        reactions: { helpful: 61, insightful: 8, concern: 12 }
      },
      {
        id: 'c19',
        author: 'Teacher - Dandora',
        authorType: 'resident',
        comment: 'Will civil servants like teachers qualify? Our salaries are known but housing is still unaffordable for us.',
        timestamp: '2025-11-30T14:00:00Z',
        reactions: { helpful: 35, insightful: 22, concern: 0 }
      },
      {
        id: 'c20',
        author: 'Elder - Pumwani',
        authorType: 'resident',
        comment: 'Good policy but what about elderly citizens who have lived here all their lives? We need ground floor units due to mobility issues.',
        timestamp: '2025-11-29T10:30:00Z',
        reactions: { helpful: 72, insightful: 18, concern: 0 }
      },
      {
        id: 'c21',
        author: 'Healthcare Worker - Kenyatta Hospital',
        authorType: 'resident',
        comment: 'Essential workers should get some priority. We serve the city but can\'t afford to live near our workplaces.',
        timestamp: '2025-11-28T07:00:00Z',
        reactions: { helpful: 48, insightful: 25, concern: 0 }
      }
    ],
    engagement: {
      supportCount: 412,
      opposeCount: 45,
      commentCount: 8
    }
  },
  {
    id: 'POL-2025-HLT-004',
    title: 'Community Health Worker Stipend Review',
    summary: 'Proposed increase in monthly stipends for community health volunteers serving in county facilities.',
    fullDescription: `This policy review proposes adjustments to the monthly stipend for Community Health Workers (CHWs) serving in Nairobi County. CHWs play a critical role in primary healthcare delivery, especially in informal settlements and underserved areas.

Proposed changes:
• Increase base stipend from KES 2,500 to KES 5,000 per month
• Performance bonuses for immunization and referral targets
• Medical insurance coverage for all registered CHWs
• Training and certification pathways
• Equipment and supplies budget per CHW

The review responds to feedback from CHWs about inadequate compensation relative to their workload and responsibilities.`,
    department: 'Health Services',
    status: 'closed',
    deadline: '2025-11-30',
    documentUrl: '/docs/chw-stipend-review.pdf',
    documentName: 'CHW Stipend Review 2025',
    documentSize: '1.2 MB',
    publishedDate: '2025-10-15',
    comments: [
      {
        id: 'c22',
        author: 'Community Health Worker - Mukuru',
        authorType: 'resident',
        comment: 'Thank you for listening to us. The current stipend is too low for the work we do. We visit dozens of homes daily.',
        timestamp: '2025-11-25T08:00:00Z',
        reactions: { helpful: 95, insightful: 8, concern: 0 }
      },
      {
        id: 'c23',
        author: 'CHW Supervisor - Kawangware',
        authorType: 'community',
        comment: 'Insurance coverage is crucial. Many CHWs get sick from exposure during home visits but can\'t afford treatment.',
        timestamp: '2025-11-24T11:30:00Z',
        reactions: { helpful: 78, insightful: 32, concern: 0 }
      },
      {
        id: 'c24',
        author: 'Village Elder - Huruma',
        authorType: 'community',
        comment: 'CHWs are the backbone of community health. They deserve proper pay. I support this policy fully.',
        timestamp: '2025-11-23T09:00:00Z',
        reactions: { helpful: 56, insightful: 12, concern: 0 }
      },
      {
        id: 'c25',
        author: 'Mother - Kangemi',
        authorType: 'resident',
        comment: 'Our CHW saved my baby\'s life by referring us to hospital early. They deserve better pay for their dedication.',
        timestamp: '2025-11-22T14:15:00Z',
        reactions: { helpful: 112, insightful: 5, concern: 0 }
      },
      {
        id: 'c26',
        author: 'Public Health Officer',
        authorType: 'community',
        comment: 'Training pathways will professionalize CHW work. Consider certificates that can lead to formal healthcare careers.',
        timestamp: '2025-11-21T10:00:00Z',
        reactions: { helpful: 44, insightful: 48, concern: 0 }
      }
    ],
    engagement: {
      supportCount: 567,
      opposeCount: 8,
      commentCount: 5
    }
  }
];

export function getDaysRemaining(deadline: string): number {
  const now = new Date();
  const end = new Date(deadline);
  const diff = end.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function getSupportPercentage(engagement: { supportCount: number; opposeCount: number }): number {
  const total = engagement.supportCount + engagement.opposeCount;
  if (total === 0) return 0;
  return Math.round((engagement.supportCount / total) * 100);
}
