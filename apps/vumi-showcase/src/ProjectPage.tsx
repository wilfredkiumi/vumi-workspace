import React, { useState, useEffect } from 'react';
import { 
  Project, 
  ProjectContributor,
  useTheme, 
  Button, 
  Card 
} from 'ui';
import { 
  Calendar, 
  Clock, 
  Award, 
  Eye, 
  Heart, 
  Share2, 
  Download, 
  ExternalLink, 
  Tag, 
  Users, 
  MessageSquare,
  ChevronLeft
} from 'lucide-react';

// Sample projects data
const sampleProjects: Record<string, Project> = {
  "p1": {
    id: "p1",
    title: "Eco-Friendly Brand Campaign",
    description: "A comprehensive brand identity and campaign for a sustainable product line focused on reducing plastic waste in everyday products. The project included logo design, packaging, marketing materials, and digital assets all centered around the theme of sustainability and environmental consciousness.",
    category: "Branding",
    thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    producer: "Maya Rodriguez",
    producerId: "1",
    status: "completed",
    releaseDate: "2023-05-15",
    duration: "3 months",
    views: 12500,
    likes: 843,
    awards: ["Sustainable Design Award 2023", "Brand Impact Award"],
    contributors: [
      {
        id: "c1",
        name: "Alex Chen",
        role: "Packaging Designer",
        profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      {
        id: "c2",
        name: "Sarah Johnson",
        role: "Copywriter",
        profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      }
    ],
    mediaUrls: [
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1560393464-5c69a73c5770?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    ],
    showcaseIds: ["s1"]
  },
  "p2": {
    id: "p2",
    title: "Tech Magazine Illustrations",
    description: "Series of editorial illustrations for a technology magazine's feature on the future of AI and machine learning. The illustrations visualize complex concepts in an accessible and engaging way, combining technical accuracy with artistic expression.",
    category: "Illustration",
    thumbnail: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    producer: "Maya Rodriguez",
    producerId: "1",
    status: "completed",
    releaseDate: "2023-08-10",
    duration: "1 month",
    views: 8750,
    likes: 621,
    contributors: [
      {
        id: "c3",
        name: "David Kim",
        role: "Art Director",
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      }
    ],
    mediaUrls: [
      "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
      "https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    ],
    showcaseIds: ["s1", "s2"]
  },
  "p3": {
    id: "p3",
    title: "Mobile App UI Design",
    description: "Complete user interface design for a fitness tracking mobile application with a focus on user experience and accessibility. The design includes a comprehensive design system, user flows, and interactive prototypes.",
    category: "UI/UX Design",
    thumbnail: "https://images.unsplash.com/photo-1616469829941-c7200edec809?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    producer: "Maya Rodriguez",
    producerId: "1",
    status: "in-progress",
    duration: "2 months",
    views: 5200,
    likes: 347,
    contributors: [
      {
        id: "c4",
        name: "Emily Wong",
        role: "UX Researcher",
        profileImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      {
        id: "c5",
        name: "Michael Brown",
        role: "Developer",
        profileImage: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      }
    ],
    mediaUrls: [
      "https://images.unsplash.com/photo-1616469829941-c7200edec809?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    ]
  },
  "p4": {
    id: "p4",
    title: "Surreal Landscapes Collection",
    description: "A series of digital art pieces exploring surreal landscapes that blend natural elements with futuristic technology. Each piece tells a story of a world where nature and technology exist in harmony.",
    category: "Digital Art",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    producer: "Alex Rivera",
    producerId: "2",
    status: "completed",
    releaseDate: "2023-04-20",
    duration: "6 months",
    views: 32000,
    likes: 2450,
    awards: ["Digital Art Excellence Award", "Concept Art Spotlight"],
    mediaUrls: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1604871000636-074fa5117945?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    ],
    showcaseIds: ["s3"]
  },
  "p5": {
    id: "p5",
    title: "Game Character Concepts",
    description: "Character design concepts for an upcoming fantasy RPG game, featuring detailed illustrations and character backstories. The designs include main characters, NPCs, and creatures that inhabit the game world.",
    category: "Concept Art",
    thumbnail: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    producer: "Alex Rivera",
    producerId: "2",
    status: "in-progress",
    duration: "4 months",
    views: 18500,
    likes: 1230,
    mediaUrls: [
      "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    ],
    showcaseIds: ["s4"]
  }
};

// Creative sectors
const creativeSectors = [
  "Animation",
  "Architecture",
  "Branding",
  "Concept Art",
  "Digital Art",
  "Fashion",
  "Film & Video",
  "Game Design",
  "Graphic Design",
  "Illustration",
  "Music & Audio",
  "Photography",
  "UI/UX Design"
];

interface ProjectPageProps {
  projectId: string;
  onBack?: () => void;
  onViewCreator?: (creatorId: string) => void;
}

function ProjectPage({ projectId, onBack, onViewCreator }: ProjectPageProps) {
  const { theme, colorMode } = useTheme();
  const [project, setProject] = useState<Project | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchProject = () => {
      const foundProject = sampleProjects[projectId];
      if (foundProject) {
        setProject(foundProject);
      }
    };
    
    fetchProject();
  }, [projectId]);
  
  const handleLike = () => {
    setIsLiked(!isLiked);
    if (project) {
      // In a real app, this would be an API call to update likes
      const updatedLikes = isLiked ? (project.likes || 0) - 1 : (project.likes || 0) + 1;
      setProject({
        ...project,
        likes: updatedLikes
      });
    }
  };
  
  const handleShare = () => {
    // In a real app, this would open a share dialog
    console.log('Share project:', project?.title);
  };
  
  const handleContactCreator = () => {
    // In a real app, this would open a contact form or messaging interface
    console.log('Contact creator:', project?.producer);
  };
  
  const handleViewCreator = () => {
    // Navigate to the creator's profile
    if (onViewCreator && project?.producerId) {
      onViewCreator(project.producerId);
    }
  };
  
  const handleContributorClick = (contributorId: string) => {
    // Navigate to the contributor's profile
    if (onViewCreator) {
      onViewCreator(contributorId);
    }
  };
  
  if (!project) {
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
            Back to Projects
          </button>
        )}
        
        {/* Project Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{project.title}</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                By <span 
                  className="font-medium hover:underline cursor-pointer" 
                  onClick={handleViewCreator}
                >
                  {project.producer}
                </span>
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                theme={theme} 
                variant="secondary" 
                colorMode={colorMode}
                onClick={handleContactCreator}
                className="text-sm"
              >
                <MessageSquare className="h-4 w-4 mr-2" /> Contact Creator
              </Button>
              <Button 
                theme={theme} 
                variant={isLiked ? "primary" : "secondary"} 
                colorMode={colorMode}
                onClick={handleLike}
                className="text-sm"
              >
                <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} /> 
                {isLiked ? 'Liked' : 'Like'}
              </Button>
              <Button 
                theme={theme} 
                variant="secondary" 
                colorMode={colorMode}
                onClick={handleShare}
                className="text-sm"
              >
                <Share2 className="h-4 w-4 mr-2" /> Share
              </Button>
            </div>
          </div>
          
          {/* Project Status */}
          <div className="flex flex-wrap gap-3 mt-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              project.status === 'completed' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : project.status === 'in-progress'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
            }`}>
              {project.status === 'completed' ? 'Completed' : project.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
            </span>
            
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm flex items-center">
              <Tag className="h-4 w-4 mr-1" />
              {project.category}
            </span>
            
            {project.awards && project.awards.length > 0 && (
              <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-sm flex items-center">
                <Award className="h-4 w-4 mr-1" />
                {project.awards.length} {project.awards.length === 1 ? 'Award' : 'Awards'}
              </span>
            )}
          </div>
        </div>
        
        {/* Project Media Gallery */}
        <div className="mb-12">
          {project.mediaUrls && project.mediaUrls.length > 0 && (
            <div>
              {/* Main Image */}
              <div className="rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4 h-[500px]">
                <img 
                  src={project.mediaUrls[activeImageIndex]} 
                  alt={`${project.title} - Image ${activeImageIndex + 1}`} 
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Thumbnails */}
              {project.mediaUrls.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {project.mediaUrls.map((url, index) => (
                    <div 
                      key={index}
                      className={`w-24 h-24 rounded-md overflow-hidden cursor-pointer ${
                        index === activeImageIndex ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <img 
                        src={url} 
                        alt={`Thumbnail ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Project Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Description */}
          <div className="lg:col-span-2">
            <Card theme={theme} colorMode={colorMode} className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">About This Project</h2>
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                {project.description}
              </p>
            </Card>
            
            {/* Awards Section */}
            {project.awards && project.awards.length > 0 && (
              <Card theme={theme} colorMode={colorMode} className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Awards & Recognition</h2>
                <ul className="space-y-3">
                  {project.awards.map((award, index) => (
                    <li key={index} className="flex items-start">
                      <Award className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-300">{award}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
          
          {/* Right Column - Project Info */}
          <div>
            <Card theme={theme} colorMode={colorMode} className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Project Details</h2>
              <div className="space-y-4">
                {project.releaseDate && (
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Release Date</h3>
                      <p className="text-gray-600 dark:text-gray-400">{new Date(project.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>
                )}
                
                {project.duration && (
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Duration</h3>
                      <p className="text-gray-600 dark:text-gray-400">{project.duration}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start">
                  <Eye className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Views</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {project.views?.toLocaleString() || 0}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Heart className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Likes</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {project.likes?.toLocaleString() || 0}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Contributors */}
            {project.contributors && project.contributors.length > 0 && (
              <Card theme={theme} colorMode={colorMode}>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Contributors</h2>
                <div className="space-y-4">
                  {project.contributors.map((contributor) => (
                    <div 
                      key={contributor.id} 
                      className="flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
                      onClick={() => handleContributorClick(contributor.id)}
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                        {contributor.profileImage ? (
                          <img 
                            src={contributor.profileImage} 
                            alt={contributor.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-gray-600 dark:text-gray-400 font-medium">
                              {contributor.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text- <h3 className="text-sm font-medium text-gray-800 dark:text-white">{contributor.name}</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{contributor.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
        
        {/* Related Projects Section - Placeholder */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">More from this Creator</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* This would be populated with actual related projects in a real app */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-64 animate-pulse"></div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-64 animate-pulse"></div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-64 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;