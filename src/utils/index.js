import customerType from './custom-prop-types/customerType';
import addressType from './custom-prop-types/addressType';
import countryType from './custom-prop-types/countryType';
import orderType from './custom-prop-types/orderType';
import cartItemType from './custom-prop-types/cartItemType';
import productType from './custom-prop-types/productType';

export {
  customerType,
  addressType,
  countryType,
  orderType,
  cartItemType,
  productType,
};
export * from './products';
export * from './order';
export * from './primitiveChecks';
export * from './validations';
export * from './date';

export const delay = ms => new Promise(res => setTimeout(res, ms));
