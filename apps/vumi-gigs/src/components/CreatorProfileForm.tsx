// @ts-nocheck
import { useState  } from 'react';
import { useTheme, Button, Card } from 'ui';
import { Creator } from '../models';
import { useCreator } from '../hooks/useCreator';
import { MapPin, Link, X } from 'lucide-react';

interface CreatorProfileFormProps {
  creatorId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreatorProfileForm({ creatorId, onSuccess, onCancel }: CreatorProfileFormProps) {
  const { theme } = useTheme();
  const { creator, loading, error, updateCreator } = useCreator(creatorId);
  
  const [formData, setFormData] = useState<Partial<Creator>>(creator || {
    name: '',
    username: '',
    bio: '',
    location: { city: '', country: '' },
    categories: [],
    skills: [],
    experience: [],
    portfolio: [],
    socialLinks: [],
    creatorType: 'influencer',
    isAvailableForHire: true,
    freelanceStatus: true,
    fulltimeStatus: false
  });
  
  const [newSkill, setNewSkill] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Update form data when creator data is loaded
  React.useEffect(() => {
    if (creator) {
      setFormData(creator);
    }
  }, [creator]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle nested properties
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof Creator],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills?.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...(prev.skills || []), newSkill.trim()]
      }));
      setNewSkill('');
    }
  };
  
  const handleRemoveSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills?.filter(s => s !== skill) || []
    }));
  };
  
  const handleAddCategory = () => {
    if (newCategory.trim() && !formData.categories?.includes(newCategory.trim())) {
      setFormData(prev => ({
        ...prev,
        categories: [...(prev.categories || []), newCategory.trim()]
      }));
      setNewCategory('');
    }
  };
  
  const handleRemoveCategory = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories?.filter(c => c !== category) || []
    }));
  };
  
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.name?.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.username?.trim()) {
      errors.username = 'Username is required';
    }
    
    if (!formData.bio?.trim()) {
      errors.bio = 'Bio is required';
    }
    
    if (!formData.location?.city?.trim()) {
      errors['location.city'] = 'City is required';
    }
    
    if (!formData.location?.country?.trim()) {
      errors['location.country'] = 'Country is required';
    }
    
    if (!formData.categories?.length) {
      errors.categories = 'At least one category is required';
    }
    
    if (!formData.skills?.length) {
      errors.skills = 'At least one skill is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      await updateCreator(formData);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error updating creator profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <Card theme={theme} colorMode={colorMode} className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {creator ? 'Edit Creator Profile' : 'Create Creator Profile'}
      </h2>
      
      {error && (
        <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg mb-6">
          {error.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${formErrors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
              />
              {formErrors.name && <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Username *
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username || ''}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${formErrors.username ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
              />
              {formErrors.username && <p className="mt-1 text-sm text-red-500">{formErrors.username}</p>}
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bio *
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio || ''}
              onChange={handleInputChange}
              rows={4}
              className={`w-full px-3 py-2 border ${formErrors.bio ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
            />
            {formErrors.bio && <p className="mt-1 text-sm text-red-500">{formErrors.bio}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="location.city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                City *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="location.city"
                  name="location.city"
                  value={formData.location?.city || ''}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-3 py-2 border ${formErrors['location.city'] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                />
              </div>
              {formErrors['location.city'] && <p className="mt-1 text-sm text-red-500">{formErrors['location.city']}</p>}
            </div>
            
            <div>
              <label htmlFor="location.country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Country *
              </label>
              <input
                type="text"
                id="location.country"
                name="location.country"
                value={formData.location?.country || ''}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${formErrors['location.country'] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
              />
              {formErrors['location.country'] && <p className="mt-1 text-sm text-red-500">{formErrors['location.country']}</p>}
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="creatorType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Creator Type *
            </label>
            <select
              id="creatorType"
              name="creatorType"
              value={formData.creatorType || 'influencer'}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="influencer">Influencer</option>
              <option value="crew">Crew</option>
            </select>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isAvailableForHire"
                name="isAvailableForHire"
                checked={formData.isAvailableForHire || false}
                onChange={(e) => setFormData(prev => ({ ...prev, isAvailableForHire: e.target.checked }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isAvailableForHire" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Available for hire
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="freelanceStatus"
                name="freelanceStatus"
                checked={formData.freelanceStatus || false}
                onChange={(e) => setFormData(prev => ({ ...prev, freelanceStatus: e.target.checked }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="freelanceStatus" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Freelance
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="fulltimeStatus"
                name="fulltimeStatus"
                checked={formData.fulltimeStatus || false}
                onChange={(e) => setFormData(prev => ({ ...prev, fulltimeStatus: e.target.checked }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="fulltimeStatus" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Full-time
              </label>
            </div>
          </div>
        </div>
        
        {/* Categories and Skills */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Categories and Skills</h3>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Categories *
            </label>
            <div className="flex items-center mb-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Add a category..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCategory();
                  }
                }}
              />
              <Button
                theme={theme}
                variant="secondary"
                colorMode={colorMode}
                onClick={handleAddCategory}
                className="ml-2"
              >
                Add
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.categories?.map((category, index) => (
                <div
                  key={index}
                  className="flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full"
                >
                  <span className="text-sm">{category}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(category)}
                    className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            {formErrors.categories && <p className="mt-1 text-sm text-red-500">{formErrors.categories}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Skills *
            </label>
            <div className="flex items-center mb-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Add a skill..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
              />
              <Button
                theme={theme}
                variant="secondary"
                colorMode={colorMode}
                onClick={handleAddSkill}
                className="ml-2"
              >
                Add
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.skills?.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full"
                >
                  <span className="text-sm">{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-2 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            {formErrors.skills && <p className="mt-1 text-sm text-red-500">{formErrors.skills}</p>}
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
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}
          <Button
            theme={theme}
            variant="primary"
            colorMode={colorMode}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : (creator ? 'Update Profile' : 'Create Profile')}
          </Button>
        </div>
      </form>
    </Card>
  );
}