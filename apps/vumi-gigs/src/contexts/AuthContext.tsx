import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { signIn, signUp, confirmSignUp, signOut, getCurrentUser, fetchAuthSession, resetPassword, confirmResetPassword } from '@aws-amplify/auth';
import { Hub } from '@aws-amplify/core';
import { userApi } from '../services/workspaceApi';
import { User } from '../models';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, password: string, email: string, name: string) => Promise<void>;
  confirmSignUp: (username: string, code: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (username: string) => Promise<void>;
  confirmResetPassword: (username: string, code: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    checkAuthState();

    const listener = Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signedIn':
          checkAuthState();
          break;
        case 'signedOut':
          setIsAuthenticated(false);
          setUser(null);
          break;
        case 'signInFailed':
          console.error('Sign in failure', data);
          break;
      }
    });

    return () => {
      listener();
    };
  }, []);

  const checkAuthState = async () => {
    try {
      setIsLoading(true);
      const authUser = await getCurrentUser();
      const session = await fetchAuthSession();
      
      if (authUser && session.tokens) {
        setIsAuthenticated(true);
        
        // Fetch user data from API
        try {
          const userData = await userApi.getProfile(authUser.userId);
          if (userData) {
            setUser(userData);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          // Create a basic user object from auth data if API fetch fails
          setUser({
            id: authUser.userId,
            username: authUser.username,
            email: authUser.signInDetails?.loginId || '',
            name: authUser.username,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
        }
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (username: string, password: string) => {
    try {
      await signIn({ username, password });
      await checkAuthState();
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const handleSignUp = async (username: string, password: string, email: string, name: string) => {
    try {
      await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
            name
          }
        }
      });
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const handleConfirmSignUp = async (username: string, code: string) => {
    try {
      await confirmSignUp({ username, confirmationCode: code });
    } catch (error) {
      console.error('Error confirming sign up:', error);
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const handleResetPassword = async (username: string) => {
    try {
      await resetPassword({ username });
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  };

  const handleConfirmResetPassword = async (username: string, code: string, newPassword: string) => {
    try {
      await confirmResetPassword({ username, confirmationCode: code, newPassword });
    } catch (error) {
      console.error('Error confirming password reset:', error);
      throw error;
    }
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    signIn: handleSignIn,
    signUp: handleSignUp,
    confirmSignUp: handleConfirmSignUp,
    signOut: handleSignOut,
    resetPassword: handleResetPassword,
    confirmResetPassword: handleConfirmResetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};