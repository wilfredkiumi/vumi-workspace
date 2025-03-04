// @ts-nocheck
import { ProfileMode } from 'ui';

export interface Studio {
  id: string;
  workspaceId: string;
  name: string;
  username: string;
  bio: string;
  profileImage: string;
  coverImage: string;
  location: {
    city: string;
    country: string;
    remote: boolean;
    timezone?: string;
  };
  categories: string[];
  skills: string[];
  experience?: {
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
    category?: string;
    tags: string[];
    id: string;
    mediaType: 'image' | 'video';
    featured: boolean;
    createdAt: string;
  }[];
  metrics: {
    rating: number;
    responseRate: number;
    completedProjects: number;
    reviewCount: number;
    responseTime: number;
    onTimeDelivery: number;
    memberSince: string;
    lastActive: string;
  };
  verified: boolean;
  featured: boolean;
  mode?: ProfileMode;
  isAvailableForHire: boolean;
  teamSize: number;
}

// Move VFX Masters Studio and Sound Wave Studios here
export const sampleStudios: Studio[] = [
  {
    id: "s1",
    workspaceId: "ws-125",
    name: "VFX Masters Studio",
    // ... rest of VFX Masters Studio data ...
  },
  {
    id: "s2",
    workspaceId: "ws-126",
    name: "Sound Wave Studios",
    // ... rest of Sound Wave Studios data ...
  }
];
