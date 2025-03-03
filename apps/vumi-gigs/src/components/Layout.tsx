import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Header, Footer, useTheme } from 'ui';
import { useAuth } from '@vumi/shared';
import { sampleMessages } from '../data/sampleMessages';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, colorMode, setColorMode } = useTheme();
  
  // Use auth context instead of local state
  const { isAuthenticated, user, logout } = useAuth();
  
  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleColorModeChange = (mode: 'light' | 'dark') => {
    setColorMode(mode);
  };

  // Handle navigation from header links
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const unreadMessages = sampleMessages.filter(msg => !msg.read).length;

  const handleInboxClick = () => {
    navigate('/inbox');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  // Navigation items for the header - using all actual pages
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Creators', path: '/creators' },
    { label: 'Gigs', path: '/gigs' },
    { label: 'Studios', path: '/studios' },
    { label: 'Post a Gig', path: '/post-gig' },
    { label: 'Plans', path: '/plans' },
    { label: 'How It Works', path: '/how-it-works' }
  ];

  // Determine current active section based on path
  const getCurrentSection = () => {
    const path = location.pathname;
    
    if (path === '/' || path.startsWith('/creators')) {
      return '/creators';
    } else if (path.startsWith('/gigs') || path === '/post-gig') {
      return '/gigs';
    } else if (path.startsWith('/studios')) {
      return '/studios';
    } else if (path.startsWith('/plans')) {
      return '/plans';
    } else if (path.startsWith('/how-it-works')) {
      return '/how-it-works';
    }
    
    return '/';
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header
        onColorModeChange={handleColorModeChange}
        onLogin={handleLogin}
        onLogout={handleLogout}
        isLoggedIn={isAuthenticated}
        userName={user?.name || ''}
        currentApp="gigs"
        theme={theme}
        colorMode={colorMode}
        onNavigation={handleNavigation}
        navigationItems={navItems}
        currentPath={getCurrentSection()}
        unreadMessages={unreadMessages}
        onInboxClick={handleInboxClick}
        onProfileClick={handleProfileClick}
      />
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer
        theme={theme}
        colorMode={colorMode}
      />
    </div>
  );
};

export default Layout;
