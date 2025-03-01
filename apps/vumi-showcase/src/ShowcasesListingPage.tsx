import React, { useState, useEffect } from 'react';
import { 
  Showcase, 
  ShowcaseCard, 
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
  Calendar, 
  SlidersHorizontal,
  ChevronDown,
  MapPin,
  Globe,
  Users
} from 'lucide-react';

// Sample showcases data
const sampleShowcases: Showcase[] = [
  {
    id: "s1",
    title: "Design Innovation Expo 2023",
    description: "Annual exhibition showcasing the most innovative design work across multiple disciplines including graphic design, UI/UX, and branding.",
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
    website: "https://example.com/design-expo-2023",
    status: "completed",
    attendanceType: "physical"
  },
  {
    id: "s2",
    title: "Digital Art Festival",
    description: "A celebration of digital art and illustration featuring works from leading artists and emerging talents.",
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
    website: "https://example.com/digital-art-festival",
    status: "in-progress",
    attendanceType: "virtual"
  },
  {
    id: "s3",
    title: "Concept Art Expo",
    description: "Exhibition showcasing concept art from video games, films, and animation projects.",
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
    website: "https://example.com/concept-art-expo",
    status: "upcoming",
    attendanceType: "physical"
  },
  {
    id: "s4",
    title: "Photography Summit 2023",
    description: "A global gathering of photographers showcasing their work and sharing techniques.",
    thumbnail: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    coverImage: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    startDate: "2023-08-15",
    endDate: "2023-08-20",
    location: "Chicago Convention Center, IL",
    organizer: "International Photography Association",
    organizerId: "org4",
    categories: ["Photography"],
    projectIds: [],
    attendees: 4200,
    price: 45,
    featured: false,
    website: "https://example.com/photography-summit",
    status: "completed",
    attendanceType: "hybrid"
  },
  {
    id: "s5",
    title: "Animation Festival 2023",
    description: "Celebrating the art of animation with screenings, workshops, and networking events.",
    thumbnail: "https://images.unsplash.com/photo-1518544801976-3e159b142a05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    coverImage: "https://images.unsplash.com/photo-1518544801976-3e159b142a05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    startDate: "2023-10-12",
    endDate: "2023-10-16",
    location: "Virtual Event",
    organizer: "Animation Society",
    organizerId: "org5",
    categories: ["Animation", "Film & Video"],
    projectIds: [],
    attendees: 5800,
    virtual: true,
    website: "https://example.com/animation-festival",
    status: "in-progress",
    attendanceType: "virtual"
  },
  {
    id: "s6",
    title: "Game Developers Conference",
    description: "The premier event for game developers to share knowledge and showcase their work.",
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    coverImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    startDate: "2024-03-18",
    endDate: "2024-03-22",
    location: "San Francisco, CA",
    organizer: "Game Developers Association",
    organizerId: "org6",
    categories: ["Game Design", "Animation", "UI/UX Design"],
    projectIds: ["p5"],
    attendees: 8500,
    price: 150,
    featured: true,
    website: "https://example.com/game-dev-conference",
    status: "in-development",
    attendanceType: "hybrid"
  },
  {
    id: "s7",
    title: "Fashion Week 2024",
    description: "Showcasing the latest trends and designs from established and emerging fashion designers.",
    thumbnail: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    coverImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    startDate: "2024-02-10",
    endDate: "2024-02-17",
    location: "Milan, Italy",
    organizer: "International Fashion Council",
    organizerId: "org7",
    categories: ["Fashion"],
    projectIds: [],
    attendees: 12000,
    price: 200,
    featured: false,
    website: "https://example.com/fashion-week",
    status: "upcoming",
    attendanceType: "physical"
  },
  {
    id: "s8",
    title: "Architecture & Design Biennale",
    description: "A biennial exhibition showcasing innovative architectural designs and urban planning concepts.",
    thumbnail: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    coverImage: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    startDate: "2024-05-22",
    endDate: "2024-11-21",
    location: "Venice, Italy",
    organizer: "International Architecture Foundation",
    organizerId: "org8",
    categories: ["Architecture"],
    projectIds: [],
    attendees: 25000,
    price: 30,
    featured: true,
    website: "https://example.com/architecture-biennale",
    status: "in-development",
    attendanceType: "physical"
  }
];

