import React, { useState, useEffect } from 'react';
import { Search, Filter, X, CheckSquare, Square, Briefcase, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Button, Card, useTheme } from 'ui';
import { GigCard, Gig } from './GigCard';

// Sample gigs data
const sampleGigs: Gig[] = [
  {
    id: "g1",
    title: "3D Character Modeling for Indie Game",
    description: "We're looking for a talented 3D artist to create 5 character models for our upcoming indie game. The characters should be low-poly and match our existing art style. Experience with Blender and Unity is required.",
    category: "Game Development",
    subcategory: "3D Modeling",
    budget: {
      min: 1500,
      max: 3000,
      type: 'fixed'
    },
    duration: "2-4 weeks",
    skills: ["3D Modeling", "Character Design", "Blender", "Unity", "Low-Poly", "Texturing"],
    location: {
      type: 'remote'
    },
    postedBy: {
      id: "u1",
      name: "GameStudio XYZ",
      rating: 4.8,
      verified: true
    },
    postedDate: "2023-06-15",
    deadline: "2023-07-15",
    applicants: 12,
    status: 'open',
    featured: true
  },
  {
    id: "g2",
    title: "Concept Art for Sci-Fi Animation Series",
    description: "We need a concept artist to create environment and character designs for our upcoming sci-fi animation series. The style should be semi-realistic with a focus on unique alien landscapes and diverse character designs.",
    category: "Animation",
    subcategory: "Concept Art",
    budget: {
      min: 2000,
      max: 4000,
      type: 'fixed'
    },
    duration: "1-2 months",
    skills: ["Concept Art", "Character Design", "Environment Design", "Digital Painting", "Sci-Fi", "Storyboarding"],
    location: {
      type: 'remote'
    },
    postedBy: {
      id: "u2",
      name: "Animation Studios Inc.",
      rating: 4.9,
      verified: true
    },
    postedDate: "2023-06-10",
    deadline: "2023-07-10",
    applicants: 8,
    status: 'open'
  },
  {
    id: "g3",
    title: "Video Editor for YouTube Gaming Channel",
    description: "Looking for an experienced video editor to join our team on a part-time basis. You'll be responsible for editing gameplay footage, adding effects, and ensuring our videos meet our quality standards before publishing.",
    category: "Video Production",
    subcategory: "Video Editing",
    budget: {
      min: 25,
      max: 40,
      type: 'hourly'
    },
    duration: "Ongoing",
    skills: ["Video Editing", "Adobe Premiere Pro", "After Effects", "Sound Design", "YouTube", "Gaming Content"],
    location: {
      type: 'remote'
    },
    postedBy: {
      id: "u3",
      name: "GamersUnite Channel",
      rating: 4.7,
      verified: true
    },
    postedDate: "2023-06-18",
    applicants: 24,
    status: 'open'
  },
  {
    id: "g4",
    title: "UI/UX Designer for Mobile Game",
    description: "We're seeking a UI/UX designer to create intuitive and visually appealing interfaces for our upcoming mobile game. The ideal candidate will have experience designing for mobile games and understanding player psychology.",
    category: "Game Development",
    subcategory: "UI/UX Design",
    budget: {
      min: 3000,
      max: 5000,
      type: 'fixed'
    },
    duration: "1-3 months",
    skills: ["UI Design", "UX Design", "Mobile Games", "Figma", "Adobe XD", "Unity"],
    location: {
      type: 'hybrid',
      city: "San Francisco",
      country: "USA"
    },
    postedBy: {
      id: "u4",
      name: "Mobile Games Co.",
      rating: 4.6,
      verified: true
    },
    postedDate: "2023-06-05",
    deadline: "2023-07-05",
    applicants: 18,
    status: 'open'
  },
  {
    id: "g5",
    title: "Sound Designer for Horror Game",
    description: "Looking for a talented sound designer to create atmospheric and terrifying sound effects for our upcoming horror game. Experience with creating immersive audio environments and understanding of horror game audio is essential.",
    category: "Game Development",
    subcategory: "Sound Design",
    budget: {
      min: 2000,
      max: 3500,
      type: 'fixed'
    },
    duration: "2-3 months",
    skills: ["Sound Design", "Audio Engineering", "Foley", "Game Audio", "Horror", "Unity"],
    location: {
      type: 'remote'
    },
    postedBy: {
      id: "u5",
      name: "Nightmare Games",
      rating: 4.5,
      verified: false
    },
    postedDate: "2023-06-12",
    deadline: "2023-07-20",
    applicants: 6,
    status: 'open'
  },
  {
    id: "g6",
    title: "2D Animator for Explainer Video",
    description: "We need a 2D animator to create a 2-minute explainer video for our new software product. The animation should be clean, professional, and effectively communicate our product's features and benefits.",
    category: "Animation",
    subcategory: "2D Animation",
    budget: {
      min: 1000,
      max: 2000,
      type: 'fixed'
    },
    duration: "2-3 weeks",
    skills: ["2D Animation", "After Effects", "Character Animation", "Motion Graphics", "Storyboarding"],
    location: {
      type: 'remote'
    },
    postedBy: {
      id: "u6",
      name: "TechSolutions Ltd.",
      rating: 4.3,
      verified: true
    },
    postedDate: "2023-06-20",
    deadline: "2023-07-10",
    applicants: 15,
    status: 'open'
  },
  {
    id: "g7",
    title: "Storyboard Artist for Animated Short Film",
    description: "Seeking a storyboard artist for a 10-minute animated short film. The artist will work closely with the director to visualize the script and create detailed storyboards that capture the emotion and flow of the story.",
    category: "Animation",
    subcategory: "Storyboarding",
    budget: {
      min: 1500,
      max: 2500,
      type: 'fixed'
    },
    duration: "3-4 weeks",
    skills: ["Storyboarding", "Visual Storytelling", "Character Expressions", "Scene Composition", "Animation"],
    location: {
      type: 'onsite',
      city: "Los Angeles",
      country: "USA"
    },
    postedBy: {
      id: "u7",
      name: "Indie Film Productions",
      rating: 4.9,
      verified: true
    },
    postedDate: "2023-06-08",
    deadline: "2023-07-08",
    applicants: 10,
    status: 'open',
    featured: true
  },
  {
    id: "g8",
    title: "Unity Developer for VR Experience",
    description: "We're looking for an experienced Unity developer to help create an immersive VR experience for a museum exhibition. The ideal candidate will have strong 3D skills and previous experience with VR development.",
    category: "Game Development",
    subcategory: "VR Development",
    budget: {
      min: 40,
      max: 60,
      type: 'hourly'
    },
    duration: "3-6 months",
    skills: ["Unity", "C#", "VR Development", "3D Modeling", "Oculus", "Interactive Design"],
    location: {
      type: 'hybrid',
      city: "Chicago",
      country: "USA"
    },
    postedBy: {
      id: "u8",
      name: "Museum Tech Innovations",
      rating: 4.7,
      verified: true
    },
    postedDate: "2023-06-01",
    deadline: "2023-07-01",
    applicants: 14,
    status: 'in-progress'
  }
];

