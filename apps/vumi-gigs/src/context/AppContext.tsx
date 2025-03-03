import { createContext, useContext, useReducer, ReactNode } from 'react';
import { useAuth } from '@vumi/shared';

// Define the state type
interface AppState {
  isLoggedIn: boolean;
  userName: string | null;
  currentView: string;
  selectedCreatorId: string | null;
  selectedGigId: string | null;
  selectedStudioId: string | null;
  unreadMessages: number;
}

// Define action types
type AppAction =
  | { type: 'LOGIN'; payload: { userName: string } }
  | { type: 'LOGOUT' }
  | { type: 'SET_VIEW'; payload: string }
  | { type: 'SELECT_CREATOR'; payload: string | null }
  | { type: 'SELECT_GIG'; payload: string | null }
  | { type: 'SELECT_STUDIO'; payload: string | null }
  | { type: 'SET_UNREAD_MESSAGES'; payload: number };

// Initial state
const initialState: AppState = {
  isLoggedIn: false,
  userName: null,
  currentView: 'home',
  selectedCreatorId: null,
  selectedGigId: null,
  selectedStudioId: null,
  unreadMessages: 0
};

// Create context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

// Reducer function
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        userName: action.payload.userName
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        userName: null
      };
    case 'SET_VIEW':
      return {
        ...state,
        currentView: action.payload
      };
    case 'SELECT_CREATOR':
      return {
        ...state,
        selectedCreatorId: action.payload
      };
    case 'SELECT_GIG':
      return {
        ...state,
        selectedGigId: action.payload
      };
    case 'SELECT_STUDIO':
      return {
        ...state,
        selectedStudioId: action.payload
      };
    case 'SET_UNREAD_MESSAGES':
      return {
        ...state,
        unreadMessages: action.payload
      };
    default:
      return state;
  }
}

// Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook for using the app context
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}