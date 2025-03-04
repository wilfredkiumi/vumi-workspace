// @ts-nocheck
// ... existing imports ...
import { v4 as uuidv4 } from 'uuid';

// ... existing creator and gig interfaces ...

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
  duration: number;
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

export const sampleMeetings: Meeting[] = [
  // ... move the existing sample meetings data here ...
];

export const createMeeting = (data: Partial<Meeting>): Meeting => {
  return {
    id: uuidv4(),
    gigId: "",
    title: "New Meeting",
    // ... rest of createMeeting implementation ...
  };
};

// ... existing export of other sample data ...
