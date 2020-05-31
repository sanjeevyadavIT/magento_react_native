import {
  MAGENTO,
  RESET_PAYMENT_STATE,
  RESET_SHIPPING_STATE,
  RESET_CHECKOUT_ADDRESS_STATE,
  RESET_CHECKOUT_STATE,
} from '../../constants';

export const getCountries = () => ({
  type: MAGENTO.COUNTRIES_REQUEST,
});

export const addCartBillingAddress = address => ({
  type: MAGENTO.ADD_CART_BILLING_ADDRESS_REQUEST,
  payload: { address },
});

export const getShippingMethod = address => ({
  type: MAGENTO.GET_SHIPPING_METHOD_REQUEST,
  payload: { address },
});

export const addCartShippingInfo = address => ({
  type: MAGENTO.ADD_CART_SHIPPING_INFO_REQUEST,
  payload: { address },
});

export const placeCartOrder = paymentInformation => ({
  type: MAGENTO.PLACE_CART_ORDER_REQUEST,
  payload: { paymentInformation },
});

export const getOrderDetail = orderId => ({
  type: MAGENTO.ORDER_DETAIL_REQUEST,
  payload: { orderId },
});

// reset entire checkout state
export const resetCheckoutState = () => ({
  type: RESET_CHECKOUT_STATE,
});

export const resetCheckoutAddressState = () => ({
  type: RESET_CHECKOUT_ADDRESS_STATE,
});

export const resetShippingState = () => ({
  type: RESET_SHIPPING_STATE,
});

export const resetPaymentState = () => ({
  type: RESET_PAYMENT_STATE,
});
