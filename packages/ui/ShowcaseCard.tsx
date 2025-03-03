import { Calendar, MapPin, Users, Tag , Globe} from 'lucide-react';
import { Showcase } from './types';
import { ThemeType, ColorMode } from './index';

interface ShowcaseCardProps {
  showcase: Showcase;
  theme: ThemeType;
  colorMode: ColorMode;
  onClick?: (showcaseId: string) => void;
  compact?: boolean;
}

export function ShowcaseCard({ 
  showcase,
  onClick,
  compact = false
}: ShowcaseCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(showcase.id);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  // Get attendance type icon
  const getAttendanceTypeIcon = () => {
    if (!showcase.attendanceType) {
      return showcase.virtual ? <Globe className="h-3 w-3 mr-1" /> : <MapPin className="h-3 w-3 mr-1" />;
    }
    
    switch (showcase.attendanceType) {
      case 'virtual':
        return <Globe className="h-3 w-3 mr-1" />;
      case 'hybrid':
        return <Users className="h-3 w-3 mr-1" />;
      case 'physical':
      default:
        return <MapPin className="h-3 w-3 mr-1" />;
    }
  };
  
  if (compact) {
    return (
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
        onClick={handleClick}
      >
        <div className="h-32 relative">
          <img 
            src={showcase.thumbnail} 
            alt={showcase.title} 
            className="w-full h-full object-cover cursor-pointer"
            onClick={handleClick}
          />
          {showcase.featured && (
            <div className="absolute top-2 left-2">
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-500 text-black">
                Featured
              </span>
            </div>
          )}
        </div>
        <div className="p-3">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white line-clamp-1">{showcase.title}</h3>
          <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mt-1">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{formatDate(showcase.startDate)}</span>
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
      {/* Thumbnail */}
      <div className="h-48 relative">
        <img 
          src={showcase.thumbnail} 
          alt={showcase.title} 
          className="w-full h-full object-cover cursor-pointer"
          onClick={handleClick}
        />
        {showcase.featured && (
          <div className="absolute top-2 left-2">
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-500 text-black">
              Featured
            </span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{showcase.title}</h3>
        
        {showcase.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
            {showcase.description}
          </p>
        )}
        
        {/* Details */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{formatDate(showcase.startDate)}{showcase.endDate ? ` - ${formatDate(showcase.endDate)}` : ''}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            {getAttendanceTypeIcon()}
            <span>{showcase.location}</span>
            {showcase.attendanceType === 'hybrid' && (
              <span className="ml-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-1.5 rounded-lg">
                Hybrid
              </span>
            )}
          </div>
          
          {showcase.organizer && (
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Users className="h-4 w-4 mr-2" />
              <span>Organized by {showcase.organizer}</span>
            </div>
          )}
        </div>
        
        {/* Categories */}
        {showcase.categories && showcase.categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {showcase.categories.slice(0, 2).map((category, index) => (
              <span 
                key={index} 
                className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs flex items-center"
              >
                <Tag className="h-3 w-3 mr-1" />
                {category}
              </span>
            ))}
            {showcase.categories.length > 2 && (
              <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs">
                +{showcase.categories.length - 2} more
              </span>
            )}
          </div>
        )}
        
        {/* Stats */}
        <div className="flex justify-between items-center text-sm">
          {showcase.projectIds && (
            <span className="text-gray-600 dark:text-gray-400">
              {showcase.projectIds.length} {showcase.projectIds.length === 1 ? 'project' : 'projects'}
            </span>
          )}
          
          {showcase.price !== undefined ? (
            <span className="font-semibold text-gray-800 dark:text-white">
              {showcase.price === 0 ? 'Free' : `$${showcase.price}`}
            </span>
          ) : (
            <span></span>
          )}
        </div>
      </div>
    </div>
  );
}