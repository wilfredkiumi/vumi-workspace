import React, { useState, useEffect } from 'react';
import { Search, Filter, X, CheckSquare, Square, Users } from 'lucide-react';
import { Button, Card, CreatorCard, useTheme, Creator, CreatorFilter, ProfileMode } from 'ui';

// Sample creators data
const sampleCreators: Creator[] = [
  {
    id: "1",
    workspaceId: "ws-123",
    name: "Maya Rodriguez",
    username: "mayarodriguez",
    bio: "Award-winning graphic designer and illustrator with a passion for creating visually stunning and meaningful designs.",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    coverImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    location: {
      city: "New York",
      country: "USA"
    },
    categories: ["Graphic Design", "Illustration", "Branding"],
    skills: ["Adobe Creative Suite", "Illustration", "Logo Design", "Brand Identity", "Typography"],
    experience: [
      {
        role: "Senior Designer",
        company: "Creative Studio NYC",
        startDate: "Apr 2019",
        description: "Lead designer for major brand campaigns and identity projects."
      }
    ],
    portfolio: [
      {
        title: "Eco-Friendly Brand Identity",
        description: "Complete brand identity for a sustainable product line.",
        thumbnailUrl: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        projectUrl: "https://example.com/project1"
      }
    ],
    socialLinks: [
      {
        platform: "instagram",
        url: "https://instagram.com/mayarodriguez",
        followers: 15000
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
    following: 450
  },
  {
    id: "2",
    workspaceId: "ws-456",
    name: "Alex Rivera",
    username: "alexrivera",
    bio: "Digital artist specializing in surreal landscapes and conceptual art that explores the intersection of nature and technology.",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    location: {
      city: "Portland",
      country: "USA"
    },
    categories: ["Digital Art", "Concept Art", "Illustration"],
    skills: ["Digital Painting", "Photoshop", "Concept Development", "3D Modeling", "Animation"],
    experience: [
      {
        role: "Digital Artist",
        company: "Dreamscape Studios",
        startDate: "Jun 2018",
        description: "Created concept art and digital illustrations for video games and film projects."
      }
    ],
    portfolio: [
      {
        title: "Digital Dreamscapes",
        description: "A series of surreal digital landscapes exploring themes of nature and technology.",
        thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        projectUrl: "https://example.com/project1"
      }
    ],
    socialLinks: [
      {
        platform: "instagram",
        url: "https://instagram.com/alexrivera",
        followers: 28000
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
    following: 320
  }
];

interface CreatorListingPageProps {
  onCreatorSelect?: (creatorId: string) => void;
}

function CreatorListingPage({ onCreatorSelect }: CreatorListingPageProps) {
  const { theme, colorMode } = useTheme();
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<CreatorFilter>({
    skills: [],
    countries: [],
    cities: [],
    creatorType: 'all',
    profileMode: undefined
  });
  const [filteredCreators, setFilteredCreators] = useState<Creator[]>(sampleCreators);
  
  // Extract all unique skills, countries, and cities from creators
  const allSkills = Array.from(new Set(sampleCreators.flatMap(creator => creator.skills)));
  const allCountries = Array.from(new Set(sampleCreators.map(creator => creator.location.country)));
  const allCities = Array.from(new Set(sampleCreators.map(creator => creator.location.city)));
  
  // Filter creators based on search query and filters
  useEffect(() => {
    let result = sampleCreators;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(creator => 
        creator.name.toLowerCase().includes(query) ||
        creator.username.toLowerCase().includes(query) ||
        creator.bio.toLowerCase().includes(query) ||
        creator.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }
    
    // Filter by creator type
    if (filters.creatorType !== 'all') {
      result = result.filter(creator => creator.creatorType === filters.creatorType);
    }
    
    // Filter by skills
    if (filters.skills.length > 0) {
      result = result.filter(creator => 
        filters.skills.some(skill => creator.skills.includes(skill))
      );
    }
    
    // Filter by countries
    if (filters.countries.length > 0) {
      result = result.filter(creator => 
        filters.countries.includes(creator.location.country)
      );
    }
    
    // Filter by cities
    if (filters.cities.length > 0) {
      result = result.filter(creator => 
        filters.cities.includes(creator.location.city)
      );
    }
    
    // Filter by profile mode
    if (filters.profileMode) {
      result = result.filter(creator => 
        creator.mode === filters.profileMode
      );
    }
    
    setFilteredCreators(result);
  }, [searchQuery, filters]);
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const toggleSkill = (skill: string) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };
  
  const toggleCountry = (country: string) => {
    setFilters(prev => ({
      ...prev,
      countries: prev.countries.includes(country)
        ? prev.countries.filter(c => c !== country)
        : [...prev.countries, country],
      // Clear cities if the country is deselected
      cities: prev.countries.includes(country)
        ? prev.cities.filter(city => 
            sampleCreators.some(creator => 
              creator.location.country !== country && 
              creator.location.city === city
            )
          )
        : prev.cities
    }));
  };
  
  const toggleCity = (city: string) => {
    setFilters(prev => ({
      ...prev,
      cities: prev.cities.includes(city)
        ? prev.cities.filter(c => c !== city)
        : [...prev.cities, city]
    }));
  };
  
  const setCreatorType = (type: 'all' | 'influencer' | 'crew') => {
    setFilters(prev => ({
      ...prev,
      creatorType: type
    }));
  };
  
  const setProfileMode = (mode: ProfileMode | undefined) => {
    setFilters(prev => ({
      ...prev,
      profileMode: mode
    }));
  };
  
  const clearFilters = () => {
    setFilters({
      skills: [],
      countries: [],
      cities: [],
      creatorType: 'all',
      profileMode: undefined
    });
    setSearchQuery('');
  };
  
  const handleCreatorClick = (creatorId: string) => {
    console.log(`Clicked on creator with ID: ${creatorId}`);
    if (onCreatorSelect) {
      onCreatorSelect(creatorId);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Discover Creative Talent
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
              placeholder="Search by name, skills, or keywords..."
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
            Filters {(filters.skills.length > 0 || filters.countries.length > 0 || filters.cities.length > 0 || filters.creatorType !== 'all' || filters.profileMode) && (
              <span className="ml-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {filters.skills.length + filters.countries.length + filters.cities.length + (filters.creatorType !== 'all' ? 1 : 0) + (filters.profileMode ? 1 : 0)}
              </span>
            )}
          </Button>
        </div>
        
        {/* Filters Panel */}
        {showFilters && (
          <Card theme={theme} colorMode={colorMode} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Creator Type Filter */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">Creator Type</h3>
                <div className="space-y-2">
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => setCreatorType('all')}
                  >
                    {filters.creatorType === 'all' ? (
                      <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400 mr-2" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">All Creators</span>
                  </div>
                  
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => setCreatorType('influencer')}
                  >
                    {filters.creatorType === 'influencer' ? (
                      <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400 mr-2" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">Influencers</span>
                  </div>
                  
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => setCreatorType('crew')}
                  >
                    {filters.creatorType === 'crew' ? (
                      <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400 mr-2" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">Crews</span>
                  </div>
                </div>
              </div>
              
              {/* Profile Mode Filter */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">Profile Type</h3>
                <div className="space-y-2">
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => setProfileMode(undefined)}
                  >
                    {!filters.profileMode ? (
                      <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400 mr-2" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">All Plans</span>
                  </div>
                  
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => setProfileMode(ProfileMode.PRO)}
                  >
                    {filters.profileMode === ProfileMode.PRO ? (
                      <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400 mr-2" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">Pro</span>
                  </div>
                  
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => setProfileMode(ProfileMode.PREMIUM)}
                  >
                    {filters.profileMode === ProfileMode.PREMIUM ? (
                      <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400 mr-2" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">Premium</span>
                  </div>
                </div>
              </div>
              
              {/* Skills Filter */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">Skills</h3>
                <div className="max-h-48 overflow-y-auto space-y-2 pr-2">
                  {allSkills.map((skill) => (
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
              
              {/* Countries Filter */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">Countries</h3>
                <div className="max-h-48 overflow-y-auto space-y-2 pr-2">
                  {allCountries.map((country) => (
                    <div 
                      key={country}
                      className="flex items-center cursor-pointer"
                      onClick={() => toggleCountry(country)}
                    >
                      {filters.countries.includes(country) ? (
                        <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
                      ) : (
                        <Square className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                      )}
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{country}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Cities Filter */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">Cities</h3>
                <div className="max-h-48 overflow-y-auto space-y-2 pr-2">
                  {allCities
                    .filter(city => 
                      filters.countries.length === 0 || 
                      sampleCreators.some(creator => 
                        filters.countries.includes(creator.location.country) && 
                        creator.location.city === city
                      )
                    )
                    .map((city) => (
                      <div 
                        key={city}
                        className="flex items-center cursor-pointer"
                        onClick={() => toggleCity(city)}
                      >
                        {filters.cities.includes(city) ? (
                          <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
                        ) : (
                          <Square className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                        )}
                        <span className="text-gray-700 dark:text-gray-300 text-sm">{city}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            
            {/* Active Filters */}
            {(filters.skills.length > 0 || filters.countries.length > 0 || filters.cities.length > 0 || filters.creatorType !== 'all' || filters.profileMode) && (
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-2">Active Filters:</h3>
                <div className="flex flex-wrap gap-2">
                  {filters.creatorType !== 'all' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {filters.creatorType === 'influencer' ? 'Influencers' : 'Crews'}
                      <button 
                        onClick={() => setCreatorType('all')}
                        className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  
                  {filters.profileMode && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                      {filters.profileMode}
                      <button 
                        onClick={() => setProfileMode(undefined)}
                        className="ml-1 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  
                  {filters.skills.map(skill => (
                    <span 
                      key={skill}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    >
                      {skill}
                      <button 
                        onClick={() => toggleSkill(skill)}
                        className="ml-1 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  
                  {filters.countries.map(country => (
                    <span 
                      key={country}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    >
                      {country}
                      <button 
                        onClick={() => toggleCountry(country)}
                        className="ml-1 text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  
                  {filters.cities.map(city => (
                    <span 
                      key={city}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    >
                      {city}
                      <button 
                        onClick={() => toggleCity(city)}
                        className="ml-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Card>
        )}
        
        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredCreators.length} {filteredCreators.length === 1 ? 'creator' : 'creators'}
          </p>
          
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 dark:text-gray-400 text-sm">Sort by:</span>
            <select 
              className="border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="featured">Featured</option>
              <option value="rating">Highest Rated</option>
              <option value="projects">Most Projects</option>
            </select>
          </div>
        </div>
        
        {/* Creator Grid */}
        {filteredCreators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCreators.map(creator => (
              <CreatorCard
                key={creator.id}
                creator={creator}
                theme={theme}
                colorMode={colorMode}
                onClick={handleCreatorClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
              <Users className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No creators found</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              We couldn't find any creators matching your current filters. Try adjusting your search criteria or clearing some filters.
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

export default CreatorListingPage;