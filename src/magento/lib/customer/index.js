import { CUSTOMER_TYPE } from '../../types';

export default magento => ({
  getCurrentCustomer: () => (
    // GET /rest/V1/customers/me
    new Promise((resolve, reject) => {
      const path = '/V1/customers/me';

      magento.get(path, undefined, undefined, CUSTOMER_TYPE)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  ),

  addToCart: payload => (
    // GET /rest/V1/customers/me
    new Promise((resolve, reject) => {
      const path = '/V1/carts/mine/items';

      magento.post(path, undefined, payload, CUSTOMER_TYPE)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  ),

  getCustomerCart: () => (
    // GET /rest/V1/carts/mine
    new Promise((resolve, reject) => {
      const path = '/V1/carts/mine';

      magento.get(path, undefined, undefined, CUSTOMER_TYPE)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  ),

  removeItemFromCart: itemId => (
    // GET /rest/V1/carts/mine/items/${itemId}
    new Promise((resolve, reject) => {
      const path = `/V1/carts/mine/items/${itemId}`;

      magento.delete(path, undefined, undefined, CUSTOMER_TYPE)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  ),

});
