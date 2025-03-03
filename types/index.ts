import { ReactNode } from 'react';

export interface Creator {
  id: string;
  createdAt: string;
  creatorType: 'influencer' | 'crew';
  platforms?: string[];
  contentTypes?: string[];
  audienceSize?: number;
  teamSize?: number;
  equipmentOwned?: string[];
  specializations?: string[];
  availability?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Showcase {
  id: string;
  title: string;
}

export interface EventTicket {
  id: string;
  eventId: string;
}

export interface ButtonProps {
  icon?: ReactNode;
  content: ReactNode;
}

// Add other missing interfaces
export interface Application {
  id: string;
}

export interface Gig {
  id: string;
}