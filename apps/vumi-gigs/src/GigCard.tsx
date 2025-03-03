import {  Clock, MapPin, Star, Tag, Users , DollarSign } from 'lucide-react';
import { ThemeType, ColorMode } from 'ui';

export interface Gig {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  budget: {
    min: number;
    max: number;
    type: 'fixed' | 'hourly';
  };
  duration?: string;
  skills: string[];
  location: {
    type: 'remote' | 'onsite' | 'hybrid';
    city?: string;
    country?: string;
  };
  postedBy: {
    id: string;
    name: string;
    avatar?: string;
    rating?: number;
    verified?: boolean;
  };
  postedDate: string;
  deadline?: string;
  applicants?: number;
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
  featured?: boolean;
}

interface GigCardProps {
  gig: Gig;
  theme: ThemeType;
  colorMode: ColorMode;
  onClick?: (gigId: string) => void;
  compact?: boolean;
}

export function GigCard({ 
  gig,
  onClick,
  compact = false
}: GigCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(gig.id);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };
  
  const getLocationLabel = () => {
    if (gig.location.type === 'remote') {
      return 'Remote';
    } else if (gig.location.type === 'onsite' && gig.location.city && gig.location.country) {
      return `${gig.location.city}, ${gig.location.country}`;
    } else if (gig.location.type === 'hybrid' && gig.location.city && gig.location.country) {
      return `Hybrid - ${gig.location.city}, ${gig.location.country}`;
    } else {
      return gig.location.type;
    }
  };
  
  const getStatusBadge = () => {
    switch (gig.status) {
      case 'open':
        return {
          label: 'Open',
          color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
        };
      case 'in-progress':
        return {
          label: 'In Progress',
          color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
        };
      case 'completed':
        return {
          label: 'Completed',
          color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
        };
      case 'cancelled':
        return {
          label: 'Cancelled',
          color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        };
      default:
        return {
          label: gig.status,
          color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
        };
    }
  };
  
  if (compact) {
    return (
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
        onClick={handleClick}
      >
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-1">{gig.title}</h3>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge().color}`}>
              {getStatusBadge().label}
            </span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
            <DollarSign className="h-4 w-4 mr-1" />
            <span>
              {gig.budget.type === 'fixed' 
                ? `$${gig.budget.min.toLocaleString()} - $${gig.budget.max.toLocaleString()}` 
                : `$${gig.budget.min} - $${gig.budget.max}/hr`}
            </span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{getLocationLabel()}</span>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">{gig.title}</h3>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <span className="mr-3">Posted by {gig.postedBy.name}</span>
              {gig.postedBy.rating && (
                <span className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  {gig.postedBy.rating}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge().color} mb-1`}>
              {getStatusBadge().label}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Posted {formatDate(gig.postedDate)}
            </span>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {gig.description}
        </p>
        
        {/* Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <DollarSign className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>
              {gig.budget.type === 'fixed' 
                ? `$${gig.budget.min.toLocaleString()} - $${gig.budget.max.toLocaleString()}` 
                : `$${gig.budget.min} - $${gig.budget.max}/hr`}
            </span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{getLocationLabel()}</span>
          </div>
          
          {gig.duration && (
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{gig.duration}</span>
            </div>
          )}
          
          {gig.applicants !== undefined && (
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Users className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{gig.applicants} applicants</span>
            </div>
          )}
        </div>
        
        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-2">
          {gig.skills.slice(0, 4).map((skill, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs"
            >
              {skill}
            </span>
          ))}
          {gig.skills.length > 4 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs">
              +{gig.skills.length - 4} more
            </span>
          )}
        </div>
        
        {/* Category */}
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <Tag className="h-3 w-3 mr-1" />
          <span>{gig.category}{gig.subcategory ? ` / ${gig.subcategory}` : ''}</span>
        </div>
      </div>
    </div>
  );
}