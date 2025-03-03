import { MapPin, Star, CheckCircle, Users, Film , Award} from 'lucide-react';
import { Studio } from './types';
import { ThemeType, ColorMode } from './index';

interface StudioCardProps {
  studio: Studio;
  theme: ThemeType;
  colorMode: ColorMode;
  onClick?: (studioId: string) => void;
  compact?: boolean;
}

export function StudioCard({ 
  studio,
  onClick,
  compact = false
}: StudioCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(studio.id);
    }
  };
  
  if (compact) {
    return (
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
        onClick={handleClick}
      >
        <div className="h-32 relative">
          {studio.coverImage ? (
            <img 
              src={studio.coverImage} 
              alt={studio.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
          )}
          {studio.featured && (
            <div className="absolute top-2 right-2">
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-500 text-black">
                Featured
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mr-3">
              {studio.logo ? (
                <img 
                  src={studio.logo} 
                  alt={studio.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-lg font-bold">
                  {studio.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {studio.name}
              </h3>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4 mr-1" />
                {studio.location.city}, {studio.location.country}
              </div>
            </div>
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
      <div className="h-48 relative">
        {studio.coverImage ? (
          <img 
            src={studio.coverImage} 
            alt={studio.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
        )}
        
        {studio.featured && (
          <div className="absolute top-2 right-2">
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-500 text-black">
              Featured
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="mr-3">
            {studio.logo ? (
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <img 
                  src={studio.logo} 
                  alt={studio.name} 
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                  {studio.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white flex items-center">
              {studio.name}
              {studio.verified && (
                <CheckCircle className="h-4 w-4 text-blue-500 ml-1" />
              )}
            </h3>
            
            {studio.metrics.rating && (
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span>{studio.metrics.rating}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Users className="h-4 w-4 mr-2" />
            <span>{studio.teamMembers.length} team members</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Film className="h-4 w-4 mr-2" />
            <span>{studio.projects.length} projects</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Award className="h-4 w-4 mr-2" />
            <span>{studio.metrics.completedProjects} completed</span>
          </div>
        </div>
        
        {/* Services Preview */}
        <div className="flex flex-wrap gap-2">
          {studio.services.slice(0, 3).map((service, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm"
            >
              {service}
            </span>
          ))}
          {studio.services.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm">
              +{studio.services.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}