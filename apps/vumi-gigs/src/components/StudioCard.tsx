import React from 'react';
import { MapPin, Star, CheckCircle, Users, Film, Camera, Award } from 'lucide-react';
import { Studio } from '../models';
import { ThemeType, ColorMode } from 'ui';

interface StudioCardProps {
  studio: Studio;
  theme: ThemeType;
  colorMode: ColorMode;
  onClick?: (studioId: string) => void;
  compact?: boolean;
}

export function StudioCard({ 
  studio, 
  theme, 
  colorMode,
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
      {/* Cover Image */}
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
      
      {/* Studio Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mr-4">
              {studio.logo ? (
                <img 
                  src={studio.logo} 
                  alt={studio.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-2xl font-bold">
                  {studio.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
                {studio.name}
                {studio.verified && (
                  <CheckCircle className="h-5 w-5 text-blue-500 ml-2" />
                )}
              </h3>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                {studio.location.city}, {studio.location.country}
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-500 mr-1" />
            <span className="font-semibold text-gray-800 dark:text-white">
              {studio.metrics.rating}
            </span>
            <span className="text-gray-500 dark:text-gray-400 ml-1">
              ({studio.metrics.reviews})
            </span>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {studio.description}
        </p>
        
        {/* Industry Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {studio.industry.map((ind, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg text-sm"
            >
              {ind}
            </span>
          ))}
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center text-gray-600 dark:text-gray-400 mb-1">
              <Users className="h-5 w-5 mr-1" />
              <span className="text-sm">Team</span>
            </div>
            <span className="text-lg font-semibold text-gray-800 dark:text-white">
              {studio.teamMembers.length}
            </span>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center text-gray-600 dark:text-gray-400 mb-1">
              <Film className="h-5 w-5 mr-1" />
              <span className="text-sm">Projects</span>
            </div>
            <span className="text-lg font-semibold text-gray-800 dark:text-white">
              {studio.projects.length}
            </span>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center text-gray-600 dark:text-gray-400 mb-1">
              <Award className="h-5 w-5 mr-1" />
              <span className="text-sm">Completed</span>
            </div>
            <span className="text-lg font-semibold text-gray-800 dark:text-white">
              {studio.metrics.completedProjects}
            </span>
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