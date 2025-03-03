import React, { useState } from 'react';
import { X } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

type AuthModalView = 'login' | 'signup' | 'forgotPassword';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
  initialView?: AuthModalView;
}

export function AuthModal({ onClose, onSuccess, initialView = 'login' }: AuthModalProps) {
  const [currentView, setCurrentView] = useState<AuthModalView>(initialView);

  const handleForgotPassword = () => {
    setCurrentView('forgotPassword');
  };

  const handleSignup = () => {
    setCurrentView('signup');
  };

  const handleBackToLogin = () => {
    setCurrentView('login');
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <X className="h-6 w-6" />
        </button>
        
        {currentView === 'login' && (
          <LoginForm 
            onSuccess={onSuccess}
            onForgotPassword={handleForgotPassword}
            onSignUp={handleSignup}
            onCancel={onClose}
          />
        )}
        
        {currentView === 'signup' && (
          <SignupForm 
            onSuccess={onSuccess}
            onLogin={handleBackToLogin}
            onCancel={onClose}
          />
        )}
        
        {currentView === 'forgotPassword' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Reset Password
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Enter your email and we'll send you instructions to reset your password.
            </p>
            <button
              onClick={handleBackToLogin}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Back to login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
