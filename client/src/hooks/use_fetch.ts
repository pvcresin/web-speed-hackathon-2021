import React from 'react';

type ReturnValues<T> = {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
};

export function useFetch<T>(apiPath: string, fetcher: (apiPath: string) => Promise<T>): ReturnValues<T> {
  const [result, setResult] = React.useState<ReturnValues<T>>({
    data: null,
    error: null,
    isLoading: true,
  });

  React.useEffect(() => {
    setResult(() => ({
      data: null,
      error: null,
      isLoading: true,
    }));

    const promise = fetcher(apiPath);

    promise.then((data) => {
      setResult((cur) => ({
        ...cur,
        data,
        isLoading: false,
      }));
    });

    promise.catch((error) => {
      setResult((cur) => ({
        ...cur,
        error,
        isLoading: false,
      }));
    });
  }, [apiPath, fetcher]);

  return result;
}
