import {
  MAGENTO_SIGNUP_ERROR,
  MAGENTO_SIGNUP_SUCCESS,
  MAGENTO_SIGNUP_LOADING,
} from '../actions/types';

const INITIAL_STATE = {
  success: null,
  error: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MAGENTO_SIGNUP_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: null,
        success: null,
      };
    case MAGENTO_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    case MAGENTO_SIGNUP_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
