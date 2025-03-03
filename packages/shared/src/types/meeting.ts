import { AuthUser } from '../contexts/AuthContext';

export interface Meeting {
  id: string;
  gigId: string;
  title: string;
  createdBy: {
    id: string;
    name: string;
    avatar: string;
  };
  participants: {
    id: string;
    name: string;
    avatar: string;
    role: 'host' | 'participant';
  }[];
  scheduledFor: string;
  duration: number; // in minutes
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  meetingType: 'interview' | 'project-discussion' | 'review';
  description?: string;
  recording?: boolean;
  settings: {
    allowChat: boolean;
    allowScreenSharing: boolean;
    muteOnEntry: boolean;
    waitingRoom: boolean;
    maxParticipants: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface MeetingParticipant {
  id: string;
  user: AuthUser;
  role: 'host' | 'participant';
  joinedAt?: string;
  leftAt?: string;
  devices?: {
    audio?: boolean;
    video?: boolean;
    screen?: boolean;
  };
}

export interface MeetingMessage {
  id: string;
  meetingId: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  isSystemMessage?: boolean;
}
