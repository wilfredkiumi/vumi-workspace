import { ComponentType } from 'react';

export interface Route {
  path: string;
  component: ComponentType<any>;
  props?: Record<string, any>;
}

export interface AppState {
  isLoggedIn: boolean;
  userName: string;
  currentView: string;
  selectedCreatorId: string | null;
  selectedGigId: string | null;
  selectedStudioId: string | null;
}

export interface AppContext {
  state: AppState;
  dispatch: (action: AppAction) => void;
}

export type AppAction = 
  | { type: 'LOGIN'; payload: { userName: string } }
  | { type: 'LOGOUT' }
  | { type: 'SET_VIEW'; payload: string }
  | { type: 'SELECT_CREATOR'; payload: string | null }
  | { type: 'SELECT_GIG'; payload: string | null }
  | { type: 'SELECT_STUDIO'; payload: string | null };