import React, { useState } from 'react';
import { Palette, Image, Layers, Award, Users, Zap, Heart, Star, CreditCard, Briefcase } from 'lucide-react';
import { Button, Card, THEMES, Header, Footer, Logo, ThemeProvider, useTheme } from 'ui';
import CreatorProfilePage from './CreatorProfilePage';
import CreatorListingPage from './CreatorListingPage';
import ProjectPage from './ProjectPage';
import ShowcasePage from './ShowcasePage';
import ProjectsListingPage from './ProjectsListingPage';
import ShowcasesListingPage from './ShowcasesListingPage';
import PlansPage from './PlansPage';

function LandingPage() {
  const { theme, colorMode, setColorMode } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [currentView, setCurrentView] = useState('home');
  const [selectedCreatorId, setSelectedCreatorId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedShowcaseId, setSelectedShowcaseId] = useState<string | null>(null);

  const handleLogin = () => {
    // Simulate login
    setIsLoggedIn(true);
    setUserName('Jane Smith');
  };

  const handleColorModeChange = (mode: 'light' | 'dark') => {
    setColorMode(mode);
  };

  const handleNavigation = (path: string) => {
    if (path === '/') {
      setCurrentView('home');
      setSelectedCreatorId(null);
      setSelectedProjectId(null);
      setSelectedShowcaseId(null);
    } else if (path === '/creators') {
      setCurrentView('creators');
      setSelectedCreatorId(null);
      setSelectedProjectId(null);
      setSelectedShowcaseId(null);
    } else if (path === '/projects') {
      setCurrentView('projects-listing');
      setSelectedCreatorId(null);
      setSelectedProjectId(null);
      setSelectedShowcaseId(null);
    } else if (path === '/showcases') {
      setCurrentView('showcases-listing');
      setSelectedCreatorId(null);
      setSelectedProjectId(null);
      setSelectedShowcaseId(null);
    } else if (path === '/plans') {
      setCurrentView('plans');
      setSelectedCreatorId(null);
      setSelectedProjectId(null);
      setSelectedShowcaseId(null);
    }
  };
  
  const handleCreatorSelect = (creatorId: string) => {
    setSelectedCreatorId(creatorId);
    setCurrentView('creator-profile');
  };
  
  const handleProjectSelect = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentView('project-detail');
  };
  
  const handleShowcaseSelect = (showcaseId: string) => {
    setSelectedShowcaseId(showcaseId);
    setCurrentView('showcase-detail');
  };
  
  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedCreatorId(null);
    setSelectedProjectId(null);
    setSelectedShowcaseId(null);
  };

  // Render different views based on currentView state
  const renderContent = () => {
    switch (currentView) {
      case 'creators':
        return <CreatorListingPage onCreatorSelect={handleCreatorSelect} />;
      
      case 'creator-profile':
        return (
          <CreatorProfilePage 
            selectedCreatorId={selectedCreatorId} 
            onViewProject={handleProjectSelect}
            onViewShowcase={handleShowcaseSelect}
            onViewCreator={handleCreatorSelect}
          />
        );
      
      case 'projects-listing':
        return (
          <ProjectsListingPage 
            onProjectSelect={handleProjectSelect} 
          />
        );
      
      case 'project-detail':
        return (
          <ProjectPage 
            projectId={selectedProjectId || ''} 
            onBack={() => setCurrentView('projects-listing')} 
          />
        );
      
      case 'showcases-listing':
        return (
          <ShowcasesListingPage 
            onShowcaseSelect={handleShowcaseSelect} 
          />
        );
      
      case 'showcase-detail':
        return (
          <ShowcasePage 
            showcaseId={selectedShowcaseId || ''} 
            onBack={() => setCurrentView('showcases-listing')}
            onViewProject={handleProjectSelect}
          />
        );
      
      case 'plans':
        return <PlansPage />;
      
      default:
        return renderHomePage();
    }
  };

  // Home page content
  const renderHomePage = () => {
    return (
      <>
        {/* Hero Section - Full Width */}
        <section className="relative pt-24 pb-16 min-h-[80vh] flex items-center">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <div className={`absolute inset-0 bg-gradient-to-br ${THEMES.showcase.background} opacity-90 dark:opacity-95`}></div>
            <img 
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
              alt="Creative portfolio showcase" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Content */}
          <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Showcase Your Creative Portfolio to the World
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 mx-auto">
              Build a stunning portfolio, connect with other creators, and get discovered by clients looking for your unique talents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                theme={theme} 
                variant="secondary" 
                colorMode={colorMode}
                className="text-lg py-3 px-8"
                onClick={() => setCurrentView('showcases-listing')}
              >
                Browse Showcases
              </Button>
              <Button 
                theme={theme} 
                variant="primary" 
                colorMode={colorMode}
                className="text-lg py-3 px-8"
                onClick={() => setCurrentView('projects-listing')}
              >
                Explore Projects
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
              Why Choose VumiShowcase?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card theme={theme} colorMode={colorMode} className="flex flex-col items-center text-center p-8 hover:shadow-lg transition-shadow">
                <Image className={`h-12 w-12 ${THEMES.showcase.icon} mb-4`} />
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Beautiful Portfolios</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Create stunning, customizable portfolios that highlight your best work and creative process.
                </p>
              </Card>
              
              <Card theme={theme} colorMode={colorMode} className="flex flex-col items-center text-center p-8 hover:shadow-lg transition-shadow">
                <Users className={`h-12 w-12 ${THEMES.showcase.icon} mb-4`} />
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Creative Community</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Connect with a global community of creators, share insights, and collaborate on projects.
                </p>
              </Card>
              
              <Card theme={theme} colorMode={colorMode} className="flex flex-col items-center text-center p-8 hover:shadow-lg transition-shadow">
                <Zap className={`h-12 w-12 ${THEMES.showcase.icon} mb-4`} />
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Get Discovered</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our platform connects you with clients and opportunities that match your unique creative skills.
                </p>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Featured Showcases */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
              Featured Showcases
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card theme={theme} colorMode={colorMode} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleShowcaseSelect('s1')}>
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                    alt="Design Innovation Expo 2023" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Design Innovation Expo 2023</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Annual exhibition showcasing the most innovative design work across multiple disciplines.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">June 15-18, 2023</span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 text-red-500 mr-1" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">128</span>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card theme={theme} colorMode={colorMode} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleShowcaseSelect('s2')}>
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                    alt="Digital Art Festival" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Digital Art Festival</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    A celebration of digital art and illustration featuring works from leading artists.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Sept 10-12, 2023</span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 text-red-500 mr-1" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">95</span>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card theme={theme} colorMode={colorMode} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleShowcaseSelect('s3')}>
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1561214115-f2f134cc4912?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                    alt="Concept Art Expo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Concept Art Expo</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Exhibition showcasing concept art from video games, films, and animation projects.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Nov 5-8, 2023</span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 text-red-500 mr-1" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">76</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="text-center mt-12">
              <Button theme={theme} variant="secondary" colorMode={colorMode} className="px-6" onClick={() => setCurrentView('showcases-listing')}>
                Explore All Showcases
              </Button>
            </div>
          </div>
        </section>
        
        {/* Plans Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
              Plans for Every Creative Journey
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
              Whether you're an individual creator or an organization, we have tailored solutions to help you showcase your work and connect with your audience.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card theme={theme} colorMode={colorMode} className="p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Briefcase className={`h-10 w-10 ${THEMES.showcase.icon} mr-4`} />
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Individual Creators</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Perfect for game developers, animation producers, and creative professionals looking to showcase their work and grow their career.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">Professional portfolio showcase</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">Project collaboration tools</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">Client management features</span>
                  </li>
                </ul>
                <p className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                  Starting at $49.99/month
                </p>
                <Button 
                  theme={theme} 
                  variant="primary" 
                  colorMode={colorMode} 
                  className="w-full"
                  onClick={() => setCurrentView('plans')}
                >
                  View Creator Plans
                </Button>
              </Card>
              
              <Card theme={theme} colorMode={colorMode} className="p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <CreditCard className={`h-10 w-10 ${THEMES.showcase.icon} mr-4`} />
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Organizations & Events</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Comprehensive solutions for film festivals, game expos, and creative industry events of all sizes.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">Advanced event management</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">Ticketing and attendee directory</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">Hybrid event capabilities</span>
                  </li>
                </ul>
                <p className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                  Starting at $1,000/month
                </p>
                <Button 
                  theme={theme} 
                  variant="primary" 
                  colorMode={colorMode} 
                  className="w-full"
                  onClick={() => setCurrentView('plans')}
                >
                  View Organization Plans
                </Button>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="relative py-16">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <div className={`absolute inset-0 bg-gradient-to-br ${THEMES.showcase.background} opacity-90 dark:opacity-95`}></div>
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
              alt="Creative collaboration" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Showcase Your Creative Work?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of creators and organizations already using our platform to showcase their work, connect with audiences, and grow their creative careers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                theme={theme} 
                variant="secondary" 
                colorMode={colorMode}
                className="text-lg py-3 px-6"
                onClick={() => setCurrentView('creators')}
              >
                Browse Creators
              </Button>
              <Button 
                theme={theme} 
                variant="primary" 
                colorMode={colorMode}
                className="text-lg py-3 px-6"
                onClick={() => setCurrentView('plans')}
              >
                View Plans
              </Button>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        theme={theme}
        colorMode={colorMode}
        onColorModeChange={handleColorModeChange}
        onLogin={handleLogin}
        isLoggedIn={isLoggedIn}
        userName={userName}
        currentApp="showcase"
        onNavigation={handleNavigation}
      />
      
      {renderContent()}
      
      {currentView !== 'home' && (
        <div className="container mx-auto px-4 pb-8 text-center">
          <Button 
            theme={theme} 
            variant="secondary" 
            colorMode={colorMode}
            onClick={handleBackToHome}
            className="mt-4"
          >
            Back to Home
          </Button>
        </div>
      )}
      
      <Footer theme={theme} colorMode={colorMode} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider initialTheme="showcase">
      <LandingPage />
    </ThemeProvider>
  );
}

export default App;