
import React, { createContext, useContext, useState } from 'react';

// Define the profile context interface
const WorkspaceProfileContext = createContext(undefined);

export function WorkspaceProfileProvider({ children, appId }) {
  const [userProfile, setUserProfile] = useState(null);
  const [creatorProfile, setCreatorProfile] = useState(null);
  const [businessProfile, setBusinessProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const hasProfile = Boolean(creatorProfile || businessProfile);

  const saveUserProfile = async (profile) => {
    const mockProfile = {
      userId: 'mock-id',
      name: profile.name || 'Mock User',
      email: profile.email || 'user@example.com',
      accountType: 'creator',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setUserProfile(mockProfile);
    return mockProfile;
  };

  const saveCreatorProfile = async (profile) => {
    const mockProfile = {
      userId: 'mock-id',
      name: profile.name || 'Mock Creator',
      email: profile.email || 'creator@example.com',
      bio: profile.bio || '',
      tagline: profile.tagline || '',
      creatorType: profile.creatorType || 'individual',
      location: profile.location || { country: 'US', city: 'New York', remote: true },
      skills: profile.skills || [],
      categories: profile.categories || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCreatorProfile(mockProfile);
    return mockProfile;
  };

  const saveBusinessProfile = async (profile) => {
    const mockProfile = {
      userId: 'mock-id',
      businessName: profile.businessName || 'Mock Business',
      description: profile.description || '',
      businessType: 'studio',
      location: profile.location || { country: 'US', city: 'New York', remote: true },
      services: profile.services || [],
      createdBy: 'mock',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setBusinessProfile(mockProfile);
    return mockProfile;
  };

  const refreshProfiles = async () => {
    console.log('Refreshing profiles');
  };

  const value = {
    userProfile,
    creatorProfile,
    businessProfile,
    isLoading,
    hasProfile,
    saveUserProfile,
    saveCreatorProfile,
    saveBusinessProfile,
    refreshProfiles
  };

  return (
    <WorkspaceProfileContext.Provider value={value}>
      {children}
    </WorkspaceProfileContext.Provider>
  );
}

export function useWorkspaceProfile() {
  const context = useContext(WorkspaceProfileContext);
  if (context === undefined) {
    throw new Error('useWorkspaceProfile must be used within a WorkspaceProfileProvider');
  }
  return context;
}
