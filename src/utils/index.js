export * from './products';
export * from './order';

export function isNumber(n) {
  return typeof n === 'number' && !isNaN(n) && isFinite(n);
}

export const delay = (ms) => new Promise(res => setTimeout(res, ms));
