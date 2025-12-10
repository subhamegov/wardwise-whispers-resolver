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
      }
    ],
    engagement: {
      supportCount: 156,
      opposeCount: 23,
      commentCount: 52
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
        id: 'c4',
        author: 'Daily Commuter - Umoja',
        authorType: 'resident',
        comment: 'Finally! The Eastlands stages are chaotic. Please prioritize Buruburu and Dandora stages. We need proper shelters especially during rainy season.',
        timestamp: '2025-12-07T07:15:00Z',
        reactions: { helpful: 45, insightful: 3, concern: 0 }
      },
      {
        id: 'c5',
        author: 'Matatu Sacco Representative',
        authorType: 'business',
        comment: 'We support this initiative. Request that saccos be consulted on lane markings and loading zones to ensure smooth operations.',
        timestamp: '2025-12-06T16:00:00Z',
        reactions: { helpful: 18, insightful: 12, concern: 5 }
      }
    ],
    engagement: {
      supportCount: 234,
      opposeCount: 12,
      commentCount: 78
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
        id: 'c6',
        author: 'Resident of Mathare',
        authorType: 'resident',
        comment: 'The 5-year residency requirement is fair. But how will you verify this? Many of us don\'t have formal documentation of our stay in informal settlements.',
        timestamp: '2025-12-05T10:20:00Z',
        reactions: { helpful: 67, insightful: 23, concern: 15 }
      }
    ],
    engagement: {
      supportCount: 412,
      opposeCount: 45,
      commentCount: 134
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
    comments: [],
    engagement: {
      supportCount: 567,
      opposeCount: 8,
      commentCount: 203
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
