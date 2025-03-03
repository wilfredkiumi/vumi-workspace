import React, { useState } from 'react';
import { Menu, X, Moon, Sun, ChevronDown, User, Bell, MessageSquare } from 'lucide-react';
import { THEMES } from '../constants';
import Logo from './Logo';
import Button from './Button';

interface UserMenuItem {
  label: string;
  action: () => void;
}

interface HeaderProps {
  theme?: keyof typeof THEMES;
  colorMode?: 'light' | 'dark';
  onColorModeChange?: (mode: 'light' | 'dark') => void;
  onLogin?: () => void;
  onLogout?: () => void;
  isLoggedIn?: boolean;
  userName?: string;
  userAvatar?: string;
  currentApp?: string;
  onNavigation?: (path: string) => void;
  onProfileClick?: () => void;
  isLoading?: boolean;
  userMenuItems?: UserMenuItem[];
  unreadMessages?: number;
  onInboxClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  theme = 'gigs',
  colorMode = 'light',
  onColorModeChange,
  onLogin,
  onLogout,
  isLoggedIn = false,
  userName = '',
  userAvatar,
  currentApp,
  onNavigation,
  onProfileClick,
  isLoading = false,
  userMenuItems = [],
  unreadMessages = 0,
  onInboxClick,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  
  const handleNavigate = (path: string) => {
    if (onNavigation) {
      onNavigation(path);
    }
    setIsMobileMenuOpen(false);
  };
  
  // Navigation items - can be adjusted based on app
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/events', label: 'Events' },
    { path: '/creators', label: 'Creators' }
  ];
  
  // Header background color based on theme
  const headerBgClass = colorMode === 'light' ? 'bg-white' : 'bg-gray-900';
  
  return (
    <header className={`${headerBgClass} shadow-sm`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Logo theme={theme} />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className={`text-sm font-medium ${
                  colorMode === 'light' ? 'text-gray-700 hover:text-gray-900' : 'text-gray-300 hover:text-white'
                } transition-colors`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          
          {/* Right side: Theme toggle + Auth */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            {onColorModeChange && (
              <button
                onClick={() => onColorModeChange(colorMode === 'light' ? 'dark' : 'light')}
                className={`p-2 rounded-full ${
                  colorMode === 'light'
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
                aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
              >
                {colorMode === 'light' ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </button>
            )}
            
            {/* Auth */}
            {isLoading ? (
              // Show loading spinner if auth is loading
              <div className="w-8 h-8 rounded-full animate-pulse bg-gray-200 dark:bg-gray-700"></div>
            ) : isLoggedIn ? (
              // User menu when logged in
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    {userAvatar ? (
                      <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                        {userName.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {userName.split(' ')[0]}
                  </span>
                  <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* User dropdown menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 py-1">
                    {userMenuItems.length > 0 ? (
                      // Use provided menu items if available
                      userMenuItems.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            item.action();
                            setIsUserMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          {item.label}
                        </button>
                      ))
                    ) : (
                      // Default items if none provided
                      <>
                        <button
                          onClick={() => {
                            if (onProfileClick) onProfileClick();
                            setIsUserMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          My Profile
                        </button>
                        <button
                          onClick={() => {
                            if (onLogout) onLogout();
                            setIsUserMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Sign out
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ) : (
              // Login button when not logged in
              <Button
                theme={theme}
                variant="primary"
                size="sm"
                colorMode={colorMode}
                onClick={onLogin}
                disabled={isLoading}
              >
                <User className="h-4 w-4 mr-1" />
                Sign in
              </Button>
            )}
            
            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden py-4 px-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className={`text-sm font-medium text-left py-2 ${
                  colorMode === 'light' ? 'text-gray-700 hover:text-gray-900' : 'text-gray-300 hover:text-white'
                } transition-colors`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
