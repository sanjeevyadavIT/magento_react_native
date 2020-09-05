import { shape, string, number, arrayOf, bool } from 'prop-types';

/**
 * Defines prop-types definition for a customer data
 *
 * https://magento.redoc.ly/2.3.5-admin/tag/customersme#operation/customerCustomerRepositoryV1GetByIdGet
 */
const customerType = shape({
  addresses: arrayOf(shape({
    city: string,
    company: string,
    country_id: string,
    customer_id: number,
    default_billing: bool,
    default_shipping: bool,
    firstname: string,
    id: number,
    lastname: string,
    middlename: string,
    postcode: string,
    region: shape({
      region: string.isRequired,
      region_code: string.isRequired,
      region_id: number.isRequired,
    }),
    region_id: number,
    street: arrayOf(string),
    suffix: string,
    telephone: string,
    vat_id: string,
  })),
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
