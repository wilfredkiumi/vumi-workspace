import React, { useState } from 'react';
import { ThemeProvider, Header, Footer } from 'ui';
import { AppProvider, useApp } from './context/AppContext';
import { AuthProvider } from './contexts/AuthContext';
import { AuthModal } from './components/auth/AuthModal';
import { ProtectedRoute } from './components/ProtectedRoute';
import { routes } from './routes';

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

function App() {
  return (
    <ThemeProvider initialTheme="gigs">
      <AuthProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;