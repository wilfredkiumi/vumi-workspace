// @ts-nocheck
import { useState  } from 'react';
import { Award, Briefcase, Camera, Check, Clock, DollarSign, ExternalLink, Facebook, Github, Globe, Instagram, Linkedin, Lock, MapPin, MessageSquare, Mic, Star, Twitter, Users, Video, Youtube } from 'lucide-react';
import { Creator, TabProps, ProfileMode } from './types';
import { Button, Card } from './index';

interface CreatorProfileProps {
  colorMode?: string;
  theme?: string;
  creator: Creator;
  onContact?: (creatorId: string) => void;
  onHire?: (creatorId: string) => void;
  onUpgrade?: (creatorId: string) => void;
}

const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'twitter':
      return <Twitter className="h-5 w-5" />;
    case 'instagram':
      return <Instagram className="h-5 w-5" />;
    case 'linkedin':
      return <Linkedin className="h-5 w-5" />;
    case 'youtube':
      return <Youtube className="h-5 w-5" />;
    case 'github':
      return <Github className="h-5 w-5" />;
    case 'facebook':
      return <Facebook className="h-5 w-5" />;
    default:
      return <Globe className="h-5 w-5" />;
  }
};

const getProfileModeBadge = (mode: ProfileMode) => {
  switch (mode) {
    case ProfileMode.BASIC:
      return {
        label: 'Basic',
        color: 'bg-gray-500 text-white'
      };
    case ProfileMode.BASIC_WITH_ADS:
      return {
        label: 'Basic+Ads',
        color: 'bg-blue-500 text-white'
      };
    case ProfileMode.PRO:
      return {
        label: 'Pro',
        color: 'bg-purple-500 text-white'
      };
    case ProfileMode.PREMIUM:
      return {
        label: 'Premium',
        color: 'bg-yellow-500 text-black'
      };
    default:
      return {
        label: 'Basic',
        color: 'bg-gray-500 text-white'
      };
  }
};

