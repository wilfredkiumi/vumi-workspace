import React, { useState } from 'react';
import { useTheme, Button, Card } from 'ui';
import { useAuth } from '../contexts/AuthContext';
import { useUserProfile } from '../hooks/useUserProfile';
import { useCreator } from '../hooks/useCreator';
import { UserProfileForm } from '../components/UserProfileForm';
import { CreatorProfileForm } from '../components/CreatorProfileForm';
import { User, MapPin, Mail, Calendar, CheckCircle, Settings } from 'lucide-react';

enum ProfileTab {
  USER_PROFILE = 'user_profile',
  CREATOR_PROFILE = 'creator_profile',
  SETTINGS = 'settings'
}

export function ProfilePage() {
  const { theme, colorMode } = useTheme();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile();
  const { creator, loading: creatorLoading } = useCreator();
  
  const [activeTab, setActiveTab] = useState<ProfileTab>(ProfileTab.USER_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  
  const isLoading = authLoading || profileLoading || creatorLoading;
  
  if (isLoading) {
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
  
  if (!isAuthenticated || !user) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <Card theme={theme} colorMode={colorMode} className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Please Sign In
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              You need to be signed in to view your profile.
            </p>
            <Button
              theme={theme}
              variant="primary"
              colorMode={colorMode}
              onClick={() => {/* Handle sign in */}}
            >
              Sign In
            </Button>
          </Card>
        </div>
      </div>
    );
  }
  
  const renderUserProfile = () => {
    if (isEditing) {
      return (
        <UserProfileForm 
          onSuccess={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
        />
      );
    }
    
    return (
      <Card theme={theme} colorMode={colorMode} className="p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            User Profile
          </h2>
          <Button
            theme={theme}
            variant="secondary"
            colorMode={colorMode}
            onClick={() => setIsEditing(true)}
            className="text-sm"
          >
            <Settings className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mx-auto md:mx-0">
              {profile?.profileImage ? (
                <img 
                  src={profile.profileImage} 
                  alt={profile.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray- full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-4xl font-bold">
                  {profile?.name?.charAt(0) || user.name?.charAt(0) || '?'}
                </div>
              )}
            </div>
          </div>
          
          <div className="md:w-2/3">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {profile?.name || user.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {profile?.username || user.username}
                </p>
              </div>
              
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Mail className="h-5 w-5 mr-2" />
                <span>{profile?.email || user.email}</span>
              </div>
              
              {profile?.bio && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</h4>
                  <p className="text-gray-600 dark:text-gray-300">{profile.bio}</p>
                </div>
              )}
              
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Member since {new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  };
  
  const renderCreatorProfile = () => {
    if (isEditing) {
      return (
        <CreatorProfileForm 
          onSuccess={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
        />
      );
    }
    
    if (!creator) {
      return (
        <Card theme={theme} colorMode={colorMode} className="p-6 text-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            No Creator Profile Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            You haven't set up your creator profile yet. Create one to showcase your skills and get hired!
          </p>
          <Button
            theme={theme}
            variant="primary"
            colorMode={colorMode}
            onClick={() => setIsEditing(true)}
          >
            Create Creator Profile
          </Button>
        </Card>
      );
    }
    
    return (
      <Card theme={theme} colorMode={colorMode} className="p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Creator Profile
          </h2>
          <Button
            theme={theme}
            variant="secondary"
            colorMode={colorMode}
            onClick={() => setIsEditing(true)}
            className="text-sm"
          >
            <Settings className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mx-auto md:mx-0">
              {creator.profileImage ? (
                <img 
                  src={creator.profileImage} 
                  alt={creator.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-4xl font-bold">
                  {creator.name.charAt(0)}
                </div>
              )}
            </div>
            
            <div className="mt-4 text-center md:text-left">
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  creator.creatorType === 'influencer' 
                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' 
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                }`}>
                  {creator.creatorType === 'influencer' ? 'Influencer' : 'Crew'}
                </span>
                
                {creator.verified && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </span>
                )}
                
                {creator.isAvailableForHire && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Available for hire
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {creator.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  @{creator.username}
                </p>
              </div>
              
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{creator.location.city}, {creator.location.country}</span>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</h4>
                <p className="text-gray-600 dark:text-gray-300">{creator.bio}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {creator.categories.map((category, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg text-xs"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {creator.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  };
  
  const renderSettings = () => {
    return (
      <Card theme={theme} colorMode={colorMode} className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Account Settings
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Password
            </h3>
            <Button
              theme={theme}
              variant="secondary"
              colorMode={colorMode}
            >
              Change Password
            </Button>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Notifications
            </h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Email notifications
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="pushNotifications"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="pushNotifications" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Push notifications
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Account
            </h3>
            <Button
              theme={theme}
              variant="secondary"
              colorMode={colorMode}
              className="text-red-600 dark:text-red-400 border-red-600 dark:border-red-400 hover:bg-red-50 dark:hover:bg-red-900"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </Card>
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              className={`py-4 px-6 font-medium text-sm ${
                activeTab === ProfileTab.USER_PROFILE 
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => {
                setActiveTab(ProfileTab.USER_PROFILE);
                setIsEditing(false);
              }}
            >
              <User className="h-5 w-5 inline-block mr-2" />
              User Profile
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm ${
                activeTab === ProfileTab.CREATOR_PROFILE 
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => {
                setActiveTab(ProfileTab.CREATOR_PROFILE);
                setIsEditing(false);
              }}
            >
              <Briefcase className="h-5 w-5 inline-block mr-2" />
              Creator Profile
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm ${
                activeTab === ProfileTab.SETTINGS 
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => {
                setActiveTab(ProfileTab.SETTINGS);
                setIsEditing(false);
              }}
            >
              <Settings className="h-5 w-5 inline-block mr-2" />
              Settings
            </button>
          </div>
        </div>
        
        {activeTab === ProfileTab.USER_PROFILE && renderUserProfile()}
        {activeTab === ProfileTab.CREATOR_PROFILE && renderCreatorProfile()}
        {activeTab === ProfileTab.SETTINGS && renderSettings()}
      </div>
    </div>
  );
}