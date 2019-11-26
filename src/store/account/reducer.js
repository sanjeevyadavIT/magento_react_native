import {
  MAGENTO,
  ACTION_USER_LOGOUT,
  RESET_ADDRESS_STATUS,
  USER_LOGGED_IN_STATUS,
} from '../../constants';
import Status from '../../magento/Status';

const initialState = {
  userLoggedInStatus: Status.DEFAULT,
  /**
   * state that store customer data
   */
  status: Status.DEFAULT,
  errorMessage: '',
  /**
   * state related to OrdersScreen
   */
  orderStatus: Status.DEFAULT,
  ordersErrorMessage: '',
  /**
   * state related to EditAccountAddressScreen
   */
  addressStatus: Status.DEFAULT,
  addressErrorMessage: '',

  products: {},
  orders: [],
  customer: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case MAGENTO.CURRENT_USER_LOADING:
      return {
        ...state,
        status: Status.LOADING,
      };
    case MAGENTO.CURRENT_USER_SUCCESS:
      return {
        ...state,
        status: Status.SUCCESS,
        userLoggedInStatus: Status.SUCCESS,
        customer: payload.customer,
      };
    case MAGENTO.CURRENT_USER_FAILURE:
      return {
        ...state,
        status: Status.ERROR,
        userLoggedInStatus: Status.ERROR,
        errorMessage: payload.errorMessage,
      };
    case MAGENTO.ADD_ACCOUNT_ADDRESS_LOADING:
      return {
        ...state,
        addressStatus: Status.LOADING,
      };
    case MAGENTO.ADD_ACCOUNT_ADDRESS_SUCCESS:
      return {
        ...state,
        customer: payload.customer,
        addressStatus: Status.SUCCESS,
      };
    case MAGENTO.ADD_ACCOUNT_ADDRESS_FAILURE:
      return {
        ...state,
        addressStatus: Status.ERROR,
        addressErrorMessage: payload.errorMessage
      };
    case RESET_ADDRESS_STATUS:
      return {
        ...state,
        addressStatus: Status.DEFAULT,
      };
    case MAGENTO.GET_ORDERS_LOADING:
      return {
        ...state,
        orderStatus: Status.LOADING,
      };
    case MAGENTO.GET_ORDERS_SUCCESS:
      return {
        ...state,
        orderStatus: Status.SUCCESS,
        ...payload,
      };
    case MAGENTO.GET_ORDERS_FAILURE:
      return {
        ...state,
        orderStatus: Status.ERROR,
        ordersErrorMessage: payload.errorMessage,
      };
    case MAGENTO.GET_ORDERED_PRODUCT_INFO_SUCCESS:
      return {
        ...state,
        products: {
          ...state.products,
          [payload.sku]: payload.product,
        }
      };
    case USER_LOGGED_IN_STATUS:
      return {
        ...state,
        userLoggedInStatus: payload.status,
      };
    case ACTION_USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};
