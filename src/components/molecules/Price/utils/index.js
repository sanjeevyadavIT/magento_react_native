export const isNumber = input => typeof input === 'number' && /^-?[\d.]+(?:e-?\d+)?$/.test(input);

/**
 * If non-number is supplied return 0
 * If Integer is supplied return number as it is
 * If decimal number is supplied format it to two deciaml places
 *
 * @param {price} number which need to be formatted
 */
export const formatPrice = (price) => {
  if (!isNumber(price)) {
    return 0;
  }
  return (Number.isInteger(price) ? price : parseFloat(price.toFixed(2)));
};
