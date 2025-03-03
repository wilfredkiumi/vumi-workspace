import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header, Footer, useTheme } from 'ui';
import { useAuth } from '@vumi/shared';
import { AuthModal } from './auth/AuthModal';
import { useApp } from '../context/AppContext';

export default function Layout() {
  const navigate = useNavigate();
  const { theme, colorMode, setColorMode } = useTheme();
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const { state, dispatch } = useApp();
  
  // State for auth modal
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // Update app state when auth state changes
  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch({ 
        type: 'LOGIN', 
        payload: { userName: user.name || user.attributes?.name || user.email || 'User' } 
      });
    } else if (!authLoading) {
      dispatch({ type: 'LOGOUT' });
    }
  }, [isAuthenticated, user, authLoading, dispatch]);
  
  // Handle color mode change
  const handleColorModeChange = (mode: 'light' | 'dark') => {
    setColorMode(mode);
  };
  
  // Handle login click - show auth modal
  const handleLoginClick = () => {
    setShowAuthModal(true);
  };
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      dispatch({ type: 'LOGOUT' });
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  // Handle auth success - hide auth modal
  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };
  
  // Handle navigation between main sections
  const handleNavigation = (path: string) => {
    // Navigate to the path
    navigate(path);
    
    // Extract the main section from the path
    const section = path === '/' ? 'home' : path.split('/')[1];
    dispatch({ type: 'SET_VIEW', payload: section });
    
    // Reset selections when navigating to main sections
    dispatch({ type: 'SELECT_CREATOR', payload: null });
    dispatch({ type: 'SELECT_SHOWCASE', payload: null });
    dispatch({ type: 'SELECT_PROJECT', payload: null });
  };
  
  // Handle profile navigation
  const handleProfileClick = () => {
    navigate('/profile');
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        theme={theme}
        colorMode={colorMode}
        onColorModeChange={handleColorModeChange}
        onLogin={handleLoginClick}
        onLogout={handleLogout}
        isLoggedIn={isAuthenticated}
        userName={user?.name || user?.attributes?.name || user?.email || ''}
        userAvatar={user?.avatar || user?.attributes?.picture}
        currentApp="showcase"
        onNavigation={handleNavigation}
        onProfileClick={handleProfileClick}
        isLoading={authLoading}
        userMenuItems={[
          { label: 'My Profile', action: handleProfileClick },
          { label: 'Sign Out', action: handleLogout }
        ]}
      />
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer theme={theme} colorMode={colorMode} />
      
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
}
