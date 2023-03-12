export function formatPrice(price: string) {
  return new Intl.NumberFormat("th", {
    style: "currency",
    currency: "THB",
  }).format(Number(price));
}
