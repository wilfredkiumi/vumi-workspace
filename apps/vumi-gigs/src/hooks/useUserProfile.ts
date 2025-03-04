// @ts-nocheck
import { useState, useEffect } from 'react';
import { userApi } from '../services/workspaceApi';
import { User } from '../models';
import { useAuth } from '../contexts/AuthContext.jsx';

interface UseUserProfileResult {
  profile: User | null;
  loading: boolean;
  error: Error | null;
  updateProfile: (data: Partial<User>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

/**
 * Hook for managing user profile data
 * @param userId Optional user ID. If not provided, will use the current authenticated user
 */
export function useUserProfile(userId?: string): UseUserProfileResult {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { user, isAuthenticated } = useAuth();

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Determine which user ID to use
      const targetUserId = userId || (user ? user.id : null);
      
      if (!targetUserId) {
        throw new Error('No user ID provided and user is not authenticated');
      }
      
      const profileData = await userApi.getProfile(targetUserId);
      setProfile(profileData);
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch user profile'));
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!profile) {
        throw new Error('No profile data available to update');
      }
      
      const updatedProfile = await userApi.updateProfile(profile.id, data);
      setProfile(updatedProfile);
    } catch (err) {
      console.error('Error updating user profile:', err);
      setError(err instanceof Error ? err : new Error('Failed to update user profile'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = async () => {
    await fetchProfile();
  };

  useEffect(() => {
    if (userId || (isAuthenticated && user)) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [userId, isAuthenticated, user?.id]);

  return {
    profile,
    loading,
    error,
    updateProfile,
    refreshProfile
  };
}