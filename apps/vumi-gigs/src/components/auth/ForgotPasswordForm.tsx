import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Card } from 'ui';
import { Mail, AlertTriangle } from 'lucide-react';

interface ForgotPasswordFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ForgotPasswordForm({ onSuccess, onCancel }: ForgotPasswordFormProps) {
  const { resetPassword } = useAuth();
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await resetPassword(username);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Password reset error:', err);
      setError('Error sending reset code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md w-full mx-auto p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Reset Your Password
      </h2>

      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Enter your username or email address and we'll send you a code to reset your password.
      </p>

      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900 rounded-lg flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Username or Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Code'}
          </Button>
        </div>
      </form>
    </Card>
  );
}