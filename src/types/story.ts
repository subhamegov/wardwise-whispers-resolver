// DIGIT PGR-ready data structures for Wardwise Whispers

export type StoryCategory = 'complaint' | 'idea' | 'appreciation';

export interface Story {
  id: string;
  tenantId: string;
  category: StoryCategory;
  title: string;
  description: string;
  audioUrl?: string;
  audioBlob?: Blob;
  audioDuration?: number;
  lat: number;
  lng: number;
  locationDescription?: string;
  wardCode?: string;
  wardName?: string;
  createdAt: string;
  updatedAt?: string;
  source: 'WARDWISE_WHISPERS';
  
  // Optional contact info
  reporterName?: string;
  reporterPhone?: string;
  
  // DIGIT PGR mapping (for future integration)
  serviceCode?: string;
  serviceRequestId?: string;
  status?: 'pending' | 'acknowledged' | 'in_progress' | 'resolved';
}

export interface StorySubmission {
  category: StoryCategory;
  title: string;
  description?: string;
  audioBlob?: Blob;
  audioDuration?: number;
  lat?: number;
  lng?: number;
  locationDescription?: string;
  wardCode?: string;
  reporterName?: string;
  reporterPhone?: string;
}

export interface Ward {
  code: string;
  name: string;
  center: { lat: number; lng: number };
}

// Naivasha wards (placeholder data)
export const NAIVASHA_WARDS: Ward[] = [
  { code: 'biashara', name: 'Biashara', center: { lat: -0.7167, lng: 36.4359 } },
  { code: 'hells_gate', name: "Hell's Gate", center: { lat: -0.8333, lng: 36.3167 } },
  { code: 'lake_view', name: 'Lake View', center: { lat: -0.7500, lng: 36.4000 } },
  { code: 'maiella', name: 'Maiella', center: { lat: -0.6833, lng: 36.4500 } },
  { code: 'mai_mahiu', name: 'Mai Mahiu', center: { lat: -0.9667, lng: 36.5833 } },
  { code: 'maai_mahiu', name: 'Maai Mahiu', center: { lat: -0.9500, lng: 36.5500 } },
  { code: 'naivasha_east', name: 'Naivasha East', center: { lat: -0.7000, lng: 36.4500 } },
  { code: 'olkaria', name: 'Olkaria', center: { lat: -0.8833, lng: 36.2833 } },
  { code: 'viwandani', name: 'Viwandani', center: { lat: -0.7333, lng: 36.4167 } },
];

export const CATEGORY_LABELS: Record<StoryCategory, string> = {
  complaint: 'Report a Problem',
  idea: 'Share an Idea',
  appreciation: 'Give Thanks',
};

export const CATEGORY_DESCRIPTIONS: Record<StoryCategory, string> = {
  complaint: 'Something that needs fixing or attention',
  idea: 'A suggestion to improve our community',
  appreciation: 'Something good that happened',
};