export function CreatorProfile({ 
  
  
  creator,
  onContact,
  onHire,
  onUpgrade
, theme = "gigs", colorMode = "light" }: CreatorProfileProps) {
  const [activeTab, setActiveTab] = useState(0);
  
  const handleContact = () => {
    if (onContact) {
      onContact(creator.id);
    }
  };
  
  const handleHire = () => {
    if (onHire) {
      onHire(creator.id);
    }
  };
  
  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade(creator.id);
    }
  };
  
  const profileModeBadge = getProfileModeBadge(creator.mode as ProfileMode);
  
  const tabs: TabProps[] = [
    {
      label: 'Portfolio',
      icon: <Briefcase className="h-5 w-5" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {creator.portfolio.map((item, index) => (
            <Card key={index} theme={theme} colorMode={colorMode} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.thumbnailUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>
                <a 
                  href={item.projectUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View Project <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      )
    },
    {
      label: 'Experience',
      icon: <Briefcase className="h-5 w-5" />,
      content: (
        <div className="space-y-6 mt-6">
          {creator.experience.map((exp, index) => (
            <div key={index} className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 pb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{exp.role}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : '- Present'}
                </span>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      )
    },
    {
      label: 'Skills',
      icon: <Award className="h-5 w-5" />,
      content: (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Categories</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {creator.categories.map((category, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm"
              >
                {category}
              </span>
            ))}
          </div>
          
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {creator.skills.map((skill, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )
    }
  ];
  
  // Add creator type specific tab
  if (creator.creatorType === 'influencer' && (creator as any).platforms && (creator as any).contentTypes) {
    tabs.push({
      label: 'Audience',
      icon: <Users className="h-5 w-5" />,
      content: (
        <div className="mt-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Audience Size</h3>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Total Followers</span>
                <span className="text-xl font-bold text-gray-800 dark:text-white">
                  {(creator as any).audienceSize && (creator as any).audienceSize > 1000000 
                    ? `${((creator as any).audienceSize / 1000000).toFixed(1)}M` 
                    : (creator as any).audienceSize && (creator as any).audienceSize > 1000 
                      ? `${((creator as any).audienceSize / 1000).toFixed(1)}K` 
                      : (creator as any).audienceSize}
                </span>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Platforms</h3>
            <div className="flex flex-wrap gap-2">
              {(creator as any).platforms?.map((platform: string, index: number) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm flex items-center"
                >
                  {getSocialIcon(platform)}
                  <span className="ml-1">{platform}</span>
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Content Types</h3>
            <div className="flex flex-wrap gap-2">
              {(creator as any).contentTypes?.map((type: string, index: number) => {
                let icon;
                switch(type.toLowerCase()) {
                  case 'photo':
                    icon = <Camera className="h-4 w-4 mr-1" />;
                    break;
                  case 'video':
                    icon = <Video className="h-4 w-4 mr-1" />;
                    break;
                  case 'audio':
                    icon = <Mic className="h-4 w-4 mr-1" />;
                    break;
                  default:
                    icon = null;
                }
                
                return (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm flex items-center"
                  >
                    {icon}
                    {type}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )
    });
  } else if (creator.creatorType === 'crew' && (creator as any).teamSize && (creator as any).equipmentOwned && (creator as any).specializations) {
    tabs.push({
      label: 'Crew Info',
      icon: <Users className="h-5 w-5" />,
      content: (
        <div className="mt-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Team</h3>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Team Size</span>
                <span className="text-xl font-bold text-gray-800 dark:text-white">
                  {(creator as any).teamSize} {(creator as any).teamSize === 1 ? 'person' : 'people'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Specializations</h3>
            <div className="flex flex-wrap gap-2">
              {(creator as any).specializations?.map((specialization: string, index: number) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm"
                >
                  {specialization}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Equipment</h3>
            <div className="flex flex-wrap gap-2">
              {(creator as any).equipmentOwned?.map((equipment: string, index: number) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm"
                >
                  {equipment}
                </span>
              ))}
            </div>
          </div>
          
          {(creator as any).availability && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Availability</h3>
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
                <Clock className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">{(creator as any).availability}</span>
              </div>
            </div>
          )}
        </div>
      )
    });
  }
  
  // Add plan-specific locked tabs based on profile mode
  if (creator.mode === ProfileMode.BASIC || creator.mode === ProfileMode.BASIC_WITH_ADS) {
    tabs.push({
      label: 'Analytics',
      icon: <Lock className="h-5 w-5" />,
      content: (
        <div className="mt-6 text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
            <Lock className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Analytics Locked</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
            Upgrade your plan to access detailed analytics about your profile views, engagement, and audience insights.
          </p>
          <Button 
            theme={theme} 
            variant="primary" 
            colorMode={colorMode}
            onClick={handleUpgrade}
          >
            Upgrade Plan
          </Button>
        </div>
      )
    });
  }
  
  if (creator.mode === ProfileMode.BASIC || creator.mode === ProfileMode.BASIC_WITH_ADS || creator.mode === ProfileMode.PRO) {
    tabs.push({
      label: 'Advanced',
      icon: <Lock className="h-5 w-5" />,
      content: (
        <div className="mt-6 text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
            <Lock className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Advanced Features Locked</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
            Upgrade to our Premium plan to access advanced features including custom branding, priority support, and more.
          </p>
          <Button 
            theme={theme} 
            variant="primary" 
            colorMode={colorMode}
            onClick={handleUpgrade}
          >
            Upgrade to Premium
          </Button>
        </div>
      )
    });
  }
  
  return (
    <div className="bg-white dark:bg-gray-900 shadow-md rounded-xl overflow-hidden">
      {/* Cover Image */}
      <div className="h-48 relative">
        {creator.coverImage ? (
          <img 
            src={creator.coverImage} 
            alt={`${creator.name}'s cover`} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-r from-blue-500 to-purple-600`}></div>
        )}
        
        {/* Creator Type Badge */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
            creator.creatorType === 'influencer' 
              ? 'bg-purple-500 text-white' 
              : 'bg-blue-500 text-white'
          }`}>
            {creator.creatorType === 'influencer' ? 'Influencer' : 'Crew'}
          </span>
          
          <span className={`px-3 py-1 rounded-lg text-sm font-medium ${profileModeBadge.color}`}>
            {profileModeBadge.label}
          </span>
        </div>
      </div>
      
      {/* Profile Header */}
      <div className="px-6 py-4 flex flex-col md:flex-row">
        {/* Profile Image */}
        <div className="relative -mt-16 mb-4 md:mb-0 md:mr-6">
          <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-900 overflow-hidden bg-gray-200 dark:bg-gray-700">
            {creator.profileImage ? (
              <img 
                src={creator.profileImage} 
                alt={creator.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-2xl font-bold">
                {creator.name.charAt(0)}
              </div>
            )}
          </div>
          {creator.verified && (
            <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full">
              <Check className="h-4 w-4" />
            </div>
          )}
        </div>
        
        {/* Creator Info */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                {creator.name}
                {creator.featured && (
                  <span className="ml-2 bg-yellow-400 text-yellow-800 text-xs px-2 py-0.5 rounded-full flex items-center">
                    <Award className="h-3 w-3 mr-1" /> Featured
                  </span>
                )}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">@{creator.username}</p>
            </div>
            
            <div className="flex space-x-3 mt-4 md:mt-0">
              <Button 
                theme={theme} 
                variant="secondary" 
                colorMode={colorMode}
                onClick={handleContact}
                className="text-sm"
              >
                <MessageSquare className="h-4 w-4 mr-2" /> Contact
              </Button>
              <Button 
                theme={theme} 
                variant="primary" 
                colorMode={colorMode}
                onClick={handleHire}
                className="text-sm"
              >
                <Briefcase className="h-4 w-4 mr-2" /> Hire
              </Button>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap items-center gap-4">
            {creator.location && (
              <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                {creator.location.city}, {creator.location.country}
              </div>
            )}
            
            <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
              <Star className="h-4 w-4 mr-1 text-yellow-500" />
              {creator.metrics.rating} ({creator.metrics.reviewCount || 0} reviews)
            </div>
            
            <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              {creator.metrics.responseRate}% response rate
            </div>
            
            <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
              <DollarSign className="h-4 w-4 mr-1" />
              {creator.metrics.completedProjects} projects completed
            </div>
          </div>
          
          {/* Availability Status */}
          {creator.isAvailableForHire !== undefined && (
            <div className="mt-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                creator.isAvailableForHire 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {creator.isAvailableForHire ? 'Available for hire' : 'Not available for hire'}
              </span>
              
              {creator.freelanceStatus && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Freelance
                </span>
              )}
              
              {creator.fulltimeStatus && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  Full-time
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Bio */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">About</h2>
        <p className="text-gray-600 dark:text-gray-300">
          {creator.bio}
        </p>
      </div>
      
      {/* Social Links */}
      {creator.socialLinks && creator.socialLinks.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-wrap gap-3">
            {creator.socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                {getSocialIcon(link.platform)}
                {link.followers && (
                  <span className="ml-1 text-xs">{link.followers > 1000 ? `${(link.followers / 1000).toFixed(1)}K` : link.followers}</span>
                )}
              </a>
            ))}
          </div>
        </div>
      )}
      
      {/* Tabs */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex border-b border-gray-200 dark:border-gray-800 overflow-x-auto">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`flex items-center px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === index 
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab.icon && <span className="mr-2">{tab.icon}</span>}
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="py-4">
          {tabs[activeTab].content}
        </div>
      </div>
    </div>
  );
}