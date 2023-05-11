import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, timeout: number, isActive = true): T {
  const [state, setState] = useState(value);

  useEffect(() => {
    if (isActive) {
      const handler = setTimeout(() => setState(value), timeout);

      return () => clearTimeout(handler);
    }
  }, [value, timeout, isActive]);

  return state;
}

export default useDebounce;