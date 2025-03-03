import React from 'react';
import { Button, THEMES } from 'ui';

interface HowItWorksSectionProps {
  theme: string;
  colorMode: 'light' | 'dark';
  onLearnMore: () => void;
}

export function HowItWorksSection({ theme, colorMode, onLearnMore }: HowItWorksSectionProps) {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          How VumiGigs Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${THEMES.gigs.buttonPrimary} mb-4`}>
              <span className="text-xl font-bold text-white">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Create Your Profile</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Sign up and create a detailed profile showcasing your skills and experience.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${THEMES.gigs.buttonPrimary} mb-4`}>
              <span className="text-xl font-bold text-white">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Browse or Post Gigs</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Find work that matches your skills or post a gig to find the perfect freelancer.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${THEMES.gigs.buttonPrimary} mb-4`}>
              <span className="text-xl font-bold text-white">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Get Paid Securely</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Complete the work and receive payment through our secure payment system.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button 
            theme={theme} 
            variant="primary" 
            colorMode={colorMode} 
            className="px-6"
            onClick={onLearnMore}
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}