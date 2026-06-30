import { useEffect, useState } from "react";

export function useStore<T, U>(
  store: (selector: (state: T) => U) => U,
  selector: (state: T) => U,
): U | undefined {
  const result = store(selector);
  const [data, setData] = useState<U>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
}
