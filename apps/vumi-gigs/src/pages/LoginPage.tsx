import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Card, useTheme } from 'ui';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, colorMode } = useTheme();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Get the page user was trying to access
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError('Failed to log in');
    }
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-md mx-auto">
        <Card theme={theme} colorMode={colorMode}>
          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
              Sign In
            </h2>
            
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-100 dark:bg-red-900 rounded">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
              />
            </div>

            <Button
              theme={theme}
              colorMode={colorMode}
              type="submit"
              className="w-full"
            >
              Sign In
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
