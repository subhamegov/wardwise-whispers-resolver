// API Client for Nairobi County Citizen Engagement
// Designed to be swapped with real DIGIT PGR endpoints later

import { Story, StorySubmission, StoryCategory, IssueCategory, TicketStatus, NAIROBI_WARDS, TicketUpdate, WorkflowHistoryItem, TicketRemark } from '@/types/story';

// In-memory storage for mock data
let stories: Story[] = [
  {
    id: '1',
    ticketId: 'NRB-2025-000123',
    tenantId: 'ke.nairobi',
    category: 'complaint',
    issueCategory: 'roads',
    serviceCode: 'ROAD_MAINTENANCE',
    title: 'Large pothole on Kenyatta Avenue',
    description: 'There is a dangerous pothole near the intersection with Uhuru Highway. Several cars have been damaged. It is about 30cm deep and growing larger after the recent rains.',
    lat: -1.2864,
    lng: 36.8172,
    wardCode: 'nairobi_central',
    wardName: 'Nairobi Central',
    createdAt: '2025-06-01T14:33:00.000Z',
    updatedAt: '2025-06-05T17:20:00.000Z',
    source: 'NAIROBI_ENGAGEMENT',
    status: 'in_progress',
    priority: 'HIGH',
    assignedTo: 'James Ochieng',
    assignedDepartment: 'Roads Department',
    citizen: { name: 'John Mwangi', mobileNumber: '0712345678' },
    sla: { dueInHours: 72, remaining: 48, deadline: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString() },
    slaDeadline: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    serviceRating: 3,
    attachments: [{ fileStoreId: 'att1', fileName: 'pothole.jpg' }],
    history: [
      { id: 'h1', performedBy: 'John Mwangi', performedByRole: 'citizen', action: 'CREATE', timestamp: '2025-06-01T14:33:00.000Z', note: 'Report submitted via mobile app' },
      { id: 'h2', performedBy: 'County Dispatch', performedByRole: 'system', action: 'ASSIGN', timestamp: '2025-06-02T09:15:00.000Z', note: 'Assigned to Roads Department' },
      { id: 'h3', performedBy: 'James Ochieng', performedByRole: 'officer', action: 'IN_PROGRESS', timestamp: '2025-06-03T10:00:00.000Z', note: 'Site inspection scheduled' },
      { id: 'h4', performedBy: 'James Ochieng', performedByRole: 'officer', action: 'REQUEST_INFO', timestamp: '2025-06-03T12:45:00.000Z', note: 'Requested additional photos of damage extent' },
    ],
    remarks: [
      { id: 'r1', by: 'James Ochieng', byRole: 'officer', text: 'Visited the site. Damage is extensive, will require full patch.', timestamp: '2025-06-03T11:30:00.000Z' },
      { id: 'r2', by: 'John Mwangi', byRole: 'citizen', text: 'Thank you for the update. Another car got damaged yesterday.', timestamp: '2025-06-04T08:15:00.000Z' },
      { id: 'r3', by: 'James Ochieng', byRole: 'officer', text: 'Work crew scheduled for Monday. Area will be cordoned off.', timestamp: '2025-06-05T14:00:00.000Z' },
    ],
    updates: [
      { id: 'u1', message: 'Issue received and logged.', author: 'System', authorType: 'staff', createdAt: '2025-06-01T14:33:00.000Z' },
      { id: 'u2', message: 'Assigned to Roads Department for repair.', author: 'County Dispatch', authorType: 'staff', createdAt: '2025-06-02T09:15:00.000Z' },
    ],
  },
  {
    id: '2',
    ticketId: 'NRB-2025-000124',
    tenantId: 'ke.nairobi',
    category: 'complaint',
    issueCategory: 'waste',
    serviceCode: 'WASTE_MANAGEMENT',
    title: 'Garbage not collected for 1 week',
    description: 'The garbage collection truck has not come to our street in Westlands for over a week. The bins are overflowing and there is a bad smell attracting pests.',
    lat: -1.2673,
    lng: 36.8058,
    wardCode: 'westlands',
    wardName: 'Westlands',
    createdAt: '2025-06-03T10:20:00.000Z',
    updatedAt: '2025-06-04T11:00:00.000Z',
    source: 'NAIROBI_ENGAGEMENT',
    status: 'assigned',
    priority: 'MEDIUM',
    assignedTo: 'Mary Wanjiku',
    assignedDepartment: 'Waste Management',
    citizen: { name: 'Sarah Kimani', mobileNumber: '0723456789' },
    sla: { dueInHours: 48, remaining: 24, deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() },
    slaDeadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    serviceRating: 2,
    history: [
      { id: 'h1', performedBy: 'Sarah Kimani', performedByRole: 'citizen', action: 'CREATE', timestamp: '2025-06-03T10:20:00.000Z' },
      { id: 'h2', performedBy: 'System', performedByRole: 'system', action: 'ASSIGN', timestamp: '2025-06-04T11:00:00.000Z', note: 'Auto-assigned to Waste Management' },
    ],
    remarks: [
      { id: 'r1', by: 'Mary Wanjiku', byRole: 'officer', text: 'Collection vehicle was under repair. Service resuming tomorrow.', timestamp: '2025-06-05T09:00:00.000Z' },
    ],
  },
  {
    id: '3',
    ticketId: 'NRB-2025-000125',
    tenantId: 'ke.nairobi',
    category: 'appreciation',
    title: 'Thank you for fixing the water pipe!',
    description: 'The burst water pipe in Kilimani was fixed very quickly. We are grateful to the workers who came even on Sunday. Great service!',
    lat: -1.2892,
    lng: 36.7865,
    wardCode: 'kilimani',
    wardName: 'Kilimani',
    createdAt: '2025-06-02T16:00:00.000Z',
    updatedAt: '2025-06-02T16:00:00.000Z',
    source: 'NAIROBI_ENGAGEMENT',
    status: 'resolved',
    priority: 'LOW',
    citizen: { name: 'Peter Ouma', mobileNumber: '0734567890' },
    satisfactionRating: 5,
    history: [
      { id: 'h1', performedBy: 'Peter Ouma', performedByRole: 'citizen', action: 'CREATE', timestamp: '2025-06-02T16:00:00.000Z', note: 'Appreciation submitted' },
      { id: 'h2', performedBy: 'System', performedByRole: 'system', action: 'RESOLVE', timestamp: '2025-06-02T16:00:00.000Z', note: 'Auto-resolved (appreciation)' },
    ],
  },
  {
    id: '4',
    ticketId: 'NRB-2025-000126',
    tenantId: 'ke.nairobi',
    category: 'complaint',
    issueCategory: 'streetlights',
    serviceCode: 'STREET_LIGHTING',
    title: 'Street light not working near Karen shopping center',
    description: 'The street light near Karen shopping center has been off for 3 weeks. It is very dark and unsafe at night. Multiple residents have complained.',
    lat: -1.3196,
    lng: 36.7128,
    wardCode: 'karen',
    wardName: 'Karen',
    createdAt: '2025-06-04T08:00:00.000Z',
    source: 'NAIROBI_ENGAGEMENT',
    status: 'new',
    priority: 'MEDIUM',
    citizen: { name: 'Grace Njeri', mobileNumber: '0745678901' },
    sla: { dueInHours: 120, remaining: 96, deadline: new Date(Date.now() + 96 * 60 * 60 * 1000).toISOString() },
    slaDeadline: new Date(Date.now() + 96 * 60 * 60 * 1000).toISOString(),
    history: [
      { id: 'h1', performedBy: 'Grace Njeri', performedByRole: 'citizen', action: 'CREATE', timestamp: '2025-06-04T08:00:00.000Z' },
    ],
  },
  {
    id: '5',
    ticketId: 'NRB-2025-000127',
    tenantId: 'ke.nairobi',
    category: 'complaint',
    issueCategory: 'water',
    serviceCode: 'WATER_SUPPLY',
    title: 'Water supply interrupted for 3 days',
    description: 'No water supply in Parklands area for the past 3 days. This is affecting many households and businesses. Urgent attention needed.',
    lat: -1.2621,
    lng: 36.8135,
    wardCode: 'parklands',
    wardName: 'Parklands/Highridge',
    createdAt: '2025-06-01T06:00:00.000Z',
    updatedAt: '2025-06-02T10:00:00.000Z',
    source: 'NAIROBI_ENGAGEMENT',
    status: 'escalated',
    priority: 'URGENT',
    assignedTo: 'David Kamau',
    assignedDepartment: 'Water Services',
    citizen: { name: 'Michael Otieno', mobileNumber: '0756789012' },
    sla: { dueInHours: 24, remaining: -48, deadline: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString() },
    slaDeadline: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    isOverdue: true,
    history: [
      { id: 'h1', performedBy: 'Michael Otieno', performedByRole: 'citizen', action: 'CREATE', timestamp: '2025-06-01T06:00:00.000Z' },
      { id: 'h2', performedBy: 'System', performedByRole: 'system', action: 'ASSIGN', timestamp: '2025-06-01T08:00:00.000Z' },
      { id: 'h3', performedBy: 'Michael Otieno', performedByRole: 'citizen', action: 'ESCALATE', timestamp: '2025-06-02T10:00:00.000Z', note: 'Expected service time exceeded, escalated by citizen' },
    ],
    remarks: [
      { id: 'r1', by: 'David Kamau', byRole: 'officer', text: 'Main pipeline burst detected. Emergency repair team deployed.', timestamp: '2025-06-02T12:00:00.000Z' },
      { id: 'r2', by: 'Michael Otieno', byRole: 'citizen', text: 'Still no water. Situation is critical.', timestamp: '2025-06-03T07:00:00.000Z' },
    ],
  },
  {
    id: '6',
    ticketId: 'NRB-2025-000128',
    tenantId: 'ke.nairobi',
    category: 'complaint',
    issueCategory: 'noise',
    serviceCode: 'ENVIRONMENTAL',
    title: 'Construction noise at night',
    description: 'Construction site operating heavy machinery after 10 PM, disturbing residents in the area. This has been ongoing for 2 weeks.',
    lat: -1.2892,
    lng: 36.7865,
    wardCode: 'kilimani',
    wardName: 'Kilimani',
    createdAt: '2025-06-05T22:00:00.000Z',
    source: 'NAIROBI_ENGAGEMENT',
    status: 'new',
    priority: 'LOW',
    citizen: { name: 'Anne Wairimu', mobileNumber: '0767890123' },
    sla: { dueInHours: 168, remaining: 144, deadline: new Date(Date.now() + 144 * 60 * 60 * 1000).toISOString() },
    slaDeadline: new Date(Date.now() + 144 * 60 * 60 * 1000).toISOString(),
    history: [
      { id: 'h1', performedBy: 'Anne Wairimu', performedByRole: 'citizen', action: 'CREATE', timestamp: '2025-06-05T22:00:00.000Z' },
    ],
  },
];

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function generateTicketId(): string {
  const year = new Date().getFullYear();
  const num = Math.floor(Math.random() * 900000) + 100000;
  return `NRB-${year}-${num}`;
}

