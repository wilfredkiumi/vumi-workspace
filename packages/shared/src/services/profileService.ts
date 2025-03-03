
// Simplified profileService
class ProfileService {
  static #instance;
  
  static getInstance() {
    if (!this.#instance) {
      this.#instance = new ProfileService();
    }
    return this.#instance;
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
  
  async saveUserProfile(profile) {
    return {
      userId: 'mock-id',
      name: profile.name || 'Mock User',
      email: profile.email || 'user@example.com',
      accountType: 'creator',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
  
  async saveCreatorProfile(profile) {
    return {
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
  }
  
  async saveBusinessProfile(profile) {
    return {
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
  }
}

export const profileService = ProfileService.getInstance();
