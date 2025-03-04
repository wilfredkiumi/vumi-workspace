import { AuthUser } from '../contexts/AuthContext';

export interface Meeting {
  id: string;
  title: string;
  startTime: Date;
  endTime?: Date;
  participants: string[];
  hostId: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  meetingType: 'interview' | 'project-discussion' | 'review';
  description?: string;
  recording?: boolean;
  settings: {
    allowChat: boolean;
    allowScreenShare: boolean;
    muteOnEntry: boolean;
    requireApproval: boolean;
  };
}

export interface MeetingParticipant {
  id: string;
  user: AuthUser;
  role: 'host' | 'participant';
  joinedAt?: string;
  leftAt?: string;
  devices: {
    audio: boolean;
    video: boolean;
    screen: boolean;
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
