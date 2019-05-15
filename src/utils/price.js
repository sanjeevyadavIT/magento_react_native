export const priceSignByCode = (code) => {
  const sign = codes[code];
  if (sign) {
    return sign;
  }

  return code;
};
  
const codes = {
  USD: '$',
  EUR: '€'
};