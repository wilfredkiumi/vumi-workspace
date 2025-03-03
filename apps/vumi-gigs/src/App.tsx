import React, { useState } from 'react';
import { Briefcase, Search, FileCheck, Star, Users, Clock, DollarSign, Award, Building } from 'lucide-react';
import { Button, Card, THEMES, Header, Footer, Logo, ThemeProvider, useTheme } from 'ui';
import CreatorProfilePage from './CreatorProfilePage';
import CreatorListingPage from './CreatorListingPage';
import GigsListingPage from './GigsListingPage';
import PostGigForm from './PostGigForm';
import GigDetailPage from './GigDetailPage';
import { ProfilePage } from './pages/ProfilePage';
import { BusinessPlansPage } from './pages/BusinessPlansPage';
import { AuthProvider } from './contexts/AuthContext';

function LandingPage() {
  const { theme, colorMode, setColorMode } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [currentView, setCurrentView] = useState('home');
  const [selectedCreatorId, setSelectedCreatorId] = useState<string | null>(null);
  const [selectedGigId, setSelectedGigId] = useState<string | null>(null);

  const handleLogin = () => {
    // Simulate login
    setIsLoggedIn(true);
    setUserName('John Doe');
  };

  const handleColorModeChange = (mode: 'light' | 'dark') => {
    setColorMode(mode);
  };

  const handleNavigation = (path: string) => {
    if (path === '/') {
      setCurrentView('home');
      setSelectedCreatorId(null);
      setSelectedGigId(null);
    } else if (path === '/creators') {
      setCurrentView('creators');
      setSelectedCreatorId(null);
      setSelectedGigId(null);
    } else if (path === '/find-gigs') {
      setCurrentView('find-gigs');
      setSelectedCreatorId(null);
      setSelectedGigId(null);
    } else if (path === '/post-gig') {
      setCurrentView('post-gig');
      setSelectedCreatorId(null);
      setSelectedGigId(null);
    } else if (path === '/how-it-works') {
      setCurrentView('how-it-works');
      setSelectedCreatorId(null);
      setSelectedGigId(null);
    } else if (path === '/profile') {
      setCurrentView('profile');
      setSelectedCreatorId(null);
      setSelectedGigId(null);
    } else if (path === '/plans') {
      setCurrentView('plans');
      setSelectedCreatorId(null);
      setSelectedGigId(null);
    }
  };
  
  const handleCreatorSelect = (creatorId: string) => {
    setSelectedCreatorId(creatorId);
    setCurrentView('creator-profile');
  };
  
  const handleGigSelect = (gigId: string) => {
    setSelectedGigId(gigId);
    setCurrentView('gig-detail');
  };
  
  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedCreatorId(null);
    setSelectedGigId(null);
  };

  // Render different views based on currentView state
  const renderContent = () => {
    switch (currentView) {
      case 'creators':
        return <CreatorListingPage onCreatorSelect={handleCreatorSelect} />;
      
      case 'creator-profile':
        return <CreatorProfilePage selectedCreatorId={selectedCreatorId} />;
      
      case 'find-gigs':
        return <GigsListingPage onGigSelect={handleGigSelect} />;
      
      case 'post-gig':
        return <PostGigForm />;
      
      case 'gig-detail':
        return (
          <GigDetailPage 
            gigId={selectedGigId || ''} 
            onBack={() => setCurrentView('find-gigs')} 
          />
        );
      
      case 'how-it-works':
        return renderHowItWorksPage();
        
      case 'profile':
        return <ProfilePage />;
        
      case 'plans':
        return <BusinessPlansPage />;
      
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
            <div className={`absolute inset-0 bg-gradient-to-br ${THEMES.gigs.background} opacity-90 dark:opacity-95`}></div>
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
              alt="Freelancers collaborating" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Content */}
          <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Find the Perfect Freelance Gig or Talent
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 mx-auto">
              Connect with top freelancers and clients worldwide. VumiGigs makes it easy to find work or hire exceptional talent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                theme={theme} 
                variant="secondary" 
                colorMode={colorMode}
                className="text-lg py-3 px-8"
                onClick={() => setCurrentView('find-gigs')}
              >
                Find Gigs
              </Button>
              <Button 
                theme={theme} 
                variant="primary" 
                colorMode={colorMode}
                className="text-lg py-3 px-8"
                onClick={() => setCurrentView('post-gig')}
              >
                Post a Gig
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
              Why Choose VumiGigs?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card theme={theme} colorMode={colorMode} className="flex flex-col items-center text-center p-8 hover:shadow-lg transition-shadow">
                <Search className={`h-12 w-12 ${THEMES.gigs.icon} mb-4`} />
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Find Work Easily</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Browse thousands of gigs across dozens of categories to find the perfect match for your skills.
                </p>
              </Card>
              
              <Card theme={theme} colorMode={colorMode} className="flex flex-col items-center text-center p-8 hover:shadow-lg transition-shadow">
                <Users className={`h-12 w-12 ${THEMES.gigs.icon} mb-4`} />
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Verified Talent</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  All freelancers are verified and reviewed, ensuring you get quality work every time.
                </p>
              </Card>
              
              <Card theme={theme} colorMode={colorMode} className="flex flex-col items-center text-center p-8 hover:shadow-lg transition-shadow">
                <DollarSign className={`h-12 w-12 ${THEMES.gigs.icon} mb-4`} />
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Secure Payments</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our secure payment system ensures you get paid on time, every time.
                </p>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
              Popular Categories
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card theme={theme} colorMode={colorMode} className="flex flex-col items-center text-center p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentView('find-gigs')}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${THEMES.gigs.buttonPrimary} mb-4`}>
                  <FileCheck className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Game Development</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">124 gigs available</p>
              </Card>
              
              <Card theme={theme} colorMode={colorMode} className="flex flex-col items-center text-center p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentView('find-gigs')}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${THEMES.gigs.buttonSecondary} mb-4`}>
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">3D Modeling</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">87 gigs available</p>
              </Card>
              
              <Card theme={theme} colorMode={colorMode} className="flex flex-col items-center text-center p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentView('find-gigs')}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${THEMES.gigs.buttonPrimary} mb-4`}>
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Animation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">76 gigs available</p>
              </Card>
              
              <Card theme={theme} colorMode={colorMode} className="flex flex-col items-center text-center p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentView('find-gigs')}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${THEMES.gigs.buttonSecondary} mb-4`}>
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Concept Art</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">54 gigs available</p>
              </Card>
            </div>
            
            <div className="text-center mt-12">
              <Button 
                theme={theme} 
                variant="secondary" 
                colorMode={colorMode} 
                className="px-6"
                onClick={() => setCurrentView('find-gigs')}
              >
                Browse All Gigs
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
                  <Briefcase className={`h-10 w-10 ${THEMES.gigs.icon} mr-4`} />
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
                  Starting at $49.99/year
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
                  <Building className={`h-10 w-10 ${THEMES.gigs.icon} mr-4`} />
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Studios & Businesses</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Comprehensive solutions for studios, agencies, and creative businesses of all sizes.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">Team collaboration features</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">Advanced project management</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">Enterprise-grade security</span>
                  </li>
                </ul>
                <p className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                  Starting at $299/year
                </p>
                <Button 
                  theme={theme} 
                  variant="primary" 
                  colorMode={colorMode} 
                  className="w-full"
                  onClick={() => setCurrentView('plans')}
                >
                  View Business Plans
                </Button>
              </Card>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
              How VumiGigs Works
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${THEMES.gigs.buttonPrimary} mb-4`}>
                  <span className="text-xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Create Your Profile</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Sign up and create a detailed profile showcasing your skills and experience.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${THEMES.gigs.buttonPrimary} mb-4`}>
                  <span className="text-xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Browse or Post Gigs</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Find work that matches your skills or post a gig to find the perfect freelancer.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${THEMES.gigs.buttonPrimary} mb-4`}>
                  <span className="text-xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Get Paid Securely</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Complete the work and receive payment through our secure payment system.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button 
                theme={theme} 
                variant="primary" 
                colorMode={colorMode} 
                className="px-6"
                onClick={() => setCurrentView('how-it-works')}
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
              What Our Users Say
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card theme={theme} colorMode={colorMode} className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                      alt="Sarah Johnson" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">Sarah Johnson</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">3D Artist</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "VumiGigs has transformed my freelance career. I've found consistent work and built relationships with amazing clients from around the world."
                </p>
              </Card>
              
              <Card theme={theme} colorMode={colorMode} className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                      alt="Michael Chen" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">Michael Chen</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Game Developer</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "As a developer, finding quality projects used to be challenging. With VumiGigs, I can focus on coding while the platform handles client acquisition."
                </p>
              </Card>
              
              <Card theme={theme} colorMode={colorMode} className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                      alt="Emily Rodriguez" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">Emily Rodriguez</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Studio Director</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "Our studio needed specialized talent for various projects. VumiGigs helped us find the right freelancers quickly and efficiently."
                </p>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="relative py-16">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <div className={`absolute inset-0 bg-gradient-to-br ${THEMES.gigs.background} opacity-90 dark:opacity-95`}></div>
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
              alt="Freelance work" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Start Your Freelance Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of freelancers and businesses already using VumiGigs to connect, collaborate, and create.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                theme={theme} 
                variant="secondary" 
                colorMode={colorMode}
                className="text-lg py-3 px-6"
                onClick={() => setCurrentView('find-gigs')}
              >
                Find Gigs
              </Button>
              <Button 
                theme={theme} 
                variant="primary" 
                colorMode={colorMode}
                className="text-lg py-3 px-6"
                onClick={() => setCurrentView('post-gig')}
              >
                Post a Gig
              </Button>
            </div>
          </div>
        </section>
      </>
    );
  };

  // How It Works page content
  const renderHowItWorksPage = () => {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            How VumiGigs Works
          </h1>
          
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">For Freelancers</h2>
            
            <div className="space-y-8">
              <Card theme={theme} colorMode={colorMode} className="p-6">
                <div className="flex items-start">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${THEMES.gigs.buttonPrimary} mr-4 flex-shrink-0`}>
                    <span className="text-xl font-bold text-white">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Create Your Profile</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Sign up and create a detailed profile showcasing your skills, experience, and portfolio. A complete profile helps clients find you and understand your expertise.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card theme={theme} colorMode={colorMode} className="p-6">
                <div className="flex items-start">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${THEMES.gigs.buttonPrimary} mr-4 flex-shrink-0`}>
                    <span className="text-xl font-bold text-white">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Browse Available Gigs</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Search for gigs that match your skills and interests. Use filters to narrow down options by category, budget, duration, and more. Save gigs you're interested in to apply later.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card theme={theme} colorMode={colorMode} className="p-6">
                <div className="flex items-start">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${THEMES.gigs.buttonPrimary} mr-4 flex-shrink-0`}>
                    <span className="text-xl font-bold text-white">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Submit Proposals</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Apply to gigs with a personalized proposal explaining why you're the right fit. Include your rate, timeline, and approach to the project. Stand out by addressing the client's specific needs.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card theme={theme} colorMode={colorMode} className="p-6">
                <div className="flex items-start">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${THEMES.gigs.buttonPrimary } mr-4 flex-shrink-0`}>
                    <span className="text-xl font-bold text-white">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Complete the Work</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Once hired, communicate clearly with the client and deliver high-quality work on time. Use our platform tools to track milestones, share files, and maintain project documentation.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card theme={theme} colorMode={colorMode} className="p-6">
                <div className="flex items-start">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${THEMES.gigs.buttonPrimary} mr-4 flex-shrink-0`}>
                    <span className="text-xl font-bold text-white">5</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Get Paid Securely</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Receive payment through our secure payment system. For fixed-price projects, funds are held in escrow until work is completed and approved. For hourly projects, track your time and get paid for hours worked.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">For Clients</h2>
            
            <div className="space-y-8">
              <Card theme={theme} colorMode={colorMode} className="p-6">
                <div className="flex items-start">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${THEMES.gigs.buttonSecondary} mr-4 flex-shrink-0`}>
                    <span className="text-xl font-bold text-white">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Post a Gig</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Create a detailed gig posting that clearly describes your project requirements, budget, timeline, and the skills you're looking for. The more specific you are, the better matches you'll find.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card theme={theme} colorMode={colorMode} className="p-6">
                <div className="flex items-start">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${THEMES.gigs.buttonSecondary} mr-4 flex-shrink-0`}>
                    <span className="text-xl font-bold text-white">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Review Proposals</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Browse through proposals from interested freelancers. Review their profiles, portfolios, ratings, and previous work to find the best match for your project.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card theme={theme} colorMode={colorMode} className="p-6">
                <div className="flex items-start">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${THEMES.gigs.buttonSecondary} mr-4 flex-shrink-0`}>
                    <span className="text-xl font-bold text-white">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Hire and Collaborate</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Select the freelancer that best fits your needs and hire them through our platform. Use our collaboration tools to communicate, share files, and track progress throughout the project.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card theme={theme} colorMode={colorMode} className="p-6">
                <div className="flex items-start">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${THEMES.gigs.buttonSecondary} mr-4 flex-shrink-0`}>
                    <span className="text-xl font-bold text-white">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Review and Approve</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Review the completed work and request revisions if needed. Once you're satisfied, approve the work and release the payment to the freelancer.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card theme={theme} colorMode={colorMode} className="p-6">
                <div className="flex items-start">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${THEMES.gigs.buttonSecondary} mr-4 flex-shrink-0`}>
                    <span className="text-xl font-bold text-white">5</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Provide Feedback</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Leave a review for the freelancer to help them build their reputation and to help other clients make informed decisions. Build long-term relationships with freelancers you like working with.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          
          <div className="text-center">
            <Button 
              theme={theme} 
              variant="primary" 
              colorMode={colorMode} 
              className="px-6"
              onClick={() => setCurrentView('find-gigs')}
            >
              Start Exploring
            </Button>
          </div>
        </div>
      </div>
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
        currentApp="gigs"
        onNavigation={handleNavigation}
      />
      
      <main className="flex-grow">
        {renderContent()}
      </main>
      
      <Footer theme={theme} colorMode={colorMode} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider initialTheme="gigs">
        <LandingPage />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;