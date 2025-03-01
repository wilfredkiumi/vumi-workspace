import React from 'react';
import { Clock, Award, Eye, Heart, Users } from 'lucide-react';
import { Project } from './types';
import { ThemeType, ColorMode } from './index';

interface ProjectCardProps {
  project: Project;
  theme: ThemeType;
  colorMode: ColorMode;
  onClick?: (projectId: string) => void;
  compact?: boolean;
}

export function ProjectCard({ 
  project, 
  theme, 
  colorMode,
  onClick,
  compact = false
}: ProjectCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(project.id);
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          label: 'Completed',
          color: 'bg-green-500 text-white'
        };
      case 'in-progress':
        return {
          label: 'In Progress',
          color: 'bg-blue-500 text-white'
        };
      case 'upcoming':
        return {
          label: 'Upcoming',
          color: 'bg-purple-500 text-white'
        };
      default:
        return {
          label: status,
          color: 'bg-gray-500 text-white'
        };
    }
  };
  
  const statusBadge = getStatusBadge(project.status);
  
  if (compact) {
    return (
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
        onClick={handleClick}
      >
        <div className="h-32 relative">
          <img 
            src={project.thumbnail} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge.color}`}>
              {statusBadge.label}
            </span>
          </div>
        </div>
        <div className="p-3">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white line-clamp-1">{project.title}</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">By {project.producer}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      {/* Thumbnail */}
      <div className="h-48 relative">
        <img 
          src={project.thumbnail} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge.color}`}>
            {statusBadge.label}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{project.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">By {project.producer}</p>
        
        {project.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
            {project.description}
          </p>
        )}
        
        {/* Stats */}
        <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
          {project.releaseDate && (
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span>{project.releaseDate}</span>
            </div>
          )}
          
          {project.duration && (
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span>{project.duration}</span>
            </div>
          )}
          
          {project.awards && project.awards.length > 0 && (
            <div className="flex items-center">
              <Award className="h-3.5 w-3.5 mr-1" />
              <span>{project.awards.length} {project.awards.length === 1 ? 'award' : 'awards'}</span>
            </div>
          )}
          
          {project.views !== undefined && (
            <div className="flex items-center">
              <Eye className="h-3.5 w-3.5 mr-1" />
              <span>{project.views > 1000 ? `${(project.views / 1000).toFixed(1)}K` : project.views}</span>
            </div>
          )}
          
          {project.likes !== undefined && (
            <div className="flex items-center">
              <Heart className="h-3.5 w-3.5 mr-1" />
              <span>{project.likes > 1000 ? `${(project.likes / 1000).toFixed(1)}K` : project.likes}</span>
            </div>
          )}
          
          {project.contributors && project.contributors.length > 0 && (
            <div className="flex items-center">
              <Users className="h-3.5 w-3.5 mr-1" />
              <span>{project.contributors.length} {project.contributors.length === 1 ? 'contributor' : 'contributors'}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}