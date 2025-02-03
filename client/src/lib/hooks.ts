import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getUser } from './api';

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState('');
  const [isDebounceLoading, setIsDebounceLoading] = useState(false);

  useEffect(() => {
    setIsDebounceLoading(true);
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebounceLoading(false);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return { debouncedValue, isDebounceLoading };
};

export const useAuth = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    retry: false,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });

  return { user, isLoading };
};
