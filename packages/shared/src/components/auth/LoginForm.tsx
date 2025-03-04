import React, { useState } from 'react';
import { Button, Card } from 'ui';
import { Mail, AlertTriangle, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';

export interface LoginFormProps {
  onSuccess?: () => void;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  onCancel?: () => void;
  redirectUrl?: string;
  className?: string;
  title?: string;
}

export function LoginForm({ 
  onSuccess, 
  onForgotPassword, 
  onSignUp, 
  onCancel,
  redirectUrl,
  className,
  title = "Sign In"
}: LoginFormProps) {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login({ email, password });
      
      if (onSuccess) {
        onSuccess();
      } else if (redirectUrl && typeof window !== 'undefined') {
        window.location.href = redirectUrl;
      }
    } catch (err: any) {
      console.error('Login error:', err);
      // Handle specific Cognito errors with better messages
      if (err.code === 'UserNotConfirmedException') {
        setError('Email not confirmed. Please check your email for a verification link.');
      } else if (err.code === 'NotAuthorizedException') {
        setError('Incorrect username or password.');
      } else if (err.code === 'UserNotFoundException') {
        setError('Account not found. Please check your email or sign up.');
      } else {
        setError('Failed to sign in. Please check your credentials and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={`max-w-md w-full mx-auto p-8 ${className || ''}`}>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {title}
      </h2>

      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900 rounded-lg flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form fields */}
        {/* ... existing form fields ... */}
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <button
            onClick={onSignUp}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Sign up
          </button>
        </p>
      </div>

      {onCancel && (
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          >
            Cancel
          </button>
        </div>
      )}
    </Card>
  );
}
