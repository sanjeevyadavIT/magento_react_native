import { CONFIGURABLE_TYPE_SK } from '../constants';

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
