// src/hooks/useFetchRates.ts
import { useEffect, useState, useCallback } from 'react';
import { fetchRates } from '../services/api';

const useFetchRates = (baseCurrency: string) => {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadRates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchRates(baseCurrency);
      setRates(data.rates);
      setLoading(false);
    } catch (err: any) {
      setError(
        err.message || 'An error occurred while fetching exchange rates.',
      );
      setLoading(false);
    }
  }, [baseCurrency]);

  useEffect(() => {
    loadRates();
  }, [loadRates]);

  return { rates, loading, error, refetch: loadRates };
};

export default useFetchRates;
