import React, { useState, useEffect } from 'react';
import { 
  Project, 
  ProjectCard, 
  useTheme, 
  Button, 
  Card 
} from 'ui';
import { 
  Search, 
  Filter, 
  X, 
  CheckSquare, 
  Square, 
  Film, 
  SlidersHorizontal,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// Sample projects data
const sampleProjects: Project[] = [
  {
    id: "p1",
    title: "Eco-Friendly Brand Campaign",
    description: "A comprehensive brand identity and campaign for a sustainable product line focused on reducing plastic waste in everyday products.",
    category: "Branding",
    thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    producer: "Maya Rodriguez",
    producerId: "1",
    status: "completed",
    releaseDate: "2023-05-15",
    views: 12500,
    likes: 843,
    awards: ["Sustainable Design Award 2023", "Brand Impact Award"]
  },
  {
    id: "p2",
    title: "Tech Magazine Illustrations",
    description: "Series of editorial illustrations for a technology magazine's feature on the future of AI and machine learning.",
    category: "Illustration",
    thumbnail: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    producer: "Maya Rodriguez",
    producerId: "1",
    status: "completed",
    releaseDate: "2023-08-10",
    views: 8750,
    likes: 621
  },
  {
    id: "p3",
    title: "Mobile App UI Design",
    description: "Complete user interface design for a fitness tracking mobile application with a focus on user experience and accessibility.",
    category: "UI/UX Design",
    thumbnail: "https://images.unsplash.com/photo-1616469829941-c7200edec809?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    producer: "Maya Rodriguez",
    producerId: "1",
    status: "in-progress",
    views: 5200,
    likes: 347
  },
  {
    id: "p4",
    title: "Surreal Landscapes Collection",
    description: "A series of digital art pieces exploring surreal landscapes that blend natural elements with futuristic technology.",
    category: "Digital Art",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    producer: "Alex Rivera",
    producerId: "2",
    status: "completed",
    releaseDate: "2023-04-20",
    views: 32000,
    likes: 2450,
    awards: ["Digital Art Excellence Award", "Concept Art Spotlight"]
  },
  {
    id: "p5",
    title: "Game Character Concepts",
    description: "Character design concepts for an upcoming fantasy RPG game, featuring detailed illustrations and character backstories.",
    category: "Concept Art",
    thumbnail: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    producer: "Alex Rivera",
    producerId: "2",
    status: "in-progress",
    views: 18500,
    likes: 1230
  },
  {
    id: "p6",
    title: "Architectural Visualization",
    description: "3D visualization of a modern sustainable residential building, showcasing innovative design and eco-friendly features.",
    category: "Architecture",
    thumbnail: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    producer: "Carlos Mendez",
    producerId: "3",
    status: "completed",
    releaseDate: "2023-03-05",
    views: 7800,
    likes: 520
  },
  {
    id: "p7",
    title: "Short Film: 'Echoes'",
    description: "A 15-minute sci-fi short film exploring themes of memory and identity in a near-future setting.",
    category: "Film & Video",
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    producer: "Vision Studios",
    producerId: "4",
    status: "completed",
    releaseDate: "2023-02-18",
    views: 45000,
    likes: 3200,
    awards: ["Best Short Film - Indie Film Festival 2023"]
  },
  {
    id: "p8",
    title: "Fashion Collection: 'Urban Nature'",
    description: "A sustainable fashion collection inspired by the intersection of urban environments and natural elements.",
    category: "Fashion",
    thumbnail: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    producer: "Elena Kim",
    producerId: "5",
    status: "completed",
    releaseDate: "2023-07-12",
    views: 12300,
    likes: 980
  },
  {
    id: "p9",
    title: "Ambient Music Album",
    description: "An experimental ambient music album combining electronic and acoustic elements to create immersive soundscapes.",
    category: "Music & Audio",
    thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    producer: "Soundscape Collective",
    producerId: "6",
    status: "completed",
    releaseDate: "2023-01-20",
    views: 8500,
    likes: 720
  }
];

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

interface ProjectsListingPageProps {
  onProjectSelect?: (projectId: string) => void;
}

function ProjectsListingPage({ onProjectSelect }: ProjectsListingPageProps) {
  const { theme, colorMode } = useTheme();
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    categories: [] as string[],
    status: [] as string[],
    hasAwards: false,
    sortBy: 'newest' as 'newest' | 'popular' | 'trending'
  });
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(sampleProjects);
  
  // Filter projects based on search query and filters
  useEffect(() => {
    let result = sampleProjects;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(project => 
        project.title.toLowerCase().includes(query) ||
        project.description?.toLowerCase().includes(query) ||
        project.producer.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query)
      );
    }
    
    // Filter by categories
    if (filters.categories.length > 0) {
      result = result.filter(project => 
        filters.categories.includes(project.category)
      );
    }
    
    // Filter by status
    if (filters.status.length > 0) {
      result = result.filter(project => 
        filters.status.includes(project.status)
      );
    }
    
    // Filter by awards
    if (filters.hasAwards) {
      result = result.filter(project => 
        project.awards && project.awards.length > 0
      );
    }
    
    // Sort projects
    switch (filters.sortBy) {
      case 'newest':
        result = result.sort((a, b) => {
          if (!a.releaseDate) return 1;
          if (!b.releaseDate) return -1;
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        });
        break;
      case 'popular':
        result = result.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case 'trending':
        result = result.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
    }
    
    setFilteredProjects(result);
  }, [searchQuery, filters]);
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const toggleCategory = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };
  
  const toggleStatus = (status: string) => {
    setFilters(prev => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter(s => s !== status)
        : [...prev.status, status]
    }));
  };
  
  const toggleHasAwards = () => {
    setFilters(prev => ({
      ...prev,
      hasAwards: !prev.hasAwards
    }));
  };
  
  const setSortBy = (sortBy: 'newest' | 'popular' | 'trending') => {
    setFilters(prev => ({
      ...prev,
      sortBy
    }));
  };
  
  const clearFilters = () => {
    setFilters({
      categories: [],
      status: [],
      hasAwards: false,
      sortBy: 'newest'
    });
    setSearchQuery('');
  };
  
  const handleProjectClick = (projectId: string) => {
    if (onProjectSelect) {
      onProjectSelect(projectId);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Discover Creative Projects
        </h1>
        
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search projects by title, description, or creator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button 
            theme={theme} 
            variant="secondary" 
            colorMode={colorMode}
            onClick={toggleFilters}
            className="flex items-center"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters {(filters.categories.length > 0 || filters.status.length > 0 || filters.hasAwards) && (
              <span className="ml-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {filters.categories.length + filters.status.length + (filters.hasAwards ? 1 : 0)}
              </span>
            )}
          </Button>
          
          <div className="relative">
            <Button 
              theme={theme} 
              variant="secondary" 
              colorMode={colorMode}
              onClick={() => {}}
              className="flex items-center"
            >
              <SlidersHorizontal className="h-5 w-5 mr-2" />
              Sort: {filters.sortBy === 'newest' ? 'Newest' : filters.sortBy === 'popular' ? 'Most Viewed' : 'Trending'}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
            
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
              <button 
                className={`block w-full text-left px-4 py-2 text-sm ${
                  filters.sortBy === 'newest' 
                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setSortBy('newest')}
              >
                Newest
              </button>
              <button 
                className={`block w-full text-left px-4 py-2 text-sm ${
                  filters.sortBy === 'popular' 
                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setSortBy('popular')}
              >
                Most Viewed
              </button>
              <button 
                className={`block w-full text-left px-4 py-2 text-sm ${
                  filters.sortBy === 'trending' 
                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setSortBy('trending')}
              >
                Trending
              </button>
            </div>
          </div>
        </div>
        
        {/* Filters Panel */}
        {showFilters && (
          <Card theme={theme} colorMode={colorMode} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Categories Filter */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">Categories</h3>
                <div className="max-h-48 overflow-y-auto space-y-2 pr-2">
                  {creativeSectors.map((category) => (
                    <div 
                      key={category}
                      className="flex items-center cursor-pointer"
                      onClick={() => toggleCategory(category)}
                    >
                      {filters.categories.includes(category) ? (
                        <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
                      ) : (
                        <Square className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                      )}
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{category}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Status Filter */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">Status</h3>
                <div className="space-y-2">
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => toggleStatus('completed')}
                  >
                    {filters.status.includes('completed') ? (
                      <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400 mr-2" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">Completed</span>
                  </div>
                  
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => toggleStatus('in-progress')}
                  >
                    {filters.status.includes('in-progress') ? (
                      <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400 mr-2" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">In Progress</span>
                  </div>
                  
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => toggleStatus('upcoming')}
                  >
                    {filters.status.includes('upcoming') ? (
                      <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400 mr-2" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">Upcoming</span>
                  </div>
                </div>
              </div>
              
              {/* Additional Filters */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">Additional Filters</h3>
                <div className="space-y-2">
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={toggleHasAwards}
                  >
                    {filters.hasAwards ? (
                      <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400 mr-2" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">Award-Winning Projects</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Active Filters */}
            {(filters.categories.length > 0 || filters.status.length > 0 || filters.hasAwards) && (
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-2">Active Filters:</h3>
                <div className="flex flex-wrap gap-2">
                  {filters.categories.map(category => (
                    <span 
                      key={category}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    >
                      {category}
                      <button 
                        onClick={() => toggleCategory(category)}
                        className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  
                  {filters.status.map(status => (
                    <span 
                      key={status}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    >
                      {status === 'completed' ? 'Completed' : status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                      <button 
                        onClick={() => toggleStatus(status)}
                        className="ml-1 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  
                  {filters.hasAwards && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      Award-Winning
                      <button 
                        onClick={toggleHasAwards}
                        className="ml-1 text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            )}
          </Card>
        )}
        
        {/* Results Count */}
        <div className="flex items-center gap-2 mb-6">
          <Film className="h-5 w-5 text-gray-400" />
          <span className="text-gray-600 dark:text-gray-300">
            {filteredProjects.length} projects found
          </span>
        </div>
        
        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                theme={theme}
                colorMode={colorMode}
                onClick={handleProjectClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Film className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No projects found</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              We couldn't find any projects matching your current filters. Try adjusting your search criteria or clearing some filters.
            </p>
            <Button 
              theme={theme} 
              variant="secondary" 
              colorMode={colorMode}
              onClick={clearFilters}
              className="mt-4"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectsListingPage;