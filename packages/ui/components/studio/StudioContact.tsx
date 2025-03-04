// @ts-nocheck
import { ExternalLink, Globe, Mail, Phone } from 'lucide-react';
import { Studio } from '../../types';
import { Card } from '../../index';

interface StudioContactProps {
  colorMode?: string;
  theme?: string;
  studio: Studio;
}

export function StudioContact({ 
  
  
  studio
, theme = "gigs", colorMode = "light" }: StudioContactProps) {
  return (
    <Card theme={theme} colorMode={colorMode}>
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Contact Information</h2>
      <div className="space-y-4">
        {studio.contacts.email && (
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
            <a 
              href={`mailto:${studio.contacts.email}`}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {studio.contacts.email}
            </a>
          </div>
        )}
        
        {studio.contacts.phone && (
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
            <a 
              href={`tel:${studio.contacts.phone}`}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {studio.contacts.phone}
            </a>
          </div>
        )}
        
        {studio.contacts.website && (
          <div className="flex items-center">
            <Globe className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
            <a 
              href={studio.contacts.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
            >
              Visit Website
              <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>
        )}
        
        {studio.contacts.socialMedia && studio.contacts.socialMedia.length > 0 && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Social Media
            </h3>
            <div className="space-y-2">
              {studio.contacts.socialMedia.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  {social.platform}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}