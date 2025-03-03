import { useState  } from 'react';
import { useTheme, Button, Card } from 'ui';
import { Check, Star, Users, Building, Shield , Globe , Zap } from 'lucide-react';
import { usePayment } from '../hooks/usePayment';

// Individual Plans
const individualPlans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    interval: 'year',
    description: 'Perfect for getting started and exploring opportunities',
    features: [
      'Basic profile customization',
      'Up to 5 portfolio items',
      'Basic analytics',
      'Community access',
      'Standard support'
    ],
    recommended: false
  },
  {
    id: 'creator-pro',
    name: 'Creator Pro',
    price: 49.99,
    interval: 'year',
    description: 'Everything you need to grow your creative business',
    features: [
      'All Basic features',
      'Advanced profile customization',
      'Unlimited portfolio items',
      'Priority search placement',
      'Advanced analytics',
      'Client management tools',
      'Custom branding',
      'Priority support',
      'Direct messaging',
      'Project collaboration tools'
    ],
    recommended: true
  },
  {
    id: 'creator-premium',
    name: 'Creator Premium',
    price: 69.99,
    interval: 'year',
    description: 'For established creators who want the ultimate toolkit',
    features: [
      'All Pro features',
      'Featured profile placement',
      'Custom domain',
      'API access',
      'White-label options',
      'Dedicated account manager',
      'Early access to new features',
      'Premium analytics',
      'Team collaboration (up to 5)',
      'Custom integrations'
    ],
    recommended: false
  }
];

// Business Plans
const businessPlans = [
  {
    id: 'business-basic',
    name: 'Basic Listing',
    price: 0,
    interval: 'year',
    description: 'Essential features for small studios',
    features: [
      'Basic business profile',
      'Up to 3 team members',
      'Basic project showcase',
      'Standard support',
      'Community access'
    ],
    recommended: false
  },
  {
    id: 'studio-pro',
    name: 'Studio Pro',
    price: 299,
    interval: 'year',
    description: 'Professional features for growing studios',
    features: [
      'All Basic features',
      'Up to 15 team members',
      'Advanced business profile',
      'Priority search placement',
      'Advanced analytics',
      'Project management tools',
      'Client portal',
      'Custom branding',
      'Priority support',
      'Team collaboration tools'
    ],
    recommended: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 499,
    interval: 'year',
    description: 'Custom solutions for large organizations',
    features: [
      'All Pro features',
      'Unlimited team members',
      'Custom solutions',
      'API access',
      'White-label options',
      'Dedicated account manager',
      'Custom integrations',
      'Premium analytics',
      'Advanced security features',
      'SLA guarantees'
    ],
    recommended: false
  }
];

export function BusinessPlansPage() {
  const colorMode = "light"; // Default colorMode
  const { theme } = useTheme();
  const { loading, createSubscription, redirectToCheckout } = usePayment();
  const [planType, setPlanType] = useState<'individual' | 'business'>('individual');
  
  const handleSubscribe = async (planId: string) => {
    try {
      const response = await createSubscription({
        planId,
        successUrl: `${window.location.origin}/payment/success?type=subscription&planId=${planId}`,
        cancelUrl: `${window.location.origin}/payment/cancel?type=subscription&planId=${planId}`
      });
      
      redirectToCheckout(response.url);
    } catch (error) {
      console.error('Error subscribing to plan:', error);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Whether you're an individual creator or a studio, we have the perfect plan to help you grow your creative business.
          </p>
        </div>
        
        {/* Plan Type Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <button
              className={`px-6 py-3 rounded-md text-sm font-medium ${
                planType === 'individual'
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={() => setPlanType('individual')}
            >
              Individual Creators
            </button>
            <button
              className={`px-6 py-3 rounded-md text-sm font-medium ${
                planType === 'business'
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={() => setPlanType('business')}
            >
              Studios & Businesses
            </button>
          </div>
        </div>
        
        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {(planType === 'individual' ? individualPlans : businessPlans).map((plan) => (
            <Card
              key={plan.id}
              theme={theme}
              colorMode={colorMode}
              className={`relative p-8 ${
                plan.recommended
                  ? 'border-2 border-blue-500 dark:border-blue-400'
                  : 'border border-gray-200 dark:border-gray-700'
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-0 -mt-3 mr-3 px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full transform translate-x-2 -translate-y-2">
                  RECOMMENDED
                </div>
              )}
              
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                <p className="mt-4 text-gray-500 dark:text-gray-400">{plan.description}</p>
              </div>
              
              <div className="mt-2 mb-6">
                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                  ${plan.price}
                </span>
                <span className="text-base font-medium text-gray-500 dark:text-gray-400">
                  /year
                </span>
                
                {plan.price > 0 && (
                  <p className="mt-1 text-sm text-green-500">
                    Save ${(plan.price * 0.2).toFixed(2)} per year
                  </p>
                )}
              </div>
              
              <ul className="mt-6 space-y-4 flex-1">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                <Button
                  theme={theme}
                  variant={plan.recommended ? "primary" : "secondary"}
                  colorMode={colorMode}
                  className="w-full"
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={loading}
                >
                  {plan.price === 0 ? 'Get Started Free' : 'Subscribe Now'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Features Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            {planType === 'individual' ? 'Features for Creators' : 'Features for Studios'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {planType === 'individual' ? (
              <>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Star className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                    Professional Profile
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Showcase your work with a customizable portfolio and professional profile.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                    Client Management
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Manage clients, projects, and communications all in one place.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <Zap className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                    Growth Tools
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Analytics, insights, and tools to help you grow your creative business.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Building className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                    Team Management
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Manage your team, roles, and permissions with advanced collaboration tools.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                    Enterprise Security
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Advanced security features and custom permissions for your organization.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <Globe className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                    Global Reach
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Connect with clients worldwide and manage international projects.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Can I switch plans later?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We accept all major credit cards, PayPal, and bank transfers for business plans.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Is there a free trial?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Yes, all paid plans come with a 14-day free trial. No credit card required to start.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  What's included in the free plan?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  The free plan includes basic features to help you get started, including a simple profile and limited portfolio items.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Do you offer custom plans?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Yes, we offer custom enterprise solutions for large organizations with specific needs. Contact us to learn more.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  What kind of support do you offer?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  All plans include access to our help center and community. Pro and Premium plans include priority support.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-8 text-white/90">
              Join thousands of creators and studios already using our platform to grow their creative business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                theme={theme} 
                variant="secondary" 
                colorMode={colorMode}
                className="text-lg py-3 px-6 bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => setPlanType('individual')}
              >
                For Creators
              </Button>
              <Button 
                theme={theme} 
                variant="primary" 
                colorMode={colorMode}
                className="text-lg py-3 px-6 bg-purple-700 hover:bg-purple-800"
                onClick={() => setPlanType('business')}
              >
                For Studios
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add default export
export default BusinessPlansPage;