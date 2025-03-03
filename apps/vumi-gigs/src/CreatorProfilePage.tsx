import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, useTheme } from 'ui';
import { 
  MapPin, 
  Calendar,
  Clock,
  Star,
  CheckCircle,
  Briefcase,
  ChevronLeft,
  Link,
  Mail,
  Award,
  Users,
  Languages,
  Globe,
  DollarSign,
  Youtube, 
  Instagram, 
  Twitch,
  Eye, 
  Users as FollowersIcon,
  Heart,
  BarChart,
  Globe2,
} from 'lucide-react';
import { TikTokIcon } from './components/icons/TikTokIcon';
import { sampleCreators } from './data/sampleCreators';
import { Creator, FreelanceStatus, CreatorType } from './models/Creator';

interface CreatorProfilePageProps {
  onBack?: () => void;
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

const getSocialIcon = (platform: string) => {
  switch (platform) {
    case 'youtube':
      return <Youtube className="h-5 w-5" />;
    case 'instagram':
      return <Instagram className="h-5 w-5" />;
    case 'twitch':
      return <Twitch className="h-5 w-5" />;
    case 'tiktok':
      return <TikTokIcon className="h-5 w-5" />;
    default:
      return null;
  }
};

export default function CreatorProfilePage({ onBack }: CreatorProfilePageProps) {
  const { creatorId } = useParams();
  const navigate = useNavigate();
  const { theme, colorMode } = useTheme();
  const [messageModalOpen, setMessageModalOpen] = useState(false);

  // Find creator from sample data
  const creator = sampleCreators.find(c => c.id === creatorId);

  if (!creator) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Creator not found
          </h1>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/creators');
    }
  };

  const getAvailabilityColor = (status: FreelanceStatus) => {
    switch (status) {
      case FreelanceStatus.AVAILABLE:
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case FreelanceStatus.BUSY:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case FreelanceStatus.NOT_AVAILABLE:
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    }
  };

  const getCreatorTypeLabel = (type: CreatorType) => {
    switch (type) {
      case CreatorType.INDIVIDUAL:
        return 'Individual Creator';
      case CreatorType.STUDIO:
        return 'Studio';
      case CreatorType.AGENCY:
        return 'Agency';
      case CreatorType.COLLECTIVE:
        return 'Collective';
    }
  };

  const renderSocialStats = () => {
    if (!creator.socialStats) return null;

    return (
      <Card theme={theme} colorMode={colorMode} className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Social Media Reach</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creator.socialStats.youtube && (
            <div className="space-y-2">
              <div className="flex items-center text-red-500">
                <Youtube className="h-5 w-5 mr-2" />
                <span className="font-semibold">YouTube</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subscribers</span>
                  <span className="font-medium">{formatNumber(creator.socialStats.youtube.subscribers)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Views</span>
                  <span className="font-medium">{formatNumber(creator.socialStats.youtube.views)}</span>
                </div>
              </div>
            </div>
          )}

          {creator.socialStats.instagram && (
            <div className="space-y-2">
              <div className="flex items-center text-pink-500">
                <Instagram className="h-5 w-5 mr-2" />
                <span className="font-semibold">Instagram</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Followers</span>
                  <span className="font-medium">{formatNumber(creator.socialStats.instagram.followers)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Engagement</span>
                  <span className="font-medium">{creator.socialStats.instagram.engagement}%</span>
                </div>
              </div>
            </div>
          )}

          {creator.socialStats.tiktok && (
            <div className="space-y-2">
              <div className="flex items-center text-black dark:text-white">
                <TikTokIcon className="h-5 w-5 mr-2" />
                <span className="font-semibold">TikTok</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Followers</span>
                  <span className="font-medium">{formatNumber(creator.socialStats.tiktok.followers)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Likes</span>
                  <span className="font-medium">{formatNumber(creator.socialStats.tiktok.likes)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Engagement</span>
                  <span className="font-medium">{creator.socialStats.tiktok.engagement}%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  };

  const renderPreviousBrands = () => {
    if (!creator.previousBrands?.length) return null;

    return (
      <Card theme={theme} colorMode={colorMode} className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Previous Brand Collaborations</h2>
        <div className="space-y-6">
          {creator.previousBrands.map((brand, index) => (
            <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
              <div className="flex-grow">
                <h3 className="font-medium text-gray-900 dark:text-white">{brand.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{brand.campaignType}</p>
                <p className="text-sm text-gray-500">{brand.date}</p>
              </div>
              {brand.link && (
                <a 
                  href={brand.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                >
                  View Campaign
                </a>
              )}
            </div>
          ))}
        </div>
      </Card>
    );
  };

  const renderAudienceDemographics = () => {
    if (!creator.audienceDemographics) return null;

    return (
      <Card theme={theme} colorMode={colorMode} className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Audience Demographics</h2>
        <div className="space-y-6">
          {/* Age Ranges */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Age Distribution</h3>
            <div className="flex flex-wrap gap-2">
              {creator.audienceDemographics.ageRanges.map((age, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                  {age}
                </span>
              ))}
            </div>
          </div>

          {/* Top Countries */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Top Countries</h3>
            <div className="flex flex-wrap gap-2">
              {creator.audienceDemographics.topCountries.map((country, index) => (
                <span key={index} className="flex items-center px-3 py-1 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                  <Globe2 className="h-4 w-4 mr-1" />
                  {country}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>
    );
  };

  const renderRatesSection = () => {
    if (!creator.rateRange) return null;

    return (
      <Card theme={theme} colorMode={colorMode} className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Rates & Availability</h2>
        
        <div className="space-y-4">
          {creator.rateRange && (
            <div className="flex items-start">
              <DollarSign className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Rate Range</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  ${creator.rateRange.min} - ${creator.rateRange.max} {creator.rateRange.rateType}
                </p>
              </div>
            </div>
          )}

          {creator.availability && (
            <>
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Working Hours</h3>
                  <p className="text-gray-600 dark:text-gray-400">{creator.availability.workingHours}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Globe className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Timezone</h3>
                  <p className="text-gray-600 dark:text-gray-400">{creator.availability.timezone}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={handleBack}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Creators
        </button>

        {/* Cover Image & Profile Section */}
        <div className="relative mb-8">
          {creator.coverImage && (
            <div className="w-full h-64 rounded-t-xl overflow-hidden">
              <img 
                src={creator.coverImage} 
                alt={`${creator.name}'s cover`}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-6 p-6 bg-white dark:bg-gray-800 rounded-b-xl shadow-sm">
            <div className="flex-shrink-0">
              <div className="relative -mt-20 w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800">
                <img 
                  src={creator.profileImage} 
                  alt={creator.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-grow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    {creator.name}
                    {creator.verified && (
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                    )}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">{creator.tagline}</p>
                </div>

                <div className="flex gap-3">
                  <Button
                    theme={theme}
                    variant="primary"
                    colorMode={colorMode}
                    onClick={() => setMessageModalOpen(true)}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAvailabilityColor(creator.freelanceStatus)}`}>
                  {creator.freelanceStatus === FreelanceStatus.AVAILABLE ? 'Available for Work' : 
                   creator.freelanceStatus === FreelanceStatus.BUSY ? 'Currently Busy' : 'Not Available'}
                </span>

                <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  {getCreatorTypeLabel(creator.creatorType)}
                </span>

                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{creator.location.city}, {creator.location.country}</span>
                  {creator.location.remote && (
                    <span className="ml-1">(Remote Available)</span>
                  )}
                </div>

                {creator.languages && creator.languages.length > 0 && (
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Languages className="h-4 w-4 mr-1" />
                    <span>{creator.languages.map(l => l.language).join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* About Section */}
            <Card theme={theme} colorMode={colorMode} className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">About</h2>
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{creator.bio}</p>
            </Card>

            {/* Show social stats for influencers */}
            {creator.creatorType === CreatorType.INFLUENCER && renderSocialStats()}

            {/* Content Types for influencers */}
            {creator.creatorType === CreatorType.INFLUENCER && creator.contentTypes && (
              <Card theme={theme} colorMode={colorMode} className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Content Types</h2>
                <div className="flex flex-wrap gap-2">
                  {creator.contentTypes.map((type, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </Card>
            )}

            {/* Portfolio Section */}
            {creator.portfolio && creator.portfolio.length > 0 && (
              <Card theme={theme} colorMode={colorMode} className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Portfolio</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {creator.portfolio.map((item, index) => (
                    <div key={index} className="group relative">
                      <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                        <img 
                          src={item.thumbnailUrl} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                        />
                      </div>
                      <div className="mt-2">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Experience Section */}
            {creator.experience && creator.experience.length > 0 && (
              <Card theme={theme} colorMode={colorMode} className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Experience</h2>
                <div className="space-y-6">
                  {creator.experience.map((exp, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <Briefcase className="h-6 w-6 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {exp.role}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {exp.company}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {exp.startDate} - {exp.endDate || 'Present'}
                        </p>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {creator.creatorType === CreatorType.INFLUENCER && (
              <>
                {renderPreviousBrands()}
              </>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div>
            {/* Rates & Availability Card */}
            {creator.creatorType !== CreatorType.INFLUENCER && renderRatesSection()}

            {/* Skills & Expertise Card */}
            {/* ... existing skills section ... */}

            {/* Stats & Metrics Card */}
            {/* ... existing metrics section ... */}

            {/* Awards & Certifications */}
            {/* ... existing awards section ... */}

            {/* Audience Demographics for Influencers */}
            {creator.creatorType === CreatorType.INFLUENCER && renderAudienceDemographics()}
          </div>
        </div>
      </div>
    </div>
  );
}