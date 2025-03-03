import React, { useState, useEffect, createContext, useContext } from 'react';

// Import and re-export the theme constants and types
import { THEMES } from './theme';
import { CHART_COLORS } from './theme';
export { THEMES, CHART_COLORS } from './theme';
export { CreatorCard } from './CreatorCard';
export { CreatorProfile } from './CreatorProfile';
export { CreatorPlans } from './CreatorPlans';
export { ProjectCard } from './ProjectCard';
export { ShowcaseCard } from './ShowcaseCard';
export { StudioCard } from './StudioCard';
export { StudioProfilePage } from './StudioProfilePage';
export { StudiosListingPage } from './StudiosListingPage';
export * from './types';

// Define ThemeType here to ensure it's available
export type ThemeType = 'gigs' | 'showcase';
export type ColorMode = 'light' | 'dark';

// Theme context
interface ThemeContextType {
  theme: ThemeType;
  colorMode: ColorMode;
  setTheme: (theme: ThemeType) => void;
  setColorMode: (mode: ColorMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'gigs',
  colorMode: 'light',
  setTheme: () => {},
  setColorMode: () => {},
});

export interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: ThemeType;
  initialColorMode?: ColorMode;
}

export function ThemeProvider({
  children,
  initialTheme = 'gigs',
  initialColorMode = 'light',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeType>(initialTheme);
  const [colorMode, setColorMode] = useState<ColorMode>(initialColorMode);
  
  // Apply color mode to document
  useEffect(() => {
    if (colorMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [colorMode]);
  
  return (
    <ThemeContext.Provider value={{ theme, colorMode, setTheme, setColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  theme?: ThemeType;
  colorMode?: ColorMode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export function Button({ 
  children, 
  className = '', 
  onClick, 
  variant = 'primary',
  theme = 'gigs',
  colorMode = 'light',
  type = 'button',
  disabled = false
}: ButtonProps) {
  const themeStyles = variant === 'primary' 
    ? THEMES[theme].buttonPrimary 
    : THEMES[theme].buttonSecondary;
  
  // Add dark mode styles if needed
  const modeStyles = colorMode === 'dark' ? 'dark:bg-opacity-90 dark:hover:bg-opacity-100' : '';
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${themeStyles} ${modeStyles} ${disabledStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  theme?: ThemeType;
  colorMode?: ColorMode;
  onClick?: () => void;
}

export function Card({ 
  children, 
  className = '', 
  theme = 'gigs',
  colorMode = 'light',
  onClick
}: CardProps) {
  const baseClasses = 'rounded-xl shadow-md p-6';
  const modeClasses = colorMode === 'dark' 
    ? 'bg-gray-800 text-white' 
    : 'bg-white text-gray-800';
  const clickableClasses = onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : '';
  
  return (
    <div 
      className={`${baseClasses} ${modeClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export interface FooterProps {
  theme?: ThemeType;
  colorMode?: ColorMode;
}

export function Footer({
  theme = 'gigs',
  colorMode = 'light'
}: FooterProps) {
  const { colorMode: contextColorMode } = useTheme();
  
  const baseClasses = 'py-8 px-4 mt-auto';
  const modeClasses = contextColorMode === 'dark' 
    ? 'bg-gray-900 text-white border-t border-gray-800' 
    : 'bg-gray-50 text-gray-800 border-t border-gray-200';
  
  return (
    <footer className={`${baseClasses} ${modeClasses}`}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Vumi</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-600 dark:text-gray-300 hover:underline">About Us</a></li>
              <li><a href="/careers" className="text-gray-600 dark:text-gray-300 hover:underline">Careers</a></li>
              <li><a href="/press" className="text-gray-600 dark:text-gray-300 hover:underline">Press</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/blog" className="text-gray-600 dark:text-gray-300 hover:underline">Blog</a></li>
              <li><a href="/help" className="text-gray-600 dark:text-gray-300 hover:underline">Help Center</a></li>
              <li><a href="/community" className="text-gray-600 dark:text-gray-300 hover:underline">Community</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Products</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/gigs" 
                  className={`${THEMES.gigs.icon} hover:underline`}
                >
                  VumiGigs
                </a>
              </li>
              <li>
                <a 
                  href="/showcase" 
                  className={`text-gray-500 hover:underline`}
                >
                  VumiShowcase
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/terms" className="text-gray-600 dark:text-gray-300 hover:underline">Terms of Service</a></li>
              <li><a href="/privacy" className="text-gray-600 dark:text-gray-300 hover:underline">Privacy Policy</a></li>
              <li><a href="/cookies" className="text-gray-600 dark:text-gray-300 hover:underline">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Vumi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export interface LogoProps {
  type: 'gigs' | 'showcase';
  className?: string;
  onClick?: () => void;
}

export function Logo({ type, className = '', onClick }: LogoProps) {
  const firstWordColor = 'text-gray-800 dark:text-white';
  const secondWordColor = type === 'gigs' 
    ? THEMES.gigs.icon 
    : THEMES.showcase.icon;
  
  return (
    <div className={`font-bold flex items-center ${className} ${onClick ? 'cursor-pointer' : ''}`} onClick={onClick}>
      <span className={`${firstWordColor}`}>Vumi</span>
      <span className={`${secondWordColor}`}>
        {type === 'gigs' ? 'Gigs' : 'Showcase'}
      </span>
    </div>
  );
}

export interface HeaderProps {
  theme?: ThemeType;
  colorMode?: ColorMode;
  onColorModeChange?: (mode: ColorMode) => void;
  onLogin?: () => void;
  isLoggedIn?: boolean;
  userName?: string;
  currentApp?: 'gigs' | 'showcase';
  onNavigation?: (path: string) => void;
}

export function Header({ 
  theme = 'gigs',
  colorMode = 'light',
  onColorModeChange,
  onLogin,
  isLoggedIn = false,
  userName = '',
  currentApp = 'gigs',
  onNavigation
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { colorMode: contextColorMode, setColorMode } = useTheme();
  
  const toggleColorMode = () => {
    const newMode = (contextColorMode === 'light' ? 'dark' : 'light');
    setColorMode(newMode);
    if (onColorModeChange) {
      onColorModeChange(newMode);
    }
  };
  
  const handleLogin = () => {
    if (onLogin) {
      onLogin();
    }
  };
  
  const handleNavigation = (path: string) => {
    if (onNavigation) {
      onNavigation(path);
      setIsMenuOpen(false);
    }
  };
  
  const handleLogoClick = () => {
    handleNavigation('/');
  };
  
  const baseClasses = 'fixed top-0 left-0 right-0 z-50 px-4 py-3 shadow-md transition-colors duration-200';
  const modeClasses = contextColorMode === 'dark' 
    ? 'bg-gray-900 text-white' 
    : 'bg-white text-gray-800';
  
  return (
    <header className={`${baseClasses} ${modeClasses}`}>
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Logo 
            type={currentApp} 
            className="text-2xl" 
            onClick={handleLogoClick}
          />
        </div>
        
        {/* Navigation - Desktop */}
        <nav className="hidden md:flex space-x-8">
          {currentApp === 'gigs' ? (
            <>
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/gigs');
                }}
                className="font-medium transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Find Gigs
              </a>
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/post-gig');
                }}
                className="font-medium transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Post a Gig
              </a>
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/creators');
                }}
                className="font-medium transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Creators
              </a>
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/studios');
                }}
                className="font-medium transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Studios
              </a>
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/how-it-works');
                }}
                className="font-medium transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                How it Works
              </a>
            </>
          ) : (
            <>
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/showcases');
                }}
                className="font-medium transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Showcases
              </a>
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/projects');
                }}
                className="font-medium transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Projects
              </a>
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/creators');
                }}
                className="font-medium transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Creators
              </a>
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/plans');
                }}
                className="font-medium transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Plans
              </a>
            </>
          )}
        </nav>
        
        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button 
            onClick={toggleColorMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={`Switch to ${contextColorMode === 'light' ? 'dark' : 'light'} mode`}
          >
            {contextColorMode === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </svg>
            )}
          </button>
          
          {/* Login Button */}
          {isLoggedIn ? (
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-sm font-medium">{userName.charAt(0).toUpperCase()}</span>
                </div>
                <span className="hidden md:inline">{userName}</span>
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-10">
                  <a 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation('/profile');
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Profile
                  </a>
                  <a 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation('/settings');
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Settings
                  </a>
                  <a 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation('/logout');
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
          ) : (
            <Button 
              onClick={handleLogin} 
              theme={theme}
              colorMode={contextColorMode}
              className="text-sm"
            >
              Login
            </Button>
          )}
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMenuOpen ? (
                <path d="M18 6 6 18M6 6l12 12"></path>
              ) : (
                <path d="M4 12h16M4 6h16M4 18h16"></path>
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-1 px-2">
            {currentApp === 'gigs' ? (
              <>
                <a 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('/gigs');
                  }}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Find Gigs
                </a>
                <a 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('/post-gig');
                  }}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Post a Gig
                </a>
                <a 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('/creators');
                  }}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Creators
                </a>
                <a 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('/studios');
                  }}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Studios
                </a>
                <a 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('/how-it-works');
                  }}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  How it Works
                </a>
              </>
            ) : (
              <>
                <a 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('/showcases');
                  }}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Showcases
                </a>
                <a 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('/projects');
                  }}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Projects
                </a>
                <a 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('/creators');
                  }}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Creators
                </a>
                <a 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('/plans');
                  }}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Plans
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}