import {
  MAGENTO_AUTH,
  MAGENTO_AUTH_ERROR,
  MAGENTO_AUTH_SUCCESS,
  MAGENTO_AUTH_LOADING,
} from '../actions/types';

const INITIAL_STATE = {
  customer: null,
  token: null,
  success: null,
  error: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MAGENTO_AUTH_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: null,
        success: null,
      };
    case MAGENTO_AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload,
        success: 'Login successfully!!!'
      };
    case MAGENTO_AUTH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
