// @ts-nocheck
/// <reference types="vite/client" />
import { useState } from 'react';
import { ThemeProvider, Header, Footer, Button } from 'ui';
import { AppProvider, useApp } from './context/AppContext';
// Make sure we use the shared auth properly with all required imports
import { AuthProvider, configureAuth, MeetingProvider, VideoMeetingPage, WorkspaceProfileProvider } from '@vumi/shared';
import { AuthModal } from './components/auth/AuthModal';
import { ProtectedRoute } from './components/ProtectedRoute';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, useNavigate } from 'react-router-dom';
import CreatorListingPage from './CreatorListingPage';
import CreatorProfilePage from './CreatorProfilePage';
import Layout from './components/Layout';

import InboxPage from './pages/InboxPage';
import ProfilePage from './pages/ProfilePage';

// Import all actual pages (not placeholders)
import GigsListingPage from './GigsListingPage';
import GigDetailPage from './GigDetailPage';
import StudiosListingPage from './pages/StudiosListingPage';
import StudioProfilePage from './pages/StudioProfilePage';
import BusinessPlansPage from './pages/BusinessPlansPage';
import HowItWorksPage from './pages/HowItWorksPage';
import PostGigForm from './PostGigForm';
import LoginPage from './pages/LoginPage';
import { routes } from './routes';
import { logEnvVariables } from './utils/envDebug';
import NotFoundPage from './pages/NotFoundPage';
import { Layout as LayoutIcon } from 'lucide-react'; // Fixed: renamed to LayoutIcon


// Debug environment variables
if (import.meta.env.DEV) {
  logEnvVariables();
}

// Configure Auth with environment variables
configureAuth({
  region: import.meta.env.VITE_COGNITO_REGION,
  userPoolId: import.meta.env.VITE_USER_POOL_ID,
  userPoolWebClientId: import.meta.env.VITE_USER_POOL_WEB_CLIENT_ID,
  identityPoolId: import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID
});

// ...rest of the file stays the same
function AppContent() {
  const { state, dispatch } = useApp();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleLogin = () => {
    setShowAuthModal(true);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    dispatch({ type: 'LOGIN', payload: { userName: 'Jane Smith' } });
  };

  const handleColorModeChange = (mode: 'light' | 'dark') => {
    // Handle color mode change
    console.log('Color mode changed to:', mode);
  };

  const handleNavigation = (path: string) => {
    // Reset selections when navigating to main sections
    if (path === '/') {
      dispatch({ type: 'SELECT_CREATOR', payload: null });
      dispatch({ type: 'SELECT_GIG', payload: null });
      dispatch({ type: 'SELECT_STUDIO', payload: null });
    }

    // Extract the main path without params
    const mainPath = path.split('/')[1] || 'home';
    dispatch({ type: 'SET_VIEW', payload: mainPath });
  };

  // Find the current route based on the view
  const currentRoute = routes.find(route => {
    const routePath = route.path.split('/')[1] || 'home';
    return routePath === state.currentView;
  });

  // Get the component to render
  const CurrentComponent = currentRoute?.component || routes[0].component;

  // Prepare props based on the current view
  const getComponentProps = () => {
    switch (state.currentView) {
      case 'creators':
        return {
          onCreatorSelect: (id: string) => {
            dispatch({ type: 'SELECT_CREATOR', payload: id });
            dispatch({ type: 'SET_VIEW', payload: 'creator' });
          }
        };
      case 'creator':
        return {
          selectedCreatorId: state.selectedCreatorId,
          onBack: () => {
            dispatch({ type: 'SELECT_CREATOR', payload: null });
            dispatch({ type: 'SET_VIEW', payload: 'creators' });
          }
        };
      case 'gigs':
        return {
          onGigSelect: (id: string) => {
            dispatch({ type: 'SELECT_GIG', payload: id });
            dispatch({ type: 'SET_VIEW', payload: 'gig' });
          }
        };
      case 'gig':
        return {
          gigId: state.selectedGigId || '',
          onBack: () => {
            dispatch({ type: 'SELECT_GIG', payload: null });
            dispatch({ type: 'SET_VIEW', payload: 'gigs' });
          }
        };
      case 'studios':
        return {
          onStudioSelect: (id: string) => {
            dispatch({ type: 'SELECT_STUDIO', payload: id });
            dispatch({ type: 'SET_VIEW', payload: 'studio' });
          }
        };
      case 'studio':
        return {
          studioId: state.selectedStudioId || '',
          onBack: () => {
            dispatch({ type: 'SELECT_STUDIO', payload: null });
            dispatch({ type: 'SET_VIEW', payload: 'studios' });
          }
        };
      case 'post-gig':
        return {
          onCancel: () => dispatch({ type: 'SET_VIEW', payload: 'home' })
        };
      default:
        return currentRoute?.props || {};
    }
  };

  const renderComponent = () => {
    if (currentRoute?.protected) {
      return (
        <ProtectedRoute>
          <CurrentComponent {...getComponentProps()} />
        </ProtectedRoute>
      );
    }
    return <CurrentComponent {...getComponentProps()} />;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        onColorModeChange={handleColorModeChange}
        onLogin={handleLogin}
        isLoggedIn={state.isLoggedIn}
        userName={state.userName}
        currentApp="gigs"
        onNavigation={handleNavigation}
      />
      
      <main className="flex-1">
        {renderComponent()}
      </main>
      
      <Footer />

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
}

// Create a wrapper component for StudioProfilePage to properly use the navigate hook
function StudioProfileWrapper() {
  const navigate = useNavigate();
  
  return (
    <StudioProfilePage 
      studioId="" 
      onBack={() => navigate("/studios")}
    />
  );
}

// Create router with future flags and catch-all route
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<LayoutIcon />}>
      <Route path="/" element={<CreatorListingPage />} />
      <Route path="/creators" element={<CreatorListingPage />} />
      <Route path="/creators/:creatorId" element={<CreatorProfilePage />} />
      <Route path="/gigs" element={<GigsListingPage />} />
      <Route path="/gigs/:gigId" element={<GigDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/post-gig" element={<ProtectedRoute><PostGigForm /></ProtectedRoute>} />
      <Route path="/studios" element={<StudiosListingPage />} />
      <Route path="/studios/:studioId" element={<StudioProfileWrapper />} />
      <Route path="/plans" element={<BusinessPlansPage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/meeting/:meetingId" element={<ProtectedRoute><VideoMeetingPage /></ProtectedRoute>} />
      <Route path="/inbox" element={<ProtectedRoute><InboxPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      
      {/* Add catch-all route to handle 404s */}
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  ),
  {
    future: {
      v7_startTransition: true
    }
  }
);

function App() {
  return (
    <ThemeProvider defaultTheme="gigs" defaultColorMode="light">
      <AuthProvider>
        <WorkspaceProfileProvider appId="gigs">
          <AppProvider>
            <MeetingProvider>
              <RouterProvider router={router} />
            </MeetingProvider>
          </AppProvider>
        </WorkspaceProfileProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;