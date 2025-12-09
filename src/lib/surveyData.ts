import type { Survey } from '@/types/survey';

export const mockSurveys: Survey[] = [
  {
    id: "survey_001",
    title: "Street Lighting Improvement Drive",
    description: "Help us identify dark spots and improve lighting in your area.",
    responses: 842,
    daysLeft: 5,
    questions: [
      {
        id: "q1",
        text: "Which areas should be prioritized for new streetlights?",
        options: [
          "Residential streets and estates",
          "Main roads and intersections",
          "Markets and commercial zones",
          "Public parks and recreation areas"
        ]
      }
    ]
  },
  {
    id: "survey_002",
    title: "Public Transport Route Feedback",
    description: "Share your thoughts on proposed matatu and bus route realignments.",
    responses: 615,
    daysLeft: 9,
    questions: [
      {
        id: "q1",
        text: "Which changes would most improve your daily commute?",
        options: [
          "Shorter walking distance to bus stops",
          "Better safety at termini",
          "Reduced waiting times",
          "New feeder routes to estates"
        ]
      }
    ]
  },
  {
    id: "survey_003",
    title: "Garbage Collection Satisfaction Survey",
    description: "Tell us about your garbage collection schedule and service quality.",
    responses: 1093,
    daysLeft: 7,
    questions: [
      {
        id: "q1",
        text: "How often is garbage collected on your street?",
        options: [
          "Daily",
          "Twice a week",
          "Once a week",
          "Rarely / Never"
        ]
      },
      {
        id: "q2",
        text: "Rate the cleanliness of your neighborhood overall:",
        options: [
          "Very clean",
          "Mostly clean",
          "Needs improvement",
          "Dirty / Unattended"
        ]
      }
    ]
  },
  {
    id: "survey_004",
    title: "Water Supply Reliability Poll",
    description: "We'd like to know how frequently you receive piped water at home.",
    responses: 776,
    daysLeft: 6,
    questions: [
      {
        id: "q1",
        text: "How regular is your water supply?",
        options: [
          "Daily supply",
          "Every 2–3 days",
          "Once a week",
          "Rarely available"
        ]
      },
      {
        id: "q2",
        text: "If you experience shortages, where do you get alternative water?",
        options: [
          "County water bowsers",
          "Private vendors",
          "Community boreholes",
          "Neighbours / shared supply"
        ]
      }
    ]
  },
  {
    id: "survey_005",
    title: "Flood Hotspot Mapping",
    description: "Help identify flood-prone areas before the next rainy season.",
    responses: 493,
    daysLeft: 10,
    questions: [
      {
        id: "q1",
        text: "Which areas in your ward flood most frequently?",
        options: [
          "Low-lying roads and junctions",
          "Market areas and bus stages",
          "Residential zones near rivers",
          "Public open spaces / parks"
        ]
      }
    ]
  },
  {
    id: "survey_006",
    title: "Market Facilities Upgrade Consultation",
    description: "We're planning upgrades to local markets — share your input.",
    responses: 382,
    daysLeft: 8,
    questions: [
      {
        id: "q1",
        text: "What facility should be prioritized for upgrade?",
        options: [
          "Toilets and sanitation blocks",
          "Roofing and drainage",
          "Waste bins and collection points",
          "Security and lighting"
        ]
      }
    ]
  }
];

// Session storage key for tracking completed surveys
const COMPLETED_SURVEYS_KEY = 'ncc_completed_surveys';

export function getCompletedSurveys(): string[] {
  try {
    const stored = sessionStorage.getItem(COMPLETED_SURVEYS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function markSurveyCompleted(surveyId: string): void {
  try {
    const completed = getCompletedSurveys();
    if (!completed.includes(surveyId)) {
      completed.push(surveyId);
      sessionStorage.setItem(COMPLETED_SURVEYS_KEY, JSON.stringify(completed));
    }
  } catch {
    // Silent fail for session storage issues
  }
}

export function isSurveyCompleted(surveyId: string): boolean {
  return getCompletedSurveys().includes(surveyId);
}
