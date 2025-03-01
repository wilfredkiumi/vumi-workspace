import React, { useState, useEffect } from 'react';
import { 
  Showcase, 
  Project,
  ProjectCard,
  useTheme, 
  Button, 
  Card 
} from 'ui';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Tag, 
  ExternalLink, 
  Share2, 
  Heart, 
  ChevronLeft,
  Globe,
  DollarSign
} from 'lucide-react';

// Sample showcases data
const sampleShowcases: Record<string, Showcase> = {
  "s1": {
    id: "s1",
    title: "Design Innovation Expo 2023",
    description: "Annual exhibition showcasing the most innovative design work across multiple disciplines including graphic design, UI/UX, and branding. The expo features work from established designers and emerging talents, providing a platform for networking, learning, and inspiration.",
    thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    coverImage: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    startDate: "2023-06-15",
    endDate: "2023-06-18",
    location: "New York Design Center, NY",
    organizer: "Design Association of America",
    organizerId: "org1",
    categories: ["Graphic Design", "UI/UX", "Branding"],
    featured: true,
    projectIds: ["p1", "p2"],
    attendees: 5000,
    price: 25,
    website: "https://example.com/design-expo-2023"
  },
  "s2": {
    id: "s2",
    title: "Digital Art Festival",
    description: "A celebration of digital art and illustration featuring works from leading artists and emerging talents. The festival includes exhibitions, workshops, panel discussions, and networking events focused on digital art creation and appreciation.",
    thumbnail: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    coverImage: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    startDate: "2023-09-10",
    endDate: "2023-09-12",
    location: "Virtual Event",
    organizer: "Digital Artists Collective",
    organizerId: "org2",
    categories: ["Digital Art", "Illustration"],
    featured: false,
    projectIds: ["p2", "p4"],
    attendees: 3500,
    virtual: true,
    website: "https://example.com/digital-art-festival"
  },
  "s3": {
    id: "s3",
    title: "Concept Art Expo",
    description: "Exhibition showcasing concept art from video games, films, and animation projects. The expo highlights the creative process behind visual storytelling and world-building in entertainment media.",
    thumbnail: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    coverImage: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    startDate: "2023-11-05",
    endDate: "2023-11-08",
    location: "Portland Convention Center, OR",
    organizer: "Game Artists Guild",
    organizerId: "org3",
    categories: ["Concept Art", "Game Design", "Animation"],
    projectIds: ["p4", "p5"],
    attendees: 2800,
    price: 35,
    featured: true,
    website: "https://example.com/concept-art-expo"
  }
};

