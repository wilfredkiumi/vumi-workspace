import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme, Button, Card } from 'ui';
import { useAuth, useWorkspaceProfile } from '@vumi/shared';
import { User, MapPin, Mail, Calendar, CheckCircle, Settings, Edit, LogOut, Building, DollarSign, Globe } from 'lucide-react';

enum ProfileTab {
  USER_PROFILE = 'user_profile',
  CREATOR_PROFILE = 'creator_profile',
  BUSINESS_PROFILE = 'business_profile',
  SETTINGS = 'settings'
}

enum ProfileType {
  INDIVIDUAL = 'individual',
  BUSINESS = 'business'
}

const APP_ID = 'showcase'; // Current app identifier

export function ProfilePage() {
  const { theme, colorMode } = useTheme();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  
  // Add error handling for when useWorkspaceProfile is not available
  let profileContextValue = { 
    userProfile: null,
    creatorProfile: null,
    businessProfile: null,
    isLoading: false,
    hasProfile: false,
    saveCreatorProfile: async () => ({}),
    saveBusinessProfile: async () => ({}),
    saveUserProfile: async () => ({}),
    refreshProfiles: async () => {}
  };
  
  try {
    profileContextValue = useWorkspaceProfile();
  } catch (error) {
    console.error('WorkspaceProfile context not available:', error);
  }

  const {
    userProfile,
    creatorProfile,
    businessProfile,
    isLoading: profilesLoading,
    saveCreatorProfile,
    saveBusinessProfile
  } = profileContextValue;
  
  const [activeTab, setActiveTab] = useState<ProfileTab>(ProfileTab.USER_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [profileType, setProfileType] = useState<ProfileType | null>(null);
  
  const isLoading = authLoading || profilesLoading;
  
  // Determine if profiles exist
  const hasCreatorProfile = Boolean(creatorProfile);
  const hasBusinessProfile = Boolean(businessProfile);
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
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
    // Redirect to login if not authenticated
    navigate('/', { replace: true });
    return null;
  }
  
  const handleCreatorProfileSubmit = async (data: any) => {
    try {
      // Save to our workspace profile service
      await saveCreatorProfile(data, APP_ID);
      setIsEditing(false);
      setProfileType(null);
    } catch (error) {
      console.error('Error saving creator profile:', error);
    }
  };
  
  const handleBusinessProfileSubmit = async (data: any) => {
    try {
      // Save to our workspace profile service
      await saveBusinessProfile(data, APP_ID);
      setIsEditing(false);
      setProfileType(null);
    } catch (error) {
      console.error('Error saving business profile:', error);
    }
  };
  
  const renderUserProfile = () => {
    // Use userProfile data if available
    const displayName = userProfile?.name || user?.name || 'No Name Set';
    const displayEmail = userProfile?.email || user?.email || 'No Email Available';
    const displayAvatar = userProfile?.avatar || user?.avatar;
    const memberSince = userProfile?.createdAt || user?.createdAt;

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
              {displayAvatar ? (
                <img 
                  src={displayAvatar} 
                  alt={displayName} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-4xl font-bold">
                  {displayName?.charAt(0) || '?'}
                </div>
              )}
            </div>
          </div>
          
          <div className="md:w-2/3">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {displayName}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {displayEmail}
                </p>
              </div>
              
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Mail className="h-5 w-5 mr-2" />
                <span>{displayEmail}</span>
              </div>
              
              {memberSince && (
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>Member since {new Date(memberSince).toLocaleDateString()}</span>
                </div>
              )}

              <Button
                theme={theme}
                variant="secondary"
                colorMode={colorMode}
                className="w-full justify-start text-red-600 dark:text-red-400 mt-8"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  };
  
  const renderProfileTypeSelection = () => {
    return (
      <Card theme={theme} colorMode={colorMode} className="p-6 text-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
          What type of profile would you like to create?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
            onClick={() => setProfileType(ProfileType.INDIVIDUAL)}>
            <User className="h-12 w-12 mx-auto mb-4 text-blue-500" />
            <h3 className="text-lg font-semibold mb-2">Individual Creator</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create a personal profile to showcase your skills, experience, and portfolio as a creator.
            </p>
            <Button
              theme={theme}
              variant="secondary"
              colorMode={colorMode}
              onClick={() => setProfileType(ProfileType.INDIVIDUAL)}
              className="w-full"
            >
              Create Individual Profile
            </Button>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
            onClick={() => setProfileType(ProfileType.BUSINESS)}>
            <Building className="h-12 w-12 mx-auto mb-4 text-purple-500" />
            <h3 className="text-lg font-semibold mb-2">Business Profile</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create a profile for your studio, agency, or production company to promote your services.
            </p>
            <Button
              theme={theme}
              variant="secondary"
              colorMode={colorMode}
              onClick={() => setProfileType(ProfileType.BUSINESS)}
              className="w-full"
            >
              Create Business Profile
            </Button>
          </div>
        </div>
      </Card>
    );
  };
  
  const renderCreatorProfile = () => {
    // If editing with profile type selected, show the appropriate form
    if (isEditing) {
      if (profileType === ProfileType.INDIVIDUAL) {
        return (
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Creator Profile Form</h2>
            <p className="mb-4">
              You already have a creator profile that's being used across the Vumi workspace.
              To edit your profile, please visit the Vumi Gigs app.
            </p>
            <div className="flex justify-end space-x-4">
              <Button
                theme={theme}
                variant="secondary"
                colorMode={colorMode}
                onClick={() => {
                  setIsEditing(false);
                  setProfileType(null);
                }}
              >
                Cancel
              </Button>
              <a 
                href="https://gigs.vumi.io/profile" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button
                  theme={theme}
                  variant="primary"
                  colorMode={colorMode}
                >
                  Go to Vumi Gigs
                </Button>
              </a>
            </div>
          </div>
        );
      } else if (profileType === ProfileType.BUSINESS) {
        return (
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Business Profile Form</h2>
            <p className="mb-4">
              You already have a business profile that's being used across the Vumi workspace.
              To edit your profile, please visit the Vumi Gigs app.
            </p>
            <div className="flex justify-end space-x-4">
              <Button
                theme={theme}
                variant="secondary"
                colorMode={colorMode}
                onClick={() => {
                  setIsEditing(false);
                  setProfileType(null);
                }}
              >
                Cancel
              </Button>
              <a 
                href="https://gigs.vumi.io/profile" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button
                  theme={theme}
                  variant="primary"
                  colorMode={colorMode}
                >
                  Go to Vumi Gigs
                </Button>
              </a>
            </div>
          </div>
        );
      } else {
        return renderProfileTypeSelection();
      }
    }
    
    // If user has a creator profile, show it
    if (hasCreatorProfile) {
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
              onClick={() => {
                setIsEditing(true);
                setProfileType(ProfileType.INDIVIDUAL);
              }}
              className="text-sm"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
                {creatorProfile?.tagline || 'Content Creator'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{creatorProfile?.bio}</p>
              
              {creatorProfile?.workspaceApps && creatorProfile.workspaceApps.length > 0 && (
                <div className="mt-2 text-sm text-gray-500">
                  <span className="font-medium">Used in: </span>
                  {creatorProfile.workspaceApps.map((app, index) => (
                    <span key={app} className="inline-block mr-2 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                      {app}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex items-center text-gray-600 dark:text-gray-400 flex-wrap gap-y-2">
              {creatorProfile?.location && (
                <div className="flex items-center mr-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{creatorProfile.location.city}, {creatorProfile.location.country}</span>
                  {creatorProfile.location.remote && (
                    <span className="ml-1 text-xs">(Remote Available)</span>
                  )}
                </div>
              )}
              
              {creatorProfile?.rateRange?.min && (
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span>
                    ${creatorProfile.rateRange.min} - ${creatorProfile.rateRange.max} / {creatorProfile.rateRange.rateType}
                  </span>
                </div>
              )}
            </div>
            
            {/* Display skills */}
            {creatorProfile?.skills && creatorProfile.skills.length > 0 && (
              <div>
                <h4 className="text-md font-medium text-gray-800 dark:text-white mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {creatorProfile.skills.map((skill, i) => (
                    <span key={i} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Display categories */}
            {creatorProfile?.categories && creatorProfile.categories.length > 0 && (
              <div>
                <h4 className="text-md font-medium text-gray-800 dark:text-white mb-2">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {creatorProfile.categories.map((category, i) => (
                    <span key={i} className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Display languages */}
            {creatorProfile?.languages && creatorProfile.languages.length > 0 && (
              <div>
                <h4 className="text-md font-medium text-gray-800 dark:text-white mb-2">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {creatorProfile.languages.map((lang, i) => (
                    <span key={i} className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                      {lang.language} ({lang.proficiency})
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Business Profile Link if the user doesn't have one */}
            {!hasBusinessProfile && (
              <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-md font-medium text-gray-800 dark:text-white">Business Profile</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Create a profile for your studio or agency
                    </p>
                  </div>
                  <Button
                    theme={theme}
                    variant="outline"
                    colorMode={colorMode}
                    onClick={() => {
                      setActiveTab(ProfileTab.BUSINESS_PROFILE);
                      setIsEditing(true);
                      setProfileType(ProfileType.BUSINESS);
                    }}
                    className="text-sm"
                  >
                    <Building className="h-4 w-4 mr-2" />
                    Add Business
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      );
    }
    
    // If no profile, show placeholder with option to create one
    return (
      <Card theme={theme} colorMode={colorMode} className="p-6 text-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          No Creator Profile Found
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          You haven't set up your creator profile yet. 
          A creator profile can help you showcase your content and connect with fans.
        </p>
        <Button
          theme={theme}
          variant="primary"
          colorMode={colorMode}
          onClick={() => {
            window.location.href = 'https://gigs.vumi.io/profile';
          }}
        >
          Create Profile on Vumi Gigs
        </Button>
      </Card>
    );
  };

  const renderBusinessProfile = () => {
    // If editing with profile type selected, show business form
    if (isEditing && profileType === ProfileType.BUSINESS) {
      return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Business Profile Form</h2>
          <p className="mb-4">
            You already have a business profile that's being used across the Vumi workspace.
            To edit your profile, please visit the Vumi Gigs app.
          </p>
          <div className="flex justify-end space-x-4">
            <Button
              theme={theme}
              variant="secondary"
              colorMode={colorMode}
              onClick={() => {
                setIsEditing(false);
                setProfileType(null);
              }}
            >
              Cancel
            </Button>
            <a 
              href="https://gigs.vumi.io/profile" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button
                theme={theme}
                variant="primary"
                colorMode={colorMode}
              >
                Go to Vumi Gigs
              </Button>
            </a>
          </div>
        </div>
      );
    }
    
    // If user has a business profile, show it
    if (hasBusinessProfile && businessProfile) {
      return (
        <Card theme={theme} colorMode={colorMode} className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {businessProfile.businessName}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {businessProfile.tagline}
              </p>
            </div>
            <Button
              theme={theme}
              variant="secondary"
              colorMode={colorMode}
              onClick={() => {
                setIsEditing(true);
                setProfileType(ProfileType.BUSINESS);
              }}
              className="text-sm"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Business
            </Button>
          </div>
          
          <div className="space-y-6">
            <div>
              <p className="text-gray-600 dark:text-gray-400">{businessProfile.description}</p>
            </div>
            
            <div className="flex items-center text-gray-600 dark:text-gray-400 flex-wrap gap-x-4 gap-y-2">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>
                  {businessProfile.location?.city}, {businessProfile.location?.country}
                  {businessProfile.location?.address && ` - ${businessProfile.location.address}`}
                </span>
              </div>
              
              {businessProfile.websiteUrl && (
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-1" />
                  <a href={businessProfile.websiteUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Website
                  </a>
                </div>
              )}
              
              {businessProfile.yearEstablished && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Est. {businessProfile.yearEstablished}</span>
                </div>
              )}
            </div>
            
            {/* Services */}
            <div>
              <h4 className="text-md font-medium text-gray-800 dark:text-white mb-2">Services</h4>
              <div className="flex flex-wrap gap-2">
                {businessProfile.services?.map((service, i) => (
                  <span key={i} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                    {service}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Specialties */}
            {businessProfile.specialties?.length > 0 && (
              <div>
                <h4 className="text-md font-medium text-gray-800 dark:text-white mb-2">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {businessProfile.specialties.map((specialty, i) => (
                    <span key={i} className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Facilities for Studio type */}
            {businessProfile.businessType === 'studio' && businessProfile.facilities && (
              <div>
                <h4 className="text-md font-medium text-gray-800 dark:text-white mb-2">Studio Facilities</h4>
                <div className="flex flex-wrap gap-2">
                  {businessProfile.facilities.spaces?.map((space, i) => (
                    <span key={i} className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                      {space}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      );
    }
    
    // If no business profile, show placeholder
    return (
      <Card theme={theme} colorMode={colorMode} className="p-6 text-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          No Business Profile Found
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Create a business profile for your studio, agency, or production company.
        </p>
        <Button
          theme={theme}
          variant="primary"
          colorMode={colorMode}
          onClick={() => {
            window.location.href = 'https://gigs.vumi.io/profile';
          }}
        >
          Create Business Profile on Vumi Gigs
        </Button>
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
  
  // ... rest of the code ...
}

export default ProfilePage;