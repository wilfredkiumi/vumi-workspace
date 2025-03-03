import { CheckCircle } from 'lucide-react';
import { Studio } from '../../types';
import { Button } from '../../index';

interface StudioHeaderProps {
  colorMode?: string;
  theme?: string;
  studio: Studio;
  onContact?: () => void;
  onShare?: () => void;
}

export function StudioHeader({ 
  
  
  studio,
  onContact,
  onShare
, theme = "gigs", colorMode = "light" }: StudioHeaderProps) {
  return (
    <div className="relative rounded-xl overflow-hidden mb-12">
      {/* Cover Image */}
      <div className="h-96 relative">
        {studio.coverImage ? (
          <img 
            src={studio.coverImage} 
            alt={studio.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      {/* Studio Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="flex items-center">
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-white mr-6">
              {studio.logo ? (
                <img 
                  src={studio.logo} 
                  alt={studio.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-2xl font-bold">
                  {studio.name.charAt(0)}
                </div>
              )}
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <h1 className="text-4xl font-bold mr-3">{studio.name}</h1>
                {studio.verified && (
                  <CheckCircle className="h-6 w-6 text-blue-500" />
                )}
                {studio.featured && (
                  <span className="ml-2 bg-yellow-500 text-black px-2 py-0.5 rounded-full text-sm font-medium">
                    Featured
                  </span>
                )}
              </div>
              
              <div className="flex items-center text-white/90">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  studio.plan === 'premium' 
                    ? 'bg-yellow-500 text-black' 
                    : studio.plan === 'pro'
                      ? 'bg-purple-500 text-white'
                      : 'bg-blue-500 text-white'
                }`}>
                  {studio.plan.charAt(0).toUpperCase() + studio.plan.slice(1)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <Button 
              theme={theme} 
              variant="secondary" 
              colorMode={colorMode}
              onClick={onShare}
              className="text-sm"
            >
              Share
            </Button>
            
            <Button 
              theme={theme} 
              variant="primary" 
              colorMode={colorMode}
              onClick={onContact}
              className="text-sm"
            >
              Contact Studio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}