// Sample projects data (simplified for this component)
const sampleProjects: Record<string, Project> = {
  "p1": {
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
  "p2": {
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
  },
  "p4": {
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
  "p5": {
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
};

interface ShowcasePageProps {
  showcaseId: string;
  onBack?: () => void;
  onViewProject?: (projectId: string) => void;
}

function ShowcasePage({ showcaseId, onBack, onViewProject }: ShowcasePageProps) {
  const { theme, colorMode } = useTheme();
  const [showcase, setShowcase] = useState<Showcase | null>(null);
  const [showcaseProjects, setShowcaseProjects] = useState<Project[]>([]);
  const [isInterested, setIsInterested] = useState(false);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchShowcase = () => {
      const foundShowcase = sampleShowcases[showcaseId];
      if (foundShowcase) {
        setShowcase(foundShowcase);
        
        // Fetch related projects
        if (foundShowcase.projectIds && foundShowcase.projectIds.length > 0) {
          const projects = foundShowcase.projectIds
            .map(id => sampleProjects[id])
            .filter(Boolean);
          setShowcaseProjects(projects);
        }
      }
    };
    
    fetchShowcase();
  }, [showcaseId]);
  
  const handleInterested = () => {
    setIsInterested(!isInterested);
    // In a real app, this would update a counter or send data to the server
  };
  
  const handleShare = () => {
    // In a real app, this would open a share dialog
    console.log('Share showcase:', showcase?.title);
  };
  
  const handleRegister = () => {
    // In a real app, this would open a registration form
    console.log('Register for showcase:', showcase?.title);
  };
  
  const handleViewWebsite = () => {
    if (showcase?.website) {
      window.open(showcase.website, '_blank');
    }
  };
  
  const handleProjectClick = (projectId: string) => {
    if (onViewProject) {
      onViewProject(projectId);
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  if (!showcase) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-300 dark:bg-gray-700 rounded-lg mb-8"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        {onBack && (
          <button 
            onClick={onBack}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to Showcases
          </button>
        )}
        
        {/* Showcase Header */}
        <div className="relative rounded-xl overflow-hidden mb-12">
          {/* Cover Image */}
          <div className="h-96 relative">
            {showcase.coverImage ? (
              <img 
                src={showcase.coverImage} 
                alt={showcase.title} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
          
          {/* Overlay Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {showcase.featured && (
                    <span className="px-3 py-1 bg-yellow-500 text-black rounded-full text-sm font-medium">
                      Featured
                    </span>
                  )}
                  
                  {showcase.virtual && (
                    <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-medium">
                      Virtual Event
                    </span>
                  )}
                </div>
                
                <h1 className="text-4xl font-bold mb-2">{showcase.title}</h1>
                <p className="text-white text-opacity-90 text-lg">
                  Organized by {showcase.organizer}
                </p>
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  theme={theme} 
                  variant="secondary" 
                  colorMode={colorMode}
                  onClick={handleShare}
                  className="text-sm"
                >
                  <Share2 className="h-4 w-4 mr-2" /> Share
                </Button>
                <Button 
                  theme={theme} 
                  variant={isInterested ? "primary" : "secondary"} 
                  colorMode={colorMode}
                  onClick={handleInterested}
                  className="text-sm"
                >
                  <Heart className={`h-4 w-4 mr-2 ${isInterested ? 'fill-current' : ''}`} /> 
                  {isInterested ? 'Interested' : 'Interested?'}
                </Button>
                <Button 
                  theme={theme} 
                  variant="primary" 
                  colorMode={colorMode}
                  onClick={handleRegister}
                  className="text-sm"
                >
                  Register
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Showcase Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Description */}
          <div className="lg:col-span-2">
            <Card theme={theme} colorMode={colorMode} className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">About This Showcase</h2>
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                {showcase.description}
              </p>
            </Card>
            
            {/* Featured Projects */}
            {showcaseProjects.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Featured Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {showcaseProjects.map(project => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      theme={theme}
                      colorMode={colorMode}
                      onClick={handleProjectClick}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column - Event Info */}
          <div>
            <Card theme={theme} colorMode={colorMode} className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Event Details</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Date</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {formatDate(showcase.startDate)}
                      {showcase.endDate && ` - ${formatDate(showcase.endDate)}`}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Location</h3>
                    <p className="text-gray-600 dark:text-gray-400">{showcase.location}</p>
                  </div>
                </div>
                
                {showcase.attendees && (
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Attendees</h3>
                      <p className="text-gray-600 dark:text-gray-400">{showcase.attendees.toLocaleString()}</p>
                    </div>
                  </div>
                )}
                
                {showcase.price !== undefined && (
                  <div className="flex items-start">
                    <DollarSign className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Price</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {showcase.price === 0 ? 'Free' : `$${showcase.price}`}
                      </p>
                    </div>
                  </div>
                )}
                
                {showcase.website && (
                  <div className="flex items-start">
                    <Globe className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Website</h3>
                      <button 
                        onClick={handleViewWebsite}
                        className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                      >
                        Visit Website <ExternalLink className="h-3 w-3 ml-1" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
            
            {/* Categories */}
            {showcase.categories && showcase.categories.length > 0 && (
              <Card theme={theme} colorMode={colorMode}>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Categories</h2>
                <div className="flex flex-wrap gap-2">
                  {showcase.categories.map((category, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm flex items-center"
                    >
                      <Tag className="h-4 w-4 mr-1" />
                      {category}
                    </span>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowcasePage;