import { useState, useEffect } from "react";

export function useDefaultChain(
  searchParams: URLSearchParams
): number | undefined {
  const [defaultChain, setDefaultChain] = useState<number | undefined>(() => {
    const defaultFromChain = searchParams.get("fromChain");
    if (defaultFromChain) {
      const chainId = parseInt(defaultFromChain);
      return chainId;
    }
    return undefined;
  });

  useEffect(() => {
    const defaultFromChain = searchParams.get("fromChain");

    if (defaultFromChain) {
      const chainId = parseInt(defaultFromChain);
      setDefaultChain(chainId);
    }
  }, [searchParams]);

  return defaultChain;
}
