import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@vumi/shared';
import { AuthModal } from './auth/AuthModal';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(!isAuthenticated);

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  const handleCancel = () => {
    setShowAuthModal(false);
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        {showAuthModal && (
          <AuthModal
            onClose={handleCancel}
            onSuccess={handleAuthSuccess}
          />
        )}
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Authentication Required
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Please sign in to access this feature.
            </p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </>
    );
  }

  return <>{children}</>;
}