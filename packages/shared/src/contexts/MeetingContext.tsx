import React, { createContext, useContext, useState } from 'react';
import type { Meeting } from '../types/meeting';

interface MeetingContextType {
  meetings: Meeting[];
  addMeeting: (meeting: Meeting) => void;
  removeMeeting: (meetingId: string) => void;
}

const MeetingContext = createContext<MeetingContextType>({
  meetings: [],
  addMeeting: () => {},
  removeMeeting: () => {}
});

export function MeetingProvider({ children }: { children: React.ReactNode }) {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  const addMeeting = (meeting: Meeting) => {
    setMeetings(prev => [...prev, meeting]);
  };

  const removeMeeting = (meetingId: string) => {
    setMeetings(prev => prev.filter(m => m.id !== meetingId));
  };

  return (
    <MeetingContext.Provider value={{ meetings, addMeeting, removeMeeting }}>
      {children}
    </MeetingContext.Provider>
  );
}

export function useMeetingContext() {
  const context = useContext(MeetingContext);
  if (!context) {
    throw new Error('useMeetingContext must be used within a MeetingProvider');
  }
  return context;
}
