// @ts-nocheck
import { Building, PenTool as Tool } from 'lucide-react';
import { Studio } from '../../types';
import { Card } from '../../index';

interface StudioFacilitiesProps {
  colorMode?: string;
  theme?: string;
  studio: Studio;
}

export function StudioFacilities({ 
  
  
  studio
, theme = "gigs", colorMode = "light" }: StudioFacilitiesProps) {
  return (
    <div className="space-y-8">
      {/* Facilities */}
      {studio.facilities && studio.facilities.length > 0 && (
        <Card theme={theme} colorMode={colorMode}>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studio.facilities.map((facility, index) => (
              <div 
                key={index}
                className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <Building className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                <span className="text-gray-700 dark:text-gray-300">{facility}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
      
      {/* Equipment */}
      {studio.equipment && studio.equipment.length > 0 && (
        <Card theme={theme} colorMode={colorMode}>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Equipment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studio.equipment.map((equipment, index) => (
              <div 
                key={index}
                className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <Tool className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                <span className="text-gray-700 dark:text-gray-300">{equipment}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
      
      {studio.plan === 'basic' && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Upgrade to Pro or Premium to list your facilities and equipment
          </p>
        </div>
      )}
    </div>
  );
}