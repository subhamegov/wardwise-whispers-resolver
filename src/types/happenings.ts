// Types for government and community updates - "What's Happening Around Me"

export type HappeningType = 
  | 'INFRASTRUCTURE'
  | 'EVENT'
  | 'NOTICE'
  | 'SERVICE'
  | 'EMERGENCY'
  | 'COMMUNITY';

export interface Happening {
  id: string;
  wardCode: string;
  wardName?: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  endDate?: string;
  type: HappeningType;
  lat: number;
  lng: number;
  link?: string;
  isActive: boolean;
}

export const HAPPENING_TYPE_LABELS: Record<HappeningType, string> = {
  INFRASTRUCTURE: 'Road & Infrastructure',
  EVENT: 'Community Event',
  NOTICE: 'Official Notice',
  SERVICE: 'Service Update',
  EMERGENCY: 'Emergency Alert',
  COMMUNITY: 'Community Activity',
};

export const HAPPENING_TYPE_ICONS: Record<HappeningType, string> = {
  INFRASTRUCTURE: '🚧',
  EVENT: '📅',
  NOTICE: '📢',
  SERVICE: '🏛️',
  EMERGENCY: '⚠️',
  COMMUNITY: '🤝',
};
