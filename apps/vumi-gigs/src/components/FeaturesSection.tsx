// @ts-nocheck
import { DollarSign, Search, Users } from 'lucide-react';
import { Card, THEMES } from 'ui';

interface FeaturesSectionProps {
  theme: string;
  colorMode: 'light' | 'dark';
}

export function FeaturesSection({ theme }: FeaturesSectionProps) {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Why Choose VumiGigs?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card theme={theme} colorMode={colorMode} className="flex flex-col items-center text-center p-8 hover:shadow-lg transition-shadow">
            <Search className={`h-12 w-12 ${THEMES.gigs.icon} mb-4`} />
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Find Work Easily</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Browse thousands of gigs across dozens of categories to find the perfect match for your skills.
            </p>
          </Card>
          
          <Card theme={theme} colorMode={colorMode} className="flex flex-col items-center text-center p-8 hover:shadow-lg transition-shadow">
            <Users className={`h-12 w-12 ${THEMES.gigs.icon} mb-4`} />
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Verified Talent</h3>
            <p className="text-gray-600 dark:text-gray-300">
              All freelancers are verified and reviewed, ensuring you get quality work every time.
            </p>
          </Card>
          
          <Card theme={theme} colorMode={colorMode} className="flex flex-col items-center text-center p-8 hover:shadow-lg transition-shadow">
            <DollarSign className={`h-12 w-12 ${THEMES.gigs.icon} mb-4`} />
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Secure Payments</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our secure payment system ensures you get paid on time, every time.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}