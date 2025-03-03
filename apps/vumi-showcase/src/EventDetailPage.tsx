import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, useTheme } from 'ui';
import { CalendarDays, MapPin, Users, Clock, Star, ArrowLeft, Share2, Calendar, Heart, Ticket, AlertTriangle } from 'lucide-react';
import { useAuth } from '@vumi/shared';
import { PlaceholderPage } from './components/PlaceholderPage';

// Mock data for the event
const eventsMockData = {
  e1: {
    id: 'e1',
    title: 'Digital Content Creation Expo 2023',
    description: 'Join us for the biggest digital content creation event of the year! Featuring workshops, panels, and networking opportunities for creators of all types.',
    longDescription: `The Digital Content Creation Expo is back for 2023, bigger and better than ever! This three-day event brings together the best minds in digital content creation from around the world.

    Whether you're a seasoned professional or just starting out, there's something for everyone at DCCE 2023. Attend hands-on workshops led by industry experts, listen to insightful panel discussions on the latest trends, and network with fellow creators and potential clients.
    
    This year's highlights include:
    - Keynote address by renowned filmmaker Sarah Chen
    - Advanced editing techniques workshop with Adobe certified experts
    - The future of AI in content creation panel discussion
    - Networking mixer with representatives from major studios and brands
    
    Don't miss this opportunity to level up your skills, make valuable connections, and get inspired!`,
    date: '2023-09-15',
    endDate: '2023-09-17',
    time: '9:00 AM - 6:00 PM',
    location: 'Tech Convention Center',
    address: '123 Innovation Blvd, San Francisco, CA',
    type: 'Conference',
    capacity: 1000,
    attendees: 750,
    organizer: 'Digital Creators Association',
    price: '$149',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.8,
    reviewCount: 56,
    speakers: [
      { name: 'Sarah Chen', title: 'Award-winning Filmmaker', image: 'https://randomuser.me/api/portraits/women/28.jpg' },
      { name: 'Michael Rodriguez', title: 'Head of Content, StreamFlix', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
      { name: 'Priya Patel', title: 'VFX Supervisor', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
      { name: 'David Kim', title: 'Sound Design Expert', image: 'https://randomuser.me/api/portraits/men/11.jpg' }
    ],
    agenda: [
      { day: 'Day 1', items: [
        { time: '9:00 AM', title: 'Registration & Welcome Coffee' },
        { time: '10:00 AM', title: 'Opening Keynote: The Future of Content Creation' },
        { time: '12:00 PM', title: 'Lunch Break' },
        { time: '1:30 PM', title: 'Workshop: Advanced Video Editing Techniques' },
        { time: '4:00 PM', title: 'Panel: Monetizing Your Content in 2023' },
        { time: '6:00 PM', title: 'Networking Reception' }
      ]},
      { day: 'Day 2', items: [
        { time: '9:30 AM', title: 'Breakfast & Networking' },
        { time: '10:30 AM', title: 'Workshop: Creating Compelling Short-Form Content' },
        { time: '12:00 PM', title: 'Lunch Break' },
        { time: '1:30 PM', title: 'Panel: Working with Brands as a Creator' },
        { time: '3:30 PM', title: 'Workshop: Advanced Audio Production' },
        { time: '6:00 PM', title: 'Creator Showcase & Mixology Event' }
      ]},
      { day: 'Day 3', items: [
        { time: '9:30 AM', title: 'Breakfast & Networking' },
        { time: '10:30 AM', title: 'Workshop: AI Tools for Content Creators' },
        { time: '12:00 PM', title: 'Lunch Break' },
        { time: '1:30 PM', title: 'Industry Expert Roundtable' },
        { time: '3:30 PM', title: 'Closing Keynote: Where Do We Go From Here?' },
        { time: '5:00 PM', title: 'Farewell Reception & Prize Drawing' }
      ]}
    ]
  },
  e2: {
    id: 'e2',
    title: 'Animation Festival 2023',
    description: 'A celebration of animation in all its forms. Featuring screenings, talks, and workshops.',
    longDescription: `The Animation Festival returns for its 12th year, celebrating the art and craft of animation in all its diverse forms. From traditional hand-drawn animation to cutting-edge 3D and experimental techniques, this festival showcases the best animated content from around the world.

    Over the course of a weekend, attendees will enjoy film screenings, behind-the-scenes presentations from leading studios, hands-on workshops, and opportunities to meet with fellow animation enthusiasts and professionals.
    
    This year's festival will feature:
    - International animated short film competition
    - Exclusive preview of upcoming studio releases
    - Character design workshop with industry veterans
    - Animation career fair with major studios
    - Stop-motion animation hands-on experience
    
    Whether you're an animation professional, student, or simply love animated films, the Animation Festival offers something for everyone!`,
    date: '2023-10-20',
    endDate: '2023-10-22',
    time: '10:00 AM - 8:00 PM',
    location: 'City Arts Center',
    address: '456 Culture St, Portland, OR',
    type: 'Festival',
    capacity: 500,
    attendees: 450,
    organizer: 'Animation Guild',
    price: '$89',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.9,
    reviewCount: 112,
    speakers: [
      { name: 'Lisa Wong', title: 'Animation Director', image: 'https://randomuser.me/api/portraits/women/67.jpg' },
      { name: 'Thomas Green', title: 'Character Designer', image: 'https://randomuser.me/api/portraits/men/45.jpg' },
      { name: 'Emma Johnson', title: 'Stop-Motion Artist', image: 'https://randomuser.me/api/portraits/women/33.jpg' }
    ],
    agenda: [
      { day: 'Day 1', items: [
        { time: '10:00 AM', title: 'Registration & Welcome' },
        { time: '11:00 AM', title: 'Opening Ceremony & Showcase' },
        { time: '1:00 PM', title: 'Lunch Break' },
        { time: '2:00 PM', title: 'International Short Film Competition (Part 1)' },
        { time: '5:00 PM', title: 'Studio Showcase: Upcoming Releases' },
        { time: '7:00 PM', title: 'Opening Night Party' }
      ]},
      { day: 'Day 2', items: [
        { time: '10:00 AM', title: 'Character Design Workshop' },
        { time: '12:00 PM', title: 'Lunch Break' },
        { time: '1:00 PM', title: 'International Short Film Competition (Part 2)' },
        { time: '3:30 PM', title: 'Panel: Breaking Into Animation' },
        { time: '5:00 PM', title: 'Meet the Studios Mixer' },
        { time: '7:00 PM', title: 'Special Screening: Classic Animation' }
      ]},
      { day: 'Day 3', items: [
        { time: '10:00 AM', title: 'Stop-Motion Workshop' },
        { time: '12:00 PM', title: 'Lunch Break' },
        { time: '1:00 PM', title: 'Student Showcase' },
        { time: '3:00 PM', title: 'Awards Ceremony' },
        { time: '5:00 PM', title: 'Closing Reception' }
      ]}
    ]
  }
};

const EventDetailPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { theme, colorMode } = useTheme();
  const { isAuthenticated } = useAuth();
  
  const [event, setEvent] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  
  useEffect(() => {
    // Simulate loading the event data
    setLoading(true);
    setTimeout(() => {
      if (eventId && eventsMockData[eventId as keyof typeof eventsMockData]) {
        setEvent(eventsMockData[eventId as keyof typeof eventsMockData]);
      } else {
        setEvent(null);
      }
      setLoading(false);
    }, 800);
  }, [eventId]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!event) {
    return (
      <PlaceholderPage 
        title="Event Not Found" 
        message="The event you're looking for doesn't exist or has been removed."
        icon={<AlertTriangle className="text-yellow-500" />}
      />
    );
  }

  const handleGoBack = () => {
    navigate('/events');
  };
  
  const handleLike = () => {
    setIsLiked(!isLiked);
  };
  
  const handleShare = () => {
    // Implementation would depend on your sharing functionality
    alert('Share functionality would be implemented here');
  };
  
  const handlePurchaseTicket = () => {
    if (!isAuthenticated) {
      // Redirect to login or show auth modal
      alert('Please log in to purchase tickets');
      return;
    }
    setShowPurchaseForm(true);
  };
  
  const handleSubmitPurchase = (e: React.FormEvent) => {
    e.preventDefault();
    // This would be implemented with your payment system
    alert(`Thank you for purchasing ${ticketCount} ticket(s)!`);
    setShowPurchaseForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back button */}
      <div className="mb-6">
        <Button
          theme={theme}
          variant="ghost"
          colorMode={colorMode}
          onClick={handleGoBack}
          className="text-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Events
        </Button>
      </div>
      
      {/* Event header section */}
      <div className="relative rounded-xl overflow-hidden h-64 md:h-96 mb-8">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.title}</h1>
          <div className="flex items-center text-white/90">
            <CalendarDays className="h-5 w-5 mr-2" />
            <span>
              {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })}
              {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })}`}
            </span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button
            theme={theme}
            variant="ghost"
            colorMode="dark"
            onClick={handleLike}
            className="bg-white/20 backdrop-blur-sm"
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </Button>
          <Button
            theme={theme}
            variant="ghost"
            colorMode="dark"
            onClick={handleShare}
            className="bg-white/20 backdrop-blur-sm"
          >
            <Share2 className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Event details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Event info */}
          <Card theme={theme} colorMode={colorMode} className="p-6">
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">About This Event</h2>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-1" />
                <span className="font-medium">{event.rating}</span>
                <span className="text-gray-500 dark:text-gray-400 ml-1">({event.reviewCount} reviews)</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mr-3">
                  <MapPin className="h-5 w-5 text-blue-500 dark:text-blue-300" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{event.location}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{event.address}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900 rounded-full p-2 mr-3">
                  <Calendar className="h-5 w-5 text-green-500 dark:text-green-300" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{event.time}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-2 mr-3">
                  <Users className="h-5 w-5 text-purple-500 dark:text-purple-300" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Attendance</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{event.attendees} / {event.capacity} registered</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-amber-100 dark:bg-amber-900 rounded-full p-2 mr-3">
                  <Clock className="h-5 w-5 text-amber-500 dark:text-amber-300" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Event Type</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{event.type} by {event.organizer}</p>
                </div>
              </div>
            </div>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">
                {event.longDescription}
              </p>
            </div>
          </Card>
          
          {/* Speakers/Presenters */}
          {event.speakers && event.speakers.length > 0 && (
            <Card theme={theme} colorMode={colorMode} className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Speakers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {event.speakers.map((speaker: any, index: number) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
                      <img 
                        src={speaker.image} 
                        alt={speaker.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{speaker.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{speaker.title}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}
          
          {/* Agenda / Schedule */}
          {event.agenda && event.agenda.length > 0 && (
            <Card theme={theme} colorMode={colorMode} className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Event Schedule</h2>
              
              <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto">
                {event.agenda.map((day: any, index: number) => (
                  <button
                    key={index}
                    className={`py-2 px-4 font-medium text-sm whitespace-nowrap ${
                      selectedDay === index 
                        ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' 
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                    onClick={() => setSelectedDay(index)}
                  >
                    {day.day}
                  </button>
                ))}
              </div>
              
              <div className="space-y-4">
                {event.agenda[selectedDay]?.items.map((item: any, index: number) => (
                  <div key={index} className="flex">
                    <div className="w-24 flex-shrink-0 text-gray-500 dark:text-gray-400">
                      {item.time}
                    </div>
                    <div className="flex-grow pl-4 border-l border-gray-200 dark:border-gray-700">
                      <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                      {item.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
        
        {/* Right column - Ticket purchase */}
        <div>
          <Card theme={theme} colorMode={colorMode} className="p-6 sticky top-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Get Tickets</h2>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 dark:text-gray-300">Price:</span>
                <span className="text-xl font-bold text-gray-900 dark:text-white">{event.price}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <span>{event.attendees} going</span>
                <span>Only {event.capacity - event.attendees} spots left</span>
              </div>
            </div>
            
            {!showPurchaseForm ? (
              <Button
                theme={theme}
                variant="primary"
                colorMode={colorMode}
                onClick={handlePurchaseTicket}
                className="w-full"
              >
                <Ticket className="h-5 w-5 mr-2" />
                Get Tickets
              </Button>
            ) : (
              <form onSubmit={handleSubmitPurchase} className="space-y-4">
                <div>
                  <label 
                    htmlFor="ticketCount" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Number of Tickets
                  </label>
                  <select
                    id="ticketCount"
                    value={ticketCount}
                    onChange={(e) => setTicketCount(parseInt(e.target.value))}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <p className="flex justify-between mb-1">
                    <span className="text-gray-700 dark:text-gray-300">Subtotal:</span>
                    <span className="font-medium">{event.price.replace('$', '$' + (parseInt(event.price.replace('$', '')) * ticketCount))}</span>
                  </p>
                  <p className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Service fee:</span>
                    <span>${(parseInt(event.price.replace('$', '')) * ticketCount * 0.05).toFixed(2)}</span>
                  </p>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                  <p className="flex justify-between font-bold text-gray-900 dark:text-white">
                    <span>Total:</span>
                    <span>${(parseInt(event.price.replace('$', '')) * ticketCount * 1.05).toFixed(2)}</span>
                  </p>
                </div>
                
                <div className="flex space-x-4">
                  <Button
                    theme={theme}
                    variant="ghost"
                    colorMode={colorMode}
                    onClick={() => setShowPurchaseForm(false)}
                    className="flex-1"
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button
                    theme={theme}
                    variant="primary"
                    colorMode={colorMode}
                    className="flex-1"
                    type="submit"
                  >
                    Purchase
                  </Button>
                </div>
              </form>
            )}
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Tickets are non-refundable
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
