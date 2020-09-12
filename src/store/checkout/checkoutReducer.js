import {
  MAGENTO,
  RESET_PAYMENT_STATE,
  RESET_SHIPPING_STATE,
  RESET_CHECKOUT_ADDRESS_STATE,
  RESET_CHECKOUT_STATE,
} from '../../constants';
import Status from '../../magento/Status';

const INITIAL_STATE = {
  status: Status.DEFAULT,
  //-------------------------------------
  billingAddressStatus: Status.DEFAULT,
  //-------------------------------------
  shippingMethodStatus: Status.DEFAULT,
  shipping: null,
  //-------------------------------------
  paymentMethodStatus: Status.DEFAULT,
  payment: null,
  //-------------------------------------
  orderStatus: Status.DEFAULT,
  //-------------------------------------
  errorMessage: '',
};

// TODO: Clean up reducer, too crowded
export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case MAGENTO.ADD_CART_BILLING_ADDRESS_LOADING:
      return {
        ...state,
        billingAddressStatus: Status.LOADING,
      };
    case MAGENTO.ADD_CART_BILLING_ADDRESS_SUCCESS:
      return {
        ...state,
        billingAddressStatus: Status.SUCCESS,
      };
    case MAGENTO.ADD_CART_BILLING_ADDRESS_FAILURE:
      return {
        ...state,
        billingAddressStatus: Status.ERROR,
        errorMessage: payload.errorMessage,
      };
    case MAGENTO.GET_SHIPPING_METHOD_LOADING:
      return {
        ...state,
        shippingMethodStatus: Status.LOADING,
      };
    case MAGENTO.GET_SHIPPING_METHOD_SUCCESS:
      return {
        ...state,
        shippingMethodStatus: Status.SUCCESS,
        shipping: payload.shipping,
      };
    case MAGENTO.GET_SHIPPING_METHOD_FAILURE:
      return {
        ...state,
        shippingMethodStatus: Status.ERROR,
        errorMessage: payload.errorMessage,
      };
    case MAGENTO.ADD_CART_SHIPPING_INFO_LOADING:
      return {
        ...state,
        paymentMethodStatus: Status.LOADING,
      };
    case MAGENTO.ADD_CART_SHIPPING_INFO_SUCCESS:
      return {
        ...state,
        paymentMethodStatus: Status.SUCCESS,
        payment: payload.payment,
      };
    case MAGENTO.ADD_CART_SHIPPING_INFO_FAILURE:
      return {
        ...state,
        paymentMethodStatus: Status.ERROR,
        errorMessage: payload.errorMessage,
      };
    case MAGENTO.PLACE_CART_ORDER_LOADING:
      return {
        ...state,
        orderStatus: Status.LOADING,
      };
    case MAGENTO.PLACE_CART_ORDER_SUCCESS:
      return {
        ...state,
        orderStatus: Status.SUCCESS,
        orderId: payload.orderId,
      };
    case MAGENTO.PLACE_CART_ORDER_FAILURE:
      return {
        ...state,
        orderStatus: Status.ERROR,
        errorMessage: payload.errorMessage,
      };
    case RESET_PAYMENT_STATE:
      return {
        ...state,
        paymentMethodStatus: Status.DEFAULT,
        payment: null,
      };
    case RESET_SHIPPING_STATE:
      return {
        ...state,
        shippingMethodStatus: Status.DEFAULT,
        billingAddressStatus: Status.DEFAULT,
        shipping: null,
      };
    case RESET_CHECKOUT_ADDRESS_STATE:
      return {
        ...state,
        billingAddressStatus: Status.DEFAULT,
      };
    case RESET_CHECKOUT_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
