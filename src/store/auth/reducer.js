import { MAGENTO, ACTION_USER_LOGOUT, RESET_AUTH_STATE } from '../../constants/actionsTypes';
import Status from '../../magento/Status';

// TODO: SignIn need to be reset if user hit back from SignInPage
const INITIAL_STATE = {
  signInStatus: Status.DEFAULT,
  signUpStatus: Status.DEFAULT,

  signInErrorMessage: '',
  signUpErrorMessage: '',
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case MAGENTO.SIGN_IN_LOADING:
      return {
        ...state,
        signInStatus: Status.LOADING,
        signInErrorMessage: '',
      };
    case MAGENTO.SIGN_IN_SUCCESS:
      return {
        ...state,
        signInStatus: Status.SUCCESS,
      };
    case MAGENTO.SIGN_IN_FAILURE:
      return {
        ...state,
        signInStatus: Status.ERROR,
        signInErrorMessage: payload.errorMessage
      };
    case MAGENTO.SIGN_UP_LOADING:
      return {
        ...state,
        signUpStatus: Status.LOADING,
        signUpErrorMessage: '',
      };
    case MAGENTO.SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpStatus: Status.SUCCESS,
      };
    case MAGENTO.SIGN_UP_FAILURE:
      return {
        ...state,
        signUpStatus: Status.ERROR,
        signUpErrorMessage: payload.errorMessage,
      };
    case ACTION_USER_LOGOUT:
    case RESET_AUTH_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
