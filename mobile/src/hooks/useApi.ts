import { useState, useEffect, useCallback } from 'react';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>(apiFunc: () => Promise<T>, immediate = true) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const data = await apiFunc();
      setState({ data, loading: false, error: null });
      return data;
    } catch (err: any) {
      const msg = err.message || 'An unexpected error occurred';
      setState({ data: null, loading: false, error: msg });
      throw err;
    }
  }, [apiFunc]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { ...state, refetch: execute };
}
