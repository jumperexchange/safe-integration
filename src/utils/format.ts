import { formatUnits } from "viem";

export function formatTokenPrice(
  amount?: string | bigint,
  price?: string,
  decimals?: number
) {
  if (!amount || !price) {
    return 0;
  }

  const formattedAmount =
    typeof amount === "bigint" && decimals !== undefined
      ? formatUnits(amount, decimals)
      : amount.toString();

  if (Number.isNaN(Number(formattedAmount)) || Number.isNaN(Number(price))) {
    return 0;
  }
  return Number.parseFloat(formattedAmount) * Number.parseFloat(price);
}
