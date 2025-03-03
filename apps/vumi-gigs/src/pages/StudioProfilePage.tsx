import React, { useState, useEffect } from 'react';
import { useTheme, Button, Card } from 'ui';
import { Studio } from '../models';
import { MapPin, Mail, Phone, Globe, Star, Users, Film, Award, Camera, Briefcase, Building, MessageSquare, ChevronLeft, ExternalLink, CheckCircle, Calendar, Heart, Share2, Tag, PenTool as Tool } from 'lucide-react';

// Sample studio data
const sampleStudio: Studio = {
  id: "s1",
  name: "Dreamscape Studios",
  description: "Full-service production studio specializing in animation, VFX, and game development. Our team of experienced artists and developers creates stunning visual content for clients worldwide.",
  logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
  coverImage: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  location: {
    city: "Los Angeles",
    country: "USA"
  },
  industry: ["Animation", "VFX", "Game Development"],
  services: [
    "3D Animation",
    "Character Design",
    "VFX Production",
    "Game Asset Creation",
    "Motion Capture"
  ],
  equipment: [
    "RED Cinema Cameras",
    "Motion Capture Studio",
    "VR Development Kit",
    "Professional Audio Suite"
  ],
  facilities: [
    "5000 sq ft Studio Space",
    "Green Screen Room",
    "Recording Studio",
    "Edit Suites"
  ],
  teamMembers: [
    {
      id: "tm1",
      name: "Sarah Chen",
      role: "Creative Director",
      profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      bio: "Award-winning creative director with 15 years of experience in animation and VFX."
    },
    {
      id: "tm2",
      name: "Michael Rodriguez",
      role: "Technical Director",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      bio: "Expert in pipeline development and technical optimization for animation and VFX projects."
    },
    {
      id: "tm3",
      name: "Emily Wong",
      role: "Lead Animator",
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      bio: "Specializes in character animation and motion design with a focus on storytelling through movement."
    }
  ],
  projects: [
    {
      id: "p1",
      title: "Mystic Realms",
      description: "Animated feature film with stunning visual effects and character animation.",
      thumbnail: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
      category: "Animation",
      completionDate: "2023-06-15"
    },
    {
      id: "p2",
      title: "Future City VFX",
      description: "Visual effects for a sci-fi series showcasing futuristic cityscapes.",
      thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      category: "VFX",
      completionDate: "2023-08-20"
    },
    {
      id: "p3",
      title: "Adventure Quest Assets",
      description: "Game asset creation including characters, environments, and props.",
      thumbnail: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      category: "Game Development",
      completionDate: "2023-09-10"
    }
  ],
  showcases: [
    {
      id: "sh1",
      title: "Animation Expo 2023",
      description: "Showcasing our latest animation and VFX work.",
      thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      date: "2023-09-20"
    }
  ],
  contacts: {
    email: "contact@dreamscapestudios.com",
    phone: "+1 (323) 555-0123",
    website: "https://dreamscapestudios.com",
    socialMedia: [
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/company/dreamscape-studios"
      },
      {
        platform: "Instagram",
        url: "https://instagram.com/dreamscapestudios"
      },
      {
        platform: "Twitter",
        url: "https://twitter.com/dreamscapestudios"
      }
    ]
  },
  metrics: {
    rating: 4.8,
    completedProjects: 150,
    reviews: 75
  },
  verified: true,
  featured: true,
  createdAt: "2020-01-15T00:00:00Z",
  updatedAt: "2023-09-01T00:00:00Z"
};

interface StudioProfilePageProps {
  studioId: string;
  onBack?: () => void;
  onViewProject?: (projectId: string) => void;
  onViewShowcase?: (showcaseId: string) => void;
}

