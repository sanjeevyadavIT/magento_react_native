import { oneOf, number, shape, string } from 'prop-types';
import { SIMPLE_TYPE_SK, CONFIGURABLE_TYPE_SK } from '../../constants';

const cartItemType = shape({
  item_id: number,
  name: string,
  price: string,
  product_type: oneOf([SIMPLE_TYPE_SK, CONFIGURABLE_TYPE_SK]),
  qty: number,
  quote_id: string,
  sku: string,
});

export default cartItemType;
