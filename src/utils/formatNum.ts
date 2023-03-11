export function formatNum(s: string) {
  return s.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
