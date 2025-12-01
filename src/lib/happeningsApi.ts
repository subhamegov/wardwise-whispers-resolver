// Mock API for government and community happenings
// Will be replaced with DIGIT MDMS or civic open-data API

import { Happening } from '@/types/happenings';
import { NAIVASHA_WARDS } from '@/types/story';

// Mock happenings data
const mockHappenings: Happening[] = [
  {
    id: 'naivasha_001',
    wardCode: 'biashara',
    wardName: 'Biashara',
    title: 'Road repair on Kenyatta Avenue',
    summary: 'Repairs ongoing near the main market. Expect traffic diversions until Friday. Please use alternative routes via Moi Avenue.',
    source: 'Naivasha Works Department',
    date: '2025-12-01',
    endDate: '2025-12-05',
    type: 'INFRASTRUCTURE',
    lat: -0.7175,
    lng: 36.4355,
    isActive: true,
  },
  {
    id: 'naivasha_002',
    wardCode: 'lake_view',
    wardName: 'Lake View',
    title: 'Public cleaning drive this Saturday',
    summary: 'Join the community clean-up starting at 10 AM near Lake View Primary School. Bring gloves if you have them!',
    source: 'Naivasha Municipal Office',
    date: '2025-12-07',
    type: 'EVENT',
    lat: -0.7510,
    lng: 36.3990,
    isActive: true,
  },
  {
    id: 'naivasha_003',
    wardCode: 'biashara',
    wardName: 'Biashara',
    title: 'Ward office hours extended this week',
    summary: 'The Biashara ward office will be open until 6 PM (instead of 4 PM) from Monday to Friday this week for certificate collection.',
    source: 'Biashara Ward Office',
    date: '2025-12-02',
    endDate: '2025-12-06',
    type: 'SERVICE',
    lat: -0.7165,
    lng: 36.4360,
    link: 'https://naivasha.go.ke/offices',
    isActive: true,
  },
  {
    id: 'naivasha_004',
    wardCode: 'maiella',
    wardName: 'Maiella',
    title: 'Water supply maintenance',
    summary: 'Scheduled water maintenance on Tuesday 10 AM - 2 PM. Please store water in advance. Maiella and parts of Naivasha East affected.',
    source: 'Naivasha Water & Sewerage',
    date: '2025-12-03',
    type: 'NOTICE',
    lat: -0.7050,
    lng: 36.4420,
    isActive: true,
  },
  {
    id: 'naivasha_005',
    wardCode: 'hells_gate',
    wardName: "Hell's Gate",
    title: 'New bus stop construction',
    summary: 'A new bus stop is being built near the Hell\'s Gate junction. Construction expected to complete by end of December.',
    source: 'Naivasha Transport Authority',
    date: '2025-11-25',
    endDate: '2025-12-31',
    type: 'INFRASTRUCTURE',
    lat: -0.8300,
    lng: 36.3200,
    isActive: true,
  },
  {
    id: 'naivasha_006',
    wardCode: 'lake_view',
    wardName: 'Lake View',
    title: 'Free health screening camp',
    summary: 'Free blood pressure and diabetes screening at Lake View Community Center. All residents welcome. Bring your ID.',
    source: 'Naivasha Health Department',
    date: '2025-12-10',
    type: 'EVENT',
    lat: -0.7520,
    lng: 36.4000,
    isActive: true,
  },
  {
    id: 'naivasha_007',
    wardCode: 'viwandani',
    wardName: 'Viwandani',
    title: 'New street lights installed',
    summary: 'Solar-powered street lights have been installed along Industrial Road. Report any issues to the ward office.',
    source: 'Naivasha Energy Department',
    date: '2025-11-28',
    type: 'INFRASTRUCTURE',
    lat: -0.7340,
    lng: 36.4180,
    isActive: true,
  },
];

// Calculate distance between two coordinates (in km)
function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in km
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
  // Simple nearest-ward lookup (in real app, use actual ward boundaries)
  let nearestWard = null;
  let minDistance = Infinity;
  
  for (const ward of NAIVASHA_WARDS) {
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
  // In production, use OpenStreetMap Nominatim API
  // For now, return mock landmarks based on location
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const landmarks = [
    'Near Naivasha Market',
    'Close to Main Bus Station',
    'Lake Naivasha area',
    'Near Kenyatta Avenue',
    'Industrial Area vicinity',
  ];
  
  // Return 1-2 random landmarks
  const shuffled = landmarks.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.random() > 0.5 ? 2 : 1);
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const happeningsApi = {
  /**
   * Get happenings filtered by ward or location
   */
  async getHappenings(filters?: {
    wardCode?: string;
    lat?: number;
    lng?: number;
    radiusKm?: number;
    type?: string;
  }): Promise<Happening[]> {
    await delay(400);
    
    let result = [...mockHappenings].filter(h => h.isActive);
    
    // Filter by ward
    if (filters?.wardCode) {
      result = result.filter(h => h.wardCode === filters.wardCode);
    }
    
    // Filter by proximity
    if (filters?.lat && filters?.lng) {
      const radius = filters.radiusKm || 5; // Default 5km radius
      result = result.filter(h => {
        const distance = getDistance(filters.lat!, filters.lng!, h.lat, h.lng);
        return distance <= radius;
      });
      
      // Sort by distance
      result.sort((a, b) => {
        const distA = getDistance(filters.lat!, filters.lng!, a.lat, a.lng);
        const distB = getDistance(filters.lat!, filters.lng!, b.lat, b.lng);
        return distA - distB;
      });
    }
    
    // Filter by type
    if (filters?.type) {
      result = result.filter(h => h.type === filters.type);
    }
    
    return result;
  },

  /**
   * Get a single happening by ID
   */
  async getHappening(id: string): Promise<Happening | null> {
    await delay(200);
    return mockHappenings.find(h => h.id === id) || null;
  },

  /**
   * Get all happenings for map markers
   */
  async getAllHappeningsForMap(): Promise<Happening[]> {
    await delay(300);
    return mockHappenings.filter(h => h.isActive);
  },
};