export function StudioProfilePage({ 
  studioId, 
  onBack,
  onViewProject,
  onViewShowcase
}: StudioProfilePageProps) {
  const { theme, colorMode } = useTheme();
  const [studio, setStudio] = useState<Studio | null>(null);
  const [activeTab, setActiveTab] = useState<'about' | 'projects' | 'team' | 'facilities'>('about');
  const [showContactForm, setShowContactForm] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  useEffect(() => {
    // In a real app, this would fetch the studio data from an API
    setStudio(sampleStudio);
  }, [studioId]);
  
  const handleContact = () => {
    setShowContactForm(true);
  };
  
  const handleShare = () => {
    // In a real app, this would open a share dialog
    console.log('Share studio:', studio?.name);
  };
  
  const handleLike = () => {
    setIsLiked(!isLiked);
  };
  
  const handleProjectClick = (projectId: string) => {
    if (onViewProject) {
      onViewProject(projectId);
    }
  };
  
  const handleShowcaseClick = (showcaseId: string) => {
    if (onViewShowcase) {
      onViewShowcase(showcaseId);
    }
  };
  
  if (!studio) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-300 dark:bg-gray-700 rounded-lg mb-8"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
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
            Back to Studios
          </button>
        )}
        
        {/* Studio Header */}
        <div className="relative rounded-xl overflow-hidden mb-12">
          {/* Cover Image */}
          <div className="h-96 relative">
            {studio.coverImage ? (
              <img 
                src={studio.coverImage} 
                alt={studio.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
          
          {/* Studio Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="flex items-center">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-white mr-6">
                  {studio.logo ? (
                    <img 
                      src={studio.logo} 
                      alt={studio.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-2xl font-bold">
                      {studio.name.charAt(0)}
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <h1 className="text-4xl font-bold mr-3">{studio.name}</h1>
                    {studio.verified && (
                      <CheckCircle className="h-6 w-6 text-blue-500" />
                    )}
                    {studio.featured && (
                      <span className="ml-2 bg-yellow-500 text-black px-2 py-0.5 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center text-white/90">
                    <MapPin className="h-5 w-5 mr-1" />
                    {studio.location.city}, {studio.location.country}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <Button 
                  theme={theme} 
                  variant="secondary" 
                  colorMode={colorMode}
                  onClick={handleShare}
                  className="text-sm"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
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
                  variant="primary" 
                  colorMode={colorMode}
                  onClick={handleContact}
                  className="text-sm"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Studio
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8">
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
            
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'projects'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('projects')}
            >
              Projects & Showcases
            </button>
            
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'team'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('team')}
            >
              Team
            </button>
            
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'facilities'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('facilities')}
            >
              Facilities & Equipment
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'about' && (
              <div className="space-y-8">
                <Card theme={theme} colorMode={colorMode}>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">About the Studio</h2>
                  <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                    {studio.description}
                  </p>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Industries</h3>
                    <div className="flex flex-wrap gap-2">
                      {studio.industry.map((ind, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg text-sm"
                        >
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Services</h3>
                    <div className="flex flex-wrap gap-2">
                      {studio.services.map((service, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
                
                <Card theme={theme} colorMode={colorMode}>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Studio Metrics</h2>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
                        {studio.metrics.rating}
                      </div>
                      <div className="flex items-center justify-center text-yellow-500 mb-1">
                        <Star className="h-5 w-5" />
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Rating
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
                        {studio.metrics.completedProjects}
                      </div>
                      <div className="flex items-center justify-center text-blue-500 mb-1">
                        <Film className="h-5 w-5" />
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Completed Projects
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
                        {studio.metrics.reviews}
                      </div>
                      <div className="flex items-center justify-center text-green-500 mb-1">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Reviews
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
            
            {activeTab === 'projects' && (
              <div className="space-y-8">
                {/* Projects */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Projects</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {studio.projects.map((project) => (
                      <Card 
                        key={project.id} 
                        theme={theme} 
                        colorMode={colorMode}
                        className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => handleProjectClick(project.id)}
                      >
                        <div className="h-48 relative">
                          <img 
                            src={project.thumbnail} 
                            alt={project.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                            {project.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                            {project.description}
                          </p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg">
                              {project.category}
                            </span>
                            {project.completionDate && (
                              <span className="text-gray-500 dark:text-gray-400">
                                Completed {new Date(project.completionDate).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
                
                {/* Showcases */}
                {studio.showcases && studio.showcases.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Showcases</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {studio.showcases.map((showcase) => (
                        <Card 
                          key={showcase.id} 
                          theme={theme} 
                          colorMode={colorMode}
                          className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                          onClick={() => handleShowcaseClick(showcase.id)}
                        >
                          <div className="h-48 relative">
                            <img 
                              src={showcase.thumbnail} 
                              alt={showcase.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                              {showcase.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                              {showcase.description}
                            </p>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(showcase.date).toLocaleDateString()}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'team' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Our Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {studio.teamMembers.map((member) => (
                    <Card key={member.id} theme={theme} colorMode={colorMode} className="p-6">
                      <div className="flex items-start">
                        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                          {member.profileImage ? (
                            <img 
                              src={member.profileImage} 
                              alt={member.name} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                              <span className="text-gray-500 dark:text-gray-400 text-xl font-bold">
                                {member.name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            {member.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                            {member.role}
                          </p>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            {member.bio}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'facilities' && (
              <div className="space-y-8">
                {/* Facilities */}
                <Card theme={theme} colorMode={colorMode}>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Facilities</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {studio.facilities?.map((facility, index) => (
                      <div 
                        key={index}
                        className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <Building className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                        <span className="text-gray-700 dark:text-gray-300">{facility}</span>
                      </div>
                    ))}
                  </div>
                </Card>
                
                {/* Equipment */}
                <Card theme={theme} colorMode={colorMode}>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Equipment</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {studio.equipment?.map((equipment, index) => (
                      <div 
                        key={index}
                        className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <Tool className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                        <span className="text-gray-700 dark:text-gray-300">{equipment}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}
          </div>
          
          {/* Right Column - Contact Info */}
          <div>
            <Card theme={theme} colorMode={colorMode} className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Contact Information</h2>
              <div className="space-y-4">
                {studio.contacts.email && (
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                    <a 
                      href={`mailto:${studio.contacts.email}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {studio.contacts.email}
                    </a>
                  </div>
                )}
                
                {studio.contacts.phone && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                    <a 
                      href={`tel:${studio.contacts.phone}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {studio.contacts.phone}
                    </a>
                  </div>
                )}
                
                {studio.contacts.website && (
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                    <a 
                      href={studio.contacts.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                    >
                      Visit Website
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                )}
                
                {studio.contacts.socialMedia && studio.contacts.socialMedia.length > 0 && (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Social Media
                    </h3>
                    <div className="space-y-2">
                      {studio.contacts.socialMedia.map((social, index) => (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600 dark:text-blue-400 hover: underline"
                        >
                          <Globe className="h-4 w-4 mr-2" />
                          {social.platform}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
            
            {/* Quick Stats */}
            <Card theme={theme} colorMode={colorMode} className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Team Size</span>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {studio.teamMembers.length} members
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Projects Completed</span>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {studio.metrics.completedProjects}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Client Reviews</span>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {studio.metrics.reviews}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Member Since</span>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {new Date(studio.createdAt).getFullYear()}
                  </span>
                </div>
              </div>
            </Card>
            
            {/* Industry & Services */}
            <Card theme={theme} colorMode={colorMode}>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Specializations</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Industries</h3>
                  <div className="flex flex-wrap gap-2">
                    {studio.industry.map((ind, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg text-sm flex items-center"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {studio.services.map((service, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Contact Form Modal */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card theme={theme} colorMode={colorMode} className="max-w-lg w-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Contact {studio.name}
                </h2>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                // Handle form submission
                setShowContactForm(false);
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      required
                    ></textarea>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-4">
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
                    Send Message
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}