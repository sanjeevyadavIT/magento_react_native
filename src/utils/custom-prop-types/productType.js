import {
  bool,
  shape,
  number,
  string,
  oneOf,
  oneOfType,
  arrayOf,
} from 'prop-types';
import { SIMPLE_TYPE_SK, CONFIGURABLE_TYPE_SK } from '../../constants';

const productType = shape({
  id: number,
  sku: string.isRequired,
  name: string,
  price: number,
  status: number,
  visibility: number,
  type_id: oneOf([
    SIMPLE_TYPE_SK,
    CONFIGURABLE_TYPE_SK,
    'virtual',
    'bundle',
    'downloadable',
    'grouped',
  ]),
  media_gallery_entries: arrayOf(
    shape({
      disabled: bool,
      file: string,
      id: number,
      label: string,
      media_type: oneOf(['image', 'video']),
      position: number,
      types: arrayOf(string),
    }),
  ),
  custom_attributes: arrayOf(
    shape({
      attribute_code: string,
      value: oneOfType([string, arrayOf(string)]),
    }),
  ),
  extension_attributes: shape({
    configurable_product_options: arrayOf(
      shape({
        attribute_id: string,
        id: number,
        label: string,
        position: number,
        product_id: number,
        values: arrayOf(shape({ value_index: number }).isRequired),
      }).isRequired,
    ),
  }),
});

export default productType;
