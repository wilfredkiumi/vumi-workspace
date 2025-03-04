// @ts-nocheck
import React from 'react';
import { Star, MapPin, CheckCircle, Users } from 'lucide-react';
import { Card } from 'ui';

interface StudioCardProps {
  studio: any; // You can replace this with a proper Studio type
  theme: string;
  colorMode: string;
  onClick?: () => void;
}

export function StudioCard({ studio, theme, colorMode, onClick }: StudioCardProps) {
  return (
    <Card 
      theme={theme} 
      colorMode={colorMode}
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className="h-48 mb-4">
        <img 
          src={studio.coverImage} 
          alt={studio.name} 
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>
      
      <div className="px-4 pb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          {studio.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {studio.description}
        </p>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          {studio.location.city}, {studio.location.country}
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
          <Star className="h-4 w-4 mr-1" />
          {studio.metrics.rating} ({studio.metrics.reviews} reviews)
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Users className="h-4 w-4 mr-1" />
          {studio.metrics.completedProjects} projects
        </div>
        {studio.verified && (
          <div className="mt-2 flex items-center text-sm text-green-500">
            <CheckCircle className="h-4 w-4 mr-1" />
            Verified
          </div>
        )}
      </div>
    </Card>
  );
}