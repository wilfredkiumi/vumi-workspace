export interface UserProfile {
  userId: string;
  name: string;
  email: string;
  accountType: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatorProfile extends UserProfile {
  bio: string;
  tagline: string;
  creatorType: string;
  location: string;
  skills: string[];
  categories: string[];
}

export interface BusinessProfile {
  userId: string;
  businessName: string;
  description: string;
  businessType: string;
  location: string;
  services: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Location {
  country: string;
  city: string;
  remote: boolean;
}

// Simplified profileService
export class ProfileService {
  private static instance: ProfileService;
  
  public static getInstance(): ProfileService {
    if (!ProfileService.instance) {
      ProfileService.instance = new ProfileService();
    }
    return ProfileService.instance;
  }

  async getUserProfile() {
    return null;
  }
  
  async getCreatorProfile() {
    return null;
  }
  
  async getBusinessProfile() {
    return null;
  }
  
  async saveUserProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
    return {
      userId: 'mock-id',
      name: profile.name || 'Mock User',
      email: profile.email || 'user@example.com',
      accountType: 'creator',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
  
  async saveCreatorProfile(profile: Partial<CreatorProfile>): Promise<CreatorProfile> {
    const location = typeof profile.location === 'object' ? 
      profile.location as Location : 
      { country: 'US', city: 'New York', remote: true };

    return {
      userId: 'mock-id',
      name: profile.name || 'Mock Creator',
      email: profile.email || 'creator@example.com',
      accountType: 'creator',
      bio: profile.bio || '',
      tagline: profile.tagline || '',
      creatorType: profile.creatorType || 'individual',
      location: `${location.country}, ${location.city}`,
      skills: profile.skills || [],
      categories: profile.categories || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
  
  async saveBusinessProfile(profile: Partial<BusinessProfile>): Promise<BusinessProfile> {
    const location = typeof profile.location === 'object' ? 
      profile.location as Location : 
      { country: 'US', city: 'New York', remote: true };
      
    return {
      userId: 'mock-id',
      businessName: profile.businessName || 'Mock Business',
      description: profile.description || '',
      businessType: 'studio',
      location: `${location.country}, ${location.city}`,
      services: profile.services || [],
      createdBy: 'mock',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}

export const profileService = ProfileService.getInstance();
