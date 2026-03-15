// TypeScript interface defining the shape of an event data object
export interface EventData {
  title: string;
  date: string;
  day: string;
  time: string;
  duration: string;
  location: string;
  locationType: string;
  registered: number;
  capacity: number;
}

// Known events with full details
// Key is the URL slug used in /register/[eventId]
export const eventsData: Record<string, EventData> = {
  "ai-workshop-2026": {
    title: "AI Workshop",
    date: "March 20, 2026",
    day: "Friday",
    time: "2:00 PM - 5:00 PM",
    duration: "3 hours",
    location: "Google Meet",
    locationType: "Online Event",
    registered: 55,
    capacity: 100,
  },
  "hackathon-2026": {
    title: "Hackathon 2026",
    date: "March 25, 2026",
    day: "Wednesday",
    time: "9:00 AM - 6:00 PM",
    duration: "9 hours",
    location: "Campus Hall",
    locationType: "In-person Event",
    registered: 72,
    capacity: 100,
  },
  "flutter-bootcamp-2026": {
    title: "Flutter Bootcamp",
    date: "April 5, 2026",
    day: "Sunday",
    time: "10:00 AM - 4:00 PM",
    duration: "6 hours",
    location: "Lab 201",
    locationType: "In-person Event",
    registered: 33,
    capacity: 100,
  },
  "cloud-study-jam": {
    title: "Cloud Study Jam",
    date: "March 15, 2026",
    day: "Friday",
    time: "2:00 PM - 5:00 PM",
    duration: "3 hours",
    location: "Google Meet",
    locationType: "Online Event",
    registered: 73,
    capacity: 100,
  },
};

// Converts a URL slug into a readable title
// e.g. "my-new-event-2027" → "My New Event 2027"
export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Returns full event data for known events
// For unknown slugs, auto-generates a title from the slug with TBD details
// This allows any new event to work without updating this file
export function getEventData(eventId: string): EventData {
  if (eventsData[eventId]) {
    return eventsData[eventId];
  }
  return {
    title: slugToTitle(eventId),
    date: "TBD",
    day: "",
    time: "TBD",
    duration: "",
    location: "TBD",
    locationType: "",
    registered: 0,
    capacity: 100,
  };
}