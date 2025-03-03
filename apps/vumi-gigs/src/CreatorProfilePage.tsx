import React, { useState, useEffect } from 'react';
import { useTheme, Button, Card } from 'ui';
import { Creator } from '../models';
import { useCreator, usePayment } from './hooks';

interface CreatorProfilePageProps {
  selectedCreatorId?: string;
  onBack?: () => void;
  onViewProject?: (projectId: string) => void;
  onViewShowcase?: (showcaseId: string) => void;
  onViewCreator?: (creatorId: string) => void;
}

function CreatorProfilePage({ 
  selectedCreatorId, 
  onBack,
  onViewProject,
  onViewShowcase,
  onViewCreator
}: CreatorProfilePageProps) {
  const { theme, colorMode } = useTheme();
  const { creator, loading, error, updateCreator } = useCreator(selectedCreatorId);
  const { loading: paymentLoading, createSubscription, redirectToCheckout } = usePayment();
  
  const [showPlans, setShowPlans] = useState(false);
  
  const handleContact = (creatorId: string) => {
    console.log('Contact creator:', creatorId);
    // Implement contact functionality
  };
  
  const handleHire = (creatorId: string) => {
    console.log('Hire creator:', creatorId);
    // Implement hire functionality
  };
  
  const handleUpgrade = (creatorId: string) => {
    console.log('Upgrade creator:', creatorId);
    setShowPlans(true);
  };
  
  const handleSelectPlan = async (planId: string) => {
    try {
      const response = await createSubscription({
        planId,
        successUrl: `${window.location.origin}/payment/success?type=subscription&planId=${planId}`,
        cancelUrl: `${window.location.origin}/payment/cancel?type=subscription&planId=${planId}`
      });
      
      redirectToCheckout(response.url);
    } catch (error) {
      console.error('Error subscribing to plan:', error);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <Card theme={theme} colorMode={colorMode} className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Error Loading Profile
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {error.message}
            </p>
            {onBack && (
              <Button
                theme={theme}
                variant="secondary"
                colorMode={colorMode}
                onClick={onBack}
              >
                Go Back
              </Button>
            )}
          </Card>
        </div>
      </div>
    );
  }
  
  if (!creator) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <Card theme={theme} colorMode={colorMode} className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Creator Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              The creator profile you're looking for could not be found.
            </p>
            {onBack && (
              <Button
                theme={theme}
                variant="secondary"
                colorMode={colorMode}
                onClick={onBack}
              >
                Go Back
              </Button>
            )}
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        {onBack && (
          <Button
            theme={theme}
            variant="secondary"
            colorMode={colorMode}
            onClick={onBack}
            className="mb-6"
          >
            Back to Creators
          </Button>
        )}
        
        <Card theme={theme} colorMode={colorMode} className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                {creator.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">@{creator.username}</p>
            </div>
            
            <div className="flex space-x-3">
              <Button
                theme={theme}
                variant="secondary"
                colorMode={colorMode}
                onClick={() => handleContact(creator.id)}
                className="text-sm"
              >
                Contact
              </Button>
              <Button
                theme={theme}
                variant="primary"
                colorMode={colorMode}
                onClick={() => handleHire(creator.id)}
                className="text-sm"
              >
                Hire
              </Button>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-300">
              {creator.bio}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {creator.location.city}, {creator.location.country}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Member Since
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {new Date(creator.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </Card>
        
        {/* Portfolio Section */}
        <Card theme={theme} colorMode={colorMode} className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {creator.portfolio.map((item, index) => (
              <div key={index} className="overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                <img 
                  src={item.thumbnailUrl} 
                  alt={item.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Skills Section */}
        <Card theme={theme} colorMode={colorMode} className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {creator.skills.map((skill, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </Card>
        
        {/* Experience Section */}
        <Card theme={theme} colorMode={colorMode}>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Experience</h2>
          <div className="space-y-6">
            {creator.experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {exp.role} at {exp.company}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {exp.startDate} - {exp.endDate || 'Present'}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CreatorProfilePage;