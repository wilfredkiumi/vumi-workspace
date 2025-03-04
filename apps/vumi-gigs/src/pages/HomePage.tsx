// @ts-nocheck
import { useApp } from '../context/AppContext';
import { Button, Card, THEMES } from 'ui';
import { Award, Briefcase, Building, FileCheck, Shield, Star, Users, Zap } from 'lucide-react';

function HomePage() {
  const { dispatch } = useApp();

  const handleFindGigs = () => {
    dispatch({ type: 'SET_VIEW', payload: 'gigs' });
  };

  const handlePostGig = () => {
    dispatch({ type: 'SET_VIEW', payload: 'post-gig' });
  };

  const handleViewPlans = () => {
    dispatch({ type: 'SET_VIEW', payload: 'plans' });
  };

  const handleBrowseCreators = () => {
    dispatch({ type: 'SET_VIEW', payload: 'creators' });
  };

  const handleBrowseStudios = () => {
    dispatch({ type: 'SET_VIEW', payload: 'studios' });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 min-h-[80vh] flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${THEMES.gigs.background} opacity-90 dark:opacity-95`}></div>
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
            alt="Creative collaboration" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Find the Perfect Creative Talent or Opportunity
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 mx-auto">
            Connect with top freelancers and clients worldwide. VumiGigs makes it easy to find work or hire exceptional talent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleFindGigs}
              className="px-8 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              Find Gigs
            </button>
            <button 
              onClick={handlePostGig}
              className="px-8 py-3 bg-secondary text-white rounded-lg hover:bg-opacity-90 transition-colors text-lg"
            >
              Post a Gig
            </button>
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
            <Card className="flex flex-col items-center text-center p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={handleFindGigs}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${THEMES.gigs.buttonPrimary} mb-4`}>
                <FileCheck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Game Development</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">124 gigs available</p>
            </Card>
            
            <Card className="flex flex-col items-center text-center p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={handleFindGigs}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${THEMES.gigs.buttonSecondary} mb-4`}>
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">3D Modeling</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">87 gigs available</p>
            </Card>
            
            <Card className="flex flex-col items-center text-center p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={handleFindGigs}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${THEMES.gigs.buttonPrimary} mb-4`}>
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Animation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">76 gigs available</p>
            </Card>
            
            <Card className="flex flex-col items-center text-center p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={handleFindGigs}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${THEMES.gigs.buttonSecondary} mb-4`}>
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Concept Art</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">54 gigs available</p>
            </Card>
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
            <Card className="flex flex-col items-center text-center p-8 hover:shadow-lg transition-shadow">
              <Users className={`h-12 w-12 ${THEMES.gigs.icon} mb-4`} />
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Verified Talent</h3>
              <p className="text-gray-600 dark:text-gray-300">
                All freelancers are verified and reviewed, ensuring you get quality work every time.
              </p>
            </Card>
            
            <Card className="flex flex-col items-center text-center p-8 hover:shadow-lg transition-shadow">
              <Shield className={`h-12 w-12 ${THEMES.gigs.icon} mb-4`} />
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Secure Payments</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our secure payment system ensures you get paid on time, every time.
              </p>
            </Card>
            
            <Card className="flex flex-col items-center text-center p-8 hover:shadow-lg transition-shadow">
              <Zap className={`h-12 w-12 ${THEMES.gigs.icon} mb-4`} />
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Fast Matching</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our smart matching system helps you find the perfect gig or talent quickly.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
            Plans for Every Creative Journey
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            Whether you're an individual creator or an organization, we have tailored solutions to help you showcase your work and connect with your audience.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 hover:shadow-lg transition-shadow">
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
                Starting at $49.99/month
              </p>
              <button 
                onClick={handleViewPlans}
                className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                View Creator Plans
              </button>
            </Card>
            
            <Card className="p-8 hover:shadow-lg transition-shadow">
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
                Starting at $299/month
              </p>
              <button 
                onClick={handleViewPlans}
                className="w-full px-6 py-3 bg-secondary text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                View Business Plans
              </button>
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
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
            alt="Creative collaboration" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Creative Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of freelancers and businesses already using VumiGigs to connect, collaborate, and create.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleBrowseCreators}
              className="px-8 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              Browse Creators
            </button>
            <button 
              onClick={handleBrowseStudios}
              className="px-8 py-3 bg-secondary text-white rounded-lg hover:bg-opacity-90 transition-colors text-lg"
            >
              Find Studios
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;