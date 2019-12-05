export function isNumber(n) {
  return typeof n === 'number' && !isNaN(n) && isFinite(n);
}
