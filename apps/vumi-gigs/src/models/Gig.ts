export interface User {
  id: string;
  name: string;
  avatar?: string;
  rating?: number;
  verified?: boolean;
}

export interface Location {
  type: 'remote' | 'onsite' | 'hybrid';
  city?: string;
  country?: string;
}

export interface Budget {
  min: number;
  max: number;
  type: 'fixed' | 'hourly';
}

export interface Gig {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  budget: Budget;
  duration: string;
  deadline?: string;
  skills: string[];
  location: Location;
  postedBy: User;
  postedDate: string;
  applicants: number;
  status: 'open' | 'in-progress' | 'completed';
  featured?: boolean;
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
}
