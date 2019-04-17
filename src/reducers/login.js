import { MAGENTO } from '../actions/actionsTypes';

const INITIAL_STATE = {
  customer: null,
  token: null,
  success: null,
  error: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MAGENTO.AUTH_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: null,
        success: null,
      };
    case MAGENTO.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload,
        success: 'Login successfully!!!'
      };
    case MAGENTO.AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
