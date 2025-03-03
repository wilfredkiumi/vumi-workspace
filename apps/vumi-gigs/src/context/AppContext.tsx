import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, AppAction, AppContext as IAppContext } from '../types';

const initialState: AppState = {
  isLoggedIn: false,
  userName: '',
  currentView: 'home',
  selectedCreatorId: null,
  selectedGigId: null,
  selectedStudioId: null
};

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
    default:
      return state;
  }
}

const AppContext = createContext<IAppContext | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}