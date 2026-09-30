export interface ItineraryDay {
  day: number;
  title: string;
  accommodation: string;
  activities: string[];
  dining: string[];
  estimatedCost: string;
}

export interface ItineraryPlan {
  id: string;
  destination: string;
  startDate: string;
  endDate?: string;
  duration: number;
  budget: number;
  travelersCount: number;
  travelStyle: string;
  dayByDay: ItineraryDay[];
  hotels: string[];
  totalEstimatedCost: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  destination: string;
  dates: string;
  travelers: number;
  amount: string;
  status: 'Confirmed' | 'Pending';
  image: string;
  tourName: string;
}

export interface TravelDocument {
  id: string;
  name: string;
  completed: boolean;
}
