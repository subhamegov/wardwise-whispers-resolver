// Mock data for service analytics dashboard

export interface ComplaintStats {
  totalComplaints: number;
  closedComplaints: number;
  slaAchievementPercent: number;
  completionRatePercent: number;
}

export interface TimeSeriesData {
  month: string;
  total: number;
  closed: number;
  reopened: number;
}

export interface SourceData {
  source: string;
  count: number;
}

export interface StatusData {
  status: string;
  count: number;
  color: string;
}

export interface DepartmentData {
  department: string;
  count: number;
  color: string;
}

export interface ChannelData {
  channel: string;
  count: number;
  color: string;
}

export interface UniqueCitizensData {
  month: string;
  count: number;
}

export interface TopComplaintData {
  category: string;
  count: number;
}

export interface StatusByBoundary {
  boundary: string;
  open: number;
  assigned: number;
  rejected: number;
  reassignRequested: number;
  reassigned: number;
  reopened: number;
  resolved: number;
  closed: number;
  total: number;
  completionRate: number;
  slaAchievement: number;
}

// KPI Definitions for tooltips
export const KPI_DEFINITIONS = {
  totalComplaints: "Unique number of complaints raised by citizen or employee. Total = Open + Assigned + Resolved + Closed + Reopened + Reassigned + Rejected.",
  closedComplaints: "Total number of complaints successfully resolved by the concerned authorities.",
  slaAchievement: "Percentage of complaints resolved within SLA. Formula: (# complaints resolved within SLA / Total Complaints) × 100.",
  completionRate: "Closed Complaints / Total Complaints. Formula: (Closed Complaints / Total Complaints) × 100.",
  reopenedComplaints: "Number of complaints reopened by the citizen (directly or via counter employee) due to unsuccessful resolution earlier.",
  openComplaints: "Number of complaints that have been filed by citizens and await further action (assignment).",
  assignedComplaints: "Number of complaints that have been assigned to an individual in the respective department.",
  rejectedComplaints: "Number of complaints terminated by the redressal officer; citizens must file a new complaint in such cases.",
  reassignRequested: "Number of complaints for which a reassignment has been requested by the last mile employee.",
  reassignedComplaints: "Number of complaints that have been reassigned to the redressal officer.",
  resolvedComplaints: "Number of complaints marked as done by last-mile employee and awaiting citizen feedback.",
  averageSolutionTime: "Average of (start to end) in a workflow, irrespective of status. The event duration is based on the metric.",
  uniqueCitizens: "Unique number of citizens who have filed at least one complaint for a given time range.",
  complaintsBySource: "Total complaints = aggregate of all complaints (open + assigned + closed + reassign requested + rejected + reopened).",
  complaintsByStatus: "Total complaints = aggregate of all complaints by status for the selected month/time range.",
  complaintsByDepartment: "Total complaints = aggregate of all complaints grouped by the department responsible.",
  complaintsByChannel: "Aggregate of all complaints grouped by the source they originate from – web/mobile/IVR/call centre/etc.",
};

// Mock data generators
export function getOverviewStats(timeRange: string, subCounty: string): ComplaintStats {
  const baseMultiplier = timeRange === '7days' ? 0.25 : timeRange === '30days' ? 1 : timeRange === '90days' ? 3 : 4;
  const locationMultiplier = subCounty === 'all' ? 5 : 1;
  
  const total = Math.round(1250 * baseMultiplier * locationMultiplier);
  const closed = Math.round(total * 0.72);
  
  return {
    totalComplaints: total,
    closedComplaints: closed,
    slaAchievementPercent: 78.5,
    completionRatePercent: Math.round((closed / total) * 100 * 10) / 10,
  };
}

export function getCumulativeData(timeRange: string): TimeSeriesData[] {
  const months = timeRange === '7days' 
    ? ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7']
    : timeRange === '30days'
    ? ['Week 1', 'Week 2', 'Week 3', 'Week 4']
    : timeRange === '90days'
    ? ['Month 1', 'Month 2', 'Month 3']
    : ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  let totalCum = 0;
  let closedCum = 0;
  let reopenedCum = 0;

  return months.map((month) => {
    totalCum += Math.round(200 + Math.random() * 150);
    closedCum += Math.round(150 + Math.random() * 100);
    reopenedCum += Math.round(10 + Math.random() * 20);
    return {
      month,
      total: totalCum,
      closed: closedCum,
      reopened: reopenedCum,
    };
  });
}

export function getComplaintsBySource(): SourceData[] {
  return [
    { source: 'Mobile App', count: 3420 },
    { source: 'Web Portal', count: 2180 },
    { source: 'Call Centre', count: 1560 },
    { source: 'WhatsApp', count: 890 },
    { source: 'Walk-in Counter', count: 650 },
    { source: 'IVR', count: 320 },
    { source: 'USSD', count: 180 },
  ];
}

export function getComplaintsByStatus(): StatusData[] {
  return [
    { status: 'Open', count: 245, color: 'hsl(205, 85%, 45%)' },
    { status: 'Assigned', count: 412, color: 'hsl(270, 60%, 50%)' },
    { status: 'In Progress', count: 328, color: 'hsl(38, 95%, 50%)' },
    { status: 'Resolved', count: 1890, color: 'hsl(145, 70%, 35%)' },
    { status: 'Closed', count: 3450, color: 'hsl(145, 75%, 28%)' },
    { status: 'Reopened', count: 156, color: 'hsl(0, 75%, 50%)' },
    { status: 'Rejected', count: 89, color: 'hsl(0, 0%, 45%)' },
    { status: 'Reassign Requested', count: 67, color: 'hsl(30, 90%, 55%)' },
  ];
}

