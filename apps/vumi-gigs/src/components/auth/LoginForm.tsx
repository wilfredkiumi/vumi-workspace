// @ts-nocheck
import { useState  } from 'react';
import { Button, Card, useTheme } from 'ui';
import { AlertTriangle, Lock, Mail } from 'lucide-react';
import { useAuth } from '@vumi/shared';

interface LoginFormProps {
  onSuccess?: () => void;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  onCancel?: () => void;
}

export function LoginForm({ 
  onSuccess, 
  onForgotPassword, 
  onSignUp, 
  onCancel 
}: LoginFormProps) {
  const { theme } = useTheme();
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
      }
    } catch (err: any) {
      console.error('Login error:', err);
      
      // Provide user-friendly error messages based on the error type
      if (err.code === 'UserNotConfirmedException') {
        setError('Your account is not verified. Please check your email for a verification code.');
      } else if (err.code === 'NotAuthorizedException') {
        setError('Incorrect username or password.');
      } else if (err.code === 'InvalidParameterException' && err.message.includes('flow not enabled')) {
        setError('Authentication method not supported. Please contact support.');
      } else {
        setError(err.message || 'Failed to sign in. Please check your credentials and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md w-full mx-auto p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Sign In to Vumi
      </h2>

      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900 rounded-lg flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
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

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <Button
          theme={theme}
          variant="primary"
          colorMode={colorMode}
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
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