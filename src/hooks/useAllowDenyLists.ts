import { useMemo } from "react";
import { useQueryParams } from "./useQueryParams";

interface AllowDenyLists {
  bridges?: {
    allow?: string[];
    deny?: string[];
  };
  exchanges?: {
    allow?: string[];
    deny?: string[];
  };
  chains?: {
    allow?: number[];
    deny?: number[];
  };
}

export function useAllowDenyLists(): AllowDenyLists {
  const searchParams = useQueryParams();

  return useMemo(() => {
    const allowBridges = searchParams
      .get("allowBridges")
      ?.split(",")
      .filter(Boolean);
    const denyBridges = searchParams
      .get("denyBridges")
      ?.split(",")
      .filter(Boolean);
    const allowExchanges = searchParams
      .get("allowExchanges")
      ?.split(",")
      .filter(Boolean);
    const denyExchanges = searchParams
      .get("denyExchanges")
      ?.split(",")
      .filter(Boolean);

    // Parse chain parameters
    const allowChains = searchParams
      .get("allowChains")
      ?.split(",")
      .map(Number)
      .filter(Boolean);
    const denyChains = searchParams
      .get("denyChains")
      ?.split(",")
      .map(Number)
      .filter(Boolean);

    const result: AllowDenyLists = {};

    if (allowBridges?.length || denyBridges?.length) {
      result.bridges = {};
      if (allowBridges?.length) {
        result.bridges.allow = allowBridges;
      }
      if (denyBridges?.length) {
        result.bridges.deny = denyBridges;
      }
    }

    if (allowExchanges?.length || denyExchanges?.length) {
      result.exchanges = {};
      if (allowExchanges?.length) {
        result.exchanges.allow = allowExchanges;
      }
      if (denyExchanges?.length) {
        result.exchanges.deny = denyExchanges;
      }
    }

    if (allowChains?.length || denyChains?.length) {
      result.chains = {};
      if (allowChains?.length) {
        result.chains.allow = allowChains;
      }
      if (denyChains?.length) {
        result.chains.deny = denyChains;
      }
    }

    return result;
  }, [searchParams]);
}
