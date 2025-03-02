import React, { useState, useEffect } from 'react';
import { Creator, CreatorProfile, useTheme, ProfileMode, CreatorPlans, CreatorPlan } from 'ui';
import { Button } from 'ui';
import { CheckCircle, Calendar, Star, Award, User, Briefcase, MapPin, ExternalLink, Image, Layers } from 'lucide-react';

// Sample creator data for demonstration - Influencer type
const influencerCreator: Creator = {
  id: "1",
  workspaceId: "ws-123",
  name: "Alex Johnson",
  username: "alexjohnson",
  bio: "Lifestyle and tech influencer with a passion for creating engaging content that resonates with young professionals. I specialize in product reviews, tech tutorials, and lifestyle vlogs that help my audience make informed decisions.",
  profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  coverImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1489&q=80",
  location: {
    city: "San Francisco",
    country: "USA"
  },
  categories: ["Technology", "Lifestyle", "Product Reviews", "Tutorials"],
  skills: ["Content Creation", "Video Editing", "Photography", "Social Media Marketing", "SEO", "Storytelling"],
  experience: [
    {
      role: "Tech Influencer",
      company: "Self-employed",
      startDate: "Jan 2020",
      description: "Created tech review content across multiple platforms, growing audience to over 500K followers. Partnered with major tech brands for product launches and campaigns."
    },
    {
      role: "Content Creator",
      company: "TechMedia Inc.",
      startDate: "Mar 2017",
      endDate: "Dec 2019",
      description: "Produced video content for tech news and reviews. Managed social media accounts and developed content strategies."
    },
    {
      role: "Social Media Specialist",
      company: "Digital Marketing Agency",
      startDate: "Jun 2015",
      endDate: "Feb 2017",
      description: "Managed social media accounts for tech clients. Created content calendars and engagement strategies."
    }
  ],
  portfolio: [
    {
      title: "Smartphone Review Series",
      description: "In-depth video reviews of the latest smartphone releases, focusing on user experience and practical applications.",
      thumbnailUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      projectUrl: "https://example.com/project1"
    },
    {
      title: "Tech Productivity Hacks",
      description: "Series of short-form videos showcasing productivity tools and techniques for professionals.",
      thumbnailUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      projectUrl: "https://example.com/project2"
    },
    {
      title: "Home Office Setup Guide",
      description: "Comprehensive guide to creating an ergonomic and productive home office environment.",
      thumbnailUrl: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      projectUrl: "https://example.com/project3"
    }
  ],
  socialLinks: [
    {
      platform: "youtube",
      url: "https://youtube.com/alexjohnson",
      followers: 350000
    },
    {
      platform: "instagram",
      url: "https://instagram.com/alexjohnson",
      followers: 180000
    },
    {
      platform: "twitter",
      url: "https://twitter.com/alexjohnson",
      followers: 120000
    }
  ],
  metrics: {
    rating: 4.9,
    responseRate: 98,
    completedProjects: 47,
    reviewCount: 38
  },
  verified: true,
  featured: true,
  creatorType: "influencer",
  audienceSize: 650000,
  platforms: ["YouTube", "Instagram", "TikTok", "Twitter"],
  contentTypes: ["Video", "Photo", "Live Streams", "Written Content"],
  mode: ProfileMode.PRO,
  isAvailableForHire: true,
  freelanceStatus: true,
  fulltimeStatus: false,
  followers: 650000,
  following: 1200,
  previousClients: ["TechGadget", "SmartHome Inc.", "MobileFirst", "GadgetReview"],
  preferredProjectTypes: ["Product Reviews", "Sponsored Content", "Brand Ambassadorship", "Tutorial Series"]
};

