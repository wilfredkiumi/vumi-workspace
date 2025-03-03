// This file contains the data models for your application

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

export interface Studio {
  id: string;
  name: string;
  description: string;
  logo?: string;
  coverImage?: string;
  location: {
    city: string;
    country: string;
  };
  industry: string[];
  services: string[];
  equipment?: string[];
  facilities?: string[];
  teamMembers: {
    id: string;
    name: string;
    role: string;
    profileImage?: string;
    bio?: string;
  }[];
  projects: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    category: string;
    completionDate?: string;
  }[];
  showcases?: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    date: string;
  }[];
  contacts: {
    email: string;
    phone?: string;
    website?: string;
    socialMedia?: {
      platform: string;
      url: string;
    }[];
  };
  metrics: {
    rating: number;
    completedProjects: number;
    reviews: number;
  };
  verified: boolean;
  featured: boolean;
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