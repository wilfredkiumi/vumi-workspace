import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, useTheme, Button } from 'ui';
import {
  Mail,
  Clock,
  Video,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { MessageType } from '../models/Message';
import { sampleMessages } from '../data/sampleMessages';

export default function InboxPage() {
  const { theme, colorMode } = useTheme();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'all' | 'meetings'>('all');

  const handleJoinMeeting = (meetingId: string) => {
    navigate(`/meeting/${meetingId}`);
  };

  const renderMessageAction = (message: Message) => {
    switch (message.type) {
      case MessageType.MEETING_REQUEST:
        return (
          <div className="flex gap-2">
            <Button
              theme={theme}
              variant="primary"
              colorMode={colorMode}
              onClick={() => handleJoinMeeting(message.metadata?.meetingId!)}
              className="flex items-center"
            >
              <Video className="h-4 w-4 mr-2" />
              Join Meeting
            </Button>
          </div>
        );
      case MessageType.PROPOSAL:
        return (
          <div className="flex gap-2">
            <Button
              theme={theme}
              variant="primary"
              colorMode={colorMode}
              onClick={() => {/* Handle accept */}}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Accept
            </Button>
            <Button
              theme={theme}
              variant="secondary"
              colorMode={colorMode}
              onClick={() => {/* Handle reject */}}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Decline
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Inbox</h1>
          <div className="flex gap-2">
            <Button
              theme={theme}
              variant={selectedTab === 'all' ? 'primary' : 'secondary'}
              colorMode={colorMode}
              onClick={() => setSelectedTab('all')}
            >
              All Messages
            </Button>
            <Button
              theme={theme}
              variant={selectedTab === 'meetings' ? 'primary' : 'secondary'}
              colorMode={colorMode}
              onClick={() => setSelectedTab('meetings')}
            >
              Meetings
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {sampleMessages
            .filter(msg => selectedTab === 'all' || msg.type === MessageType.MEETING_REQUEST)
            .map(message => (
              <Card
                key={message.id}
                theme={theme}
                colorMode={colorMode}
                className={`${!message.read ? 'border-l-4 border-blue-500' : ''}`}
              >
                <div className="flex items-start gap-4 p-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img
                        src={message.from.avatar}
                        alt={message.from.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {message.subject}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(message.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {message.content}
                    </p>
                    {renderMessageAction(message)}
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
