import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { authService } from '../services/authService';

// User type definition
export interface AuthUser {
  id?: string;
  username?: string;
  email?: string;
  name?: string;
  avatar?: string;
  createdAt?: string;
  attributes?: {
    email?: string;
    name?: string;
    sub?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

// Auth state type definition
export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
}

// Auth context type definition
export interface AuthContextType extends AuthState {
  login: (credentials: { email: string; password: string }) => Promise<any>;
  logout: () => Promise<void>;
  signup: (user: { email: string; password: string; name?: string }) => Promise<any>;
  confirmSignUp: (username: string, code: string) => Promise<any>;
  forgotPassword: (username: string) => Promise<any>;
  resetPassword: (username: string, code: string, newPassword: string) => Promise<any>;
  refreshUser: () => Promise<void>;
}

// Create context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
    error: null,
  });

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      setState(prevState => ({ ...prevState, isLoading: true }));
      
      try {
        console.log('Initializing auth state...');
        // Check if user is already authenticated
        const user = await authService.getCurrentUser();
        
        if (user) {
          console.log(`User is authenticated: ${user.id || user.username}`);
          setState({
            isAuthenticated: true,
            user,
            isLoading: false,
            error: null,
          });
        } else {
          console.log('No authenticated user found');
          setState({
            isAuthenticated: false,
            user: null,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setState({
          isAuthenticated: false,
          user: null,
          isLoading: false,
          error: error as Error,
        });
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = useCallback(async (credentials: { email: string; password: string }) => {
    setState(prevState => ({ ...prevState, isLoading: true, error: null }));
    
    try {
      console.log(`Attempting to sign in user: ${credentials.email}`);
      const user = await authService.signIn(credentials.email, credentials.password);
      console.log('Sign in successful');
      
      setState({
        isAuthenticated: true,
        user,
        isLoading: false,
        error: null,
      });
      return user;
    } catch (error) {
      console.error('Login error:', error);
      setState(prevState => ({ 
        ...prevState, 
        isLoading: false, 
        error: error as Error 
      }));
      throw error;
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    setState(prevState => ({ ...prevState, isLoading: true }));
    
    try {
      console.log('Signing out user...');
      await authService.signOut();
      console.log('Sign out successful');
      
      setState({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Logout error:', error);
      setState(prevState => ({ 
        ...prevState, 
        isLoading: false, 
        error: error as Error 
      }));
      throw error;
    }
  }, []);

  // Sign up function
  const signup = useCallback(async (user: { email: string; password: string; name?: string }) => {
    setState(prevState => ({ ...prevState, isLoading: true, error: null }));
    
    try {
      console.log(`Attempting to sign up user: ${user.email}`);
      const result = await authService.signUp(user.email, user.password, { name: user.name });
      console.log('Sign up successful, confirmation may be required');
      
      setState(prevState => ({ ...prevState, isLoading: false }));
      return result;
    } catch (error) {
      console.error('Signup error:', error);
      setState(prevState => ({ 
        ...prevState, 
        isLoading: false, 
        error: error as Error 
      }));
      throw error;
    }
  }, []);

  // Confirm sign up function
  const confirmSignUp = useCallback(async (username: string, code: string) => {
    setState(prevState => ({ ...prevState, isLoading: true, error: null }));
    
    try {
      const result = await authService.confirmSignUp(username, code);
      setState(prevState => ({ ...prevState, isLoading: false }));
      return result;
    } catch (error) {
      setState(prevState => ({ 
        ...prevState, 
        isLoading: false, 
        error: error as Error 
      }));
      throw error;
    }
  }, []);

  // Forgot password function
  const forgotPassword = useCallback(async (username: string) => {
    setState(prevState => ({ ...prevState, isLoading: true, error: null }));
    
    try {
      const result = await authService.forgotPassword(username);
      setState(prevState => ({ ...prevState, isLoading: false }));
      return result;
    } catch (error) {
      setState(prevState => ({ 
        ...prevState, 
        isLoading: false, 
        error: error as Error 
      }));
      throw error;
    }
  }, []);

  // Reset password function
  const resetPassword = useCallback(async (username: string, code: string, newPassword: string) => {
    setState(prevState => ({ ...prevState, isLoading: true, error: null }));
    
    try {
      const result = await authService.resetPassword(username, code, newPassword);
      setState(prevState => ({ ...prevState, isLoading: false }));
      return result;
    } catch (error) {
      setState(prevState => ({ 
        ...prevState, 
        isLoading: false, 
        error: error as Error 
      }));
      throw error;
    }
  }, []);

  // Refresh user data
  const refreshUser = useCallback(async () => {
    setState(prevState => ({ ...prevState, isLoading: true }));
    
    try {
      console.log('Refreshing user data...');
      const user = await authService.getCurrentUser();
      
      if (user) {
        console.log('User refreshed:', user.username);
        setState({
          isAuthenticated: true,
          user,
          isLoading: false,
          error: null,
        });
      } else {
        console.log('No authenticated user found during refresh');
        setState({
          isAuthenticated: false,
          user: null,
          isLoading: false,
          error: null,
        });
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
      setState(prevState => ({ 
        ...prevState, 
        isLoading: false, 
        error: error as Error 
      }));
      throw error;
    }
  }, []);

  // Create context value
  const value = {
    ...state,
    login,
    logout,
    signup,
    confirmSignUp,
    forgotPassword,
    resetPassword,
    refreshUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
