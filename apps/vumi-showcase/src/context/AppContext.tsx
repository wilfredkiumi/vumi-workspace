import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define the state type
interface AppState {
  isLoggedIn: boolean;
  userName: string;
  currentView: string;
  selectedCreatorId: string | null;
  selectedShowcaseId: string | null;
  selectedProjectId: string | null;
  searchQuery: string;
  currentCategoryFilter: string;
}

// Define actions
type AppAction =
  | { type: 'LOGIN', payload: { userName: string } }
  | { type: 'LOGOUT' }
  | { type: 'SET_VIEW', payload: string }
  | { type: 'SELECT_CREATOR', payload: string | null }
  | { type: 'SELECT_SHOWCASE', payload: string | null }
  | { type: 'SELECT_PROJECT', payload: string | null }
  | { type: 'SET_SEARCH_QUERY', payload: string }
  | { type: 'SET_CATEGORY_FILTER', payload: string };

// Initial state
const initialState: AppState = {
  isLoggedIn: false,
  userName: '',
  currentView: 'home',
  selectedCreatorId: null,
  selectedShowcaseId: null,
  selectedProjectId: null,
  searchQuery: '',
  currentCategoryFilter: 'all'
};

// Create context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => null
});

// Create reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
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
        userName: ''
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
    case 'SELECT_SHOWCASE':
      return {
        ...state,
        selectedShowcaseId: action.payload
      };
    case 'SELECT_PROJECT':
      return {
        ...state,
        selectedProjectId: action.payload
      };
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload
      };
    case 'SET_CATEGORY_FILTER':
      return {
        ...state,
        currentCategoryFilter: action.payload
      };
    default:
      return state;
  }
};

// Create provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the app context
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
