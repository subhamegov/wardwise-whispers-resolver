// Mock API for government and community happenings
// Will be replaced with DIGIT MDMS or civic open-data API

import { Happening } from '@/types/happenings';
import { NAIROBI_WARDS } from '@/types/story';

// Mock happenings data for Nairobi
const mockHappenings: Happening[] = [
  {
    id: 'nairobi_001',
    wardCode: 'nairobi_central',
    wardName: 'Nairobi Central',
    title: 'Road repair on Kenyatta Avenue',
    summary: 'Repairs ongoing near KICC. Expect traffic diversions until Friday. Please use alternative routes.',
    source: 'Nairobi County Roads Department',
    date: '2025-12-01',
    endDate: '2025-12-08',
    type: 'INFRASTRUCTURE',
    lat: -1.2864,
    lng: 36.8172,
    isActive: true,
  },
  {
    id: 'nairobi_002',
    wardCode: 'westlands',
    wardName: 'Westlands',
    title: 'Community cleanup drive this Saturday',
    summary: 'Join the community clean-up starting at 9 AM at Westlands Park. Gloves and bags will be provided.',
    source: 'Nairobi County Environment',
    date: '2025-12-07',
    type: 'EVENT',
    lat: -1.2673,
    lng: 36.8058,
    isActive: true,
  },
  {
    id: 'nairobi_003',
    wardCode: 'kilimani',
    wardName: 'Kilimani',
    title: 'Water supply maintenance',
    summary: 'Scheduled maintenance on Wednesday 8 AM - 4 PM. Kilimani and Hurlingham areas affected. Please store water.',
    source: 'Nairobi Water Company',
    date: '2025-12-04',
    type: 'NOTICE',
    lat: -1.2892,
    lng: 36.7865,
    isActive: true,
  },
  {
    id: 'nairobi_004',
    wardCode: 'kasarani',
    wardName: 'Kasarani',
    title: 'New streetlights installation',
    summary: 'Solar-powered LED streetlights being installed along Thika Road service lane. Work continues for 2 weeks.',
    source: 'Nairobi County Energy',
    date: '2025-11-28',
    endDate: '2025-12-12',
    type: 'INFRASTRUCTURE',
    lat: -1.2208,
    lng: 36.8956,
    isActive: true,
  },
  {
    id: 'nairobi_005',
    wardCode: 'langata',
    wardName: "Lang'ata",
    title: 'Free health screening camp',
    summary: 'Free blood pressure, diabetes, and HIV screening at Lang\'ata Health Center. All residents welcome. Bring ID.',
    source: 'Nairobi County Health',
    date: '2025-12-10',
    type: 'EVENT',
    lat: -1.3550,
    lng: 36.7600,
    isActive: true,
  },
  {
    id: 'nairobi_006',
    wardCode: 'embakasi_central',
    wardName: 'Embakasi Central',
    title: 'Garbage collection schedule change',
    summary: 'Garbage collection in Embakasi Central moved to Monday and Thursday. Please have bins ready by 6 AM.',
    source: 'Nairobi County Environment',
    date: '2025-12-02',
    type: 'SERVICE',
    lat: -1.3100,
    lng: 36.8900,
    isActive: true,
  },
  {
    id: 'nairobi_007',
    wardCode: 'starehe',
    wardName: 'Starehe',
    title: 'Huduma Centre extended hours',
    summary: 'GPO Huduma Centre will operate until 6 PM (instead of 4 PM) this week for ID and certificate collection.',
    source: 'Huduma Kenya',
    date: '2025-12-02',
    endDate: '2025-12-06',
    type: 'SERVICE',
    lat: -1.2833,
    lng: 36.8333,
    link: 'https://hudumakenya.go.ke',
    isActive: true,
  },
];

// Calculate distance between two coordinates (in km)
function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Find ward by coordinates
export function findWardByCoords(lat: number, lng: number): { code: string; name: string } | null {
  let nearestWard = null;
  let minDistance = Infinity;
  
  for (const ward of NAIROBI_WARDS) {
    const distance = getDistance(lat, lng, ward.center.lat, ward.center.lng);
    if (distance < minDistance) {
      minDistance = distance;
      nearestWard = { code: ward.code, name: ward.name };
    }
  }
  
  return nearestWard;
}

// Mock reverse geocoding for nearby landmarks
export async function getNearbyLandmarks(lat: number, lng: number): Promise<string[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const landmarks = [
    'Near KICC',
    'Close to Kenyatta Avenue',
    'Near Uhuru Park',
    'Close to City Market',
    'Near GPO',
    'Westlands area',
    'Near Sarit Centre',
    'Close to Junction Mall',
  ];
  
  const shuffled = landmarks.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.random() > 0.5 ? 2 : 1);
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const happeningsApi = {
  async getHappenings(filters?: {
    wardCode?: string;
    lat?: number;
    lng?: number;
    radiusKm?: number;
    type?: string;
  }): Promise<Happening[]> {
    await delay(400);
    
    let result = [...mockHappenings].filter(h => h.isActive);
    
    if (filters?.wardCode) {
      result = result.filter(h => h.wardCode === filters.wardCode);
    }
    
    if (filters?.lat && filters?.lng) {
      const radius = filters.radiusKm || 5;
      result = result.filter(h => {
        const distance = getDistance(filters.lat!, filters.lng!, h.lat, h.lng);
        return distance <= radius;
      });
      
      result.sort((a, b) => {
        const distA = getDistance(filters.lat!, filters.lng!, a.lat, a.lng);
        const distB = getDistance(filters.lat!, filters.lng!, b.lat, b.lng);
        return distA - distB;
      });
    }
    
    if (filters?.type) {
      result = result.filter(h => h.type === filters.type);
    }
    
    return result;
  },

  async getHappening(id: string): Promise<Happening | null> {
    await delay(200);
    return mockHappenings.find(h => h.id === id) || null;
  },

  async getAllHappeningsForMap(): Promise<Happening[]> {
    await delay(300);
    return mockHappenings.filter(h => h.isActive);
  },
};
