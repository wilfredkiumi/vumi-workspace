import { ReactNode } from 'react';

export enum ProfileMode {
  BASIC = "basic",
  BASIC_WITH_ADS = "basic_with_ads",
  PRO = "pro",
  PREMIUM = "premium",
}

export interface SocialLink {
  platform: string;
  url: string;
  followers?: number;
}

export interface Location {
  city: string;
  country: string;
}

export interface Metrics {
  rating: number;
  responseRate: number;
  completedProjects: number;
  reviewCount?: number;
}

export interface Experience {
  role: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface Portfolio {
  title: string;
  description: string;
  thumbnailUrl: string;
  projectUrl: string;
}

export interface Creator {
  id: string;
  workspaceId?: string;
  name: string;
  username: string;
  bio: string;
  profileImage?: string;
  coverImage?: string;
  avatar?: string;
  location: Location;
  categories: string[];
  skills: string[];
  experience: Experience[];
  portfolio: Portfolio[];
  socialLinks: SocialLink[];
  metrics: Metrics;
  verified: boolean;
  featured: boolean;
  creatorType: 'influencer' | 'crew';
  mode: ProfileMode;
  followers?: number;
  following?: number;
  isAvailableForHire?: boolean;
  freelanceStatus?: boolean;
  fulltimeStatus?: boolean;
  socialMediaLinks?: {
    youtube?: string;
    linkedin?: string;
    facebook?: string;
    twitter?: string;
  };
  // Influencer specific fields
  audienceSize?: number;
  platforms?: string[];
  contentTypes?: string[];
  // Crew specific fields
  teamSize?: number;
  equipmentOwned?: string[];
  specializations?: string[];
  availability?: string;
  // Projects related fields
  projects?: Project[];
  showcases?: Showcase[];
}

export interface NavigationItem {
  label: string;
  count?: number;
  locked?: boolean;
}

export interface ProjectContributor {
  id: string;
  name: string;
  role: string;
  profileImage?: string;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  category: string;
  thumbnail: string;
  producer: string;
  producerId: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  releaseDate?: string;
  duration?: string;
  contributors?: ProjectContributor[];
  awards?: string[];
  showcaseIds?: string[];
  mediaUrls?: string[];
  views?: number;
  likes?: number;
}

export interface Showcase {
  id: string;
  title: string;
  description?: string;
  thumbnail: string;
  coverImage?: string;
  startDate: string;
  endDate?: string;
  location: string;
  organizer?: string;
  organizerId?: string;
  categories?: string[];
  featured?: boolean;
  projectIds?: string[];
  attendees?: number;
  price?: number;
  virtual?: boolean;
  website?: string;
  status?: 'in-development' | 'upcoming' | 'in-progress' | 'in-post' | 'ready' | 'released' | 'completed';
  attendanceType?: 'physical' | 'virtual' | 'hybrid';
}

export interface PlanFeature {
  name: string;
  included: boolean;
  limit?: number | string;
}

export interface CreatorPlan {
  id: string;
  name: string;
  mode: ProfileMode;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  description: string;
  features: PlanFeature[];
  popular?: boolean;
  recommended?: boolean;
}

export interface TabProps {
  label: string;
  icon?: ReactNode;
  content: ReactNode;
}

export interface CreatorFilter {
  skills: string[];
  countries: string[];
  cities: string[];
  creatorType: 'all' | 'influencer' | 'crew';
  profileMode?: ProfileMode;
}