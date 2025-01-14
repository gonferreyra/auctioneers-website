import { useEffect, useState } from 'react';

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
