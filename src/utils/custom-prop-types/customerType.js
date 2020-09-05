import { shape, string, number, arrayOf } from 'prop-types';
import addressType from './addressType';

/**
 * Defines prop-types definition for a customer data
 *
 * https://magento.redoc.ly/2.3.5-admin/tag/customersme#operation/customerCustomerRepositoryV1GetByIdGet
 */
const customerType = shape({
  addresses: arrayOf(addressType),
  confirmation: string,
  created_at: string,
  created_in: string,
  // Default billing address id
  default_billing: string,
  // Default shipping address id
  default_shipping: string,
  dob: string,
  email: string.isRequired,
  firstname: string.isRequired,
  gender: number,
  // Group id
  group_id: number,
  // Customer id
  id: number,
  lastname: string.isRequired,
  middlename: string,
  store_id: number,
  updated_at: string,
  website_id: number,
});

export default customerType;
