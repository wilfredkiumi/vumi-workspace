import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Auth } from 'aws-amplify';
import { Hub } from 'aws-amplify/utils';
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
        case 'signIn':
          checkAuthState();
          break;
        case 'signOut':
          setIsAuthenticated(false);
          setUser(null);
          break;
        case 'signIn_failure':
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
      const cognitoUser = await Auth.currentAuthenticatedUser();
      
      if (cognitoUser) {
        setIsAuthenticated(true);
        
        // Fetch user data from API
        try {
          const userData = await userApi.getProfile(cognitoUser.username);
          if (userData) {
            setUser(userData);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          // Create a basic user object from Cognito data if API fetch fails
          setUser({
            id: cognitoUser.username,
            username: cognitoUser.username,
            email: cognitoUser.attributes.email,
            name: cognitoUser.attributes.name || cognitoUser.attributes.email.split('@')[0],
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

  const signIn = async (username: string, password: string) => {
    try {
      await Auth.signIn(username, password);
      await checkAuthState();
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signUp = async (username: string, password: string, email: string, name: string) => {
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          name
        }
      });
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const confirmSignUp = async (username: string, code: string) => {
    try {
      await Auth.confirmSignUp(username, code);
    } catch (error) {
      console.error('Error confirming sign up:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const resetPassword = async (username: string) => {
    try {
      await Auth.forgotPassword(username);
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  };

  const confirmResetPassword = async (username: string, code: string, newPassword: string) => {
    try {
      await Auth.forgotPasswordSubmit(username, code, newPassword);
    } catch (error) {
      console.error('Error confirming password reset:', error);
      throw error;
    }
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    signIn,
    signUp,
    confirmSignUp,
    signOut,
    resetPassword,
    confirmResetPassword
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