// Creative sectors/categories
const showcaseCategories = [
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

interface ShowcasesListingPageProps {
  onShowcaseSelect?: (showcaseId: string) => void;
}

function ShowcasesListingPage({ onShowcaseSelect }: ShowcasesListingPageProps) {
  const { theme, colorMode } = useTheme();
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    categories: [] as string[],
    status: [] as string[],
    attendanceType: [] as string[],
    featured: false,
    sortBy: 'upcoming' as 'upcoming' | 'popular' | 'recent'
  });
  const [filteredShowcases, setFilteredShowcases] = useState<Showcase[]>(sampleShowcases);
  
  // Filter showcases based on search query and filters
  useEffect(() => {
    let result = sampleShowcases;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(showcase => 
        showcase.title.toLowerCase().includes(query) ||
        showcase.description?.toLowerCase().includes(query) ||
        showcase.organizer?.toLowerCase().includes(query) ||
        showcase.location.toLowerCase().includes(query) ||
        showcase.categories?.some(category => category.toLowerCase().includes(query))
      );
    }
    
    // Filter by categories
    if (filters.categories.length > 0) {
      result = result.filter(showcase => 
        showcase.categories?.some(category => filters.categories.includes(category))
      );
    }
    
    // Filter by status
    if (filters.status.length > 0) {
      result = result.filter(showcase => 
        showcase.status && filters.status.includes(showcase.status)
      );
    }
    
    // Filter by attendance type
    if (filters.attendanceType.length > 0) {
      result = result.filter(showcase => 
        showcase.attendanceType && filters.attendanceType.includes(showcase.attendanceType)
      );
    }
    
    // Filter by featured
    if (filters.featured) {
      result = result.filter(showcase => showcase.featured);
    }
    
    // Sort showcases
    switch (filters.sortBy) {
      case 'upcoming':
        result = result.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
        break;
      case 'popular':
        result = result.sort((a, b) => (b.attendees || 0) - (a.attendees || 0));
        break;
      case 'recent':
        result = result.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
        break;
    }
    
    setFilteredShowcases(result);
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
  
  const toggleAttendanceType = (type: string) => {
    setFilters(prev => ({
      ...prev,
      attendanceType: prev.attendanceType.includes(type)
        ? prev.attendanceType.filter(t => t !== type)
        : [...prev.attendanceType, type]
    }));
  };
  
  const toggleFeatured = () => {
    setFilters(prev => ({
      ...prev,
      featured: !prev.featured
    }));
  };
  
  const setSortBy = (sortBy: 'upcoming' | 'popular' | 'recent') => {
    setFilters(prev => ({
      ...prev,
      sortBy
    }));
  };
  
  const clearFilters = () => {
    setFilters({
      categories: [],
      status: [],
      attendanceType: [],
      featured: false,
      sortBy: 'upcoming'
    });
    setSearchQuery('');
  };
  
  const handleShowcaseClick = (showcaseId: string) => {
    if (onShowcaseSelect) {
      onShowcaseSelect(showcaseId);
    }
  };
  
  // Get status label and color
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'completed':
        return { label: 'Completed', color: 'bg-gray-500 text-white' };
      case 'in-progress':
        return { label: 'In Progress', color: 'bg-green-500 text-white' };
      case 'upcoming':
        return { label: 'Upcoming', color: 'bg-blue-500 text-white' };
      case 'in-development':
        return { label: 'In Development', color: 'bg-purple-500 text-white' };
      case 'in-post':
        return { label: 'In Post', color: 'bg-yellow-500 text-black' };
      case 'ready':
        return { label: 'Ready', color: 'bg-teal-500 text-white' };
      case 'released':
        return { label: 'Released', color: 'bg-indigo-500 text-white' };
      default:
        return { label: status, color: 'bg-gray-500 text-white' };
    }
  };
  
  // Get attendance type label and color
  const getAttendanceTypeInfo = (type: string) => {
    switch (type) {
      case 'physical':
        return { label: 'Physical', color: 'bg-orange-500 text-white', icon: <MapPin className="h-3 w-3 mr-1" /> };
      case 'virtual':
        return { label: 'Virtual', color: 'bg-blue-500 text-white', icon: <Globe className="h-3 w-3 mr-1" /> };
      case 'hybrid':
        return { label: 'Hybrid', color: 'bg-purple-500 text-white', icon: <Users className="h-3 w-3 mr-1" /> };
      default:
        return { label: type, color: 'bg-gray-500 text-white', icon: null };
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Discover Creative Showcases
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
              placeholder="Search showcases by title, description, or organizer..."
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
            Filters {(filters.categories.length > 0 || filters.status.length > 0 || filters.attendanceType.length > 0 || filters.featured) && (
              <span className="ml-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {filters.categories.length + filters.status.length + filters.attendanceType.length + (filters.featured ? 1 : 0)}
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
              Sort: {filters.sortBy === 'upcoming' ? 'Upcoming' : filters.sortBy === 'popular' ? 'Most Popular' : 'Recent'}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
            
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
              <button 
                className={`block w-full text-left px-4 py-2 text-sm ${
                  filters.sortBy === 'upcoming' 
                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setSortBy('upcoming')}
              >
                Upcoming
              </button>
              <button 
                className={`block w-full text-left px-4 py-2 text-sm ${
                  filters.sortBy === 'popular' 
                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setSortBy('popular')}
              >
                Most Popular
              </button>
              <button 
                className={`block w-full text-left px-4 py-2 text-sm ${
                  filters.sortBy === 'recent' 
                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setSortBy('recent')}
              >
                Recent
              </button>
            </div>
          </div>
        </div>
        
        {/* Filters Panel */}
        {showFilters && (
          <Card theme={theme} colorMode={colorMode} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Categories Filter */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">Categories</h3>
                <div className="max-h-48 overflow-y-auto space-y-2 pr-2">
                  {showcaseCategories.map((category) => (
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
                    onClick={() => toggleStatus('in-development')}
                  >
                    {filters.status.includes('in-development') ? (
                      <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400 mr-2" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">In Development</span>
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
                    onClick={() => toggleStatus('completed')}
                  >
                    {filters.status.includes('completed') ? (
                      <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400 mr-2" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">Completed</span>
                  </div>
                </div>
              </div>
              
              {/* Attendance Type Filter */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">Attendance Type</h3>
                <div className="space-y-2">
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => toggleAttendanceType('physical')}
                  >
                    {filters.attendanceType.includes('physical') ? (
                      <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400 mr-2" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">Physical</span>
                  </div>
                  
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => toggleAttendanceType('virtual')}
                  >
                    {filters.attendanceType.includes('virtual') ? (
                      <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400 mr-2" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">Virtual</span>
                  </div>
                  
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => toggleAttendanceType('hybrid')}
                  >
                    {filters.attendanceType.includes('hybrid') ? (
                      <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400 mr-2" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">Hybrid</span>
                  </div>
                </div>
              </div>
              
              {/* Additional Filters */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">Additional Filters</h3>
                <div className="space-y-2">
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={toggleFeatured}
                  >
                    {filters.featured ? (
                      <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400 mr-2" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">Featured Showcases</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Active Filters */}
            {(filters.categories.length > 0 || filters.status.length > 0 || filters.attendanceType.length > 0 || filters.featured) && (
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
                  
                  {filters.status.map(status => {
                    const statusInfo = getStatusInfo(status);
                    return (
                      <span 
                        key={status}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      >
                        {statusInfo.label}
                        <button 
                          onClick={() => toggleStatus(status)}
                          className="ml-1 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    );
                  })}
                  
                  {filters.attendanceType.map(type => {
                    const typeInfo = getAttendanceTypeInfo(type);
                    return (
                      <span 
                        key={type}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                      >
                        {typeInfo.label}
                        <button 
                          onClick={() => toggleAttendanceType(type)}
                          className="ml-1 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    );
                  })}
                  
                  {filters.featured && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      Featured
                      <button 
                        onClick={toggleFeatured}
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
          <Calendar className="h-5 w-5 text-gray-400" />
          <span className="text-gray-600 dark:text-gray-300">
            {filteredShowcases.length} showcases found
          </span>
        </div>
        
        {/* Showcases Grid */}
        {filteredShowcases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShowcases.map((showcase) => (
              <div key={showcase.id} className="relative" onClick={() => handleShowcaseClick(showcase.id)}>
                {/* Status Badge */}
                {showcase.status && (
                  <div className="absolute top-2 left-2 z-10">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusInfo(showcase.status).color}`}>
                      {getStatusInfo(showcase.status).label}
                    </span>
                  </div>
                )}
                
                {/* Attendance Type Badge */}
                {showcase.attendanceType && (
                  <div className="absolute top-2 right-2 z-10">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getAttendanceTypeInfo(showcase.attendanceType).color} flex items-center`}>
                      {getAttendanceTypeInfo(showcase.attendanceType).icon}
                      {getAttendanceTypeInfo(showcase.attendanceType).label}
                    </span>
                  </div>
                )}
                
                <ShowcaseCard
                  showcase={showcase}
                  theme={theme}
                  colorMode={colorMode}
                  onClick={handleShowcaseClick}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No showcases found</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              We couldn't find any showcases matching your current filters. Try adjusting your search criteria or clearing some filters.
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

export default ShowcasesListingPage;