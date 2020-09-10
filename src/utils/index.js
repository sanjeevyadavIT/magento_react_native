import customerType from './custom-prop-types/customerType';
import addressType from './custom-prop-types/addressType';
import countryType from './custom-prop-types/countryType';
import orderType from './custom-prop-types/orderType';

export { customerType, addressType, countryType, orderType };
export * from './products';
export * from './order';
export * from './primitiveChecks';
export * from './validations';

export const delay = ms => new Promise(res => setTimeout(res, ms));
