import React, { useState } from 'react';
import { X } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';
import { ConfirmSignUpForm } from './ConfirmSignUpForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { ResetPasswordForm } from './ResetPasswordForm';

type AuthView = 'login' | 'signup' | 'confirm-signup' | 'forgot-password' | 'reset-password';

interface AuthModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export function AuthModal({ onClose, onSuccess }: AuthModalProps) {
  const [view, setView] = useState<AuthView>('login');
  const [username, setUsername] = useState('');

  const handleSignUpSuccess = (username: string) => {
    setUsername(username);
    setView('confirm-signup');
  };

  const handleConfirmSignUpSuccess = () => {
    setView('login');
  };

  const handleForgotPasswordSuccess = (username: string) => {
    setUsername(username);
    setView('reset-password');
  };

  const handleResetPasswordSuccess = () => {
    setView('login');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-6">
          {view === 'login' && (
            <LoginForm
              onSuccess={onSuccess}
              onForgotPassword={() => setView('forgot-password')}
              onSignUp={() => setView('signup')}
            />
          )}

          {view === 'signup' && (
            <SignUpForm
              onSuccess={handleSignUpSuccess}
              onSignIn={() => setView('login')}
            />
          )}

          {view === 'confirm-signup' && (
            <ConfirmSignUpForm
              username={username}
              onSuccess={handleConfirmSignUpSuccess}
              onResend={() => {/* Implement resend code logic */}}
            />
          )}

          {view === 'forgot-password' && (
            <ForgotPasswordForm
              onSuccess={handleForgotPasswordSuccess}
              onCancel={() => setView('login')}
            />
          )}

          {view === 'reset-password' && (
            <ResetPasswordForm
              username={username}
              onSuccess={handleResetPasswordSuccess}
              onCancel={() => setView('login')}
            />
          )}
        </div>
      </div>
    </div>
  );
}