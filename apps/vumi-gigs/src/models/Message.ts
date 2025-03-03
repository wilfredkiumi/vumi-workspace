export enum MessageType {
  PROPOSAL = 'PROPOSAL',
  MEETING_REQUEST = 'MEETING_REQUEST',
  MESSAGE = 'MESSAGE'
}

export interface Message {
  id: string;
  from: {
    id: string;
    name: string;
    avatar: string;
  };
  to: {
    id: string;
    name: string;
    avatar: string;
  };
  subject: string;
  content: string;
  type: MessageType;
  metadata?: {
    gigId?: string;
    meetingId?: string;
    proposalId?: string;
    rate?: number;
    status?: 'pending' | 'accepted' | 'rejected';
  };
  read: boolean;
  createdAt: string;
  updatedAt: string;
}
