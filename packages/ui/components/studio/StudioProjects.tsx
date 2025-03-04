// @ts-nocheck
import { Studio } from '../../types';
import { Card } from '../../index';
import { Calendar } from 'lucide-react';

interface StudioProjectsProps {
  colorMode?: string;
  theme?: string;
  studio: Studio;
  onProjectClick?: (projectId: string) => void;
}

export function StudioProjects({ 
  
  
  studio,
  onProjectClick
, theme = "gigs", colorMode = "light" }: StudioProjectsProps) {
  const handleProjectClick = (projectId: string) => {
    if (onProjectClick) {
      onProjectClick(projectId);
    }
  };

  return (
    <Card theme={theme} colorMode={colorMode}>
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {studio.projects.map((project) => (
          <div 
            key={project.id}
            className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleProjectClick(project.id)}
          >
            <div className="h-40">
              <img 
                src={project.thumbnail} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                {project.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {project.description}
              </p>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Calendar className="h-3 w-3 mr-1" />
                {project.completionDate && new Date(project.completionDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {studio.plan === 'basic' && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Upgrade to Pro or Premium to showcase your projects and create portfolios
          </p>
        </div>
      )}
    </Card>
  );
}