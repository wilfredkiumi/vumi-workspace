// @ts-nocheck
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, X, CheckSquare, Square, SlidersHorizontal, ChevronDown, Briefcase } from 'lucide-react'; // Add Briefcase import
import { Button, Card, useTheme } from 'ui';
import { GigCard } from './GigCard';
import { sampleGigs, gigCategories, commonSkills } from './data/sampleGigs';
import { Gig } from './models/Gig';

interface GigsListingPageProps {
  onGigSelect?: (gigId: string) => void;
}

function GigsListingPage({ onGigSelect }: GigsListingPageProps) {
  const navigate = useNavigate();
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
    navigate(`/gigs/${gigId}`);
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
                  onClick={() => handleGigClick(gig.id)}
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
                  onClick={() => handleGigClick(gig.id)}
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