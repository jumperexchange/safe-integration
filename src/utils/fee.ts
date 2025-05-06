import {
  type CalculateFeeParams,
  ChainId,
  CoinKey,
  StaticToken,
} from "@lifi/widget";
import { formatTokenPrice } from "../utils/format";
import { findDefaultToken } from "@lifi/data-types";

export async function calculateFee(params: CalculateFeeParams) {
  const { fromAmount } = params;

  const amountInUSD = formatTokenPrice(
    fromAmount,
    params.fromToken.priceUSD,
    params.fromToken.decimals
  );

  const stablecoinTokenAddresses = getStablecoinTokenAddresses(
    params.fromToken.chainId
  );

  const fromTokenAddress = params.fromToken.address.toLowerCase();

  const isStablecoin = stablecoinTokenAddresses.some(
    (token) => token.address.toLowerCase() === fromTokenAddress
  );

  if (isStablecoin) {
    if (amountInUSD <= 100_000) {
      return 0.001; // 0.10%
    } else if (amountInUSD <= 1_000_000) {
      return 0.0007; // 0.07%
    } else {
      return 0.0005; // 0.05%
    }
  } else {
    if (amountInUSD <= 100_000) {
      return 0.0035; // 0.35%
    } else if (amountInUSD <= 1_000_000) {
      return 0.002; // 0.20%
    } else {
      return 0.001; // 0.10%
    }
  }
}

export const getStablecoinTokenAddresses = (
  chainId: ChainId
): StaticToken[] => {
  const stablecoins = [CoinKey.USDC, CoinKey.USDT, CoinKey.DAI];
  return stablecoins
    .map((coinKey) => safeFindDefaultToken(coinKey, chainId))
    .filter((token): token is StaticToken => !!token);
};

const safeFindDefaultToken = (
  coinKey: CoinKey,
  chainId: ChainId
): StaticToken | undefined => {
  try {
    return findDefaultToken(coinKey, chainId);
  } catch {
    return undefined;
  }
};
