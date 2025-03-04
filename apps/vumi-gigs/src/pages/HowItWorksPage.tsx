// @ts-nocheck
import { useApp } from '../context/AppContext';
import { Card, THEMES } from 'ui';
import { CheckSquare, Clock, DollarSign, FileText, MessageSquare, Search, Send, Shield, Star, Users, Video } from 'lucide-react';

function HowItWorksPage() {
  const { dispatch } = useApp();

  const handleGetStarted = () => {
    dispatch({ type: 'SET_VIEW', payload: 'gigs' });
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How VumiGigs Works
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A secure and efficient platform connecting creative professionals with quality projects. Here's how it all comes together.
          </p>
        </div>

        {/* For Creators Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            For Creators
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="flex flex-col items-center text-center p-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${THEMES.gigs.buttonPrimary} mb-4`}>
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                1. Find Opportunities
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse through available gigs that match your skills and interests. Use filters to find the perfect opportunity.
              </p>
            </Card>

            <Card className="flex flex-col items-center text-center p-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${THEMES.gigs.buttonPrimary} mb-4`}>
                <Send className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                2. Submit Proposal
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Send a detailed proposal outlining your approach, timeline, and pricing for the project.
              </p>
            </Card>

            <Card className="flex flex-col items-center text-center p-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${THEMES.gigs.buttonPrimary} mb-4`}>
                <Video className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                3. Video Interview
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                If shortlisted, connect with the client through our secure video call platform to discuss the project in detail.
              </p>
            </Card>

            <Card className="flex flex-col items-center text-center p-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${THEMES.gigs.buttonPrimary} mb-4`}>
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                4. Get Paid Securely
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Receive milestone payments through our secure escrow system as you complete project deliverables.
              </p>
            </Card>
          </div>
        </div>

        {/* For Clients Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            For Clients
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="flex flex-col items-center text-center p-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${THEMES.gigs.buttonSecondary} mb-4`}>
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                1. Post Your Gig
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create a detailed gig listing outlining your project requirements, budget, and timeline.
              </p>
            </Card>

            <Card className="flex flex-col items-center text-center p-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${THEMES.gigs.buttonSecondary} mb-4`}>
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                2. Review Proposals
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Receive and review proposals from qualified creators. Shortlist the best matches for your project.
              </p>
            </Card>

            <Card className="flex flex-col items-center text-center p-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${THEMES.gigs.buttonSecondary} mb-4`}>
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                3. Interview & Select
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Schedule video calls with shortlisted creators and select the best fit for your project.
              </p>
            </Card>

            <Card className="flex flex-col items-center text-center p-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${THEMES.gigs.buttonSecondary} mb-4`}>
                <CheckSquare className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                4. Milestone Management
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Set up project milestones and release payments securely upon satisfactory completion.
              </p>
            </Card>
          </div>
        </div>

        {/* Platform Features */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Platform Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="flex items-start mb-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                  <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Secure Payments
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    All payments are held in escrow and only released upon milestone completion. Your money is always safe.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start mb-4">
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Milestone Tracking
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Break down projects into manageable milestones with clear deliverables and deadlines.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                  <Star className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Quality Assurance
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    All creators are vetted and reviewed. Only high-quality work gets approved for milestone payments.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Success Stories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Sarah Chen" 
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sarah Chen</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">3D Artist</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                "VumiGigs helped me find consistent work and build long-term relationships with great clients. The milestone system ensures I get paid fairly for my work."
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Tom Wilson" 
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tom Wilson</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Game Developer</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                "As a client, I love how easy it is to find qualified talent and manage projects through milestones. The video interviews help ensure a great fit."
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Emily Rodriguez" 
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Emily Rodriguez</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Animator</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                "The platform's escrow system gives me peace of mind. I can focus on creating great animations knowing my payment is secure."
              </p>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative py-16 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className={`absolute inset-0 bg-gradient-to-br ${THEMES.gigs.background} opacity-90 dark:opacity-95`}></div>
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
              alt="Creative collaboration" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of creators and businesses already using VumiGigs to bring their creative projects to life.
            </p>
            <button 
              onClick={handleGetStarted}
              className="px-8 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorksPage;