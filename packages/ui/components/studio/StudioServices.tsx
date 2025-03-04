// @ts-nocheck
import { Studio } from '../../types';
import { Card } from '../../index';

interface StudioServicesProps {
  colorMode?: string;
  theme?: string;
  studio: Studio;
}

export function StudioServices({ 
  
  
  studio
, theme = "gigs", colorMode = "light" }: StudioServicesProps) {
  return (
    <Card theme={theme} colorMode={colorMode}>
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {studio.services.map((service, index) => (
          <div 
            key={index}
            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <span className="text-gray-800 dark:text-white">
              {service}
            </span>
          </div>
        ))}
      </div>
      
      {studio.plan === 'basic' && studio.services.length >= 3 && (
        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            Upgrade to Pro or Premium to list more services
          </p>
        </div>
      )}
    </Card>
  );
}