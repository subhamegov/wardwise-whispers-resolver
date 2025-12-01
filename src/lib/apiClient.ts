// API Client for Wardwise Whispers
// Designed to be swapped with real DIGIT PGR endpoints later

import { Story, StorySubmission, StoryCategory, NAIVASHA_WARDS } from '@/types/story';

// In-memory storage for mock data
let stories: Story[] = [
  {
    id: '1',
    tenantId: 'ke.naivasha',
    category: 'complaint',
    title: 'Broken street light on Moi Avenue',
    description: 'The street light near the main market has been broken for two weeks. It is very dark and unsafe at night.',
    lat: -0.7172,
    lng: 36.4345,
    wardCode: 'biashara',
    wardName: 'Biashara',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    source: 'WARDWISE_WHISPERS',
    status: 'pending',
  },
  {
    id: '2',
    tenantId: 'ke.naivasha',
    category: 'idea',
    title: 'Community garden near Lake View',
    description: 'We should create a community garden where families can grow vegetables. Many people here want fresh food.',
    lat: -0.7520,
    lng: 36.3980,
    wardCode: 'lake_view',
    wardName: 'Lake View',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    source: 'WARDWISE_WHISPERS',
    status: 'acknowledged',
  },
  {
    id: '3',
    tenantId: 'ke.naivasha',
    category: 'appreciation',
    title: 'Thank you for fixing the water pipe!',
    description: 'The water pipe in our area was fixed very quickly. We are grateful to the workers who came even on Sunday.',
    lat: -0.7100,
    lng: 36.4400,
    wardCode: 'maiella',
    wardName: 'Maiella',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    source: 'WARDWISE_WHISPERS',
    status: 'resolved',
  },
];

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function findWardByCode(code?: string) {
  return NAIVASHA_WARDS.find(w => w.code === code);
}

// Simulated network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const apiClient = {
  /**
   * Create a new story (maps to DIGIT PGR /_create)
   */
  async createStory(submission: StorySubmission): Promise<Story> {
    await delay(500); // Simulate network delay
    
    const ward = findWardByCode(submission.wardCode);
    
    // Convert audio blob to data URL for storage (in real app, this would be uploaded)
    let audioUrl: string | undefined;
    if (submission.audioBlob) {
      audioUrl = URL.createObjectURL(submission.audioBlob);
    }
    
    const story: Story = {
      id: generateId(),
      tenantId: 'ke.naivasha',
      category: submission.category,
      title: submission.title,
      description: submission.description || '',
      audioUrl,
      audioBlob: submission.audioBlob,
      audioDuration: submission.audioDuration,
      lat: submission.lat || -0.7167,
      lng: submission.lng || 36.4359,
      locationDescription: submission.locationDescription,
      wardCode: submission.wardCode,
      wardName: ward?.name,
      createdAt: new Date().toISOString(),
      source: 'WARDWISE_WHISPERS',
      reporterName: submission.reporterName,
      reporterPhone: submission.reporterPhone,
      status: 'pending',
    };
    
    stories = [story, ...stories];
    return story;
  },

  /**
   * Get stories with optional filters (maps to DIGIT PGR /_search)
   */
  async getStories(filters?: {
    category?: StoryCategory;
    wardCode?: string;
    limit?: number;
  }): Promise<Story[]> {
    await delay(300);
    
    let result = [...stories];
    
    if (filters?.category) {
      result = result.filter(s => s.category === filters.category);
    }
    
    if (filters?.wardCode) {
      result = result.filter(s => s.wardCode === filters.wardCode);
    }
    
    if (filters?.limit) {
      result = result.slice(0, filters.limit);
    }
    
    return result;
  },

  /**
   * Get a single story by ID
   */
  async getStory(id: string): Promise<Story | null> {
    await delay(200);
    return stories.find(s => s.id === id) || null;
  },

  /**
   * Get wards list
   */
  async getWards() {
    await delay(100);
    return NAIVASHA_WARDS;
  },
};

// Placeholder for future speech-to-text integration
export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  // This is a placeholder function
  // In the future, this will call a speech-to-text service
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
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1;
    
    utterance.onend = () => resolve();
    utterance.onerror = (e) => {
      console.error('Speech synthesis error:', e);
      resolve(); // Don't reject, just resolve to fail gracefully
    };
    
    window.speechSynthesis.speak(utterance);
  });
}

export function stopSpeaking(): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
