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
  }, [value]);

  return { debouncedValue, isDebounceLoading };
};

export const useAuth = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    retry: false,
  });

  return { user, isLoading };
};
