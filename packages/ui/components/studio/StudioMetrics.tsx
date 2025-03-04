// @ts-nocheck
import { Star, Film, MessageSquare } from 'lucide-react';
import { Studio } from '../../types';
import { Card } from '../../index';

interface StudioMetricsProps {
  colorMode?: string;
  theme?: string;
  studio: Studio;
}

export function StudioMetrics({ 
  
  
  studio
, theme = "gigs", colorMode = "light" }: StudioMetricsProps) {
  return (
    <Card theme={theme} colorMode={colorMode}>
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Studio Metrics</h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
            {studio.metrics.rating}
          </div>
          <div className="flex items-center justify-center text-yellow-500 mb-1">
            <Star className="h-5 w-5" />
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Rating
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
            {studio.metrics.completedProjects}
          </div>
          <div className="flex items-center justify-center text-blue-500 mb-1">
            <Film className="h-5 w-5" />
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Completed Projects
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
            {studio.metrics.reviews}
          </div>
          <div className="flex items-center justify-center text-green-500 mb-1">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Reviews
          </div>
        </div>
      </div>
    </Card>
  );
}