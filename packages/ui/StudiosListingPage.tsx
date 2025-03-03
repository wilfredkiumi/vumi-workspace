import { useState, useEffect  } from 'react';
import { Search, Filter, X, CheckSquare, Square, Building } from 'lucide-react';
import { Studio, StudioFilter } from './types';
import { Button, Card, StudioCard } from './index';
import { sampleStudios } from './data/sampleData';

// Industry categories
const industries = [
  "Animation",
  "VFX",
  "Game Development",
  "Film Production",
  "Audio Production",
  "Motion Capture",
  "Virtual Production",
  "Post-Production"
];

// Services
const services = [
  "3D Animation",
  "Character Design",
  "VFX Production",
  "Game Asset Creation",
  "Motion Capture",
  "Sound Design",
  "Voice Recording",
  "Video Editing",
  "Color Grading",
  "Concept Art"
];

interface StudiosListingPageProps {
  theme?: ThemeType;
  colorMode?: ColorMode;
  onStudioSelect?: (studioId: string) => void;
}

export function StudiosListingPage({ 
  theme = 'gigs',
  colorMode = 'light',
  onStudioSelect 
}: StudiosListingPageProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<StudioFilter>({
    industries: [],
    services: [],
    countries: [],
    cities: [],
    verified: false,
    featured: false
  });
  const [filteredStudios, setFilteredStudios] = useState<Studio[]>(sampleStudios);
  
  // Extract unique locations from studios
  const locations = {
    countries: Array.from(new Set(sampleStudios.map(studio => studio.location.country))),
    cities: Array.from(new Set(sampleStudios.map(studio => studio.location.city)))
  };
  
  // Filter studios based on search query and filters
  useEffect(() => {
    let result = sampleStudios;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(studio => 
        studio.name.toLowerCase().includes(query) ||
        studio.description.toLowerCase().includes(query) ||
        studio.industry.some(ind => ind.toLowerCase().includes(query)) ||
        studio.services.some(service => service.toLowerCase().includes(query))
      );
    }
    
    // Filter by industries
    if (filters.industries.length > 0) {
      result = result.filter(studio => 
        filters.industries.some(ind => studio.industry.includes(ind))
      );
    }
    
    // Filter by services
    if (filters.services.length > 0) {
      result = result.filter(studio => 
        filters.services.some(service => studio.services.includes(service))
      );
    }
    
    // Filter by countries
    if (filters.countries.length > 0) {
      result = result.filter(studio => 
        filters.countries.includes(studio.location.country)
      );
    }
    
    // Filter by cities
    if (filters.cities.length > 0) {
      result = result.filter(studio => 
        filters.cities.includes(studio.location.city)
      );
    }
    
    // Filter by verified status
    if (filters.verified) {
      result = result.filter(studio => studio.verified);
    }
    
    // Filter by featured status
    if (filters.featured) {
      result = result.filter(studio => studio.featured);
    }
    
    setFilteredStudios(result);
  }, [searchQuery, filters]);
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const toggleIndustry = (industry: string) => {
    setFilters(prev => ({
      ...prev,
      industries: prev.industries.includes(industry)
        ? prev.industries.filter(i => i !== industry)
        : [...prev.industries, industry]
    }));
  };
  
  const toggleService = (service: string) => {
    setFilters(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
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
            sampleStudios.some(studio => 
              studio.location.country !== country && 
              studio.location.city === city
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
  
  const toggleVerified = () => {
    setFilters(prev => ({
      ...prev,
      verified: !prev.verified
    }));
  };
  
  const toggleFeatured = () => {
    setFilters(prev => ({
      ...prev,
      featured: !prev.featured
    }));
  };
  
  const clearFilters = () => {
    setFilters({
      industries: [],
      services: [],
      countries: [],
      cities: [],
      verified: false,
      featured: false
    });
    setSearchQuery('');
  };
  
  const handleStudioClick = (studioId: string) => {
    if (onStudioSelect) {
      onStudioSelect(studioId);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Find Production Studios
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
              placeholder="Search studios by name, industry, or services..."
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
            Filters {(filters.industries.length > 0 || filters.services.length > 0 || filters.countries.length > 0 || filters.cities.length > 0 || filters.verified || filters.featured) && (
              <span className="ml-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {filters.industries.length + filters.services.length + filters.countries.length + filters.cities.length + (filters.verified ? 1 : 0) + (filters.featured ? 1 : 0)}
              </span>
            )}
          </Button>
        </div>
        
        {/* Filters Panel */}
        {showFilters && (
          <Card theme={theme} colorMode={colorMode} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Industries Filter */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">Industries</h3>
                <div className="max-h-48 overflow-y-auto space-y-2 pr-2">
                  {industries.map((industry) => (
                    <div 
                      key={industry}
                      className="flex items-center cursor-pointer"
                      onClick={() => toggleIndustry(industry)}
                    >
                      {filters.industries.includes(industry) ? (
                        <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
                      ) : (
                        <Square className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                      )}
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{industry}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Services Filter */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">Services</h3>
                <div className="max-h-48 overflow-y-auto space-y-2 pr-2">
                  {services.map((service) => (
                    <div 
                      key={service}
                      className="flex items-center cursor-pointer"
                      onClick={() => toggleService(service)}
                    >
                      {filters.services.includes(service) ? (
                        <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
                      ) : (
                        <Square className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                      )}
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Location Filters */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">Location</h3>
                
                {/* Countries */}
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Countries</h4>
                <div className="max-h-24 overflow-y-auto space-y-2 pr-2 mb-4">
                  {locations.countries.map((country) => (
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
                
                {/* Cities */}
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cities</h4>
                <div className="max-h-24 overflow-y-auto space-y-2 pr-2">
                  {locations.cities
                    .filter(city => 
                      filters.countries.length === 0 || 
                      sampleStudios.some(studio => 
                        filters.countries.includes(studio.location.country) && 
                        studio.location.city === city
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
              
              {/* Additional Filters */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">Additional Filters</h3>
                <div className="space-y-4">
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={toggleVerified}
                  >
                    {filters.verified ? (
                      <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400 mr-2" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">Verified Studios Only</span>
                  </div>
                  
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={toggleFeatured}
                  >
                    {filters.featured ? (
                      <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400 mr-2" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">Featured Studios</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Active Filters */}
            {(filters.industries.length > 0 || filters.services.length > 0 || filters.countries.length > 0 || filters.cities.length > 0 || filters.verified || filters.featured) && (
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-2">Active Filters:</h3>
                <div className="flex flex-wrap gap-2">
                  {filters.industries.map(industry => (
                    <span 
                      key={industry}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    >
                      {industry}
                      <button 
                        onClick={() => toggleIndustry(industry)}
                        className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  
                  {filters.services.map(service => (
                    <span 
                      key={service}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    >
                      {service}
                      <button 
                        onClick={() => toggleService(service)}
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
                  
                  {filters.verified && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                      Verified Only
                      <button 
                        onClick={toggleVerified}
                        className="ml-1 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  
                  {filters.featured && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                      Featured Only
                      <button 
                        onClick={toggleFeatured}
                        className="ml-1 text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-200"
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
          <Building className="h-5 w-5 text-gray-400" />
          <span className="text-gray-600 dark:text-gray-300">
            {filteredStudios.length} studios found
          </span>
        </div>
        
        {/* Studios Grid */}
        {filteredStudios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudios.map((studio) => (
              <StudioCard
                key={studio.id}
                studio={studio}
                theme={theme}
                colorMode={colorMode}
                onClick={handleStudioClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Building className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No studios found</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              We couldn't find any studios matching your current filters. Try adjusting your search criteria or clearing some filters.
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