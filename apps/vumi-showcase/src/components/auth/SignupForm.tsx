import React, { useState } from 'react';
import { Button, Card, useTheme } from 'ui';
import { Mail, AlertTriangle, Lock, User } from 'lucide-react';

interface SignupFormProps {
  onSuccess?: () => void;
  onLogin?: () => void;
  onCancel?: () => void;
}

export function SignupForm({ onSuccess, onLogin, onCancel }: SignupFormProps) {
  const { theme, colorMode } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Validate passwords match
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      
      // Mock signup - for demo purposes only
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email && password && name) {
        // In a real app, this would register with your auth service
        if (onSuccess) {
          onSuccess();
        }
      } else {
        setError('Please fill in all required fields.');
      }
    } catch (err: any) {
      console.error('Signup error:', err);
      setError('Failed to sign up. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md w-full mx-auto p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Create Account
      </h2>

      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900 rounded-lg flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
          </div>
        </div>

        <Button
          theme={theme}
          variant="primary"
          colorMode={colorMode}
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <button
            onClick={onLogin}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Sign in
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
