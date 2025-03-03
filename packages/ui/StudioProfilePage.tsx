import { useState, useEffect  } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Studio } from './types';
import { ThemeType, ColorMode } from './index';
import { sampleStudio } from './data/sampleData';
import {
  StudioHeader,
  StudioMetrics,
  StudioTeam,
  StudioServices,
  StudioProjects,
  StudioContact,
  StudioFacilities
} from './components/studio';

interface StudioProfilePageProps {
  studioId: string;
  theme?: ThemeType;
  colorMode?: ColorMode;
  onBack?: () => void;
  onViewCreator?: (creatorId: string) => void;
  onViewProject?: (projectId: string) => void;
}

export function StudioProfilePage({ 
  studioId, 
  theme = "gigs", /* eslint-disable-line @typescript-eslint/no-unused-vars */
  colorMode = "light", /* eslint-disable-line @typescript-eslint/no-unused-vars */
  onBack,
  onViewCreator,
  onViewProject
}: StudioProfilePageProps) {
  const [studio, setStudio] = useState<Studio | null>(null);
  const [activeTab, setActiveTab] = useState<'about' | 'projects' | 'team' | 'facilities'>('about');
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const [showContactForm, setShowContactForm] = useState(false);
  
  useEffect(() => {
    // In a real app, this would fetch the studio data from an API
    setStudio(sampleStudio);
  }, [studioId]);
  
  const handleContact = () => {
    setShowContactForm(true);
  };
  
  const handleShare = () => {
    // In a real app, this would open a share dialog
    console.log('Share studio:', studio?.name);
  };
  
  const handleMemberClick = (memberId: string) => {
    const member = studio?.teamMembers.find(m => m.id === memberId);
    if (member?.creatorId && onViewCreator) {
      onViewCreator(member.creatorId);
    }
  };
  
  const handleProjectClick = (projectId: string) => {
    if (onViewProject) {
      onViewProject(projectId);
    }
  };
  
  if (!studio) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-300 dark:bg-gray-700 rounded-lg mb-8"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        {onBack && (
          <button 
            onClick={onBack}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to Studios
          </button>
        )}
        
        {/* Studio Header */}
        <StudioHeader 
          studio={studio}
          theme={theme}
          colorMode={colorMode}
          onContact={handleContact}
          onShare={handleShare}
        />
        
        {/* Navigation Tabs */}
        <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'about'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('about')}
            >
              About
            </button>
            
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'projects'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('projects')}
            >
              Projects
            </button>
            
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'team'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('team')}
            >
              Team
            </button>
            
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'facilities'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('facilities')}
            >
              Facilities & Equipment
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'about' && (
              <div className="space-y-8">
                {/* About Section */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">About the Studio</h2>
                  <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                    {studio.description}
                  </p>
                </div>
                
                {/* Services */}
                <StudioServices 
                  studio={studio}
                  theme={theme}
                  colorMode={colorMode}
                />
                
                {/* Metrics */}
                <StudioMetrics 
                  studio={studio}
                  theme={theme}
                  colorMode={colorMode}
                />
              </div>
            )}
            
            {activeTab === 'projects' && (
              <StudioProjects 
                studio={studio}
                theme={theme}
                colorMode={colorMode}
                onProjectClick={handleProjectClick}
              />
            )}
            
            {activeTab === 'team' && (
              <StudioTeam 
                studio={studio}
                theme={theme}
                colorMode={colorMode}
                onMemberClick={handleMemberClick}
              />
            )}
            
            {activeTab === 'facilities' && (
              <StudioFacilities 
                studio={studio}
                theme={theme}
                colorMode={colorMode}
              />
            )}
          </div>
          
          {/* Right Sidebar */}
          <div>
            <StudioContact 
              studio={studio}
              theme={theme}
              colorMode={colorMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}