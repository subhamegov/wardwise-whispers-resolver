// API Client for Nairobi County Citizen Engagement
// Designed to be swapped with real DIGIT PGR endpoints later

import { Story, StorySubmission, StoryCategory, IssueCategory, TicketStatus, NAIROBI_WARDS, TicketUpdate } from '@/types/story';

// In-memory storage for mock data
let stories: Story[] = [
  {
    id: '1',
    ticketId: 'NRB-2024-001234',
    tenantId: 'ke.nairobi',
    category: 'complaint',
    issueCategory: 'roads',
    title: 'Large pothole on Kenyatta Avenue',
    description: 'There is a dangerous pothole near the intersection with Uhuru Highway. Several cars have been damaged. It is about 30cm deep.',
    lat: -1.2864,
    lng: 36.8172,
    wardCode: 'nairobi_central',
    wardName: 'Nairobi Central',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    source: 'NAIROBI_ENGAGEMENT',
    status: 'in_progress',
    assignedTo: 'Roads Department',
    slaDeadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    serviceRating: 3,
    updates: [
      { id: 'u1', message: 'Issue received and logged.', author: 'System', authorType: 'staff', createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'u2', message: 'Assigned to Roads Department for repair.', author: 'County Dispatch', authorType: 'staff', createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
    ],
  },
  {
    id: '2',
    ticketId: 'NRB-2024-001235',
    tenantId: 'ke.nairobi',
    category: 'complaint',
    issueCategory: 'waste',
    title: 'Garbage not collected for 1 week',
    description: 'The garbage collection truck has not come to our street in Westlands for over a week. The bins are overflowing and there is a bad smell.',
    lat: -1.2673,
    lng: 36.8058,
    wardCode: 'westlands',
    wardName: 'Westlands',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    source: 'NAIROBI_ENGAGEMENT',
    status: 'assigned',
    assignedTo: 'Waste Management',
    slaDeadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    serviceRating: 2,
  },
  {
    id: '3',
    ticketId: 'NRB-2024-001236',
    tenantId: 'ke.nairobi',
    category: 'appreciation',
    title: 'Thank you for fixing the water pipe!',
    description: 'The burst water pipe in Kilimani was fixed very quickly. We are grateful to the workers who came even on Sunday.',
    lat: -1.2892,
    lng: 36.7865,
    wardCode: 'kilimani',
    wardName: 'Kilimani',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    source: 'NAIROBI_ENGAGEMENT',
    status: 'resolved',
    satisfactionRating: 5,
  },
  {
    id: '4',
    ticketId: 'NRB-2024-001237',
    tenantId: 'ke.nairobi',
    category: 'complaint',
    issueCategory: 'streetlights',
    title: 'Street light not working near Karen shopping center',
    description: 'The street light near Karen shopping center has been off for 3 weeks. It is very dark and unsafe at night.',
    lat: -1.3196,
    lng: 36.7128,
    wardCode: 'karen',
    wardName: 'Karen',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    source: 'NAIROBI_ENGAGEMENT',
    status: 'new',
    slaDeadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
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
      serviceRating: submission.serviceRating,
      status: 'new',
      slaDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days SLA
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
    // In real app, filter by user's phone/ID
    return [...stories].filter(s => s.status !== 'resolved').slice(0, 5);
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
   * Add comment to a ticket
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
    }
    
    return update;
  },

  /**
   * Escalate a ticket
   */
  async escalateTicket(storyId: string, reason: string): Promise<Story | null> {
    await delay(300);
    const story = stories.find(s => s.id === storyId);
    if (story) {
      story.status = 'escalated';
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
