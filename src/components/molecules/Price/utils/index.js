//TODO: add number check before integer and decimal check
export const formatPrice = price => (Number.isInteger(price) ? price : parseFloat(price).toFixed(2));
