import { MAGENTO } from '../actions/actionsTypes';

const INITIAL_STATE = {
  success: null,
  error: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MAGENTO.SIGNUP_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: null,
        success: null,
      };
    case MAGENTO.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    case MAGENTO.SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
