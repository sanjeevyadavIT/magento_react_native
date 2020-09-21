import { CUSTOMER_TYPE } from '../../types';

export default magento => ({
  getCurrentCustomer: () =>
    magento.get('/V1/customers/me', undefined, undefined, CUSTOMER_TYPE),

  addItemToCart: request =>
    magento.post('/V1/carts/mine/items', undefined, request, CUSTOMER_TYPE),

  createQuoteId: () =>
    magento.post('/V1/carts/mine', undefined, undefined, CUSTOMER_TYPE),

  getCustomerCart: () =>
    magento.get('/V1/carts/mine', undefined, undefined, CUSTOMER_TYPE),

  removeItemFromCart: itemId =>
    magento.delete(
      `/V1/carts/mine/items/${itemId}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),

  addCartBillingAddress: address =>
    magento.post(
      '/V1/carts/mine/billing-address',
      undefined,
      address,
      CUSTOMER_TYPE,
    ),

  getShippingMethod: address =>
    magento.post(
      '/V1/carts/mine/estimate-shipping-methods',
      undefined,
      address,
      CUSTOMER_TYPE,
    ),

  addCartShippingInfo: address =>
    magento.post(
      '/V1/carts/mine/shipping-information',
      undefined,
      address,
      CUSTOMER_TYPE,
    ),

  placeCartOrder: paymentInformation =>
    magento.post(
      '/V1/carts/mine/payment-information',
      undefined,
      paymentInformation,
      CUSTOMER_TYPE,
    ),
});
