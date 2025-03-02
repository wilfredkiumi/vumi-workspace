import React, { useState, useEffect } from 'react';
import { Search, Filter, X, CheckSquare, Square, Users } from 'lucide-react';
import { Button, Card, CreatorCard, useTheme, Creator, CreatorFilter, ProfileMode } from 'ui';

// Sample creators data
const sampleCreators: Creator[] = [
  {
    id: "1",
    workspaceId: "ws-123",
    name: "Alex Johnson",
    username: "alexjohnson",
    bio: "Lifestyle and tech influencer with a passion for creating engaging content that resonates with young professionals.",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    coverImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1489&q=80",
    location: {
      city: "San Francisco",
      country: "USA"
    },
    categories: ["Technology", "Lifestyle"],
    skills: ["Content Creation", "Video Editing", "Photography", "Social Media Marketing"],
    experience: [
      {
        role: "Tech Influencer",
        company: "Self-employed",
        startDate: "Jan 2020",
        description: "Created tech review content across multiple platforms."
      }
    ],
    portfolio: [
      {
        title: "Smartphone Review Series",
        description: "In-depth video reviews of the latest smartphone releases.",
        thumbnailUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        projectUrl: "https://example.com/project1"
      }
    ],
    socialLinks: [
      {
        platform: "youtube",
        url: "https://youtube.com/alexjohnson",
        followers: 350000
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
    platforms: ["YouTube", "Instagram", "TikTok"],
    contentTypes: ["Video", "Photo"],
    mode: ProfileMode.PRO,
    isAvailableForHire: true,
    freelanceStatus: true
  },
  {
    id: "2",
    workspaceId: "ws-456",
    name: "Vision Studios",
    username: "visionstudios",
    bio: "Professional video production crew specializing in commercial, documentary, and corporate video content.",
    profileImage: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    coverImage: "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1489&q=80",
    location: {
      city: "Los Angeles",
      country: "USA"
    },
    categories: ["Video Production", "Cinematography"],
    skills: ["Video Production", "Cinematography", "Lighting", "Sound Design"],
    experience: [
      {
        role: "Production Team",
        company: "Major Streaming Service",
        startDate: "Mar 2021",
        description: "Produced documentary-style content for streaming platform."
      }
    ],
    portfolio: [
      {
        title: "Eco-Friendly Brand Campaign",
        description: "Series of commercials highlighting sustainable practices.",
        thumbnailUrl: "https://images.unsplash.com/photo-1626050954744-92bf034ce476?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        projectUrl: "https://example.com/project1"
      }
    ],
    socialLinks: [
      {
        platform: "instagram",
        url: "https://instagram.com/visionstudios",
        followers: 45000
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
    equipmentOwned: ["RED Cinema Camera", "Sony FS7"],
    specializations: ["Commercial Production", "Documentary"],
    mode: ProfileMode.PREMIUM,
    isAvailableForHire: true
  },
  {
    id: "3",
    workspaceId: "ws-789",
    name: "Sarah Williams",
    username: "sarahwilliams",
    bio: "Professional photographer specializing in portrait and commercial photography with a unique artistic style.",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    coverImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1489&q=80",
    location: {
      city: "Chicago",
      country: "USA"
    },
    categories: ["Photography", "Portrait"],
    skills: ["Photography", "Lighting", "Photoshop", "Lightroom"],
    experience: [
      {
        role: "Freelance Photographer",
        company: "Self-employed",
        startDate: "Jan 2018",
        description: "Specialized in portrait and commercial photography for various clients."
      }
    ],
    portfolio: [
      {
        title: "Urban Portrait Series",
        description: "A collection of urban portraits showcasing diverse individuals in city environments.",
        thumbnailUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        projectUrl: "https://example.com/project1"
      }
    ],
    socialLinks: [
      {
        platform: "instagram",
        url: "https://instagram.com/sarahwilliams",
        followers: 75000
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
    platforms: ["Instagram", "Behance"],
    contentTypes: ["Photo"],
    mode: ProfileMode.BASIC_WITH_ADS,
    isAvailableForHire: true,
    freelanceStatus: true
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
          Find Creators
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
            Filters {(filters.skills.length > 0 || filters.countries.length > 0 || filters.cities.length > 0 || filters.creatorType !== 'all') && (
              <span className="ml-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {filters.skills.length + filters.countries.length + filters.cities.length + (filters.creatorType !== 'all' ? 1 : 0)}
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
            {(filters.skills.length > 0 || filters.countries.length > 0 || filters.cities.length > 0 || filters.creatorType !== 'all') && (
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-2">Active Filters:</h3>
                <div className="flex flex-wrap gap-2">
                  {filters.creatorType !== 'all' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {filters.creatorType === 'influencer' ? 'Influencers' : 'Crews'}
                      <button 
                        onClick={() => setCreatorType('all')}
                        className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
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
                        className="ml-1 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
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
                        className="ml-1 text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-200"
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
          <Users className="h-5 w-5 text-gray-400" />
          <span className="text-gray-600 dark:text-gray-300">
            {filteredCreators.length} creators found
          </span>
        </div>
        
        {/* Creators Grid */}
        {filteredCreators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCreators.map((creator) => (
              <CreatorCard
                key={creator.id}
                creator={creator}
                theme={theme}
                colorMode={colorMode}
                onClick={() => handleCreatorClick(creator.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
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