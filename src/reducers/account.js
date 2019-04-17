import { MAGENTO } from '../actions/actionsTypes';

const INITIAL_STATE = {
  customer: null,
  error: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MAGENTO.CURRENT_USER_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: null,
        success: null,
      };
    case MAGENTO.CURRENT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        customer: action.payload,
      };
    case MAGENTO.CURRENT_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
