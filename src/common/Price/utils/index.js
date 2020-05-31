export const isNumber = input =>
  typeof input === 'number' && /^-?[\d.]+(?:e-?\d+)?$/.test(input);

/**
 * If non-number is supplied return 0
 * If number is supplied return a number
 * equal to price multiplied with currencyRate
 * formatted to two decimall places
 *
 * @param {price} number which need to be formatted
 * @param {currencyRate} number multiplying factor
 */
export const formatPrice = (price, currencyRate) => {
  if (!isNumber(price)) {
    return 0;
  }
  return parseFloat((price * currencyRate).toFixed(2));
};
