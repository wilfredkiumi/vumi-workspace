import React, { useState } from 'react';
import { 
  Check, 
  X, 
  Users, 
  Briefcase, 
  Video, 
  Calendar, 
  Ticket, 
  Globe, 
  Zap, 
  Shield, 
  BarChart, 
  MessageSquare, 
  Award,
  Smartphone,
  Tv,
  Film,
  Gamepad,
  Building,
  Star
} from 'lucide-react';
import { useTheme, Button, Card } from 'ui';

// Plan feature type
interface PlanFeature {
  name: string;
  description?: string;
  included: boolean;
}

// Plan type
interface Plan {
  id: string;
  name: string;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  description: string;
  features: PlanFeature[];
  popular?: boolean;
  recommended?: boolean;
  forBusinesses?: boolean;
  ctaText?: string;
  bestFor?: string[];
  useCases?: string[];
}

// Individual creator plans
const individualPlans: Plan[] = [
  {
    id: "creator-basic",
    name: "Creator Basic",
    price: 0,
    billingPeriod: "monthly",
    description: "Perfect for beginners looking to establish their online presence",
    features: [
      { name: "Basic profile customization", included: true },
      { name: "Up to 10 portfolio items", included: true },
      { name: "Basic analytics", included: true },
      { name: "Community access", included: true },
      { name: "Limited project collaboration tools", included: true },
      { name: "Standard support", included: true },
      { name: "Featured profile placement", included: false },
      { name: "Advanced analytics", included: false },
      { name: "Custom branding", included: false },
      { name: "Priority support", included: false },
      { name: "Client management tools", included: false },
      { name: "Contract templates", included: false }
    ],
    ctaText: "Get Started Free",
    bestFor: ["Hobbyists", "Students", "Beginners"],
    useCases: ["Building your first portfolio", "Exploring creative opportunities"]
  },
  {
    id: "creator-pro",
    name: "Creator Pro",
    price: 49.99,
    billingPeriod: "monthly",
    description: "For serious creators ready to take their career to the next level",
    popular: true,
    features: [
      { name: "Advanced profile customization", included: true },
      { name: "Unlimited portfolio items", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Community access", included: true },
      { name: "Full project collaboration tools", included: true },
      { name: "Priority support", included: true },
      { name: "Featured profile placement", included: true },
      { name: "Custom branding", included: true },
      { name: "Client management tools", included: true },
      { name: "Contract templates", included: true },
      { name: "Project milestone tracking", included: true },
      { name: "Custom domain", included: false }
    ],
    ctaText: "Upgrade to Pro",
    bestFor: ["Professional Creators", "Freelancers", "Independent Producers"],
    useCases: [
      "Game development projects", 
      "Animation production", 
      "Film & video production", 
      "Managing client relationships"
    ]
  },
  {
    id: "creator-premium",
    name: "Creator Premium",
    price: 99.99,
    billingPeriod: "monthly",
    description: "The ultimate toolkit for professional creators and small studios",
    features: [
      { name: "Everything in Creator Pro", included: true },
      { name: "Custom domain", included: true },
      { name: "White-label presentation tools", included: true },
      { name: "Team collaboration (up to 5 members)", included: true },
      { name: "Advanced project management", included: true },
      { name: "Dedicated account manager", included: true },
      { name: "Early access to new features", included: true },
      { name: "API access", included: true },
      { name: "Custom integrations", included: true },
      { name: "Advanced security features", included: true },
      { name: "Unlimited storage", included: true },
      { name: "Premium analytics", included: true }
    ],
    ctaText: "Go Premium",
    bestFor: ["Small Studios", "Production Teams", "Established Creators"],
    useCases: [
      "Managing multiple production projects",
      "Team collaboration on game development",
      "Animation series production",
      "Professional client presentations"
    ]
  }
];

// Business/organization plans
const businessPlans: Plan[] = [
  {
    id: "business-essential",
    name: "Organization Essential",
    price: 1000,
    billingPeriod: "monthly",
    description: "Essential tools for events, festivals, and creative organizations",
    forBusinesses: true,
    features: [
      { name: "Branded organization profile", included: true },
      { name: "Event management tools", included: true },
      { name: "Basic ticketing service", included: true },
      { name: "Attendee directory", included: true },
      { name: "Basic analytics dashboard", included: true },
      { name: "Email marketing tools", included: true },
      { name: "Community management", included: true },
      { name: "Standard support", included: true },
      { name: "Hybrid event capabilities", included: false },
      { name: "Advanced analytics", included: false },
      { name: "Custom branding", included: false },
      { name: "Priority support", included: false }
    ],
    ctaText: "Contact Sales",
    bestFor: ["Small Festivals", "Local Events", "Community Organizations"],
    useCases: [
      "Local film screenings",
      "Game jams",
      "Animation showcases",
      "Industry meetups"
    ]
  },
  {
    id: "business-professional",
    name: "Organization Professional",
    price: 2500,
    billingPeriod: "monthly",
    description: "Comprehensive solution for professional events and organizations",
    forBusinesses: true,
    popular: true,
    features: [
      { name: "Everything in Organization Essential", included: true },
      { name: "Advanced ticketing system", included: true },
      { name: "Hybrid event capabilities", included: true },
      { name: "Live streaming integration", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Custom branding", included: true },
      { name: "Priority support", included: true },
      { name: "Sponsor management", included: true },
      { name: "Multi-track event scheduling", included: true },
      { name: "Speaker/talent management", included: true },
      { name: "Mobile event app", included: true },
      { name: "Advanced security features", included: false }
    ],
    ctaText: "Contact Sales",
    bestFor: ["Mid-sized Festivals", "Industry Conferences", "Professional Organizations"],
    useCases: [
      "Game developer conferences",
      "Animation festivals",
      "Film festivals",
      "Industry award events"
    ]
  },
  {
    id: "business-enterprise",
    name: "Organization Enterprise",
    price: 5000,
    billingPeriod: "monthly",
    description: "Enterprise-grade solution for major events and organizations",
    forBusinesses: true,
    recommended: true,
    features: [
      { name: "Everything in Organization Professional", included: true },
      { name: "Advanced security features", included: true },
      { name: "Custom integrations", included: true },
      { name: "API access", included: true },
      { name: "White-label solutions", included: true },
      { name: "Dedicated account manager", included: true },
      { name: "24/7 premium support", included: true },
      { name: "Multi-event management", included: true },
      { name: "Global payment processing", included: true },
      { name: "Advanced reporting", included: true },
      { name: "Custom development", included: true },
      { name: "On-site support options", included: true }
    ],
    ctaText: "Contact Sales",
    bestFor: ["Major Festivals", "International Events", "Large Organizations"],
    useCases: [
      "Cannes Film Festival",
      "Paris Games Week",
      "International animation expos",
      "Global industry conferences"
    ]
  }
];

// Use cases for different types of users
const useCases = [
  {
    title: "Game Producers",
    icon: <Gamepad className="h-8 w-8 text-purple-500" />,
    description: "Perfect for game developers and producers working on mobile, console, or PC games",
    benefits: [
      "Showcase game development progress",
      "Connect with publishers and investors",
      "Manage development team collaboration",
      "Track milestones and deliverables",
      "Present builds and demos securely"
    ]
  },
  {
    title: "Animation Producers",
    icon: <Tv className="h-8 w-8 text-blue-500" />,
    description: "Ideal for animation studios and producers creating shows, films, or series",
    benefits: [
      "Present animation portfolios and showreels",
      "Manage production pipelines",
      "Collaborate with distributed animation teams",
      "Share work-in-progress with clients securely",
      "Track production milestones"
    ]
  },
  {
    title: "Film Festivals",
    icon: <Film className="h-8 w-8 text-red-500" />,
    description: "Comprehensive tools for film festival organizers of any size",
    benefits: [
      "Manage film submissions and judging",
      "Sell and manage tickets for screenings",
      "Create hybrid in-person/virtual events",
      "Connect filmmakers with audiences",
      "Provide analytics to sponsors and partners"
    ]
  },
  {
    title: "Industry Events",
    icon: <Building className="h-8 w-8 text-green-500" />,
    description: "Complete solution for conferences, expos, and industry gatherings",
    benefits: [
      "Manage complex multi-track schedules",
      "Handle speaker and sponsor relationships",
      "Provide networking opportunities",
      "Offer virtual attendance options",
      "Generate comprehensive event analytics"
    ]
  }
];

// FAQ items
const faqItems = [
  {
    question: "Can I switch between plans?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to new features and will be billed the prorated difference. When downgrading, the change will take effect at the end of your current billing cycle."
  },
  {
    question: "Do you offer discounts for yearly billing?",
    answer: "Yes, all our plans offer a 20% discount when billed annually instead of monthly. This option is available during signup or can be changed in your billing settings."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers for business plans. For enterprise plans, we can also accommodate purchase orders and other corporate payment methods."
  },
  {
    question: "Is there a free trial for paid plans?",
    answer: "Yes, we offer a 14-day free trial for all Creator plans and a 30-day trial for Organization plans. No credit card is required to start your trial."
  },
  {
    question: "Can I get a custom plan for my specific needs?",
    answer: "Absolutely! For organizations with specific requirements, we offer custom plans tailored to your exact needs. Contact our sales team to discuss your requirements."
  },
  {
    question: "What kind of support is included?",
    answer: "All plans include access to our help center and community forums. Paid plans include email support with varying response times based on your plan level. Organization Professional and Enterprise plans include priority support with dedicated account managers."
  }
];

function PlansPage() {
  const { theme, colorMode } = useTheme();
  const [planType, setPlanType] = useState<'individual' | 'business'>('individual');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    organization: '',
    planInterest: '',
    message: ''
  });
  
  const yearlyDiscount = 0.2; // 20% discount for yearly billing
  
  const calculateYearlyPrice = (monthlyPrice: number) => {
    return (monthlyPrice * 12 * (1 - yearlyDiscount)).toFixed(2);
  };
  
  const handlePlanTypeChange = (type: 'individual' | 'business') => {
    setPlanType(type);
  };
  
  const handleBillingPeriodChange = (period: 'monthly' | 'yearly') => {
    setBillingPeriod(period);
  };
  
  const handleContactClick = (planId: string) => {
    setContactFormData({
      ...contactFormData,
      planInterest: planId
    });
    setShowContactForm(true);
  };
  
  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactFormData({
      ...contactFormData,
      [name]: value
    });
  };
  
  const handleContactFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the form data to a backend
    console.log('Contact form submitted:', contactFormData);
    alert('Thanks for your interest! Our sales team will contact you shortly.');
    setShowContactForm(false);
    setContactFormData({
      name: '',
      email: '',
      organization: '',
      planInterest: '',
      message: ''
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Choose the Perfect Plan for Your Creative Journey
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Whether you're an individual creator or an organization, we have tailored solutions to help you showcase your work and connect with your audience.
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
              onClick={() => handlePlanTypeChange('individual')}
            >
              Individual Creators
            </button>
            <button
              className={`px-6 py-3 rounded-md text-sm font-medium ${
                planType === 'business'
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={() => handlePlanTypeChange('business')}
            >
              Organizations & Events
            </button>
          </div>
        </div>
        
        {/* Billing Period Selector (only for individual plans) */}
        {planType === 'individual' && (
          <div className="flex justify-center mb-12">
            <div className="flex items-center">
              <span className={`mr-3 text-sm font-medium ${billingPeriod === 'monthly' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                Monthly
              </span>
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  billingPeriod === 'yearly' ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
                onClick={() => handleBillingPeriodChange(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    billingPeriod === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`ml-3 text-sm font-medium ${billingPeriod === 'yearly' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                Yearly <span className="text-green-500 font-semibold">(Save 20%)</span>
              </span>
            </div>
          </div>
        )}
        
        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {(planType === 'individual' ? individualPlans : businessPlans).map((plan) => (
            <div 
              key={plan.id}
              className={`relative p-8 bg-white dark:bg-gray-800 border rounded-lg shadow-sm flex flex-col
                ${plan.popular ? 'border-2 border-blue-500 dark:border-blue-400' : 'border-gray-200 dark:border-gray-700'}
                ${plan.recommended ? 'border-2 border-purple-500 dark:border-purple-400' : ''}
              `}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 -mt-3 mr-3 px-3 py-1 bg-blue-500 dark:bg-blue-400 text-white text-xs font-medium rounded-full transform translate-x-2 -translate-y-2">
                  MOST POPULAR
                </div>
              )}
              
              {plan.recommended && (
                <div className="absolute top-0 right-0 -mt-3 mr-3 px-3 py-1 bg-purple-500 dark:bg-purple-400 text-white text-xs font-medium rounded-full transform translate-x-2 -translate-y-2">
                  RECOMMENDED
                </div>
              )}
              
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                <p className="mt-4 text-gray-500 dark:text-gray-400">{plan.description}</p>
              </div>
              
              <div className="mt-2 mb-6">
                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                  ${billingPeriod === 'yearly' && !plan.forBusinesses ? calculateYearlyPrice(plan.price) : plan.price}
                </span>
                <span className="text-base font-medium text-gray-500 dark:text-gray-400">
                  /{plan.forBusinesses ? 'month' : billingPeriod}
                </span>
                
                {billingPeriod === 'yearly' && !plan.forBusinesses && (
                  <p className="mt-1 text-sm text-green-500">
                    Save ${(plan.price * 12 * yearlyDiscount).toFixed(2)} per year
                  </p>
                )}
              </div>
              
              {plan.bestFor && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Best for:</h4>
                  <div className="flex flex-wrap gap-2">
                    {plan.bestFor.map((item, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <ul className="mt-6 space-y-4 flex-1">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 flex-shrink-0 mr-2" />
                    )}
                    <span className={`text-gray-600 dark:text-gray-300 ${!feature.included ? 'text-gray-400 dark:text-gray-500' : ''}`}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                <Button
                  theme={theme}
                  variant={plan.popular || plan.recommended ? "primary" : "secondary"}
                  colorMode={colorMode}
                  className="w-full"
                  onClick={() => plan.forBusinesses ? handleContactClick(plan.id) : console.log(`Selected plan: ${plan.id}`)}
                >
                  {plan.ctaText || (plan.forBusinesses ? 'Contact Sales' : 'Get Started')}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Use Cases Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Tailored for Your Creative Needs
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} theme={theme} colorMode={colorMode} className="p-6">
                <div className="flex items-start">
                  <div className="mr-4 flex-shrink-0">
                    {useCase.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {useCase.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {useCase.description}
                    </p>
                    <ul className="space-y-2">
                      {useCase.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start">
                          <Star className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Features Highlight */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Key Features by Plan Type
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Individual Creator Features */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Briefcase className="h-6 w-6 mr-2 text-blue-500" />
                Individual Creator Plans
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <Smartphone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Portfolio Showcase</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Present your work in beautiful, customizable portfolios that highlight your skills and creative process.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Analytics & Insights</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Track engagement with your work, understand your audience, and measure the impact of your creative projects.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Collaboration Tools</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Work seamlessly with clients, team members, and collaborators with integrated project management tools.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Secure Sharing</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Share work-in-progress and confidential projects securely with password protection and expiring links.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Organization Features */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Building className="h-6 w-6 mr-2 text-purple-500" />
                Organization & Event Plans
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                    <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Event Management</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Comprehensive tools for planning, promoting, and managing creative events of any size.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                    <Ticket className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Ticketing & Registration</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Sell tickets, manage registrations, and handle check-ins seamlessly for your events.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                    <Video className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Hybrid Capabilities</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Create engaging experiences that combine in-person and virtual attendance with live streaming and interactive features.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                    <Globe className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Global Reach</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Connect with audiences worldwide with multi-language support, global payment processing, and time zone management.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Creative Journey?</h2>
            <p className="text-lg mb-8 text-white/90">
              Join thousands of creators and organizations already using our platform to showcase their work, connect with audiences, and grow their creative careers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                theme={theme} 
                variant="secondary" 
                colorMode={colorMode}
                className="text-lg py-3 px-6 bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => handlePlanTypeChange('individual')}
              >
                Explore Creator Plans
              </Button>
              <Button 
                theme={theme} 
                variant="primary" 
                colorMode={colorMode}
                className="text-lg py-3 px-6 bg-purple-700 hover:bg-purple-800"
                onClick={() => handlePlanTypeChange('business')}
              >
                Discover Organization Plans
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Sales</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Fill out the form below and our sales team will get in touch with you to discuss your organization's needs.
            </p>
            
            <form onSubmit={handleContactFormSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={contactFormData.name}
                    onChange={handleContactFormChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={contactFormData.email}
                    onChange={handleContactFormChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Organization Name *
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    required
                    value={contactFormData.organization}
                    onChange={handleContactFormChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tell us about your needs
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={contactFormData.message}
                    onChange={handleContactFormChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <Button
                  theme={theme}
                  variant="secondary"
                  colorMode={colorMode}
                  onClick={() => setShowContactForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  theme={theme}
                  variant="primary"
                  colorMode={colorMode}
                  type="submit"
                >
                  Submit Request
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlansPage;