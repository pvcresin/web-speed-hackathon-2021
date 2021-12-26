import React from 'react';

const LIMIT = 5;

type ReturnValues<T> = {
  data: Array<T>;
  error: Error | null;
  isLoading: boolean;
};

export function useInfiniteFetch<T>(
  apiPath: string,
  fetcher: (apiPath: string) => Promise<T[] | null>,
): ReturnValues<T> & { fetchMore: () => void } {
  const internalRef = React.useRef({ isLoading: false, offset: 0 });

  const [result, setResult] = React.useState<ReturnValues<T>>({
    data: [],
    error: null,
    isLoading: true,
  });

  const fetchMore = React.useCallback(() => {
    const { isLoading, offset } = internalRef.current;
    if (isLoading) {
      return;
    }

    setResult((cur) => ({
      ...cur,
      isLoading: true,
    }));
    internalRef.current = {
      isLoading: true,
      offset,
    };

    const url = `${apiPath}?limit=${LIMIT}&offset=${offset}`;
    const promise = fetcher(url);

    promise.then((nextData) => {
      if (!nextData) return;
      setResult((cur) => ({
        ...cur,
        data: [...cur.data, ...nextData],
        isLoading: false,
      }));
      internalRef.current = {
        isLoading: false,
        offset: offset + LIMIT,
      };
    });

    promise.catch((error) => {
      setResult((cur) => ({
        ...cur,
        error,
        isLoading: false,
      }));
      internalRef.current = {
        isLoading: false,
        offset,
      };
    });
  }, [apiPath, fetcher]);

  React.useEffect(() => {
    setResult(() => ({
      data: [],
      error: null,
      isLoading: true,
    }));
    internalRef.current = {
      isLoading: false,
      offset: 0,
    };

    fetchMore();
  }, [fetchMore]);

  return {
    ...result,
    fetchMore,
  };
}
