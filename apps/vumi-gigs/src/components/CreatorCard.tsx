import { Card, useTheme } from 'ui';
import { Star, MapPin, CheckCircle, Users } from 'lucide-react';eact';
import { Creator, CreatorType } from '../models/Creator';

interface CreatorCardProps {
  creator: Creator;
  onClick?: () => void;
}

export function CreatorCard({ creator, onClick }: CreatorCardProps) {
  const { theme, colorMode } = useTheme();

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const renderCreatorTypeLabel = () => {
    return (
      <span 
        className={`absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-medium ${
          creator.creatorType === CreatorType.INFLUENCER
            ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
            : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
        }`}
      >
        {creator.creatorType === CreatorType.INFLUENCER ? 'Influencer' : 'Creator'}
      </span>
    );
  };

  const renderCreatorMetrics = () => {
    if (creator.creatorType === CreatorType.INFLUENCER && creator.socialStats) {
      const totalFollowers = 
        (creator.socialStats.youtube?.subscribers || 0) +
        (creator.socialStats.instagram?.followers || 0) +
        (creator.socialStats.tiktok?.followers || 0);
      return (
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{formatNumber(totalFollowers)} followers</span>
          </div>
        </div>
      );
    }
    return (
      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-400 mr-1" />
          <span>{creator.metrics.rating}</span>
        </div>
        <span>•</span>
        <span>{creator.metrics.completedProjects} projects</span>
      </div>
    );
  };

  return (
    <Card
      theme={theme}
      colorMode={colorMode}
      className="hover:shadow-lg transition-shadow cursor-pointer relative"
      onClick={onClick}
    >
      {renderCreatorTypeLabel()}
      
      <div className="p-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img 
                src={creator.profileImage} 
                alt={creator.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center mb-1">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                {creator.name}
              </h3>
              {creator.verified && (
                <CheckCircle className="h-4 w-4 text-blue-500 ml-1 flex-shrink-0" />
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              {creator.tagline || creator.bio.substring(0, 100)}...
            </p>
            {renderCreatorMetrics()}
            <div className="mt-3 flex flex-wrap gap-2">
              {creator.categories.slice(0, 3).map((category, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {category}
                </span>
              ))}
            </div>

            <div className="mt-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{creator.location.city}, {creator.location.country}</span>
              {creator.location.remote && (
                <span className="ml-1">(Remote)</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
