import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, useTheme } from 'ui';
import {  
  Clock, 
  MapPin, 
  Calendar, 
  Tag, 
  Users, 
  FileText, 
  ChevronLeft, 
  Share2, 
  Bookmark, 
  Flag, 
  ExternalLink,
  MessageSquare,
  CheckCircle,
  Star,
  DollarSign 
} from 'lucide-react';
import { Gig } from './models/Gig';
import { sampleGigs } from './data/sampleGigs';

interface GigDetailPageProps {
  onBack?: () => void;
}

function GigDetailPage({ onBack }: GigDetailPageProps) {
  const { gigId } = useParams();
  const navigate = useNavigate();
  const { theme, colorMode } = useTheme();
  const [gig, setGig] = useState<Gig | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    rate: '',
    attachments: [] as File[]
  });
  
  useEffect(() => {
    const foundGig = sampleGigs.find(g => g.id === gigId);
    setGig(foundGig || null);
  }, [gigId]);
  
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };
  
  const handleShare = () => {
    alert('Share functionality would be implemented here');
  };
  
  const handleReport = () => {
    alert('Report functionality would be implemented here');
  };
  
  const handleApply = () => {
    setShowApplyForm(true);
  };
  
  const handleCancelApply = () => {
    setShowApplyForm(false);
    setApplicationData({
      coverLetter: '',
      rate: '',
      attachments: []
    });
  };
  
  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Your application has been submitted!');
    setShowApplyForm(false);
    setApplicationData({
      coverLetter: '',
      rate: '',
      attachments: []
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApplicationData({
      ...applicationData,
      [name]: value
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setApplicationData({
        ...applicationData,
        attachments: [...applicationData.attachments, ...newFiles]
      });
    }
  };
  
  const handleRemoveFile = (fileToRemove: File) => {
    setApplicationData({
      ...applicationData,
      attachments: applicationData.attachments.filter(file => file !== fileToRemove)
    });
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const getLocationLabel = () => {
    if (!gig) return '';
    
    if (gig.location.type === 'remote') {
      return 'Remote';
    } else if (gig.location.type === 'onsite' && gig.location.city && gig.location.country) {
      return `${gig.location.city}, ${gig.location.country}`;
    } else if (gig.location.type === 'hybrid' && gig.location.city && gig.location.country) {
      return `Hybrid - ${gig.location.city}, ${gig.location.country}`;
    } else {
      return gig.location.type;
    }
  };
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/gigs');
    }
  };

  if (!gig) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-6"></div>
            <div className="h-32 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={handleBack}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Gigs
        </button>
        
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{gig.title}</h1>
              <div className="flex flex-wrap items-center gap-3 text-gray-600 dark:text-gray-400 text-sm">
                <span>Posted {formatDate(gig.postedDate)}</span>
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {gig.applicants} applicants
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  gig.status === 'open' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : gig.status === 'in-progress'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {gig.status === 'open' ? 'Open' : gig.status === 'in-progress' ? 'In Progress' : 'Completed'}
                </span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                theme={theme} 
                variant="secondary" 
                colorMode={colorMode}
                onClick={handleBookmark}
                className="flex items-center"
              >
                <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                {isBookmarked ? 'Saved' : 'Save'}
              </Button>
              <Button 
                theme={theme} 
                variant="secondary" 
                colorMode={colorMode}
                onClick={handleShare}
                className="flex items-center"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card theme={theme} colorMode={colorMode} className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Description</h2>
              <div className="prose dark:prose-invert max-w-none">
                {gig.description.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-600 dark:text-gray-300">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {gig.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm"
                  >
                 {skill}
                  </span>
                ))}
              </div>
              
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">Category</h2>
              <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
                <Tag className="h-5 w-5 mr-2" />
                <span>{gig.category}{gig.subcategory ? ` / ${gig.subcategory}` : ''}</span>
              </div>
            </Card>
            
            {showApplyForm ? (
              <Card theme={theme} colorMode={colorMode} className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Apply for this Gig</h2>
                <form onSubmit={handleSubmitApplication}>
                  <div className="mb-4">
                    <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Cover Letter
                    </label>
                    <textarea
                      id="coverLetter"
                      name="coverLetter"
                      value={applicationData.coverLetter}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="Introduce yourself and explain why you're a good fit for this gig..."
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="rate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your {gig.budget.type === 'fixed' ? 'Bid' : 'Hourly Rate'} ($)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="rate"
                        name="rate"
                        value={applicationData.rate}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder={gig.budget.type === 'fixed' ? "Enter your bid amount" : "Enter your hourly rate"}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Attachments (Portfolio, Resume, etc.)
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg">
                      <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
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
                    
                    {applicationData.attachments.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {applicationData.attachments.map((file, index) => (
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
                              <span className="h-5 w-5">&times;</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end space-x-4">
                    <Button
                      theme={theme}
                      variant="secondary"
                      colorMode={colorMode}
                      onClick={handleCancelApply}
                    >
                      Cancel
                    </Button>
                    <Button
                      theme={theme}
                      variant="primary"
                      colorMode={colorMode}
                      type="submit"
                    >
                      Submit Application
                    </Button>
                  </div>
                </form>
              </Card>
            ) : (
              <div className="flex justify-center mb-8">
                <Button
                  theme={theme}
                  variant="primary"
                  colorMode={colorMode}
                  onClick={handleApply}
                  className="px-8 py-3 text-lg"
                >
                  Apply for this Gig
                </Button>
              </div>
            )}
            
            <div className="flex justify-center mb-8">
              <button
                onClick={handleReport}
                className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <Flag className="h-4 w-4 mr-2" />
                <span>Report this gig</span>
              </button>
            </div>
          </div>
          
          <div>
            <Card theme={theme} colorMode={colorMode} className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Gig Details</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Location</h3>
                    <p className="text-gray-600 dark:text-gray-400">{getLocationLabel()}</p>
                  </div>
                </div>
                
                {gig.duration && (
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Duration</h3>
                      <p className="text-gray-600 dark:text-gray-400">{gig.duration}</p>
                    </div>
                  </div>
                )}
                
                {gig.deadline && (
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Application Deadline</h3>
                      <p className="text-gray-600 dark:text-gray-400">{formatDate(gig.deadline)}</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
            
            <Card theme={theme} colorMode={colorMode} className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">About the Client</h2>
              
              <div className="flex items-center mb-4">
                <div className="mr-3">
                  {gig.postedBy.avatar ? (
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <img 
                        src={gig.postedBy.avatar} 
                        alt={gig.postedBy.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                        {gig.postedBy.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white flex items-center">
                    {gig.postedBy.name}
                    {gig.postedBy.verified && (
                      <CheckCircle className="h-4 w-4 text-blue-500 ml-1" />
                    )}
                  </h3>
                  
                  {gig.postedBy.rating && (
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span>{gig.postedBy.rating}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Apply to this gig to start a conversation with the client through our secure messaging system.
              </p>
            </Card>
            
            <Card theme={theme} colorMode={colorMode}>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Similar Gigs</h2>
              
              <div className="space-y-4">
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <h3 className="text-base font-medium text-gray-800 dark:text-white mb-1">
                    <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
                      Character Concept Artist for Mobile Game
                    </a>
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>$1,000 - $2,000</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>Remote</span>
                  </div>
                </div>
                
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <h3 className="text-base font-medium text-gray-800 dark:text-white mb-1">
                    <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
                      3D Environment Artist for VR Experience
                    </a>
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>$2,500 - $4,000</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>Remote</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-base font-medium text-gray-800 dark:text-white mb-1">
                    <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
                      Unity Developer for Character Controller
                    </a>
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>$30 - $50/hr</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>Remote</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <a 
                  href="#" 
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium flex items-center justify-center"
                >
                  View More Similar Gigs
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GigDetailPage;