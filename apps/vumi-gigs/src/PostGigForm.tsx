import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, useTheme } from 'ui';
import { 
  X, 
  Plus, 
  Info, 
  MapPin, 
  Tag, 
  FileText, 
  Upload,
  Clock,
  Square,
  CheckSquare
} from 'lucide-react';
import { Gig, Location, Budget } from './models/Gig';
import { gigCategories, commonSkills } from './data/sampleGigs';

interface PostGigFormProps {
  onSubmit?: (gig: Omit<Gig, 'id' | 'postedBy' | 'postedDate' | 'applicants' | 'status'>) => void;
  onCancel?: () => void;
}

function PostGigForm({ onSubmit, onCancel }: PostGigFormProps) {
  const navigate = useNavigate();
  const { theme, colorMode } = useTheme(); // Add colorMode from useTheme
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    subcategory: '',
    budget: {
      min: 0,
      max: 0,
      type: 'fixed' as Budget['type']
    },
    duration: '',
    deadline: '',
    skills: [] as string[],
    location: {
      type: 'remote' as Location['type'],
      city: '',
      country: ''
    },
    attachments: [] as File[]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [skillInput, setSkillInput] = useState('');
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);
  const [customCategory, setCustomCategory] = useState('');
  const [showCustomCategoryInput, setShowCustomCategoryInput] = useState(false);
  
  // Filter subcategories based on selected category
  const availableSubcategories = formData.category ? gigSubcategories[formData.category] || [] : [];
  
  // Filter skill suggestions based on input
  const filteredSkillSuggestions = commonSkills.filter(skill => 
    skill.toLowerCase().includes(skillInput.toLowerCase()) && 
    !formData.skills.includes(skill)
  );
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Clear subcategory if category changes
    if (name === 'category' && value !== formData.category) {
      setFormData({
        ...formData,
        [name]: value,
        subcategory: ''
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const handleSkillInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillInput(e.target.value);
    setShowSkillSuggestions(true);
  };
  
  const handleAddSkill = (skill: string = skillInput) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill]
      });
      setSkillInput('');
      setShowSkillSuggestions(false);
      
      // Clear error for skills
      if (errors.skills) {
        setErrors({
          ...errors,
          skills: ''
        });
      }
    }
  };
  
  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData({
        ...formData,
        attachments: [...formData.attachments, ...newFiles]
      });
    }
  };
  
  const handleRemoveFile = (fileToRemove: File) => {
    setFormData({
      ...formData,
      attachments: formData.attachments.filter(file => file !== fileToRemove)
    });
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (formData.skills.length === 0) {
      newErrors.skills = 'At least one skill is required';
    }
    
    if (formData.location.type !== 'remote' && (!formData.location.city || !formData.location.country)) {
      if (!formData.location.city) newErrors.city = 'City is required for on-site or hybrid work';
      if (!formData.location.country) newErrors.country = 'Country is required for on-site or hybrid work';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      if (onSubmit) {
        onSubmit({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          subcategory: formData.subcategory,
          budget: formData.budget,
          duration: formData.duration,
          deadline: formData.deadline,
          skills: formData.skills,
          location: formData.location,
          featured: false
        });
      }
      
      // For demo purposes, show an alert
      alert('Gig posted successfully!');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        subcategory: '',
        budget: {
          min: 0,
          max: 0,
          type: 'fixed' as Budget['type']
        },
        duration: '',
        deadline: '',
        skills: [],
        location: {
          type: 'remote' as Location['type'],
          city: '',
          country: ''
        },
        attachments: []
      });
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'other') {
      setShowCustomCategoryInput(true);
      setFormData(prev => ({
        ...prev,
        category: '',
        subcategory: ''
      }));
    } else {
      setShowCustomCategoryInput(false);
      setFormData(prev => ({
        ...prev,
        category: value,
        subcategory: ''
      }));
    }
  };

  const handleCustomCategorySubmit = () => {
    if (customCategory.trim()) {
      setFormData(prev => ({
        ...prev,
        category: customCategory.trim()
      }));
      setShowCustomCategoryInput(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Post a Gig
        </h1>
        
        <Card theme={theme} colorMode={colorMode} className="mb-8">
          <form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Basic Information</h2>
              
              {/* Title */}
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Gig Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                  placeholder="e.g., 3D Character Modeling for Indie Game"
                />
                {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
              </div>
              
              {/* Description */}
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={5}
                  className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                  placeholder="Describe your gig in detail. Include requirements, deliverables, and any other relevant information."
                />
                {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
              </div>
              
              {/* Category and Subcategory */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category *
                  </label>
                  {showCustomCategoryInput ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="Enter custom category"
                      />
                      <Button
                        theme={theme}
                        variant="secondary"
                        colorMode={colorMode}
                        onClick={handleCustomCategorySubmit}
                        disabled={!customCategory.trim()}
                      >
                        Add
                      </Button>
                    </div>
                  ) : (
                    <select
                      id="category"
                      name="category"
                      value={formData.category || ''}
                      onChange={handleCategoryChange}
                      className={`w-full px-3 py-2 border ${
                        errors.category ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      } rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                    >
                      <option value="" className="text-gray-600 dark:text-gray-400">Select a category</option>
                      {gigCategories.map(category => (
                        <option 
                          key={category} 
                          value={category}
                          className="text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                        >
                          {category}
                        </option>
                      ))}
                      <option 
                        value="other"
                        className="text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                      >
                        Other...
                      </option>
                    </select>
                  )}
                  {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
                </div>
                
                <div>
                  <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subcategory
                  </label>
                  <select
                    id="subcategory"
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleInputChange}
                    disabled={!formData.category}
                    className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                      !formData.category ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <option value="" className="text-gray-600 dark:text-gray-400">Select a subcategory</option>
                    {availableSubcategories.map(subcategory => (
                      <option 
                        key={subcategory} 
                        value={subcategory}
                        className="text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                      >
                        {subcategory}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Timeline */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Timeline</h2>
              
              {/* Duration and Deadline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Estimated Duration
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="e.g., 2-4 weeks, 1-2 months, Ongoing"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
            
            {/* Skills and Requirements */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Skills and Requirements</h2>
              
              {/* Skills */}
              <div className="mb-4">
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Required Skills *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Tag className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="skills"
                    value={skillInput}
                    onChange={handleSkillInputChange}
                    onFocus={() => setShowSkillSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSkillSuggestions(false), 200)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                    className={`w-full pl-10 pr-10 py-2 border ${errors.skills ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                    placeholder="Type a skill and press Enter"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddSkill()}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                {errors.skills && <p className="mt-1 text-sm text-red-500">{errors.skills}</p>}
                
                {/* Skill suggestions */}
                {showSkillSuggestions && skillInput && filteredSkillSuggestions.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-300 dark:border-gray-600 max-h-60 overflow-y-auto">
                    {filteredSkillSuggestions.slice(0, 5).map((skill) => (
                      <div
                        key={skill}
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => handleAddSkill(skill)}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Selected skills */}
                {formData.skills.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-blue-400 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-100 focus:outline-none"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Location */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location Type
                </label>
                <div className="flex flex-wrap gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="locationType"
                      value="remote"
                      checked={formData.location.type === 'remote'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Remote</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="locationType"
                      value="onsite"
                      checked={formData.location.type === 'onsite'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">On-site</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="locationType"
                      value="hybrid"
                      checked={formData.location.type === 'hybrid'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Hybrid</span>
                  </label>
                </div>
              </div>
              
              {/* City and Country (for on-site or hybrid) */}
              {formData.location.type !== 'remote' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      City *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.location.city}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-3 py-2 border ${errors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                        placeholder="e.g., San Francisco"
                      />
                    </div>
                    {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Country *
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.location.country}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border ${errors.country ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                      placeholder="e.g., USA"
                    />
                    {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
                  </div>
                </div>
              )}
            </div>
            
            {/* Attachments */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Attachments</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Add Files (optional)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 focus-within:outline-none"
                      >
                        <span>Upload files</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          multiple
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG, PDF, DOC up to 10MB
                    </p>
                  </div>
                </div>
              </div>
              
              {/* File list */}
              {formData.attachments.length > 0 && (
                <div className="mt-2 space-y-2">
                  {formData.attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{file.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(file)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Form Actions */}
            <div className="flex justify-end space-x-4">
              {onCancel && (
                <Button
                  theme={theme}
                  variant="secondary"
                  colorMode={colorMode}
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              )}
              <Button
                theme={theme}
                variant="primary"
                colorMode={colorMode}
                type="submit"
              >
                Post Gig
              </Button>
            </div>
          </form>
        </Card>
        
        {/* Tips Section */}
        <div className="bg-blue-50 dark:bg-blue-900 rounded-xl p-6">
          <div className="flex items-start">
            <Info className="h-6 w-6 text-blue-500 dark:text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Tips for a Great Gig Posting</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>Be specific about your requirements and deliverables</li>
                <li>Include all necessary skills and qualifications</li>
                <li>Set a reasonable timeline for the project</li>
                <li>Attach reference materials or examples if available</li>
                <li>Be open to different budget proposals from creators</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostGigForm;