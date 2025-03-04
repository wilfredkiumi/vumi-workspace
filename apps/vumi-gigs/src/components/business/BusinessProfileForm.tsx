// @ts-nocheck
import { useState } from 'react';
import { Button, Card, useTheme } from 'ui';
import { useAuth } from '@vumi/shared';
import { Building, Calendar, Globe, Link, MapPin, Phone, Plus, Upload, Users, X } from 'lucide-react';

interface BusinessProfileFormProps {
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
}

const BusinessProfileForm = ({ onSubmit, onCancel }: BusinessProfileFormProps) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Basic Information
  const [businessName, setBusinessName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [businessType, setBusinessType] = useState<'studio' | 'agency' | 'production_company' | 'brand'>('studio');
  const [yearEstablished, setYearEstablished] = useState('');
  const [teamSize, setTeamSize] = useState('');
  
  // Contact Information
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState(user?.email || '');
  const [contactName, setContactName] = useState(user?.name || '');
  const [websiteUrl, setWebsiteUrl] = useState('');
  
  // Location
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [remoteWork, setRemoteWork] = useState(true);
  
  // Services & Specialties
  const [services, setServices] = useState<string[]>([]);
  const [newService, setNewService] = useState('');
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [newSpecialty, setNewSpecialty] = useState('');
  
  // Studio Facilities (for studio type only)
  const [facilities, setFacilities] = useState<string[]>([]);
  const [newFacility, setNewFacility] = useState('');
  const [studioSizes, setStudioSizes] = useState<string[]>([]);
  const [newStudioSize, setNewStudioSize] = useState('');
  const [equipment, setEquipment] = useState<string[]>([]);
  const [newEquipment, setNewEquipment] = useState('');
  
  // Previous Clients
  const [clients, setClients] = useState<string[]>([]);
  const [newClient, setNewClient] = useState('');
  
  // Social media
  const [socialLinks, setSocialLinks] = useState<{ platform: string, url: string }[]>([]);
  const [newPlatform, setNewPlatform] = useState('');
  const [newSocialUrl, setNewSocialUrl] = useState('');

  // Rate Range
  const [rateMin, setRateMin] = useState('');
  const [rateMax, setRateMax] = useState('');
  const [rateType, setRateType] = useState('hourly');

  // Portfolio
  const [portfolioLinks, setPortfolioLinks] = useState<string[]>([]);
  const [newPortfolioLink, setNewPortfolioLink] = useState('');

  // Helper functions
  const addService = () => {
    if (newService && !services.includes(newService)) {
      setServices([...services, newService]);
      setNewService('');
    }
  };

  const removeService = (service: string) => {
    setServices(services.filter(s => s !== service));
  };

  const addSpecialty = () => {
    if (newSpecialty && !specialties.includes(newSpecialty)) {
      setSpecialties([...specialties, newSpecialty]);
      setNewSpecialty('');
    }
  };

  const removeSpecialty = (specialty: string) => {
    setSpecialties(specialties.filter(s => s !== specialty));
  };

  const addFacility = () => {
    if (newFacility && !facilities.includes(newFacility)) {
      setFacilities([...facilities, newFacility]);
      setNewFacility('');
    }
  };

  const removeFacility = (facility: string) => {
    setFacilities(facilities.filter(f => f !== facility));
  };

  const addStudioSize = () => {
    if (newStudioSize && !studioSizes.includes(newStudioSize)) {
      setStudioSizes([...studioSizes, newStudioSize]);
      setNewStudioSize('');
    }
  };

  const removeStudioSize = (size: string) => {
    setStudioSizes(studioSizes.filter(s => s !== size));
  };

  const addEquipment = () => {
    if (newEquipment && !equipment.includes(newEquipment)) {
      setEquipment([...equipment, newEquipment]);
      setNewEquipment('');
    }
  };

  const removeEquipment = (item: string) => {
    setEquipment(equipment.filter(e => e !== item));
  };

  const addClient = () => {
    if (newClient && !clients.includes(newClient)) {
      setClients([...clients, newClient]);
      setNewClient('');
    }
  };

  const removeClient = (client: string) => {
    setClients(clients.filter(c => c !== client));
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
  
  const addPortfolioLink = () => {
    if (newPortfolioLink && !portfolioLinks.includes(newPortfolioLink)) {
      setPortfolioLinks([...portfolioLinks, newPortfolioLink]);
      setNewPortfolioLink('');
    }
  };
  
  const removePortfolioLink = (link: string) => {
    setPortfolioLinks(portfolioLinks.filter(l => l !== link));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Validate form
      if (!businessName || !description || !country || !city || services.length === 0) {
        setError('Please fill in all required fields');
        setIsLoading(false);
        return;
      }

      // Create business profile data
      const businessData = {
        userId: user?.id,
        businessName,
        tagline,
        description,
        businessType,
        yearEstablished: yearEstablished ? parseInt(yearEstablished) : undefined,
        teamSize: teamSize ? parseInt(teamSize) : undefined,
        contact: {
          name: contactName,
          email: contactEmail,
          phone: contactPhone
        },
        location: {
          country,
          city,
          address,
          remote: remoteWork
        },
        services,
        specialties,
        facilities: businessType === 'studio' ? {
          spaces: facilities,
          sizes: studioSizes,
          equipment
        } : undefined,
        clients,
        socialLinks,
        rateRange: {
          min: rateMin ? parseInt(rateMin) : undefined,
          max: rateMax ? parseInt(rateMax) : undefined,
          rateType
        },
        websiteUrl,
        portfolioLinks,
        createdBy: user?.name,
        createdAt: new Date().toISOString()
      };
      
      // In a real app, you'd save this to your backend
      console.log('Business profile data:', businessData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onSubmit) {
        onSubmit(businessData);
      }
    } catch (err) {
      console.error('Error creating business profile:', err);
      setError('An error occurred while creating your business profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full p-6" theme={theme} colorMode={colorMode}>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Create Business Profile
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Business Name*
              </label>
              <input
                id="businessName"
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              />
            </div>
            
            <div>
              <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Business Type*
              </label>
              <select
                id="businessType"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value as any)}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="studio">Production Studio</option>
                <option value="agency">Creative Agency</option>
                <option value="production_company">Production Company</option>
                <option value="brand">Brand</option>
              </select>
            </div>
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
              placeholder="E.g., Premium Video Production Studio in NYC"
              maxLength={100}
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description*
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Tell creators about your business, your mission, and what makes you unique..."
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="yearEstablished" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Year Established
              </label>
              <input
                id="yearEstablished"
                type="number"
                value={yearEstablished}
                onChange={(e) => setYearEstablished(e.target.value)}
                min="1900"
                max={new Date().getFullYear()}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            
            <div>
              <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Team Size
              </label>
              <input
                id="teamSize"
                type="number"
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
                min="1"
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Contact Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Contact Person
              </label>
              <input
                id="contactName"
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            
            <div>
              <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Contact Phone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="contactPhone"
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Contact Email
              </label>
              <input
                id="contactEmail"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            
            <div>
              <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Website URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Globe className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="websiteUrl"
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Location Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Location
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Country*
              </label>
              <input
                id="country"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              />
            </div>
            
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                City*
              </label>
              <input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Address
            </label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="123 Studio Avenue, Unit 101"
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
              Available for remote work/collaboration
            </label>
          </div>
        </div>
        
        {/* Services & Specialties Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Services & Specialties
          </h3>
          
          <div className="space-y-6">
            {/* Services */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Services Offered*
              </label>
              
              <div className="flex flex-wrap gap-2 mb-2">
                {services.map((service, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {service}
                    <button
                      type="button"
                      onClick={() => removeService(service)}
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
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Add a service (e.g., Video Production, Space Rental)"
                />
                <button
                  type="button"
                  onClick={addService}
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Specialties */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Specialties
              </label>
              
              <div className="flex flex-wrap gap-2 mb-2">
                {specialties.map((specialty, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                  >
                    {specialty}
                    <button
                      type="button"
                      onClick={() => removeSpecialty(specialty)}
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
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Add a specialty (e.g., Commercial Production, Corporate Videos)"
                />
                <button
                  type="button"
                  onClick={addSpecialty}
                  className="px-4 py-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Studio Facilities (conditional based on business type) */}
        {businessType === 'studio' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Studio Facilities
            </h3>
            
            <div className="space-y-6">
              {/* Facilities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Available Spaces
                </label>
                
                <div className="flex flex-wrap gap-2 mb-2">
                  {facilities.map((facility, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    >
                      {facility}
                      <button
                        type="button"
                        onClick={() => removeFacility(facility)}
                        className="ml-1 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                
                <div className="flex">
                  <input
                    type="text"
                    value={newFacility}
                    onChange={(e) => setNewFacility(e.target.value)}
                    className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Add a space (e.g., Cyclorama, Green Screen Room)"
                  />
                  <button
                    type="button"
                    onClick={addFacility}
                    className="px-4 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              {/* Studio Sizes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Studio Sizes
                </label>
                
                <div className="flex flex-wrap gap-2 mb-2">
                  {studioSizes.map((size, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    >
                      {size}
                      <button
                        type="button"
                        onClick={() => removeStudioSize(size)}
                        className="ml-1 text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                
                <div className="flex">
                  <input
                    type="text"
                    value={newStudioSize}
                    onChange={(e) => setNewStudioSize(e.target.value)}
                    className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue
                    -500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Add a size (e.g., Small, Medium, Large)"
                    />
                    <button
                      type="button"
                      onClick={addStudioSize}
                      className="px-4 py-2 bg-yellow-600 text-white rounded-r-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                      <Plus className="h-5 w-5" />
                    </button>   
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isLoading}

          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </Card>
  );
}

export default BusinessProfileForm;

