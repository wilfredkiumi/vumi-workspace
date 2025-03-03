import { useState } from 'react';
import { Button, Card, useTheme } from 'ui';
import { useAuth } from '@vumi/shared';
import { 
  User, Plus, X, MapPin, Globe, Clock, DollarSign,
  Briefcase, Camera, Video, PenTool, Tag, Languages
} from 'lucide-react';

interface CreatorProfileFormProps {
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
}

const CreatorProfileForm = ({ onSubmit, onCancel }: CreatorProfileFormProps) => {
  const { theme, colorMode } = useTheme();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [bio, setBio] = useState('');
  const [tagline, setTagline] = useState('');
  const [creatorType, setCreatorType] = useState<'individual' | 'crew' | 'studio' | 'agency'>('individual');
  
  // Location
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [remoteWork, setRemoteWork] = useState(true);
  
  // Skills and categories
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  
  // Languages
  const [languages, setLanguages] = useState<{ language: string, proficiency: string }[]>([]);
  const [newLanguage, setNewLanguage] = useState('');
  const [newProficiency, setNewProficiency] = useState('fluent');

  // Social media
  const [socialLinks, setSocialLinks] = useState<{ platform: string, url: string }[]>([]);
  const [newPlatform, setNewPlatform] = useState('');
  const [newSocialUrl, setNewSocialUrl] = useState('');

  // Rate range
  const [rateMin, setRateMin] = useState('');
  const [rateMax, setRateMax] = useState('');
  const [rateType, setRateType] = useState('hourly');

  // Helper functions
  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const removeCategory = (category: string) => {
    setCategories(categories.filter(c => c !== category));
  };

  const addLanguage = () => {
    if (newLanguage && !languages.some(l => l.language === newLanguage)) {
      setLanguages([...languages, { language: newLanguage, proficiency: newProficiency }]);
      setNewLanguage('');
      setNewProficiency('fluent');
    }
  };

  const removeLanguage = (language: string) => {
    setLanguages(languages.filter(l => l.language !== language));
  };

  const addSocialLink = () => {
    if (newPlatform && newSocialUrl && !socialLinks.some(l => l.platform === newPlatform)) {
      setSocialLinks([...socialLinks, { platform: newPlatform, url: newSocialUrl }]);
      setNewPlatform('');
      setNewSocialUrl('');
    }
  };

  const removeSocialLink = (platform: string) => {
    setSocialLinks(socialLinks.filter(l => l.platform !== platform));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Validate form
      if (!bio || !tagline || !country || !city || skills.length === 0 || categories.length === 0) {
        setError('Please fill in all required fields');
        setIsLoading(false);
        return;
      }

      // Create creator profile data
      const creatorData = {
        userId: user?.id,
        name: user?.name,
        email: user?.email,
        bio,
        tagline,
        creatorType,
        location: {
          country,
          city,
          remote: remoteWork
        },
        skills,
        categories,
        languages,
        socialLinks,
        rateRange: {
          min: rateMin ? parseInt(rateMin) : undefined,
          max: rateMax ? parseInt(rateMax) : undefined,
          rateType
        },
        profileImage: user?.avatar
      };
      
      // In a real app, you'd save this to your backend
      console.log('Creator profile data:', creatorData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onSubmit) {
        onSubmit(creatorData);
      }
    } catch (err) {
      console.error('Error creating creator profile:', err);
      setError('An error occurred while creating your profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full p-6" theme={theme} colorMode={colorMode}>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Create Creator Profile
      </h2>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900 rounded-lg">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Basic Information
          </h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="creatorType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Creator Type
              </label>
              <select
                id="creatorType"
                value={creatorType}
                onChange={(e) => setCreatorType(e.target.value as any)}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="individual">Individual Creator</option>
                <option value="crew">Production Crew</option>
                <option value="studio">Production Studio</option>
                <option value="agency">Content Agency</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="tagline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tagline (short description)
              </label>
              <input
                id="tagline"
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="E.g., Video Producer & Motion Designer"
                maxLength={100}
              />
            </div>
            
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bio
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Tell potential clients about your experience, style, and the kind of work you do..."
              />
            </div>
          </div>
        </div>
        
        {/* Location Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Location
          </h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Country
              </label>
              <input
                id="country"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                City
              </label>
              <input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            
            <div className="flex items-center">
              <input
                id="remoteWork"
                type="checkbox"
                checked={remoteWork}
                onChange={(e) => setRemoteWork(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remoteWork" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Available for remote work
              </label>
            </div>
          </div>
        </div>
        
        {/* Skills & Categories Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Skills & Categories
          </h3>
          
          <div className="space-y-6">
            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Skills
              </label>
              
              <div className="flex flex-wrap gap-2 mb-2">
                {skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              
              <div className="flex">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Add a skill (e.g., Video Editing, Photography)"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Categories */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Categories
              </label>
              
              <div className="flex flex-wrap gap-2 mb-2">
                {categories.map((category, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                  >
                    {category}
                    <button
                      type="button"
                      onClick={() => removeCategory(category)}
                      className="ml-1 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              
              <div className="flex">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Add a category (e.g., Film, Animation)"
                />
                <button
                  type="button"
                  onClick={addCategory}
                  className="px-4 py-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Languages Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Languages
          </h3>
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-2">
              {languages.map((lang, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                >
                  {lang.language} ({lang.proficiency})
                  <button
                    type="button"
                    onClick={() => removeLanguage(lang.language)}
                    className="ml-1 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="w-full md:w-auto flex-grow">
                <input
                  type="text"
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Language (e.g., English)"
                />
              </div>
              
              <div className="w-full md:w-auto md:flex-grow-0">
                <select
                  value={newProficiency}
                  onChange={(e) => setNewProficiency(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="fluent">Fluent</option>
                  <option value="professional">Professional</option>
                  <option value="conversational">Conversational</option>
                  <option value="basic">Basic</option>
                </select>
              </div>
              
              <button
                type="button"
                onClick={addLanguage}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Rate Range Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Rate Range
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="rateMin" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Minimum Rate ($)
              </label>
              <input
                id="rateMin"
                type="number"
                value={rateMin}
                onChange={(e) => setRateMin(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                min="0"
              />
            </div>
            
            <div>
              <label htmlFor="rateMax" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Maximum Rate ($)
              </label>
              <input
                id="rateMax"
                type="number"
                value={rateMax}
                onChange={(e) => setRateMax(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                min="0"
              />
            </div>
            
            <div>
              <label htmlFor="rateType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Rate Type
              </label>
              <select
                id="rateType"
                value={rateType}
                onChange={(e) => setRateType(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="hourly">Per Hour</option>
                <option value="daily">Per Day</option>
                <option value="project">Per Project</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Social Media Links */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Social Media Links
          </h3>
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-2">
              {socialLinks.map((link, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                >
                  {link.platform}
                  <button
                    type="button"
                    onClick={() => removeSocialLink(link.platform)}
                    className="ml-1 text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="w-full md:w-1/3">
                <select
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="">Select Platform</option>
                  <option value="youtube">YouTube</option>
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">TikTok</option>
                  <option value="twitter">Twitter</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="portfolio">Portfolio</option>
                </select>
              </div>
              
              <div className="w-full md:w-auto flex-grow">
                <input
                  type="text"
                  value={newSocialUrl}
                  onChange={(e) => setNewSocialUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="URL (e.g., https://youtube.com/...)"
                />
              </div>
              
              <button
                type="button"
                onClick={addSocialLink}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          {onCancel && (
            <Button
              theme={theme}
              variant="secondary"
              colorMode={colorMode}
              onClick={onCancel}
              className="px-6"
            >
              Cancel
            </Button>
          )}
          
          <Button
            theme={theme}
            variant="primary"
            colorMode={colorMode}
            type="submit"
            className="px-6"
            isLoading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Profile...' : 'Create Profile'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CreatorProfileForm;
