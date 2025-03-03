import React, { useState, useEffect } from 'react';
import { Card, Button, useTheme } from 'ui';
import { Calendar, MapPin, Users, Search, Filter, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock data for events/showcases
const events = [
  {
    id: 'e1',
    title: 'Digital Content Creation Expo 2023',
    description: 'Join us for the biggest digital content creation event of the year! Featuring workshops, panels, and networking opportunities for creators of all types.',
    date: '2023-09-15',
    endDate: '2023-09-17',
    location: 'Tech Convention Center, San Francisco',
    attendees: 750,
    capacity: 1000,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    featured: true,
    category: 'conference'
  },
  {
    id: 'e2',
    title: 'Animation Festival 2023',
    description: 'A celebration of animation in all its forms. Featuring screenings, talks, and workshops.',
    date: '2023-10-20',
    endDate: '2023-10-22',
    location: 'City Arts Center, Portland',
    attendees: 450,
    capacity: 500,
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    featured: true,
    category: 'festival'
  },
  {
    id: 'e3',
    title: 'Game Developers Meetup',
    description: 'Monthly gathering of indie game developers to share projects, get feedback, and network.',
    date: '2023-08-25',
    location: 'Creative Hub, Austin',
    attendees: 65,
    capacity: 100,
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    featured: false,
    category: 'meetup'
  },
  {
    id: 'e4',
    title: 'Virtual Production Workshop',
    description: 'Learn the latest techniques in virtual production from industry experts.',
    date: '2023-09-05',
    location: 'Film Academy, Los Angeles',
    attendees: 120,
    capacity: 150,
    image: 'https://images.unsplash.com/photo-1581091226033-c6e0b0cf8647?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    featured: false,
    category: 'workshop'
  },
  {
    id: 'e5',
    title: 'Indie Film Showcase',
    description: 'Screening of the best independent films from emerging filmmakers.',
    date: '2023-10-10',
    endDate: '2023-10-12',
    location: 'Independent Cinema, New York',
    attendees: 200,
    capacity: 250,
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    featured: false,
    category: 'screening'
  },
  {
    id: 'e6',
    title: 'VFX Industry Summit',
    description: 'Annual gathering of visual effects professionals discussing trends and innovations.',
    date: '2023-11-15',
    endDate: '2023-11-17',
    location: 'Grand Hotel, Vancouver',
    attendees: 350,
    capacity: 400,
    image: 'https://images.unsplash.com/photo-1520034475321-cbe63696469a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    featured: true,
    category: 'conference'
  }
];

// Define event categories
const categories = [
  { id: 'all', name: 'All Events' },
  { id: 'conference', name: 'Conferences' },
  { id: 'festival', name: 'Festivals' },
  { id: 'workshop', name: 'Workshops' },
  { id: 'meetup', name: 'Meetups' },
  { id: 'screening', name: 'Screenings' }
];

const ShowcaseListingPage = () => {
  const { theme, colorMode } = useTheme();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(events);
  
  // Filter events when category or search query changes
  useEffect(() => {
    let filtered = events;
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(event => event.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query)
      );
    }
    
    setFilteredEvents(filtered);
  }, [activeCategory, searchQuery]);
  
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
              placeholder="Search showcases by title, description, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button 
            theme={theme} 
            variant="secondary" 
            colorMode={colorMode}
            onClick={() => {}}
            className="flex items-center"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </Button>
        </div>
        
        {/* Categories */}
        <div className="flex gap-4 mb-8">
          {categories.map(category => (
            <Button
              key={category.id}
              theme={theme}
              variant={activeCategory === category.id ? 'primary' : 'secondary'}
              colorMode={colorMode}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        
        {/* Results Count */}
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="h-5 w-5 text-gray-400" />
          <span className="text-gray-600 dark:text-gray-300">
            {filteredEvents.length} showcases found
          </span>
        </div>
        
        {/* Showcases Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card key={event.id} theme={theme} colorMode={colorMode} className="relative">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-t-md" />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{event.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{event.description}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300">{event.attendees} / {event.capacity} attendees</span>
                  </div>
                  <Button 
                    theme={theme} 
                    variant="primary" 
                    colorMode={colorMode}
                    onClick={() => navigate(`/events/${event.id}`)}
                    className="flex items-center"
                  >
                    View Details
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </div>
              </Card>
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
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
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

export default ShowcaseListingPage;