import { Briefcase, Building, Star } from 'lucide-react';
import { Button, Card, THEMES } from 'ui';

interface PlansSectionProps {
  theme: string;
  colorMode: 'light' | 'dark';
  onViewPlans: () => void;
}

export function PlansSection({ theme, onViewPlans }: PlansSectionProps) {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Plans for Every Creative Journey
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
          Whether you're an individual creator or an organization, we have tailored solutions to help you showcase your work and connect with your audience.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card theme={theme} colorMode={colorMode} className="p-8 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Briefcase className={`h-10 w-10 ${THEMES.gigs.icon} mr-4`} />
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Individual Creators</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Perfect for game developers, animation producers, and creative professionals looking to showcase their work and grow their career.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Star className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-300">Professional portfolio showcase</span>
              </li>
              <li className="flex items-start">
                <Star className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-300">Project collaboration tools</span>
              </li>
              <li className="flex items-start">
                <Star className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-300">Client management features</span>
              </li>
            </ul>
            <p className="text-xl font-bold text-gray-800 dark:text-white mb-6">
              Starting at $49.99/year
            </p>
            <Button 
              theme={theme} 
              variant="primary" 
              colorMode={colorMode} 
              className="w-full"
              onClick={onViewPlans}
            >
              View Creator Plans
            </Button>
          </Card>
          
          <Card theme={theme} colorMode={colorMode} className="p-8 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Building className={`h-10 w-10 ${THEMES.gigs.icon} mr-4`} />
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Studios & Businesses</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Comprehensive solutions for studios, agencies, and creative businesses of all sizes.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Star className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-300">Team collaboration features</span>
              </li>
              <li className="flex items-start">
                <Star className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-300">Advanced project management</span>
              </li>
              <li className="flex items-start">
                <Star className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-300">Enterprise-grade security</span>
              </li>
            </ul>
            <p className="text-xl font-bold text-gray-800 dark:text-white mb-6">
              Starting at $299/year
            </p>
            <Button 
              theme={theme} 
              variant="primary" 
              colorMode={colorMode} 
              className="w-full"
              onClick={onViewPlans}
            >
              View Business Plans
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}