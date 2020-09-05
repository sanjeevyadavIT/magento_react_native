import { shape, string, number, arrayOf, bool } from 'prop-types';

const addressType = shape({
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
});

export default addressType;
