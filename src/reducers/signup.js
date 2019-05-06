import { MAGENTO, RESET_SIGNUP_STATE } from '../actions/actionsTypes';
import Status from '../magento/Status';

const INITIAL_STATE = {
  status: Status.DEFAULT,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case MAGENTO.SIGNUP_LOADING:
      return {
        ...state,
        status: Status.LOADING,
      };
    case MAGENTO.SIGNUP_SUCCESS:
      return {
        ...state,
        status: Status.SUCCESS,
      };
    case MAGENTO.SIGNUP_FAILURE:
      return {
        ...state,
        status: Status.ERROR,
        errorMessage: payload.errorMessage,
      };
    case RESET_SIGNUP_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
