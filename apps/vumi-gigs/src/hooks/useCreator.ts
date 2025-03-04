// @ts-nocheck
import { useState, useEffect } from 'react';
import { creatorApi } from '../services/workspaceApi';
import { Creator } from '../models';
import { useAuth } from '../contexts/AuthContext.jsx';

interface UseCreatorResult {
  creator: Creator | null;
  loading: boolean;
  error: Error | null;
  updateCreator: (data: Partial<Creator>) => Promise<void>;
  refreshCreator: () => Promise<void>;
}

/**
 * Hook for managing creator data
 * @param creatorId Optional creator ID. If not provided, will try to get creator by current user ID
 */
export function useCreator(creatorId?: string): UseCreatorResult {
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { user, isAuthenticated } = useAuth();

  const fetchCreator = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let creatorData: Creator;
      
      if (creatorId) {
        // Fetch specific creator by ID
        creatorData = await creatorApi.getProfile(creatorId);
      } else if (isAuthenticated && user) {
        // Fetch creator by current user ID
        creatorData = await creatorApi.getCreatorByUserId(user.id);
      } else {
        throw new Error('No creator ID provided and user is not authenticated');
      }
      
      setCreator(creatorData);
    } catch (err) {
      console.error('Error fetching creator:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch creator'));
    } finally {
      setLoading(false);
    }
  };

  const updateCreator = async (data: Partial<Creator>) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!creator) {
        throw new Error('No creator data available to update');
      }
      
      const updatedCreator = await creatorApi.updateProfile(creator.id, data);
      setCreator(updatedCreator);
    } catch (err) {
      console.error('Error updating creator:', err);
      setError(err instanceof Error ? err : new Error('Failed to update creator'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refreshCreator = async () => {
    await fetchCreator();
  };

  useEffect(() => {
    if (creatorId || (isAuthenticated && user)) {
      fetchCreator();
    } else {
      setLoading(false);
    }
  }, [creatorId, isAuthenticated, user?.id]);

  return {
    creator,
    loading,
    error,
    updateCreator,
    refreshCreator
  };
}