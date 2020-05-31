import { currencySymbols } from '../../config/magento';

export const priceSignByCode = code => {
  const sign = currencySymbols[code];
  if (sign) {
    return sign;
  }
  // If no currency symbol specified for currency code, return currency code
  return code;
};
