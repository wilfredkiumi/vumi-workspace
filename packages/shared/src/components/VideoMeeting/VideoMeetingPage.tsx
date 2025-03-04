import { type FC } from 'react';
import type { AuthUser } from '../../contexts/AuthContext';

interface VideoMeetingPageProps {
  onClose?: () => void;
  user?: AuthUser;
}

// Temporary placeholder component
export const VideoMeetingPage: FC<VideoMeetingPageProps> = ({ onClose }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Video Meeting</h2>
        <p className="mb-4">This feature is coming soon</p>
        {onClose && (
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        )}
      </div>
    </div>
  );
};