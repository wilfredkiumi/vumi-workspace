// @ts-nocheck
import { useState  } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { Button, Card } from 'ui';
import { AlertTriangle } from 'lucide-react';

interface ConfirmSignUpFormProps {
  username: string;
  onSuccess?: () => void;
  onResend?: () => void;
}

export function ConfirmSignUpForm({ username, onSuccess, onResend }: ConfirmSignUpFormProps) {
  const { confirmSignUp } = useAuth();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await confirmSignUp(username, code);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Confirmation error:', err);
      setError('Invalid confirmation code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md w-full mx-auto p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Confirm Your Account
      </h2>

      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Please enter the confirmation code sent to your email address.
      </p>

      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900 rounded-lg flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Confirmation Code
          </label>
          <input
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            required
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Confirming...' : 'Confirm Account'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Didn't receive the code?{' '}
          <button
            onClick={onResend}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Resend code
          </button>
        </p>
      </div>
    </Card>
  );
}