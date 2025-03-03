export enum CreatorType {
  INDIVIDUAL = 'INDIVIDUAL',
  INFLUENCER = 'INFLUENCER'
}

export enum FreelanceStatus {
  AVAILABLE = 'AVAILABLE',
  BUSY = 'BUSY',
  NOT_AVAILABLE = 'NOT_AVAILABLE'
}

export enum ProfilePlan {
  BASIC = 'BASIC',
  PRO = 'PRO',
  PREMIUM = 'PREMIUM'
}

export interface WorkExperience {
  role: string;
  company: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string;
  location?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  projectUrl?: string;
  category: string;
  tags: string[];
  mediaType: 'image' | 'video' | 'audio' | '3d';
  featured: boolean;
  createdAt: string;
}

export interface SocialStats {
  youtube?: {
    subscribers: number;
    views: number;
  };
  instagram?: {
    followers: number;
    engagement: number;
  };
  tiktok?: {
    followers: number;
    likes: number;
    engagement: number;
  };
  twitch?: {
    followers: number;
    subscribers: number;
    averageViewers: number;
  };
}

export interface Creator {
  id: string;
  workspaceId: string;
  name: string;
  username: string;
  tagline: string;
  bio: string;
  profileImage: string;
  coverImage?: string;
  socialLinks: {
    website?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
    artstation?: string;
    behance?: string;
    github?: string;
  };
  creatorType: CreatorType;
  freelanceStatus: FreelanceStatus;
  location: {
    city: string;
    country: string;
    remote: boolean;
    timezone?: string;
  };
  categories: string[];
  primaryCategory: string;
  skills: string[];
  specializations: string[];
  rateRange: {
    min: number;
    max: number;
    currency: string;
    rateType: 'hourly' | 'daily' | 'project';
  };
  languages: Array<{
    language: string;
    proficiency: 'basic' | 'conversational' | 'fluent' | 'native';
  }>;
  experience: WorkExperience[];
  portfolio: PortfolioItem[];
  metrics: {
    rating: number;
    completedProjects: number;
    reviewCount: number;
    responseRate: number;
    responseTime: number; // in hours
    onTimeDelivery: number; // percentage
    totalEarnings?: number;
    memberSince: string;
    lastActive: string;
  };
  profilePlan: ProfilePlan;
  verified: boolean;
  featured: boolean;
  availability: {
    status: FreelanceStatus;
    nextAvailable?: string;
    workingHours?: string;
    timezone: string;
  };
  teamSize?: number;
  preferredProjectSize?: {
    min: number;
    max: number;
    currency: string;
  };
  awards?: Array<{
    title: string;
    issuer: string;
    date: string;
    description?: string;
    url?: string;
  }>;
  certifications?: Array<{
    name: string;
    issuer: string;
    date: string;
    expiryDate?: string;
    credentialUrl?: string;
  }>;
  socialStats?: SocialStats;
  contentTypes?: string[];
  audienceDemographics?: {
    ageRanges: string[];
    topCountries: string[];
    genderSplit?: {
      male: number;
      female: number;
      other: number;
    };
  };
  sponsorshipRates?: {
    instagram?: {
      post: number;
      story: number;
      reel: number;
    };
    youtube?: {
      dedicated: number;
      integrated: number;
      shorts: number;
    };
    tiktok?: {
      post: number;
      series: number;
    };
  };
  previousBrands?: Array<{
    name: string;
    campaignType: string;
    date: string;
    link?: string;
  }>;
  createdAt: string;
  updatedAt: string;
}
