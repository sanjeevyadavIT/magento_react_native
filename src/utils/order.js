import { CONFIGURABLE_TYPE_SK } from '../constants';

// eslint-disable-next-line import/prefer-default-export
export const parseOrderDetail = _order => {
  const order = { ..._order };
  const { items } = order;
  // Items list contain 'simple' & 'configurable' both type of data
  const simpleItems = items.filter(i => i.product_type === 'simple');
  const simpleItemsWithPriceAndName = simpleItems.map(_simpleItem => {
    const simpleItem = { ..._simpleItem };
    if (simpleItem.parent_item) {
      simpleItem.price = simpleItem.parent_item.price;
      simpleItem.row_total = simpleItem.parent_item.row_total;
      simpleItem.name = simpleItem.parent_item.name || simpleItem.name;
    }
    return simpleItem;
  });
  order.items = simpleItemsWithPriceAndName;
  return order;
};

/**
 * Get sku of all the individual unique products from order list
 */
export const getProductsSkuFromOrders = orders => {
  const products = new Set();

  orders.forEach(order => {
    order.items.forEach(item => {
      if (item.type !== CONFIGURABLE_TYPE_SK) {
        products.add(item.sku);
      }
    });
  });

  return products;
};
