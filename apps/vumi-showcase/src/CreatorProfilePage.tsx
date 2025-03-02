import React, { useState, useEffect } from 'react';
import { 
  Creator, 
  CreatorProfile, 
  useTheme, 
  ProfileMode, 
  CreatorPlans, 
  CreatorPlan, 
  Card, 
  Button 
} from 'ui';
import { 
  CheckCircle, 
  Star, 
  Award, 
  Calendar, 
  MapPin, 
  Users, 
  ExternalLink 
} from 'lucide-react';

// Sample creator data for demonstration - Influencer type
const influencerCreator: Creator = {
  id: "1",
  workspaceId: "ws-123",
  name: "Maya Rodriguez",
  username: "mayarodriguez",
  bio: "Award-winning graphic designer and illustrator with a passion for creating visually stunning and meaningful designs that tell a story and connect with audiences.",
  profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  coverImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  location: {
    city: "New York",
    country: "USA"
  },
  categories: ["Graphic Design", "Illustration", "Branding", "Typography"],
  skills: ["Adobe Creative Suite", "Illustration", "Logo Design", "Brand Identity", "Typography", "UI Design", "Print Design"],
  experience: [
    {
      role: "Senior Designer",
      company: "Creative Studio NYC",
      startDate: "Apr 2019",
      description: "Lead designer for major brand campaigns and identity projects for clients across various industries."
    },
    {
      role: "Graphic Designer",
      company: "Design Agency X",
      startDate: "Jun 2016",
      endDate: "Mar 2019",
      description: "Created visual concepts for print and digital media, collaborating with creative directors and clients."
    },
    {
      role: "Junior Designer",
      company: "Startup Y",
      startDate: "Jan 2014",
      endDate: "May 2016",
      description: "Assisted in developing brand identities and marketing materials for tech startups."
    }
  ],
  portfolio: [
    {
      title: "Eco-Friendly Brand Identity",
      description: "Complete brand identity for a sustainable product line, including logo, packaging, and marketing materials.",
      thumbnailUrl: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      projectUrl: "https://example.com/project1"
    },
    {
      title: "Magazine Redesign",
      description: "Complete redesign of a lifestyle magazine, including typography system, layout templates, and cover design.",
      thumbnailUrl: "https://images.unsplash.com/photo-1544084944-15c3893308ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      projectUrl: "https://example.com/project2"
    },
    {
      title: "Tech Conference Branding",
      description: "Brand identity and event materials for a major tech conference, including logo, signage, and digital assets.",
      thumbnailUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      projectUrl: "https://example.com/project3"
    }
  ],
  socialLinks: [
    {
      platform: "instagram",
      url: "https://instagram.com/mayarodriguez",
      followers: 15000
    },
    {
      platform: "behance",
      url: "https://behance.net/mayarodriguez",
      followers: 8500
    },
    {
      platform: "linkedin",
      url: "https://linkedin.com/in/mayarodriguez",
      followers: 3200
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
  creatorType: "influencer",
  mode: ProfileMode.PRO,
  isAvailableForHire: true,
  freelanceStatus: true,
  fulltimeStatus: false,
  followers: 30000,
  following: 450,
  awards: [
    {
      title: "Design Excellence Award",
      organization: "Design Association",
      year: "2022",
      description: "Recognized for outstanding contribution to brand design."
    },
    {
      title: "Young Designer of the Year",
      organization: "Creative Industry Awards",
      year: "2020",
      description: "Awarded for innovative approach to typography and visual communication."
    }
  ],
  education: [
    {
      degree: "BFA in Graphic Design",
      institution: "School of Visual Arts",
      year: "2014",
      description: "Graduated with honors, specializing in typography and brand identity."
    }
  ],
  projects: [
    {
      id: "p1",
      title: "Eco-Friendly Brand Campaign",
      description: "A comprehensive brand identity and campaign for a sustainable product line.",
      category: "Branding",
      thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      producer: "Maya Rodriguez",
      producerId: "1",
      status: "completed",
      releaseDate: "2023-05-15",
      views: 12500,
      likes: 843
    },
    {
      id: "p2",
      title: "Tech Magazine Illustrations",
      description: "Series of editorial illustrations for a technology magazine's feature on AI.",
      category: "Illustration",
      thumbnail: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
      producer: "Maya Rodriguez",
      producerId: "1",
      status: "completed",
      releaseDate: "2023-08-10",
      views: 8750,
      likes: 621
    }
  ],
  showcases: [
    {
      id: "s1",
      title: "Design Innovation Expo 2023",
      description: "Annual exhibition showcasing innovative design work across multiple disciplines.",
      thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      startDate: "2023-06-15",
      endDate: "2023-06-18",
      location: "New York Design Center, NY",
      organizer: "Design Association of America"
    }
  ]
};

// Sample creator data for demonstration - Digital Artist
const digitalArtistCreator: Creator = {
  id: "2",
  workspaceId: "ws-456",
  name: "Alex Rivera",
  username: "alexrivera",
  bio: "Digital artist specializing in surreal landscapes and conceptual art that explores the intersection of nature and technology. My work aims to create immersive visual experiences that challenge perception.",
  profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  location: {
    city: "Portland",
    country: "USA"
  },
  categories: ["Digital Art", "Concept Art", "Illustration", "3D Modeling"],
  skills: ["Digital Painting", "Photoshop", "Concept Development", "3D Modeling", "Animation", "Character Design", "Environment Design"],
  experience: [
    {
      role: "Digital Artist",
      company: "Dreamscape Studios",
      startDate: "Jun 2018",
      description: "Created concept art and digital illustrations for video games and film projects."
    },
    {
      role: "Concept Artist",
      company: "Game Developer X",
      startDate: "Aug 2015",
      endDate: "May 2018",
      description: "Developed visual concepts for characters, environments, and props for AAA game titles."
    }
  ],
  portfolio: [
    {
      title: "Digital Dreamscapes",
      description: "A series of surreal digital landscapes exploring themes of nature and technology.",
      thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      projectUrl: "https://example.com/project1"
    },
    {
      title: "Character Concepts",
      description: "Character designs and concepts for a fantasy RPG game.",
      thumbnailUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      projectUrl: "https://example.com/project2"
    }
  ],
  socialLinks: [
    {
      platform: "instagram",
      url: "https://instagram.com/alexrivera",
      followers: 28000
    },
    {
      platform: "artstation",
      url: "https://artstation.com/alexrivera",
      followers: 15000
    }
  ],
  metrics: {
    rating: 4.9,
    responseRate: 92,
    completedProjects: 47,
    reviewCount: 39
  },
  verified: true,
  featured: false,
  creatorType: "influencer",
  mode: ProfileMode.PREMIUM,
  isAvailableForHire: true,
  freelanceStatus: true,
  fulltimeStatus: false,
  followers: 45000,
  following: 320,
  awards: [
    {
      title: "Digital Art Excellence Award",
      organization: "Digital Artists Guild",
      year: "2021",
      description: "Recognized for innovative techniques in digital landscape art."
    }
  ],
  education: [
    {
      degree: "BFA in Digital Arts",
      institution: "Pacific Northwest College of Art",
      year: "2015",
      description: "Focused on digital illustration and concept art."
    }
  ],
  projects: [
    {
      id: "p4",
      title: "Surreal Landscapes Collection",
      description: "A series of digital art pieces exploring surreal landscapes.",
      category: "Digital Art",
      thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      producer: "Alex Rivera",
      producerId: "2",
      status: "completed",
      releaseDate: "2023-04-20",
      views: 32000,
      likes: 2450
    },
    {
      id: "p5",
      title: "Game Character Concepts",
      description: "Character design concepts for an upcoming fantasy RPG game.",
      category: "Concept Art",
      thumbnail: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      producer: "Alex Rivera",
      producerId: "2",
      status: "in-progress",
      views: 18500,
      likes: 1230
    }
  ],
  showcases: [
    {
      id: "s3",
      title: "Concept Art Expo",
      description: "Exhibition showcasing concept art from video games, films, and animation projects.",
      thumbnail: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      startDate: "2023-11-05",
      endDate: "2023-11-08",
      location: "Portland Convention Center, OR",
      organizer: "Game Artists Guild"
    }
  ]
};

// Map of all creators by ID for easy lookup
const creatorsMap: Record<string, Creator> = {
  "1": influencerCreator,
  "2": digitalArtistCreator
};

interface CreatorProfilePageProps {
  selectedCreatorId: string | null;
  onViewProject?: (projectId: string) => void;
  onViewShowcase?: (showcaseId: string) => void;
  onViewCreator?: (creatorId: string) => void;
}

function CreatorProfilePage({ 
  selectedCreatorId, 
  onViewProject,
  onViewShowcase,
  onViewCreator
}: CreatorProfilePageProps) {
  const { theme, colorMode } = useTheme();
  const [currentCreator, setCurrentCreator] = useState<Creator | null>(null);
  const [activeTab, setActiveTab] = useState<string>('portfolio');
  const [showPlans, setShowPlans] = useState(false);
  
  // Set the current creator based on the selected ID or default to the first creator
  useEffect(() => {
    if (selectedCreatorId && creatorsMap[selectedCreatorId]) {
      setCurrentCreator(creatorsMap[selectedCreatorId]);
    } else {
      // If no creator is selected, use the default
      setCurrentCreator(influencerCreator);
    }
  }, [selectedCreatorId]);
  
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
  
  const handleViewProject = (projectId: string) => {
    if (onViewProject) {
      onViewProject(projectId);
    }
  };
  
  const handleViewShowcase = (showcaseId: string) => {
    if (onViewShowcase) {
      onViewShowcase(showcaseId);
    }
  };
  
  const handleViewCreator = (creatorId: string) => {
    if (onViewCreator) {
      onViewCreator(creatorId);
    }
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
      <div className="max-w-7xl mx-auto">
        {/* Creator Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
          {/* Cover Image */}
          <div className="h-64 relative">
            {currentCreator.coverImage ? (
              <img 
                src={currentCreator.coverImage} 
                alt={`${currentCreator.name}'s cover`} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
            )}
            
            {/* Profile Badge */}
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                currentCreator.mode === ProfileMode.PREMIUM 
                  ? 'bg-yellow-500 text-black' 
                  : currentCreator.mode === ProfileMode.PRO
                    ? 'bg-purple-500 text-white'
                    : 'bg-blue-500 text-white'
              }`}>
                {currentCreator.mode}
              </span>
            </div>
          </div>
          
          {/* Profile Info */}
          <div className="relative px-6 py-6">
            {/* Profile Image */}
            <div className="absolute -top-16 left-6 border-4 border-white dark:border-gray-800 rounded-full overflow-hidden w-32 h-32 bg-white dark:bg-gray-700 shadow-lg">
              {currentCreator.profileImage ? (
                <img 
                  src={currentCreator.profileImage} 
                  alt={currentCreator.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-4xl font-bold">
                  {currentCreator.name.charAt(0)}
                </div>
              )}
              
              {currentCreator.verified && (
                <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full">
                  <CheckCircle className="h-4 w-4" />
                </div>
              )}
            </div>
            
            {/* Creator Info */}
            <div className="ml-36 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                  {currentCreator.name}
                  {currentCreator.featured && (
                    <span className="ml-2 bg-yellow-400 text-yellow-800 text-xs px-2 py-0.5 rounded-full flex items-center">
                      <Award className="h-3 w-3 mr-1" /> Featured
                    </span>
                  )}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">@{currentCreator.username}</p>
              </div>
              
              <div className="flex space-x-3 mt-4 md:mt-0">
                <Button 
                  theme={theme} 
                  variant="secondary" 
                  colorMode={colorMode}
                  onClick={() => handleContact(currentCreator.id)}
                  className="text-sm"
                >
                  Contact
                </Button>
                <Button 
                  theme={theme} 
                  variant="primary" 
                  colorMode={colorMode}
                  onClick={() => handleHire(currentCreator.id)}
                  className="text-sm"
                >
                  Hire
                </Button>
              </div>
            </div>
            
            {/* Creator Stats */}
            <div className="mt-6 flex flex-wrap gap-6">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4 mr-1" />
                {currentCreator.location.city}, {currentCreator.location.country}
              </div>
              
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Star className="h-4 w-4 mr-1 text-yellow-500" />
                {currentCreator.metrics.rating} ({currentCreator.metrics.reviewCount} reviews)
              </div>
              
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Users className="h-4 w-4 mr-1" />
                {currentCreator.followers?.toLocaleString()} followers
              </div>
              
              {currentCreator.isAvailableForHire !== undefined && (
                <div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    currentCreator.isAvailableForHire 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {currentCreator.isAvailableForHire ? 'Available for hire' : 'Not available for hire'}
                  </span>
                </div>
              )}
            </div>
            
            {/* Bio */}
            <div className="mt-6">
              <p className="text-gray-600 dark:text-gray-300">
                {currentCreator.bio}
              </p>
            </div>
            
            {/* Social Links */}
            {currentCreator.socialLinks && currentCreator.socialLinks.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-4">
                {currentCreator.socialLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    <span className="text-sm">{link.platform}</span>
                    {link.followers && (
                      <span className="ml-1 text-xs bg-gray-100 dark:bg-gray-700 px-1.5 rounded">
                        {link.followers > 1000 ? `${(link.followers / 1000).toFixed(1)}K` : link.followers}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Tabs Navigation */}
        <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 overflow-x-auto">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'portfolio'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('portfolio')}
            >
              Portfolio
            </button>
            
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'projects'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('projects')}
            >
              Projects
            </button>
            
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'showcases'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('showcases')}
            >
              Showcases
            </button>
            
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'awards'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('awards')}
            >
              Awards
            </button>
            
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'about'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('about')}
            >
              About
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="pb-12">
          {/* Portfolio Tab */}
          {activeTab === 'portfolio' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Portfolio</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentCreator.portfolio.map((item, index) => (
                  <Card key={index} theme={theme} colorMode={colorMode} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={item.thumbnailUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                        {item.description}
                      </p>
                      <a 
                        href={item.projectUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        View Project <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {/* Projects Tab */}
          {activeTab === 'projects' && currentCreator.projects && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Projects</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentCreator.projects.map((project) => (
                  <Card key={project.id} theme={theme} colorMode={colorMode} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleViewProject(project.id)}>
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={project.thumbnail} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{project.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          project.status === 'completed' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                            : project.status === 'in-progress'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        }`}>
                          {project.status === 'completed' ? 'Completed' : project.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {/* Showcases Tab */}
          {activeTab === 'showcases' && currentCreator.showcases && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Showcases</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentCreator.showcases.map((showcase) => (
                  <Card key={showcase.id} theme={theme} colorMode={colorMode} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleViewShowcase(showcase.id)}>
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={showcase.thumbnail} 
                        alt={showcase.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{showcase.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                        {showcase.description}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(showcase.startDate).toLocaleDateString()}
                        {showcase.endDate && ` - ${new Date(showcase.endDate).toLocaleDateString()}`}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {showcase.location}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {/* Awards Tab */}
          {activeTab === 'awards' && currentCreator.awards && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Awards & Recognition</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentCreator.awards.map((award, index) => (
                  <Card key={index} theme={theme} colorMode={colorMode}>
                    <div className="flex items-start">
                      <div className="mr-4 p-2 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                        <Award className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{award.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {award.organization} • {award.year}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          {award.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {/* About Tab */}
          {activeTab === 'about' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">About {currentCreator.name}</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2">
                  <Card theme={theme} colorMode={colorMode} className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Experience</h3>
                    <div className="space-y-6">
                      {currentCreator.experience.map((exp, index) => (
                        <div key={index} className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 pb-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{exp.role}</h4>
                              <p className="text-gray-600 dark:text-gray-300">{exp.company}</p>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : '- Present'}
                            </span>
                          </div>
                          <p className="mt-2 text-gray-600 dark:text-gray-300">
                            {exp.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Card>
                  
                  {currentCreator.education && (
                    <Card theme={theme} colorMode={colorMode} className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Education</h3>
                      <div className="space-y-6">
                        {currentCreator.education.map((edu, index) => (
                          <div key={index} className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 pb-6">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{edu.degree}</h4>
                                <p className="text-gray-600 dark:text-gray-300">{edu.institution}</p>
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {edu.year}
                              </span>
                            </div>
                            {edu.description && (
                              <p className="mt-2 text-gray-600 dark:text-gray-300">
                                {edu.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                </div>
                
                {/* Right Column */}
                <div>
                  <Card theme={theme} colorMode={colorMode} className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Skills & Expertise</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {currentCreator.categories.map((category, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {currentCreator.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreatorProfilePage;