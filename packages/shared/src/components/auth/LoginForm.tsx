import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useAuthContext } from '../../contexts/AuthContext';

export interface LoginFormProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onSignUp?: () => void;
  onCancel?: () => void;
  redirectUrl?: string;
  title?: string;
}

export function LoginForm({ 
  onSuccess, 
  onSignUp, 
  onCancel,
  redirectUrl,
  title = "Sign In",
  onError 
}: LoginFormProps) {
  const { login } = useAuthContext();
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login({ email, password });
      onSuccess?.();
      if (redirectUrl && typeof window !== 'undefined') {
        window.location.href = redirectUrl;
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
      onError?.(err);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900 rounded-lg flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Email"
        />
        <input
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Password"
        />
        <button 
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
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
    </div>
  );
}
