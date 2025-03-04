// Load polyfills first
import './utils/polyfills';

// Auth
export { authService, configureAuth } from './services/authService';
export { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
export type { AuthState, AuthUser, AuthContextType } from './contexts/AuthContext.jsx';

// Meeting
export { MeetingProvider } from './contexts/MeetingContext.jsx';
export { VideoMeetingPage } from './components/VideoMeeting/VideoMeetingPage.jsx';
export type { Meeting } from './types/meeting';

// Auth Components
export { LoginForm } from './components/auth/LoginForm.jsx';
export type { LoginFormProps } from './components/auth/LoginForm.jsx';

// Icons
export { TikTokIcon } from './components/icons/TikTokIcon.jsx';

// Types
export * from './types/auth';
export * from './types/meeting';

// WorkspaceProfile exports
export { WorkspaceProfileProvider, useWorkspaceProfile } from './contexts/WorkspaceProfileContext.jsx';
export { profileService } from './services/profileService';
export type { UserProfile, CreatorProfile, BusinessProfile } from './services/profileService';
