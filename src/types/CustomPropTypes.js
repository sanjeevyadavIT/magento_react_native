import {
  shape,
  number,
  string,
  oneOf,
  arrayOf,
} from 'prop-types';

export const ProductType = shape({
  id: number,
  sku: string.isRequired,
  name: string,
  price: number,
  status: number,
  visibility: number,
  type_id: oneOf(['simple', 'virtual', 'bundle', 'downloadable', 'grouped', 'configurable']),
  custom_attributes: arrayOf(shape({
    attribute_code: string,
    value: string,
  }))
});
