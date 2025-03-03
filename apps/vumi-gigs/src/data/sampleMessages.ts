import { Message, MessageType } from '../models/Message';

export const sampleMessages: Message[] = [
  {
    id: 'msg1',
    from: {
      id: 'client1',
      name: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
    },
    to: {
      id: 'creator1',
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
    },
    subject: 'Meeting Request: Discuss Game Asset Project',
    content: "I'd like to discuss your proposal for the game asset project. Are you available for a video meeting?",
    type: MessageType.MEETING_REQUEST,
    metadata: {
      gigId: 'g1',
      meetingId: 'm1'
    },
    read: false,
    createdAt: '2024-01-30T10:00:00Z',
    updatedAt: '2024-01-30T10:00:00Z'
  },
  {
    id: 'msg2',
    from: {
      id: 'creator1',
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
    },
    to: {
      id: 'client2',
      name: 'Alice Johnson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
    },
    subject: 'Proposal: Character Design Project',
    content: "I'm interested in working on your character design project. Here's my proposal including timeline and rate.",
    type: MessageType.PROPOSAL,
    metadata: {
      gigId: 'g2',
      proposalId: 'p1',
      rate: 2000,
      status: 'pending'
    },
    read: true,
    createdAt: '2024-01-29T15:30:00Z',
    updatedAt: '2024-01-29T15:30:00Z'
  }
];
