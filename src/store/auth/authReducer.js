import { MAGENTO, ACTION_USER_LOGOUT, RESET_AUTH_STATE } from '../../constants';
import Status from '../../magento/Status';

// TODO: SignIn need to be reset if user hit back from SignInPage
const INITIAL_STATE = {
  resetPasswordStatus: Status.DEFAULT,
  resetPasswordErrorMessage: '',
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ACTION_USER_LOGOUT:
    case RESET_AUTH_STATE:
      return INITIAL_STATE;
    case MAGENTO.RESET_PASSWORD_LOADING:
      return {
        ...state,
        resetPasswordStatus: Status.LOADING,
        resetPasswordErrorMessage: '',
      };
    case MAGENTO.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordStatus: Status.SUCCESS,
      };
    case MAGENTO.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        resetPasswordStatus: Status.ERROR,
        resetPasswordErrorMessage: payload.errorMessage,
      };
    default:
      return state;
  }
};