// Sample creator data for demonstration - Crew type
const crewCreator: Creator = {
  id: "2",
  workspaceId: "ws-456",
  name: "Vision Studios",
  username: "visionstudios",
  bio: "Professional video production crew specializing in commercial, documentary, and corporate video content. Our team brings together expertise in cinematography, sound design, and post-production to deliver high-quality visual storytelling.",
  profileImage: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  coverImage: "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1489&q=80",
  location: {
    city: "Los Angeles",
    country: "USA"
  },
  categories: ["Video Production", "Cinematography", "Commercial", "Documentary"],
  skills: ["Video Production", "Cinematography", "Lighting", "Sound Design", "Editing", "Color Grading", "Drone Operation"],
  experience: [
    {
      role: "Production Team",
      company: "Major Streaming Service",
      startDate: "Mar 2021",
      description: "Produced documentary-style content for streaming platform. Handled all aspects of production from concept to final delivery."
    },
    {
      role: "Commercial Production",
      company: "Various Brands",
      startDate: "Jan 2018",
      endDate: "Feb 2021",
      description: "Created commercial content for national and international brands. Specialized in lifestyle and product-focused advertisements."
    },
    {
      role: "Corporate Video Team",
      company: "Enterprise Solutions Inc.",
      startDate: "Aug 2016",
      endDate: "Dec 2017",
      description: "Produced internal and external corporate communications, training videos, and event coverage."
    }
  ],
  portfolio: [
    {
      title: "Eco-Friendly Brand Campaign",
      description: "Series of commercials highlighting sustainable practices and products for an eco-conscious brand.",
      thumbnailUrl: "https://images.unsplash.com/photo-1626050954744-92bf034ce476?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      projectUrl: "https://example.com/project1"
    },
    {
      title: "Tech Conference Coverage",
      description: "Multi-camera event coverage of a major technology conference, including keynote speeches and interviews.",
      thumbnailUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      projectUrl: "https://example.com/project2"
    },
    {
      title: "Artisan Documentary Series",
      description: "Documentary series profiling traditional craftspeople and their techniques across different cultures.",
      thumbnailUrl: "https://images.unsplash.com/photo-1581974944026-5d6ed762f617?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      projectUrl: "https://example.com/project3"
    }
  ],
  socialLinks: [
    {
      platform: "instagram",
      url: "https://instagram.com/visionstudios",
      followers: 45000
    },
    {
      platform: "vimeo",
      url: "https://vimeo.com/visionstudios",
      followers: 12000
    },
    {
      platform: "linkedin",
      url: "https://linkedin.com/company/visionstudios",
      followers: 8500
    }
  ],
  metrics: {
    rating: 4.8,
    responseRate: 95,
    completedProjects: 63,
    reviewCount: 52
  },
  verified: true,
  featured: true,
  creatorType: "crew",
  teamSize: 6,
  equipmentOwned: ["RED Cinema Camera", "Sony FS7", "DJI Ronin Gimbal", "Professional Lighting Kit", "Sound Recording Equipment", "DJI Mavic Pro 2"],
  specializations: ["Commercial Production", "Documentary", "Corporate Video", "Aerial Cinematography"],
  availability: "Available for projects starting November 2025",
  mode: ProfileMode.PREMIUM,
  isAvailableForHire: true,
  followers: 65000,
  following: 500,
  previousClients: ["Global Tech Corp", "Fashion Brand X", "Startup Y", "Local Business Z"],
  preferredProjectTypes: ["Commercial Production", "Documentary", "Corporate Video", "Event Coverage"]
};

