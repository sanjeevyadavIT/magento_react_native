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

  addItemToCart: payload => (
    // POST /rest/V1/carts/mine/items
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

  createQuoteId: () => (
    // POST /rest/V1/carts/mine
    new Promise((resolve, reject) => {
      const path = '/V1/carts/mine';

      magento.post(path, undefined, undefined, CUSTOMER_TYPE)
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
    // DELETE /rest/V1/carts/mine/items/${itemId}
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

  addCartBillingAddress: address => (
    // POST /rest/V1/carts/mine/billing-address
    new Promise((resolve, reject) => {
      const path = '/V1/carts/mine/billing-address';

      magento.post(path, undefined, address, CUSTOMER_TYPE)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  ),

  getShippingMethod: address => (
    // POST /rest/V1/carts/mine/estimate-shipping-methods
    new Promise((resolve, reject) => {
      const path = '/V1/carts/mine/estimate-shipping-methods';

      magento.post(path, undefined, address, CUSTOMER_TYPE)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  ),

  addCartShippingInfo: address => (
    // POST /V1/carts/mine/shipping-information
    new Promise((resolve, reject) => {
      const path = '/V1/carts/mine/shipping-information';

      magento.post(path, undefined, address, CUSTOMER_TYPE)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  ),

  placeCartOrder: paymentInformation => (
    // POST /V1/carts/mine/payment-information
    new Promise((resolve, reject) => {
      const path = '/V1/carts/mine/payment-information';

      magento.post(path, undefined, paymentInformation, CUSTOMER_TYPE)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  ),
});
