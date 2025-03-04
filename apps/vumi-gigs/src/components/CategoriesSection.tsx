// @ts-nocheck
import { Award, Briefcase, FileCheck, Star } from 'lucide-react';
import { Button, Card, THEMES } from 'ui';

interface CategoriesSectionProps {
  theme: string;
  colorMode: 'light' | 'dark';
  onBrowseGigs: () => void;
}

export function CategoriesSection({ theme, onBrowseGigs }: CategoriesSectionProps) {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Popular Categories
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card theme={theme} colorMode={colorMode} className="flex flex-col items-center text-center p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={onBrowseGigs}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${THEMES.gigs.buttonPrimary} mb-4`}>
              <FileCheck className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Game Development</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">124 gigs available</p>
          </Card>
          
          <Card theme={theme} colorMode={colorMode} className="flex flex-col items-center text-center p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={onBrowseGigs}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${THEMES.gigs.buttonSecondary} mb-4`}>
              <Briefcase className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">3D Modeling</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">87 gigs available</p>
          </Card>
          
          <Card theme={theme} colorMode={colorMode} className="flex flex-col items-center text-center p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={onBrowseGigs}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${THEMES.gigs.buttonPrimary} mb-4`}>
              <Star className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Animation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">76 gigs available</p>
          </Card>
          
          <Card theme={theme} colorMode={colorMode} className="flex flex-col items-center text-center p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={onBrowseGigs}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${THEMES.gigs.buttonSecondary} mb-4`}>
              <Award className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Concept Art</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">54 gigs available</p>
          </Card>
        </div>
        
        <div className="text-center mt-12">
          <Button 
            theme={theme} 
            variant="secondary" 
            colorMode={colorMode} 
            className="px-6"
            onClick={onBrowseGigs}
          >
            Browse All Gigs
          </Button>
        </div>
      </div>
    </section>
  );
}