import { v4 as uuidv4 } from 'uuid';

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

export const sampleMeetings: Meeting[] = [
  {
    id: "m1",
    gigId: "g1",
    title: "Initial Project Discussion - Game Asset Creation",
    createdBy: {
      id: "u1",
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
    },
    participants: [
      {
        id: "u1",
        name: "Alex Johnson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
        role: "host"
      },
      {
        id: "u2",
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        role: "participant"
      }
    ],
    scheduledFor: "2024-02-01T15:00:00Z",
    duration: 60,
    status: "scheduled",
    meetingType: "project-discussion",
    description: "Initial discussion about game asset requirements and project timeline.",
    recording: true,
    settings: {
      allowChat: true,
      allowScreenSharing: true,
      muteOnEntry: true,
      waitingRoom: true,
      maxParticipants: 4
    },
    createdAt: "2024-01-30T10:00:00Z",
    updatedAt: "2024-01-30T10:00:00Z"
  },
  {
    id: "m2",
    gigId: "g2",
    title: "Content Creator Interview - Gaming Channel",
    createdBy: {
      id: "u3",
      name: "Maya Gaming",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e"
    },
    participants: [
      {
        id: "u3",
        name: "Maya Gaming",
        avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
        role: "host"
      },
      {
        id: "u4",
        name: "John Smith",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
        role: "participant"
      }
    ],
    scheduledFor: "2024-02-02T18:00:00Z",
    duration: 45,
    status: "scheduled",
    meetingType: "interview",
    description: "Interview discussion for potential gaming channel collaboration.",
    recording: false,
    settings: {
      allowChat: true,
      allowScreenSharing: false,
      muteOnEntry: true,
      waitingRoom: true,
      maxParticipants: 2
    },
    createdAt: "2024-01-31T09:00:00Z",
    updatedAt: "2024-01-31T09:00:00Z"
  }
];

export const createMeeting = (data: Partial<Meeting>): Meeting => {
  return {
    id: uuidv4(),
    gigId: "",
    title: "New Meeting",
    createdBy: {
      id: "",
      name: "",
      avatar: ""
    },
    participants: [],
    scheduledFor: new Date().toISOString(),
    duration: 60,
    status: "scheduled",
    meetingType: "project-discussion",
    recording: false,
    settings: {
      allowChat: true,
      allowScreenSharing: true,
      muteOnEntry: true,
      waitingRoom: true,
      maxParticipants: 10
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...data
  };
};
