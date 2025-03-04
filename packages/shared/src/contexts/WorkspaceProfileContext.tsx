import { createContext, useContext, useState, type PropsWithChildren } from 'react';
import type { UserProfile, CreatorProfile, BusinessProfile } from '../services/profileService';

interface WorkspaceProfileContextType {
  userProfile: UserProfile | null;
  creatorProfile: CreatorProfile | null;
  businessProfile: BusinessProfile | null;
  isLoading: boolean;
  hasProfile: boolean;
  saveUserProfile: (profile: Partial<UserProfile>) => Promise<UserProfile>;
  saveCreatorProfile: (profile: Partial<CreatorProfile>) => Promise<CreatorProfile>;
  saveBusinessProfile: (profile: Partial<BusinessProfile>) => Promise<BusinessProfile>;
}

const WorkspaceProfileContext = createContext<WorkspaceProfileContextType | null>(null);

export function WorkspaceProfileProvider({ children }: PropsWithChildren) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [creatorProfile, setCreatorProfile] = useState<CreatorProfile | null>(null);
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile | null>(null);
  const [isLoading] = useState(false);
  
  const hasProfile = Boolean(creatorProfile || businessProfile);

  const saveUserProfile = async (profile: Partial<UserProfile>) => {
    const mockProfile: UserProfile = {
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

  const saveCreatorProfile = async (profile: Partial<CreatorProfile>) => {
    const mockProfile: CreatorProfile = {
      userId: 'mock-id',
      name: profile.name || 'Mock Creator',
      email: profile.email || 'creator@example.com',
      accountType: 'creator', // Add missing required field
      bio: profile.bio || '',
      tagline: profile.tagline || '',
      creatorType: profile.creatorType || 'individual',
      location: profile.location?.toString() || 'US',
      skills: profile.skills || [],
      categories: profile.categories || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCreatorProfile(mockProfile);
    return mockProfile;
  };

  const saveBusinessProfile = async (profile: Partial<BusinessProfile>) => {
    const mockProfile: BusinessProfile = {
      userId: 'mock-id',
      businessName: profile.businessName || 'Mock Business',
      description: profile.description || '',
      businessType: 'studio',
      location: profile.location?.toString() || 'US', // Convert location to string
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
    <div>
      {/* @ts-ignore */}
      <WorkspaceProfileContext.Provider value={value}>
        {children}
      </WorkspaceProfileContext.Provider>
    </div>
  );
}

export function useWorkspaceProfile() {
  const context = useContext(WorkspaceProfileContext);
  if (context === undefined) {
    throw new Error('useWorkspaceProfile must be used within a WorkspaceProfileProvider');
  }
  return context;
}
