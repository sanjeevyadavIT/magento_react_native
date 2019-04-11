import {
  MAGENTO_CURRENT_USER_LOADING,
  MAGENTO_CURRENT_USER_SUCCESS,
  MAGENTO_CURRENT_USER_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  customer: null,
  error: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MAGENTO_CURRENT_USER_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: null,
        success: null,
      };
    case MAGENTO_CURRENT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        customer: action.payload,
      };
    case MAGENTO_CURRENT_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