// Sample creator data for additional creators
const additionalCreator: Creator = {
  id: "3",
  workspaceId: "ws-789",
  name: "Sarah Williams",
  username: "sarahwilliams",
  bio: "Professional photographer specializing in portrait and commercial photography with a unique artistic style that captures authentic moments.",
  profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  coverImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1489&q=80",
  location: {
    city: "Chicago",
    country: "USA"
  },
  categories: ["Photography", "Portrait", "Commercial", "Editorial"],
  skills: ["Photography", "Lighting", "Photoshop", "Lightroom", "Art Direction", "Styling"],
  experience: [
    {
      role: "Freelance Photographer",
      company: "Self-employed",
      startDate: "Jan 2018",
      description: "Specialized in portrait and commercial photography for various clients including magazines, brands, and individuals."
    },
    {
      role: "Assistant Photographer",
      company: "Studio 54 Photography",
      startDate: "Mar 2015",
      endDate: "Dec 2017",
      description: "Assisted lead photographers on commercial shoots, managed equipment, and handled post-processing."
    }
  ],
  portfolio: [
    {
      title: "Urban Portrait Series",
      description: "A collection of urban portraits showcasing diverse individuals in city environments.",
      thumbnailUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      projectUrl: "https://example.com/project1"
    },
    {
      title: "Product Photography",
      description: "Commercial product photography for various brands featuring creative compositions and lighting.",
      thumbnailUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      projectUrl: "https://example.com/project2"
    }
  ],
  socialLinks: [
    {
      platform: "instagram",
      url: "https://instagram.com/sarahwilliams",
      followers: 75000
    },
    {
      platform: "behance",
      url: "https://behance.net/sarahwilliams",
      followers: 15000
    }
  ],
  metrics: {
    rating: 4.7,
    responseRate: 90,
    completedProjects: 38,
    reviewCount: 32
  },
  verified: true,
  featured: false,
  creatorType: "influencer",
  audienceSize: 90000,
  platforms: ["Instagram", "Behance", "Pinterest"],
  contentTypes: ["Photo", "Written Content"],
  mode: ProfileMode.BASIC_WITH_ADS,
  isAvailableForHire: true,
  freelanceStatus: true,
  fulltimeStatus: false,
  followers: 90000,
  following: 850,
  previousClients: ["Fashion Magazine X", "Local Business Y", "E-commerce Store Z"],
  preferredProjectTypes: ["Portrait Photography", "Product Photography", "Editorial Shoots"]
};

