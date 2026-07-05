import { useEffect, useState } from 'react';
import { errorMessage } from './api';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/** Gọi API khi mount (và khi deps đổi), kèm trạng thái loading/error. */
export function useApi<T>(fn: () => Promise<T>, deps: unknown[] = []): ApiState<T> {
  const depsKey = JSON.stringify(deps);
  const [state, setState] = useState<ApiState<T> & { key: string }>({
    data: null,
    loading: true,
    error: null,
    key: depsKey,
  });

  // Reset về trạng thái loading ngay trong render khi deps đổi (pattern "adjust state during render").
  if (state.key !== depsKey) {
    setState({ data: null, loading: true, error: null, key: depsKey });
  }

  useEffect(() => {
    let cancelled = false;
    fn().then(
      (data) => {
        if (!cancelled) setState({ data, loading: false, error: null, key: depsKey });
      },
      (err) => {
        if (!cancelled) setState({ data: null, loading: false, error: errorMessage(err), key: depsKey });
      }
    );
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depsKey]);

  return state;
}
