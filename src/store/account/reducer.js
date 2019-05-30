import { MAGENTO, ACTION_USER_LOGOUT } from '../../constants';
import Status from '../../magento/Status';

const initialState = {
  status: Status.DEFAULT, // customer info
  orderStatus: Status.DEFAULT,

  errorMessage: '',
  ordersErrorMessage: '',

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
        customer: payload.customer,
      };
    case MAGENTO.CURRENT_USER_FAILURE:
      return {
        ...state,
        status: Status.ERROR,
        errorMessage: payload.errorMessage,
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
    case ACTION_USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};
