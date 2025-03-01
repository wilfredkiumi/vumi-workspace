import React, { useState } from 'react';
import { Briefcase, Search, FileCheck, Star, Users, Clock, DollarSign, Award } from 'lucide-react';
import { Button, Card, THEMES, Header, Footer, Logo, ThemeProvider, useTheme } from 'ui';
import CreatorProfilePage from './CreatorProfilePage';
import CreatorListingPage from './CreatorListingPage';

function LandingPage() {
  const { theme, colorMode, setColorMode } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showCreatorProfile, setShowCreatorProfile] = useState(false);
  const [showCreatorListing, setShowCreatorListing] = useState(false);
  const [selectedCreatorId, setSelectedCreatorId] = useState<string | null>(null);

  const handleLogin = () => {
    // Simulate login
    setIsLoggedIn(true);
    setUserName('John Doe');
  };

  const handleColorModeChange = (mode: 'light' | 'dark') => {
    setColorMode(mode);
  };

  const toggleCreatorProfile = () => {
    setShowCreatorProfile(!showCreatorProfile);
    setShowCreatorListing(false);
    setSelectedCreatorId(null);
  };
  
  const toggleCreatorListing = () => {
    setShowCreatorListing(!showCreatorListing);
    setShowCreatorProfile(false);
    setSelectedCreatorId(null);
  };

  const handleNavigation = (path: string) => {
    if (path === '/creators') {
      setShowCreatorListing(true);
      setShowCreatorProfile(false);
      setSelectedCreatorId(null);
    }
  };
  
  const handleCreatorSelect = (creatorId: string) => {
    setSelectedCreatorId(creatorId);
    setShowCreatorProfile(true);
    setShowCreatorListing(false);
  };

  if (showCreatorProfile) {
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
        
        <CreatorProfilePage selectedCreatorId={selectedCreatorId} />
        
        <div className="container mx-auto px-4 pb-8 text-center">
          <Button 
            theme={theme} 
            variant="secondary" 
            colorMode={colorMode}
            onClick={toggleCreatorProfile}
            className="mt-4"
          >
            Back to Home
          </Button>
        </div>
        
        <Footer theme={theme} colorMode={colorMode} />
      </div>
    );
  }
  
  if (showCreatorListing) {
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
        
        <CreatorListingPage onCreatorSelect={handleCreatorSelect} />
        
        <div className="container mx-auto px-4 pb-8 text-center">
          <Button 
            theme={theme} 
            variant="secondary" 
            colorMode={colorMode}
            onClick={toggleCreatorListing}
            className="mt-4"
          >
            Back to Home
          </Button>
        </div>
        
        <Footer theme={theme} colorMode={colorMode} />
      </div>
    );
  }
  
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
      
      {/* Hero Section - Full Width */}
      <section className={`relative pt-24 pb-16 min-h-[80vh] flex items-center`}>
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
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Find the Perfect Freelance Gig or Talent
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Connect with top freelancers and clients worldwide. VumiGigs makes it easy to find work or hire exceptional talent.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  theme={theme} 
                  variant="secondary" 
                  colorMode={colorMode}
                  className="text-lg py-3 px-6"
                  onClick={toggleCreatorListing}
                >
                  Find Creators
                </Button>
                <Button 
                  theme={theme} 
                  variant="primary" 
                  colorMode={colorMode}
                  className="text-lg py-3 px-6"
                  onClick={toggleCreatorProfile}
                >
                  View Creator Profile
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 p-4 rounded-lg">
                    <Search className="h-8 w-8 text-white mb-2" />
                    <h3 className="text-white font-medium">Find Work</h3>
                  </div>
                  <div className="bg-white/20 p-4 rounded-lg">
                    <Briefcase className="h-8 w-8 text-white mb-2" />
                    <h3 className="text-white font-medium">Post Jobs</h3>
                  </div>
                  <div className="bg-white/20 p-4 rounded-lg">
                    <Users className="h-8 w-8 text-white mb-2" />
                    <h3 className="text-white font-medium">Connect</h3>
                  </div>
                  <div className="bg-white/20 p-4 rounded-lg">
                    <DollarSign className="h-8 w-8 text-white mb-2" />
                    <h3 className="text-white font-medium">Get Paid</h3>
                  </div>
                </div>
              </div>
            </div>
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
            <Card theme={theme} colorMode={colorMode} className="flex flex-col items-center text-center p-6 hover:shadow-lg transition-shadow">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${THEMES.gigs.buttonPrimary} mb-4`}>
                <FileCheck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Web Development</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">1,234 gigs available</p>
            </Card>
            
            <Card theme={theme} colorMode={colorMode} className="flex flex-col items-center text-center p-6 hover:shadow-lg transition-shadow">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${THEMES.gigs.buttonSecondary} mb-4`}>
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Graphic Design</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">987 gigs available</p>
            </Card>
            
            <Card theme={theme} colorMode={colorMode} className="flex flex-col items-center text-center p-6 hover:shadow-lg transition-shadow">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${THEMES.gigs.buttonPrimary} mb-4`}>
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Digital Marketing</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">756 gigs available</p>
            </Card>
            
            <Card theme={theme} colorMode={colorMode} className="flex flex-col items-center text-center p-6 hover:shadow-lg transition-shadow">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${THEMES.gigs.buttonSecondary} mb-4`}>
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Content Writing</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">543 gigs available</p>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              theme={theme} 
              variant="secondary" 
              colorMode={colorMode} 
              className="px-6"
              onClick={toggleCreatorListing}
            >
              Browse All Creators
            </Button>
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
            <Button theme={theme} variant="primary" colorMode={colorMode} className="px-6">
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
                <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 mr-4"></div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Graphic Designer</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "VumiGigs has transformed my freelance career. I've found consistent work and built relationships with amazing clients from around the world."
              </p>
            </Card>
            
            <Card theme={theme} colorMode={colorMode} className="p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 mr-4"></div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">Michael Chen</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Web Developer</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "As a developer, finding quality projects used to be challenging. With VumiGigs, I can focus on coding while the platform handles client acquisition."
              </p>
            </Card>
            
            <Card theme={theme} colorMode={colorMode} className="p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 mr-4"></div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">Emily Rodriguez</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Marketing Director</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "Our startup needed specialized talent for various projects. VumiGigs helped us find the right freelancers quickly and efficiently."
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
              onClick={toggleCreatorListing}
            >
              Browse Creators
            </Button>
            <Button 
              theme={theme} 
              variant="primary" 
              colorMode={colorMode}
              className="text-lg py-3 px-6"
              onClick={toggleCreatorProfile}
            >
              View Creator Profile
            </Button>
          </div>
        </div>
      </section>
      
      <Footer theme={theme} colorMode={colorMode} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider initialTheme="gigs">
      <LandingPage />
    </ThemeProvider>
  );
}

export default App;