export function getComplaintsByDepartment(): DepartmentData[] {
  return [
    { department: 'Solid Waste', count: 2340, color: 'hsl(145, 70%, 35%)' },
    { department: 'Water & Sewerage', count: 1890, color: 'hsl(205, 85%, 45%)' },
    { department: 'Roads', count: 1560, color: 'hsl(38, 95%, 50%)' },
    { department: 'Street Lighting', count: 980, color: 'hsl(270, 60%, 50%)' },
    { department: 'Public Health', count: 650, color: 'hsl(0, 75%, 50%)' },
    { department: 'Markets', count: 420, color: 'hsl(180, 60%, 40%)' },
    { department: 'Others', count: 360, color: 'hsl(0, 0%, 55%)' },
  ];
}

export function getComplaintsByChannel(): ChannelData[] {
  return [
    { channel: 'Web', count: 2180, color: 'hsl(205, 85%, 45%)' },
    { channel: 'Mobile App', count: 3420, color: 'hsl(145, 70%, 35%)' },
    { channel: 'USSD', count: 180, color: 'hsl(270, 60%, 50%)' },
    { channel: 'Call Centre/IVR', count: 1880, color: 'hsl(38, 95%, 50%)' },
    { channel: 'WhatsApp', count: 890, color: 'hsl(145, 75%, 40%)' },
    { channel: 'Walk-in', count: 650, color: 'hsl(0, 75%, 50%)' },
  ];
}

export function getAverageSolutionTime(): number {
  return 4.2; // days
}

export function getUniqueCitizensData(timeRange: string): UniqueCitizensData[] {
  const months = timeRange === '7days' 
    ? ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7']
    : timeRange === '30days'
    ? ['Week 1', 'Week 2', 'Week 3', 'Week 4']
    : timeRange === '90days'
    ? ['Month 1', 'Month 2', 'Month 3']
    : ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return months.map((month) => ({
    month,
    count: Math.round(800 + Math.random() * 400),
  }));
}

export function getTopComplaints(): TopComplaintData[] {
  return [
    { category: 'Garbage Collection Missed', count: 1450 },
    { category: 'Water Supply Interrupted', count: 1120 },
    { category: 'Pothole Repair Needed', count: 980 },
    { category: 'Streetlight Not Working', count: 720 },
    { category: 'Sewage Overflow', count: 580 },
    { category: 'Illegal Dumping', count: 420 },
    { category: 'Road Flooding', count: 380 },
    { category: 'Noisy Construction', count: 290 },
  ];
}

export function getStatusByBoundary(dimension: 'ward' | 'department'): StatusByBoundary[] {
  const items = dimension === 'ward' 
    ? ['Westlands', 'Kilimani', 'Parklands', 'Eastleigh', 'Kasarani', 'Embakasi', 'Lang\'ata', 'Dagoretti']
    : ['Solid Waste', 'Water & Sewerage', 'Roads', 'Street Lighting', 'Public Health', 'Markets'];

  return items.map((boundary) => {
    const total = Math.round(400 + Math.random() * 600);
    const closed = Math.round(total * (0.5 + Math.random() * 0.3));
    const resolved = Math.round((total - closed) * 0.3);
    const assigned = Math.round((total - closed - resolved) * 0.4);
    const open = Math.round((total - closed - resolved - assigned) * 0.5);
    const reopened = Math.round(total * 0.05);
    const rejected = Math.round(total * 0.03);
    const reassignRequested = Math.round(total * 0.02);
    const reassigned = Math.round(total * 0.01);

    return {
      boundary,
      open,
      assigned,
      rejected,
      reassignRequested,
      reassigned,
      reopened,
      resolved,
      closed,
      total,
      completionRate: Math.round((closed / total) * 100 * 10) / 10,
      slaAchievement: Math.round((65 + Math.random() * 25) * 10) / 10,
    };
  });
}

// Sub-counties for filter
export const SUB_COUNTIES = [
  { value: 'all', label: 'All Nairobi' },
  { value: 'westlands', label: 'Westlands' },
  { value: 'dagoretti-north', label: 'Dagoretti North' },
  { value: 'dagoretti-south', label: 'Dagoretti South' },
  { value: 'langata', label: 'Lang\'ata' },
  { value: 'kibra', label: 'Kibra' },
  { value: 'roysambu', label: 'Roysambu' },
  { value: 'kasarani', label: 'Kasarani' },
  { value: 'ruaraka', label: 'Ruaraka' },
  { value: 'embakasi-south', label: 'Embakasi South' },
  { value: 'embakasi-north', label: 'Embakasi North' },
  { value: 'embakasi-central', label: 'Embakasi Central' },
  { value: 'embakasi-east', label: 'Embakasi East' },
  { value: 'embakasi-west', label: 'Embakasi West' },
  { value: 'makadara', label: 'Makadara' },
  { value: 'kamukunji', label: 'Kamukunji' },
  { value: 'starehe', label: 'Starehe' },
  { value: 'mathare', label: 'Mathare' },
];

export const TIME_RANGES = [
  { value: '7days', label: 'Last 7 days' },
  { value: '30days', label: 'Last 30 days' },
  { value: '90days', label: 'Last 90 days' },
  { value: 'fy', label: 'This Financial Year' },
];

export const CATEGORIES = [
  { value: 'all', label: 'All Categories' },
  { value: 'waste', label: 'Solid Waste' },
  { value: 'water', label: 'Water & Sewerage' },
  { value: 'roads', label: 'Roads' },
  { value: 'lighting', label: 'Street Lighting' },
  { value: 'health', label: 'Public Health' },
  { value: 'markets', label: 'Markets' },
];
