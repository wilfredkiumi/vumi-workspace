import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface MeetingState {
  activeMeetingId: string | null;
  isInMeeting: boolean;
  participants: string[];
}

type MeetingAction =
  | { type: 'JOIN_MEETING'; payload: string }
  | { type: 'LEAVE_MEETING' }
  | { type: 'UPDATE_PARTICIPANTS'; payload: string[] };

const initialState: MeetingState = {
  activeMeetingId: null,
  isInMeeting: false,
  participants: []
};

const MeetingContext = createContext<{
  state: MeetingState;
  dispatch: React.Dispatch<MeetingAction>;
} | undefined>(undefined);

function meetingReducer(state: MeetingState, action: MeetingAction): MeetingState {
  switch (action.type) {
    case 'JOIN_MEETING':
      return {
        ...state,
        activeMeetingId: action.payload,
        isInMeeting: true
      };
    case 'LEAVE_MEETING':
      return {
        ...state,
        activeMeetingId: null,
        isInMeeting: false,
        participants: []
      };
    case 'UPDATE_PARTICIPANTS':
      return {
        ...state,
        participants: action.payload
      };
    default:
      return state;
  }
}

export function MeetingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(meetingReducer, initialState);
  return (
    <MeetingContext.Provider value={{ state, dispatch }}>
      {children}
    </MeetingContext.Provider>
  );
}

export function useMeeting() {
  const context = useContext(MeetingContext);
  if (context === undefined) {
    throw new Error('useMeeting must be used within a MeetingProvider');
  }
  return context;
}
