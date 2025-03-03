import { MapPin, Star, Check, Users , Award} from 'lucide-react';
import { Creator, ProfileMode } from './types';
import { ThemeType, ColorMode } from './index';

interface CreatorCardProps {
  creator: Creator;
  theme: ThemeType;
  colorMode: ColorMode;
  onClick?: (creatorId: string) => void;
}

export function CreatorCard({ 
  creator,
  onClick
}: CreatorCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(creator.id);
    }
  };
  
  const getProfileModeBadge = (mode: ProfileMode) => {
    switch (mode) {
      case ProfileMode.BASIC:
        return null; // No badge for basic
      case ProfileMode.BASIC_WITH_ADS:
        return {
          label: 'Basic+',
          color: 'bg-blue-500 text-white'
        };
      case ProfileMode.PRO:
        return {
          label: 'Pro',
          color: 'bg-purple-500 text-white'
        };
      case ProfileMode.PREMIUM:
        return {
          label: 'Premium',
          color: 'bg-yellow-500 text-black'
        };
      default:
        return null;
    }
  };
  
  const profileModeBadge = getProfileModeBadge(creator.mode as ProfileMode);
  
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      {/* Cover/Header */}
      <div className="h-32 relative">
        {creator.coverImage ? (
          <img 
            src={creator.coverImage} 
            alt={`${creator.name}'s cover`} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-r ${
            creator.creatorType === 'influencer' 
              ? 'from-purple-500 to-pink-500' 
              : 'from-blue-500 to-teal-500'
          }`}></div>
        )}
        
        {/* Creator Type Badge */}
        <div className="absolute top-2 right-2 flex space-x-1">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            creator.creatorType === 'influencer' 
              ? 'bg-purple-500 text-white' 
              : 'bg-blue-500 text-white'
          }`}>
            {creator.creatorType === 'influencer' ? 'Influencer' : 'Crew'}
          </span>
          
          {profileModeBadge && (
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${profileModeBadge.color}`}>
              {profileModeBadge.label}
            </span>
          )}
        </div>
      </div>
      
      {/* Profile Info */}
      <div className="p-4">
        <div className="flex items-start">
          {/* Profile Image */}
          <div className="relative -mt-12 mr-4">
            <div className="w-16 h-16 rounded-full border-2 border-white dark:border-gray-800 overflow-hidden bg-gray-200 dark:bg-gray-700">
              {creator.profileImage ? (
                <img 
                  src={creator.profileImage} 
                  alt={creator.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-xl font-bold">
                  {creator.name.charAt(0)}
                </div>
              )}
            </div>
            {creator.verified && (
              <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full">
                <Check className="h-3 w-3" />
              </div>
            )}
          </div>
          
          {/* Name and Username */}
          <div className="flex-1">
            <div className="flex items-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {creator.name}
              </h3>
              {creator.featured && (
                <span className="ml-2 bg-yellow-400 text-yellow-800 text-xs px-1.5 py-0.5 rounded-full flex items-center">
                  <Award className="h-2.5 w-2.5 mr-0.5" /> Featured
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">@{creator.username}</p>
          </div>
        </div>
        
        {/* Location and Rating */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-xs">
            <MapPin className="h-3 w-3 mr-1" />
            {creator.location.city}, {creator.location.country}
          </div>
          
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-xs">
            <Star className="h-3 w-3 mr-1 text-yellow-500" />
            {creator.metrics.rating} ({creator.metrics.reviewCount || 0})
          </div>
        </div>
        
        {/* Bio */}
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {creator.bio}
        </p>
        
        {/* Availability Status */}
        {creator.isAvailableForHire !== undefined && (
          <div className="mt-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
              creator.isAvailableForHire 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {creator.isAvailableForHire ? 'Available' : 'Unavailable'}
            </span>
          </div>
        )}
        
        {/* Creator Type Specific Info */}
        {creator.creatorType === 'influencer' && (creator as any).audienceSize && (
          <div className="mt-3 flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Users className="h-4 w-4 mr-1" />
            <span>
              {(creator as any).audienceSize > 1000000 
                ? `${((creator as any).audienceSize / 1000000).toFixed(1)}M followers` 
                : (creator as any).audienceSize > 1000 
                  ? `${((creator as any).audienceSize / 1000).toFixed(1)}K followers` 
                  : `${(creator as any).audienceSize} followers`}
            </span>
          </div>
        )}
        
        {creator.creatorType === 'crew' && (creator as any).teamSize && (
          <div className="mt-3 flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Users className="h-4 w-4 mr-1" />
            <span>{(creator as any).teamSize} {(creator as any).teamSize === 1 ? 'person' : 'people'} team</span>
          </div>
        )}
        
        {/* Skills/Categories */}
        <div className="mt-3 flex flex-wrap gap-1">
          {creator.skills.slice(0, 3).map((skill, index) => (
            <span 
              key={index} 
              className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
            >
              {skill}
            </span>
          ))}
          {creator.skills.length > 3 && (
            <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs">
              +{creator.skills.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}