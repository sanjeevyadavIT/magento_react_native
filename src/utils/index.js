import customerType from './custom-prop-types/customerType';
import addressType from './custom-prop-types/addressType';

export { customerType, addressType };
export * from './products';
export * from './order';
export * from './primitiveChecks';
export * from './validations';

export const delay = ms => new Promise(res => setTimeout(res, ms));
