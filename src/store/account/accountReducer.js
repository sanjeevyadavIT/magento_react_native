import {
  MAGENTO,
  LOGIN_SUCCESS,
  UPDATE_CUSTOMER,
  ACTION_USER_LOGOUT,
  USER_LOGGED_IN_STATUS,
} from '../../constants';
import Status from '../../magento/Status';

const initialState = {
  /**
   * State that tells whether user is logged in or not,
   * if userLoggedInStatus === true => logged in
   * else guest user
   */
  loggedIn: false,
  /**
   * state that store customer data
   */
  status: Status.DEFAULT,
  errorMessage: '',
  /**
   * Api state related to orders api for page = 1
   */
  ordersStatus: Status.DEFAULT,
  ordersErrorMessage: '',
  /**
   * Api state related to orders api for page > 1
   */
  moreOrdersStatus: Status.DEFAULT,
  moreOrdersErrorMessage: '',
  // ---
  orders: [],
  totalOrders: 0,
  customer: {
    addresses: [],
    email: '',
    firstname: '',
    lastname: '',
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
      };
    case USER_LOGGED_IN_STATUS:
      return {
        ...state,
        loggedIn: payload.loggedIn,
      };
    case MAGENTO.CURRENT_USER_LOADING:
      return {
        ...state,
        status: Status.LOADING,
        errorMessage: '',
      };
    case MAGENTO.CURRENT_USER_SUCCESS:
      return {
        ...state,
        status: Status.SUCCESS,
        customer: payload.customer,
        errorMessage: '',
      };
    case MAGENTO.CURRENT_USER_FAILURE:
      return {
        ...state,
        status: Status.ERROR,
        errorMessage: payload.errorMessage,
      };
    case UPDATE_CUSTOMER:
      return {
        ...state,
        customer: payload.customer,
      };
    case MAGENTO.GET_ORDERS_LOADING:
      return {
        ...state,
        ordersStatus: Status.LOADING,
        ordersErrorMessage: '',
        moreOrdersStatus: Status.DEFAULT,
        moreOrdersErrorMessage: '',
        totalOrders: 0,
      };
    case MAGENTO.GET_ORDERS_SUCCESS:
      return {
        ...state,
        ordersStatus: Status.SUCCESS,
        orders: payload.orders,
        totalOrders: payload.totalOrders,
      };
    case MAGENTO.GET_ORDERS_FAILURE:
      return {
        ...state,
        ordersStatus: Status.ERROR,
        ordersErrorMessage: payload.errorMessage,
      };
      case MAGENTO.GET_MORE_ORDERS_LOADING:
      return {
        ...state,
        moreOrdersStatus: Status.LOADING,
        moreOrdersErrorMessage: '',
      };
    case MAGENTO.GET_MORE_ORDERS_SUCCESS:
      return {
        ...state,
        moreOrdersStatus: Status.SUCCESS,
        orders: [...state.orders, ...payload.orders],
      };
    case MAGENTO.GET_MORE_ORDERS_FAILURE:
      return {
        ...state,
        moreOrdersStatus: Status.ERROR,
        moreOrdersErrorMessage: payload.errorMessage,
      };
    case ACTION_USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};