function findWardByCode(code?: string) {
  return NAIROBI_WARDS.find(w => w.code === code);
}

// Simulated network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const apiClient = {
  /**
   * Create a new story (maps to DIGIT PGR /_create)
   */
  async createStory(submission: StorySubmission): Promise<Story> {
    await delay(500);
    
    const ward = findWardByCode(submission.wardCode);
    
    // Convert audio blob to data URL for storage
    let audioUrl: string | undefined;
    if (submission.audioBlob) {
      audioUrl = URL.createObjectURL(submission.audioBlob);
    }

    // Convert photo files to URLs
    let photos: string[] | undefined;
    if (submission.photos && submission.photos.length > 0) {
      photos = submission.photos.map(file => URL.createObjectURL(file));
    }
    
    const story: Story = {
      id: generateId(),
      ticketId: generateTicketId(),
      tenantId: 'ke.nairobi',
      category: submission.category,
      issueCategory: submission.issueCategory,
      title: submission.title,
      description: submission.description || '',
      audioUrl,
      audioBlob: submission.audioBlob,
      audioDuration: submission.audioDuration,
      photos,
      lat: submission.lat || -1.29,
      lng: submission.lng || 36.82,
      locationDescription: submission.locationDescription,
      wardCode: submission.wardCode,
      wardName: ward?.name,
      createdAt: new Date().toISOString(),
      source: 'NAIROBI_ENGAGEMENT',
      reporterName: submission.reporterName,
      reporterPhone: submission.reporterPhone,
      citizen: submission.reporterName ? { name: submission.reporterName, mobileNumber: submission.reporterPhone } : undefined,
      serviceRating: submission.serviceRating,
      status: 'new',
      priority: 'MEDIUM',
      sla: { dueInHours: 168, remaining: 168, deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() },
      slaDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      history: [
        { id: generateId(), performedBy: submission.reporterName || 'Citizen', performedByRole: 'citizen', action: 'CREATE', timestamp: new Date().toISOString(), note: 'Report submitted' }
      ],
      updates: [
        { id: generateId(), message: 'Your report has been received. Thank you for helping improve Nairobi.', author: 'System', authorType: 'staff', createdAt: new Date().toISOString() }
      ],
    };
    
    stories = [story, ...stories];
    return story;
  },

  /**
   * Get stories with optional filters (maps to DIGIT PGR /_search)
   */
  async getStories(filters?: {
    category?: StoryCategory;
    issueCategory?: IssueCategory;
    wardCode?: string;
    status?: TicketStatus;
    limit?: number;
  }): Promise<Story[]> {
    await delay(300);
    
    let result = [...stories];
    
    if (filters?.category) {
      result = result.filter(s => s.category === filters.category);
    }

    if (filters?.issueCategory) {
      result = result.filter(s => s.issueCategory === filters.issueCategory);
    }
    
    if (filters?.wardCode) {
      result = result.filter(s => s.wardCode === filters.wardCode);
    }

    if (filters?.status) {
      result = result.filter(s => s.status === filters.status);
    }
    
    if (filters?.limit) {
      result = result.slice(0, filters.limit);
    }
    
    return result;
  },

  /**
   * Get user's tickets
   */
  async getMyTickets(phone?: string): Promise<Story[]> {
    await delay(300);
    // Return all tickets for demo purposes
    return [...stories];
  },

  /**
   * Get a single story by ID
   */
  async getStory(id: string): Promise<Story | null> {
    await delay(200);
    return stories.find(s => s.id === id) || null;
  },

  /**
   * Get story by ticket ID
   */
  async getStoryByTicketId(ticketId: string): Promise<Story | null> {
    await delay(200);
    return stories.find(s => s.ticketId === ticketId) || null;
  },

  /**
   * Add comment/remark to a ticket
   */
  async addComment(storyId: string, message: string): Promise<TicketUpdate> {
    await delay(300);
    const update: TicketUpdate = {
      id: generateId(),
      message,
      author: 'Citizen',
      authorType: 'citizen',
      createdAt: new Date().toISOString(),
    };
    
    const story = stories.find(s => s.id === storyId);
    if (story) {
      story.updates = [...(story.updates || []), update];
      // Also add to remarks
      const remark: TicketRemark = {
        id: generateId(),
        by: story.citizen?.name || 'Citizen',
        byRole: 'citizen',
        text: message,
        timestamp: new Date().toISOString(),
      };
      story.remarks = [...(story.remarks || []), remark];
    }
    
    return update;
  },

  /**
   * Add remark to a ticket (staff or citizen)
   */
  async addRemark(storyId: string, text: string, byRole: 'citizen' | 'officer', byName?: string): Promise<TicketRemark> {
    await delay(300);
    const story = stories.find(s => s.id === storyId);
    const remark: TicketRemark = {
      id: generateId(),
      by: byName || (byRole === 'citizen' ? story?.citizen?.name || 'Citizen' : 'County Officer'),
      byRole,
      text,
      timestamp: new Date().toISOString(),
    };
    
    if (story) {
      story.remarks = [...(story.remarks || []), remark];
      story.updatedAt = new Date().toISOString();
    }
    
    return remark;
  },

  /**
   * Update ticket status
   */
  async updateStatus(storyId: string, status: TicketStatus, note?: string): Promise<Story | null> {
    await delay(300);
    const story = stories.find(s => s.id === storyId);
    if (story) {
      story.status = status;
      story.updatedAt = new Date().toISOString();
      
      const actionMap: Record<TicketStatus, import('@/types/story').WorkflowAction> = {
        new: 'CREATE',
        assigned: 'ASSIGN',
        in_progress: 'IN_PROGRESS',
        resolved: 'RESOLVE',
        escalated: 'ESCALATE',
      };
      
      const historyItem: WorkflowHistoryItem = {
        id: generateId(),
        performedBy: 'County Officer',
        performedByRole: 'officer',
        action: actionMap[status],
        timestamp: new Date().toISOString(),
        note,
      };
      story.history = [...(story.history || []), historyItem];
    }
    return story || null;
  },

  /**
   * Escalate a ticket
   */
  async escalateTicket(storyId: string, reason: string): Promise<Story | null> {
    await delay(300);
    const story = stories.find(s => s.id === storyId);
    if (story) {
      story.status = 'escalated';
      story.updatedAt = new Date().toISOString();
      story.history = [...(story.history || []), {
        id: generateId(),
        performedBy: story.citizen?.name || 'Citizen',
        performedByRole: 'citizen',
        action: 'ESCALATE',
        timestamp: new Date().toISOString(),
        note: reason,
      }];
      story.updates = [...(story.updates || []), {
        id: generateId(),
        message: `Ticket escalated: ${reason}`,
        author: 'Citizen',
        authorType: 'citizen',
        createdAt: new Date().toISOString(),
      }];
    }
    return story || null;
  },

  /**
   * Rate satisfaction after resolution
   */
  async rateSatisfaction(storyId: string, rating: number): Promise<Story | null> {
    await delay(200);
    const story = stories.find(s => s.id === storyId);
    if (story) {
      story.satisfactionRating = rating;
    }
    return story || null;
  },

  /**
   * Get wards list
   */
  async getWards() {
    await delay(100);
    return NAIROBI_WARDS;
  },
};

// Placeholder for future speech-to-text integration
export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  console.log('Audio transcription placeholder - audio size:', audioBlob.size);
  return '[Voice message - transcription coming soon]';
}

// Text-to-speech utility using Web Speech API
export function speakText(text: string, lang: string = 'en-US'): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Text-to-speech not supported');
      resolve();
      return;
    }
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onend = () => resolve();
    utterance.onerror = (e) => {
      console.error('Speech synthesis error:', e);
      resolve();
    };
    
    window.speechSynthesis.speak(utterance);
  });
}

export function stopSpeaking(): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}