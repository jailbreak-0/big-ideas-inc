/**
 * Format price in GHS (Ghanaian Cedis)
 * @param price - Price in USD
 * @param exchangeRate - USD to GHS exchange rate (default: ~12.5 as of Jan 2026)
 */
export function formatPrice(price: number, exchangeRate: number = 12.5): string {
  const ghsPrice = price * exchangeRate;
  return `GH₵${ghsPrice.toFixed(2)}`;
}

/**
 * Convert USD to GHS
 */
export function usdToGhs(usdAmount: number, exchangeRate: number = 12.5): number {
  return usdAmount * exchangeRate;
}
