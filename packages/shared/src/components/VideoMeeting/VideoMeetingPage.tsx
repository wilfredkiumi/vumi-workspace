import React, { useState, useEffect, useRef } from 'react';
import { useTheme, Button, Card } from 'ui';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  MonitorOff,
  MessageSquare,
  X,
  Send,
  Settings,
  Users
} from 'lucide-react';
import { Stage, LocalStageStream, StageEvents } from 'amazon-ivs-web-broadcast';
import { AuthContextValue } from '../../types/auth';

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: Date;
}

interface VideoMeetingPageProps {
  meetingId: string;
  gigId: string;
  onClose?: () => void;
  user: AuthContextValue['user'];
}

export function VideoMeetingPage({ meetingId, gigId, onClose, user }: VideoMeetingPageProps) {
  const { theme, colorMode } = useTheme();
  
  // Refs
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<Stage | null>(null);
  const localStreamRef = useRef<LocalStageStream | null>(null);
  
  // State
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [participants, setParticipants] = useState<string[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedAudioInput, setSelectedAudioInput] = useState<string>('');
  const [selectedVideoInput, setSelectedVideoInput] = useState<string>('');
  const [availableDevices, setAvailableDevices] = useState({
    audioInputs: [] as MediaDeviceInfo[],
    videoInputs: [] as MediaDeviceInfo[]
  });
  const [showDeviceSettings, setShowDeviceSettings] = useState(false);
  
  // Initialize stage and devices
  useEffect(() => {
    const initializeStage = async () => {
      try {
        setIsLoading(true);
        
        // Get available devices
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioInputs = devices.filter(device => device.kind === 'audioinput');
        const videoInputs = devices.filter(device => device.kind === 'videoinput');
        
        setAvailableDevices({
          audioInputs,
          videoInputs
        });
        
        if (audioInputs.length > 0) setSelectedAudioInput(audioInputs[0].deviceId);
        if (videoInputs.length > 0) setSelectedVideoInput(videoInputs[0].deviceId);
        
        // Initialize IVS Stage
        const stage = new Stage();
        stageRef.current = stage;
        
        // Set up event listeners
        stage.on(StageEvents.PARTICIPANT_JOIN, (participant) => {
          setParticipants(prev => [...prev, participant.id]);
        });
        
        stage.on(StageEvents.PARTICIPANT_LEAVE, (participant) => {
          setParticipants(prev => prev.filter(id => id !== participant.id));
        });
        
        // Join stage
        await stage.join({
          token: 'YOUR_STAGE_TOKEN', // This should come from your backend
          participantId: user?.id || 'anonymous'
        });
        
        // Start local stream
        await startLocalStream();
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error initializing stage:', err);
        setError('Failed to initialize video meeting. Please try again.');
        setIsLoading(false);
      }
    };
    
    initializeStage();
    
    return () => {
      // Cleanup
      if (localStreamRef.current) {
        localStreamRef.current.stop();
      }
      if (stageRef.current) {
        stageRef.current.leave();
      }
    };
  }, []);
  
  const startLocalStream = async () => {
    try {
      if (!stageRef.current) return;
      
      // Stop existing stream if any
      if (localStreamRef.current) {
        localStreamRef.current.stop();
      }
      
      // Create new stream with selected devices
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: selectedAudioInput },
        video: { deviceId: selectedVideoInput }
      });
      
      const localStream = new LocalStageStream(stream);
      localStreamRef.current = localStream;
      
      // Display local video
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      // Publish stream to stage
      await stageRef.current.publishLocalStream(localStream);
    } catch (err) {
      console.error('Error starting local stream:', err);
      setError('Failed to start camera/microphone. Please check your permissions.');
    }
  };
  
  const toggleMic = async () => {
    if (!localStreamRef.current) return;
    
    try {
      await localStreamRef.current.setAudioEnabled(!isMicEnabled);
      setIsMicEnabled(!isMicEnabled);
    } catch (err) {
      console.error('Error toggling microphone:', err);
    }
  };
  
  const toggleCamera = async () => {
    if (!localStreamRef.current) return;
    
    try {
      await localStreamRef.current.setVideoEnabled(!isCameraEnabled);
      setIsCameraEnabled(!isCameraEnabled);
    } catch (err) {
      console.error('Error toggling camera:', err);
    }
  };
  
  const toggleScreenShare = async () => {
    try {
      if (isScreenSharing) {
        // Stop screen sharing
        if (localStreamRef.current) {
          localStreamRef.current.stop();
        }
        await startLocalStream(); // Resume camera
        setIsScreenSharing(false);
      } else {
        // Start screen sharing
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });
        
        if (localStreamRef.current) {
          localStreamRef.current.stop();
        }
        
        const screenShareStream = new LocalStageStream(screenStream);
        localStreamRef.current = screenShareStream;
        
        if (stageRef.current) {
          await stageRef.current.publishLocalStream(screenShareStream);
        }
        
        setIsScreenSharing(true);
      }
    } catch (err) {
      console.error('Error toggling screen share:', err);
    }
  };
  
  const handleDeviceChange = async (deviceId: string, type: 'audio' | 'video') => {
    if (type === 'audio') {
      setSelectedAudioInput(deviceId);
    } else {
      setSelectedVideoInput(deviceId);
    }
    
    await startLocalStream();
  };
  
  const sendMessage = () => {
    if (!newMessage.trim() || !user) return;
    
    const message: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      sender: user.name,
      message: newMessage.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, message]);
    setNewMessage('');
    
    // In a real app, you would send this to your backend/websocket
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Setting up your meeting...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <Card theme={theme} colorMode={colorMode} className="max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <X className="h-12 w-12 mx-auto" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Failed to Join Meeting
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {error}
          </p>
          <Button
            theme={theme}
            variant="primary"
            colorMode={colorMode}
            onClick={onClose}
          >
            Go Back
          </Button>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="h-screen flex">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Video Grid */}
          <div className="flex-1 grid grid-cols-2 gap-4 p-4 bg-gray-800">
            {/* Local Video */}
            <div className="relative">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 px-2 py-1 rounded text-white text-sm">
                You {!isMicEnabled && '(Muted)'}
              </div>
            </div>
            
            {/* Remote Videos will be added here dynamically */}
          </div>
          
          {/* Controls */}
          <div className="h-20 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
            <div className="flex items-center space-x-2">
              <Button
                theme={theme}
                variant={isMicEnabled ? 'primary' : 'secondary'}
                colorMode={colorMode}
                onClick={toggleMic}
                className="rounded-full p-3"
              >
                {isMicEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </Button>
              
              <Button
                theme={theme}
                variant={isCameraEnabled ? 'primary' : 'secondary'}
                colorMode={colorMode}
                onClick={toggleCamera}
                className="rounded-full p-3"
              >
                {isCameraEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </Button>
              
              <Button
                theme={theme}
                variant={isScreenSharing ? 'primary' : 'secondary'}
                colorMode={colorMode}
                onClick={toggleScreenShare}
                className="rounded-full p-3"
              >
                {isScreenSharing ? <MonitorOff className="h-5 w-5" /> : <Monitor className="h-5 w-5" />}
              </Button>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                theme={theme}
                variant="secondary"
                colorMode={colorMode}
                onClick={() => setShowDeviceSettings(true)}
                className="rounded-full p-3"
              >
                <Settings className="h-5 w-5" />
              </Button>
              
              <Button
                theme={theme}
                variant="secondary"
                colorMode={colorMode}
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="rounded-full p-3"
              >
                <MessageSquare className="h-5 w-5" />
              </Button>
              
              <Button
                theme={theme}
                variant="primary"
                colorMode={colorMode}
                onClick={onClose}
                className="bg-red-500 hover:bg-red-600"
              >
                Leave Meeting
              </Button>
            </div>
          </div>
        </div>
        
        {/* Chat Sidebar */}
        {isChatOpen && (
          <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                <span className="font-medium text-gray-800 dark:text-white">
                  Participants ({participants.length + 1})
                </span>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="flex flex-col">
                  <div className="flex items-baseline">
                    <span className="font-medium text-gray-800 dark:text-white">
                      {message.sender}
                    </span>
                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    {message.message}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <Button
                  theme={theme}
                  variant="primary"
                  colorMode={colorMode}
                  onClick={sendMessage}
                  className="p-2"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Device Settings Modal */}
      {showDeviceSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card theme={theme} colorMode={colorMode} className="max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Device Settings
              </h2>
              <button
                onClick={() => setShowDeviceSettings(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Microphone Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Microphone
                </label>
                <select
                  value={selectedAudioInput}
                  onChange={(e) => handleDeviceChange(e.target.value, 'audio')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  {availableDevices.audioInputs.map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label || `Microphone ${device.deviceId.slice(0, 5)}`}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Camera Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Camera
                </label>
                <select
                  value={selectedVideoInput}
                  onChange={(e) => handleDeviceChange(e.target.value, 'video')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  {availableDevices.videoInputs.map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label || `Camera ${device.deviceId.slice(0, 5)}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button
                theme={theme}
                variant="primary"
                colorMode={colorMode}
                onClick={() => setShowDeviceSettings(false)}
              >
                Done
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}