// Sample plans data
const samplePlans: CreatorPlan[] = [
  {
    id: "basic",
    name: "Basic",
    mode: ProfileMode.BASIC,
    price: 0,
    billingPeriod: "monthly",
    description: "Get started with a basic creator profile",
    features: [
      { name: "Basic profile", included: true },
      { name: "Up to 5 portfolio items", included: true },
      { name: "Limited analytics", included: true },
      { name: "Community access", included: true },
      { name: "Advanced analytics", included: false },
      { name: "Featured profile", included: false },
      { name: "Custom branding", included: false },
      { name: "Priority support", included: false }
    ]
  },
  {
    id: "basic-with-ads",
    name: "Basic+Ads",
    mode: ProfileMode.BASIC_WITH_ADS,
    price: 5,
    billingPeriod: "monthly",
    description: "Basic profile with promotional opportunities",
    features: [
      { name: "Basic profile", included: true },
      { name: "Up to 10 portfolio items", included: true },
      { name: "Limited analytics", included: true },
      { name: "Community access", included: true },
      { name: "Profile promotion", included: true },
      { name: "Advanced analytics", included: false },
      { name: "Featured profile", included: false },
      { name: "Custom branding", included: false }
    ]
  },
  {
    id: "pro",
    name: "Pro",
    mode: ProfileMode.PRO,
    price: 12,
    billingPeriod: "monthly",
    description: "Enhanced profile with advanced features",
    popular: true,
    features: [
      { name: "Enhanced profile", included: true },
      { name: "Unlimited portfolio items", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Community access", included: true },
      { name: "Profile promotion", included: true },
      { name: "Featured in search results", included: true },
      { name: "Custom branding", included: false },
      { name: "Priority support", included: false }
    ]
  },
  {
    id: "premium",
    name: "Premium",
    mode: ProfileMode.PREMIUM,
    price: 29,
    billingPeriod: "monthly",
    description: "All features for professional creators",
    recommended: true,
    features: [
      { name: "Premium profile", included: true },
      { name: "Unlimited portfolio items", included: true },
      { name: "Comprehensive analytics", included: true },
      { name: "Community access", included: true },
      { name: "Priority profile promotion", included: true },
      { name: "Featured in search results", included: true },
      { name: "Custom branding", included: true },
      { name: "Priority support", included: true }
    ]
  }
];

// Map of all creators by ID for easy lookup
const creatorsMap: Record<string, Creator> = {
  "1": influencerCreator,
  "2": crewCreator,
  "3": additionalCreator
};

interface CreatorProfilePageProps {
  selectedCreatorId: string | null;
}

function CreatorProfilePage({ selectedCreatorId }: CreatorProfilePageProps) {
  const { theme, colorMode } = useTheme();
  const [activeCreator, setActiveCreator] = useState<'influencer' | 'crew'>('influencer');
  const [showPlans, setShowPlans] = useState(false);
  const [currentCreator, setCurrentCreator] = useState<Creator | null>(null);
  
  // Set the current creator based on the selected ID or default to the active creator type
  useEffect(() => {
    if (selectedCreatorId && creatorsMap[selectedCreatorId]) {
      setCurrentCreator(creatorsMap[selectedCreatorId]);
      // Also update the active creator type based on the selected creator
      setActiveCreator(creatorsMap[selectedCreatorId].creatorType as 'influencer' | 'crew');
    } else {
      // If no creator is selected, use the default based on active creator type
      setCurrentCreator(activeCreator === 'influencer' ? influencerCreator : crewCreator);
    }
  }, [selectedCreatorId, activeCreator]);
  
  const handleContact = (creatorId: string) => {
    console.log(`Contact creator with ID: ${creatorId}`);
    // Implement contact functionality
  };
  
  const handleHire = (creatorId: string) => {
    console.log(`Hire creator with ID: ${creatorId}`);
    // Implement hire functionality
  };
  
  const handleUpgrade = (creatorId: string) => {
    console.log(`Upgrade creator with ID: ${creatorId}`);
    setShowPlans(true);
  };
  
  const handleSelectPlan = (planId: string) => {
    console.log(`Selected plan: ${planId}`);
    // Implement plan selection functionality
    setShowPlans(false);
  };
  
  const handleCreatorTypeChange = (type: 'influencer' | 'crew') => {
    if (!selectedCreatorId) {
      setActiveCreator(type);
    }
  };
  
  if (showPlans) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-7xl mx-auto">
          <CreatorPlans 
            plans={samplePlans}
            currentPlan={currentCreator?.mode as ProfileMode}
            theme={theme}
            colorMode={colorMode}
            onSelectPlan={handleSelectPlan}
          />
          
          <div className="text-center mt-8">
            <Button 
              theme={theme} 
              variant="secondary" 
              colorMode={colorMode}
              onClick={() => setShowPlans(false)}
              className="mt-4"
            >
              Back to Profile
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  if (!currentCreator) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-5xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-lg mb-8"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
          </div>
          <p className="mt-8 text-gray-600 dark:text-gray-400">Loading creator profile...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-5xl mx-auto">
        {!selectedCreatorId && (
          <div className="mb-6 flex justify-center space-x-4">
            <Button 
              theme={theme} 
              variant={activeCreator === 'influencer' ? 'primary' : 'secondary'} 
              colorMode={colorMode}
              onClick={() => handleCreatorTypeChange('influencer')}
              className="text-sm"
            >
              View Influencer Profile
            </Button>
            <Button 
              theme={theme} 
              variant={activeCreator === 'crew' ? 'primary' : 'secondary'} 
              colorMode={colorMode}
              onClick={() => handleCreatorTypeChange('crew')}
              className="text-sm"
            >
              View Crew Profile
            </Button>
          </div>
        )}
        
        <CreatorProfile 
          creator={currentCreator} 
          theme={theme} 
          colorMode={colorMode}
          onContact={handleContact}
          onHire={handleHire}
          onUpgrade={handleUpgrade}
        />
      </div>
    </div>
  );
}

export default CreatorProfilePage;