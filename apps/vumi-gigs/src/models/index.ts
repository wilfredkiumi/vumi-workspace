// This file will contain the data models for your application
// These models will be used to interact with the backend services

export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  profileImage?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Gig {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  budget: {
    min: number;
    max: number;
    type: 'fixed' | 'hourly';
  };
  duration?: string;
  skills: string[];
  location: {
    type: 'remote' | 'onsite' | 'hybrid';
    city?: string;
    country?: string;
  };
  postedBy: {
    id: string;
    name: string;
    avatar?: string;
    rating?: number;
    verified?: boolean;
  };
  postedDate: string;
  deadline?: string;
  applicants?: number;
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
  featured?: boolean;
}

export interface Application {
  id: string;
  gigId: string;
  userId: string;
  coverLetter: string;
  rate: number;
  attachments?: string[];
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface Creator {
  id: string;
  userId: string;
  name: string;
  username: string;
  bio: string;
  profileImage?: string;
  coverImage?: string;
  location: {
    city: string;
    country: string;
  };
  categories: string[];
  skills: string[];
  experience: {
    role: string;
    company: string;
    startDate: string;
    endDate?: string;
    description: string;
  }[];
  portfolio: {
    title: string;
    description: string;
    thumbnailUrl: string;
    projectUrl: string;
  }[];
  socialLinks: {
    platform: string;
    url: string;
    followers?: number;
  }[];
  metrics: {
    rating: number;
    responseRate: number;
    completedProjects: number;
    reviewCount?: number;
  };
  verified: boolean;
  featured: boolean;
  creatorType: 'influencer' | 'crew';
  isAvailableForHire: boolean;
  freelanceStatus: boolean;
  fulltimeStatus?: boolean;
}