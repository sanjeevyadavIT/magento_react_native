import { MAGENTO } from '../../constants';
import Status from '../../magento/Status';

const INITIAL_STATE = {
  status: Status.DEFAULT,
  countryStatus: Status.DEFAULT,
  billingAddressStatus: Status.DEFAULT,
  shippingMethodStatus: Status.DEFAULT,
  paymentMethodStatus: Status.DEFAULT,
  orderStatus: Status.DEFAULT,
  orderDetailStatus: Status.DEFAULT,
  countries: [],
  shipping: null,
  payment: null,
  errorMessage: '',
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case MAGENTO.COUNTRIES_LOADING:
      return {
        ...state,
        countryStatus: Status.LOADING,
      };
    case MAGENTO.COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: payload.countries,
        countryStatus: Status.SUCCESS,
      };
    case MAGENTO.COUNTRIES_FAILURE:
      return {
        ...state,
        countryStatus: Status.ERROR,
        errorMessage: payload.errorMessage,
      };
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
    case MAGENTO.ORDER_DETAIL_LOADING:
      return {
        ...state,
        orderDetailStatus: Status.LOADING,
      };
    case MAGENTO.ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        orderDetailStatus: Status.SUCCESS,
        order: payload.order,
      };
    case MAGENTO.ORDER_DETAIL_FAILURE:
      return {
        ...state,
        orderDetailStatus: Status.ERROR,
        errorMessage: payload.errorMessage,
      };
    default:
      return state;
  }
};
