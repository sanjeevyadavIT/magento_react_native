import { MAGENTO, ACTION_USER_LOGOUT } from '../actions/actionsTypes';
import Status from '../magento/Status';

const INITIAL_STATE = {
  status: Status.DEFAULT,
  errorMessage: '',
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case MAGENTO.AUTH_LOADING:
      return {
        ...state,
        status: Status.LOADING,
        errorMessage: '',
      };
    case MAGENTO.AUTH_SUCCESS:
      return {
        ...state,
        status: Status.SUCCESS,
        token: payload.token, // TODO: find out whether it is used any where or not
      };
    case MAGENTO.AUTH_FAILURE:
      return {
        ...state,
        status: Status.ERROR,
        errorMessage: payload.errorMessage
      };
    case ACTION_USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