// Categories for filtering
const gigCategories = [
  "Game Development",
  "Animation",
  "Video Production",
  "3D Modeling",
  "Concept Art",
  "UI/UX Design",
  "Sound Design",
  "VR/AR Development",
  "Motion Graphics",
  "Visual Effects"
];

// Skills for filtering
const commonSkills = [
  "3D Modeling",
  "Character Design",
  "Animation",
  "Unity",
  "Unreal Engine",
  "Blender",
  "Maya",
  "ZBrush",
  "Adobe Creative Suite",
  "After Effects",
  "Premiere Pro",
  "Concept Art",
  "Storyboarding",
  "Rigging",
  "Texturing",
  "UI Design",
  "UX Design",
  "Sound Design",
  "Motion Capture",
  "C#",
  "C++",
  "Python",
  "JavaScript",
  "VR Development",
  "AR Development",
  "Mobile Development"
];

interface GigsListingPageProps {
  onGigSelect?: (gigId: string) => void;
}

function GigsListingPage({ onGigSelect }: GigsListingPageProps) {
  const { theme, colorMode } = useTheme();
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    categories: [] as string[],
    skills: [] as string[],
    locationType: [] as string[],
    budgetType: [] as string[],
    status: [] as string[],
    sortBy: 'newest' as 'newest' | 'budget-high' | 'budget-low' | 'deadline'
  });
  const [filteredGigs, setFilteredGigs] = useState<Gig[]>(sampleGigs);
  
  // Filter gigs based on search query and filters
  useEffect(() => {
    let result = sampleGigs;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(gig => 
        gig.title.toLowerCase().includes(query) ||
        gig.description.toLowerCase().includes(query) ||
        gig.category.toLowerCase().includes(query) ||
        gig.subcategory?.toLowerCase().includes(query) ||
        gig.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }
    
    // Filter by categories
    if (filters.categories.length > 0) {
      result = result.filter(gig => 
        filters.categories.includes(gig.category) ||
        (gig.subcategory && filters.categories.includes(gig.subcategory))
      );
    }
    
    // Filter by skills
    if (filters.skills.length > 0) {
      result = result.filter(gig => 
        filters.skills.some(skill => gig.skills.includes(skill))
      );
    }
    
    // Filter by location type
    if (filters.locationType.length > 0) {
      result = result.filter(gig => 
        filters.locationType.includes(gig.location.type)
      );
    }
    
    // Filter by budget type
    if (filters.budgetType.length > 0) {
      result = result.filter(gig => 
        filters.budgetType.includes(gig.budget.type)
      );
    }
    
    // Filter by status
    if (filters.status.length > 0) {
      result = result.filter(gig => 
        filters.status.includes(gig.status)
      );
    }
    
    // Sort gigs
    switch (filters.sortBy) {
      case 'newest':
        result = result.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
        break;
      case 'budget-high':
        result = result.sort((a, b) => b.budget.max - a.budget.max);
        break;
      case 'budget-low':
        result = result.sort((a, b) => a.budget.min - b.budget.min);
        break;
      case 'deadline':
        result = result.sort((a, b) => {
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        });
        break;
    }
    
    // Featured gigs always come first
    result = [
      ...result.filter(gig => gig.featured),
      ...result.filter(gig => !gig.featured)
    ];
    
    setFilteredGigs(result);
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
  
  const toggleSkill = (skill: string) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };
  
  const toggleLocationType = (type: string) => {
    setFilters(prev => ({
      ...prev,
      locationType: prev.locationType.includes(type)
        ? prev.locationType.filter(t => t !== type)
        : [...prev.locationType, type]
    }));
  };
  
  const toggleBudgetType = (type: string) => {
    setFilters(prev => ({
      ...prev,
      budgetType: prev.budgetType.includes(type)
        ? prev.budgetType.filter(t => t !== type)
        : [...prev.budgetType, type]
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
  
  const setSortBy = (sortBy: 'newest' | 'budget-high' | 'budget-low' | 'deadline') => {
    setFilters(prev => ({
      ...prev,
      sortBy
    }));
  };
  
  const clearFilters = () => {
    setFilters({
      categories: [],
      skills: [],
      locationType: [],
      budgetType: [],
      status: [],
      sortBy: 'newest'
    });
    setSearchQuery('');
  };
  
  const handleGigClick = (gigId: string) => {
    if (onGigSelect) {
      onGigSelect(gigId);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Find Gigs
        </h1>
        
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search gigs by title, skills, or keywords..."
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
            Filters {(filters.categories.length > 0 || filters.skills.length > 0 || filters.locationType.length > 0 || filters.budgetType.length > 0 || filters.status.length > 0) && (
              <span className="ml-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {filters.categories.length + filters.skills.length + filters.locationType.length + filters.budgetType.length + filters.status.length}
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
              Sort: {filters.sortBy === 'newest' ? 'Newest' : filters.sortBy === 'budget-high' ? 'Highest Budget' : filters.sortBy === 'budget-low' ? 'Lowest Budget' : 'Deadline'}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
            
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-10">
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
                  filters.sortBy === 'budget-high' 
                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setSortBy('budget-high')}
              >
                Highest Budget
              </button>
              <button 
                className={`block w-full text-left px-4 py-2 text-sm ${
                  filters.sortBy === 'budget-low' 
                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setSortBy('budget-low')}
              >
                Lowest Budget
              </button>
              <button 
                className={`block w-full text-left px-4 py-2 text-sm ${
                  filters.sortBy === 'deadline' 
                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setSortBy('deadline')}
              >
                Deadline
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
                  {gigCategories.map((category) => (
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
              
              {/* Skills Filter */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">Skills</h3>
                <div className="max-h-48 overflow-y-auto space-y-2 pr-2">
                  {commonSkills.map((skill) => (
                    <div 
                      key={skill}
                      className="flex items-center cursor-pointer"
                      onClick={() => toggleSkill(skill)}
                    >
                      {filters.skills.includes(skill) ? (
                        <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
                      ) : (
                        <Square className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                      )}
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Additional Filters */}
              <div>
                {/* Location Type */}
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">Location Type</h3>
                <div className="space-y-2 mb-6">
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => toggleLocationType('remote')}
                  >
                    {filters.locationType.includes('remote') ? (
                      <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400 mr-2" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">Remote</span>
                  </div>
                  
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => toggleLocationType('onsite')}
                  >
                    {filters.locationType.includes('onsite') ? (
                      <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400 mr-2" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">On-site</span>
                  </div>
                  
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => toggleLocationType('hybrid')}
                  >
                    {filters.locationType.includes('hybrid') ? (
                      <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400 mr-2" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">Hybrid</span>
                  </div>
                </div>
                
                {/* Budget Type */}
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">Budget Type</h3>
                <div className="space-y-2 mb-6">
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => toggleBudgetType('fixed')}
                  >
                    {filters.budgetType.includes('fixed') ? (
                      <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400 mr-2" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">Fixed Price</span>
                  </div>
                  
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => toggleBudgetType('hourly')}
                  >
                    {filters.budgetType.includes('hourly') ? (
                      <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400 mr-2" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">Hourly Rate</span>
                  </div>
                </div>
                
                {/* Status */}
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">Status</h3>
                <div className="space-y-2">
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => toggleStatus('open')}
                  >
                    {filters.status.includes('open') ? (
                      <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400 mr-2" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">Open</span>
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
                </div>
              </div>
            </div>
            
            {/* Active Filters */}
            {(filters.categories.length > 0 || filters.skills.length > 0 || filters.locationType.length > 0 || filters.budgetType.length > 0 || filters.status.length > 0) && (
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
                  
                  {filters.skills.map(skill => (
                    <span 
                      key={skill}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    >
                      {skill}
                      <button 
                        onClick={() => toggleSkill(skill)}
                        className="ml-1 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  
                  {filters.locationType.map(type => (
                    <span 
                      key={type}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                    >
                      {type === 'remote' ? 'Remote' : type === 'onsite' ? 'On-site' : 'Hybrid'}
                      <button 
                        onClick={() => toggleLocationType(type)}
                        className="ml-1 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  
                  {filters.budgetType.map(type => (
                    <span 
                      key={type}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    >
                      {type === 'fixed' ? 'Fixed Price' : 'Hourly Rate'}
                      <button 
                        onClick={() => toggleBudgetType(type)}
                        className="ml-1 text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  
                  {filters.status.map(status => (
                    <span 
                      key={status}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    >
                      {status === 'open' ? 'Open' : status === 'in-progress' ? 'In Progress' : status}
                      <button 
                        onClick={() => toggleStatus(status)}
                        className="ml-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  
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
          <Briefcase className="h-5 w-5 text-gray-400" />
          <span className="text-gray-600 dark:text-gray-300">
            {filteredGigs.length} gigs found
          </span>
        </div>
        
        {/* Featured Gigs */}
        {filteredGigs.some(gig => gig.featured) && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Featured Gigs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredGigs.filter(gig => gig.featured).map(gig => (
                <GigCard
                  key={gig.id}
                  gig={gig}
                  theme={theme}
                  colorMode={colorMode}
                  onClick={handleGigClick}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* All Gigs */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">All Gigs</h2>
          {filteredGigs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredGigs.filter(gig => !gig.featured).map(gig => (
                <GigCard
                  key={gig.id}
                  gig={gig}
                  theme={theme}
                  colorMode={colorMode}
                  onClick={handleGigClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <Briefcase className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No gigs found</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                We couldn't find any gigs matching your current filters. Try adjusting your search criteria or clearing some filters.
              </p>
              <Button 
                theme={theme} 
                variant="secondary" 
                colorMode={colorMode}
                onClick={clearFilters}
                className=" mt-4"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GigsListingPage;