import { createContext, useContext, useState, type PropsWithChildren } from 'react';
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

export function MeetingProvider({ children }: PropsWithChildren) {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  const addMeeting = (meeting: Meeting) => {
    setMeetings(prev => [...prev, meeting]);
  };

  const removeMeeting = (meetingId: string) => {
    setMeetings(prev => prev.filter(m => m.id !== meetingId));
  };

  return (
    <div>
      {/* @ts-ignore */}
      <MeetingContext.Provider value={{ meetings, addMeeting, removeMeeting }}>
        {children}
      </MeetingContext.Provider>
    </div>
  );
}

export function useMeetingContext() {
  const context = useContext(MeetingContext);
  if (!context) {
    throw new Error('useMeetingContext must be used within a MeetingProvider');
  }
  return context;
}
