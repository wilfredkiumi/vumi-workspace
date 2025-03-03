import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// Update import to use shared package
import { useAuth } from '@vumi/shared';
import { LoginForm } from '../components/auth/LoginForm';
import { SignupForm } from '../components/auth/SignupForm';

enum AuthView {
  LOGIN = 'login',
  SIGNUP = 'signup',
  FORGOT_PASSWORD = 'forgot_password'
}

export default function LoginPage() {
  const [view, setView] = useState<AuthView>(AuthView.LOGIN);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  // Redirect to homepage if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);
  
  const handleLogin = () => {
    setView(AuthView.LOGIN);
  };
  
  const handleSignup = () => {
    setView(AuthView.SIGNUP);
  };
  
  const handleForgotPassword = () => {
    setView(AuthView.FORGOT_PASSWORD);
  };
  
  const handleAuthSuccess = () => {
    const from = location.state?.from?.pathname || '/';
    navigate(from, { replace: true });
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="w-full max-w-md">
        {view === AuthView.LOGIN && (
          <LoginForm 
            onSuccess={handleAuthSuccess}
            onSignUp={handleSignup}
            onForgotPassword={handleForgotPassword}
          />
        )}
        
        {view === AuthView.SIGNUP && (
          <SignupForm 
            onSuccess={handleAuthSuccess}
            onLogin={handleLogin}
          />
        )}
        
        {view === AuthView.FORGOT_PASSWORD && (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Reset Password
            </h2>
            {/* Password reset form would go here */}
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Enter your email and we'll send you instructions to reset your password.
            </p>
            <button
              onClick={handleLogin}
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
