export function formatPrice(amount: number, currency = "usd"): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount);
  } catch {
    return `$${amount.toFixed(2)}`;
  }
}

export function toStripeUnitAmount(amount: number): number {
  return Math.round(amount * 100);
}
