// DIGIT PGR-ready data structures for Nairobi County Citizen Engagement

export type IssueCategory = 'roads' | 'water' | 'waste' | 'streetlights' | 'noise' | 'other';
export type StoryCategory = 'complaint' | 'idea' | 'appreciation';
export type TicketStatus = 'new' | 'assigned' | 'in_progress' | 'resolved' | 'escalated';

export interface Story {
  id: string;
  ticketId: string; // Reference number for citizens
  tenantId: string;
  category: StoryCategory;
  issueCategory?: IssueCategory;
  title: string;
  description: string;
  audioUrl?: string;
  audioBlob?: Blob;
  audioDuration?: number;
  photos?: string[]; // URLs to uploaded photos
  lat: number;
  lng: number;
  locationDescription?: string;
  wardCode?: string;
  wardName?: string;
  createdAt: string;
  updatedAt?: string;
  source: 'NAIROBI_ENGAGEMENT';
  
  // Contact info
  reporterName?: string;
  reporterPhone?: string;
  
  // Rating (1-5 stars)
  serviceRating?: number;
  
  // Status tracking
  status: TicketStatus;
  assignedTo?: string;
  departmentCode?: string;
  
  // SLA tracking
  slaDeadline?: string;
  isOverdue?: boolean;
  
  // Updates and comments
  updates?: TicketUpdate[];
  satisfactionRating?: number; // Post-resolution rating
  
  // DIGIT PGR mapping
  serviceCode?: string;
  serviceRequestId?: string;
}

export interface TicketUpdate {
  id: string;
  message: string;
  author: string;
  authorType: 'citizen' | 'staff';
  createdAt: string;
}

export interface StorySubmission {
  category: StoryCategory;
  issueCategory?: IssueCategory;
  title: string;
  description?: string;
  audioBlob?: Blob;
  audioDuration?: number;
  photos?: File[];
  lat?: number;
  lng?: number;
  locationDescription?: string;
  wardCode?: string;
  reporterName?: string;
  reporterPhone?: string;
  serviceRating?: number;
}

export interface Ward {
  code: string;
  name: string;
  subcounty: string;
  center: { lat: number; lng: number };
}

// Nairobi County wards (sample data)
export const NAIROBI_WARDS: Ward[] = [
  { code: 'westlands', name: 'Westlands', subcounty: 'Westlands', center: { lat: -1.2673, lng: 36.8058 } },
  { code: 'parklands', name: 'Parklands/Highridge', subcounty: 'Westlands', center: { lat: -1.2621, lng: 36.8135 } },
  { code: 'kilimani', name: 'Kilimani', subcounty: 'Dagoretti North', center: { lat: -1.2892, lng: 36.7865 } },
  { code: 'karen', name: 'Karen', subcounty: 'Lang\'ata', center: { lat: -1.3196, lng: 36.7128 } },
  { code: 'langata', name: 'Lang\'ata', subcounty: 'Lang\'ata', center: { lat: -1.3550, lng: 36.7600 } },
  { code: 'kibera', name: 'Kibera', subcounty: 'Kibra', center: { lat: -1.3133, lng: 36.7833 } },
  { code: 'embakasi_central', name: 'Embakasi Central', subcounty: 'Embakasi Central', center: { lat: -1.3100, lng: 36.8900 } },
  { code: 'ruaraka', name: 'Ruaraka', subcounty: 'Ruaraka', center: { lat: -1.2450, lng: 36.8750 } },
  { code: 'kasarani', name: 'Kasarani', subcounty: 'Kasarani', center: { lat: -1.2208, lng: 36.8956 } },
  { code: 'roysambu', name: 'Roysambu', subcounty: 'Roysambu', center: { lat: -1.2167, lng: 36.8833 } },
  { code: 'mathare', name: 'Mathare', subcounty: 'Mathare', center: { lat: -1.2633, lng: 36.8583 } },
  { code: 'starehe', name: 'Starehe', subcounty: 'Starehe', center: { lat: -1.2833, lng: 36.8333 } },
  { code: 'nairobi_central', name: 'Nairobi Central', subcounty: 'Starehe', center: { lat: -1.2864, lng: 36.8172 } },
];

export const ISSUE_CATEGORIES: { code: IssueCategory; label: string; icon: string; description: string }[] = [
  { code: 'roads', label: 'Roads & Potholes', icon: '🛣️', description: 'Potholes, road damage, traffic issues' },
  { code: 'water', label: 'Water & Sewage', icon: '💧', description: 'Leaks, blockages, water supply' },
  { code: 'waste', label: 'Waste & Garbage', icon: '🗑️', description: 'Garbage collection, dumping' },
  { code: 'streetlights', label: 'Streetlights', icon: '💡', description: 'Broken or missing lights' },
  { code: 'noise', label: 'Noise & Pollution', icon: '🔊', description: 'Noise complaints, air quality' },
  { code: 'other', label: 'Other Issues', icon: '📋', description: 'Other service requests' },
];

export const CATEGORY_LABELS: Record<StoryCategory, string> = {
  complaint: 'Report a Problem',
  idea: 'Share an Idea',
  appreciation: 'Give Thanks',
};

export const CATEGORY_DESCRIPTIONS: Record<StoryCategory, string> = {
  complaint: 'Something that needs fixing or attention',
  idea: 'A suggestion to improve our county',
  appreciation: 'Something good that happened',
};

export const STATUS_LABELS: Record<TicketStatus, { label: string; color: string }> = {
  new: { label: 'New', color: 'bg-blue-500' },
  assigned: { label: 'Assigned', color: 'bg-purple-500' },
  in_progress: { label: 'In Progress', color: 'bg-amber-500' },
  resolved: { label: 'Resolved', color: 'bg-green-500' },
  escalated: { label: 'Escalated', color: 'bg-red-500' },
};
