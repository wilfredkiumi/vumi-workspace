import { useState, useEffect } from 'react';
import { creatorApi } from '../services/workspaceApi';
import { Creator } from '../models';

interface UseCreatorsResult {
  creators: Creator[];
  loading: boolean;
  error: Error | null;
  refreshCreators: () => Promise<void>;
}

/**
 * Hook for fetching and managing a list of creators
 * @param filters Optional filters to apply to the creator list
 */
export function useCreators(filters?: Record<string, any>): UseCreatorsResult {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCreators = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const creatorsData = await creatorApi.listCreators(filters);
      setCreators(creatorsData);
    } catch (err) {
      console.error('Error fetching creators:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch creators'));
    } finally {
      setLoading(false);
    }
  };

  const refreshCreators = async () => {
    await fetchCreators();
  };

  useEffect(() => {
    fetchCreators();
  }, [JSON.stringify(filters)]); // Re-fetch when filters change

  return {
    creators,
    loading,
    error,
    refreshCreators
  };
}