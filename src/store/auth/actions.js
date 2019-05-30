import { MAGENTO, RESET_AUTH_STATE } from '../../constants';

export const signIn = (email, password) => ({
  type: MAGENTO.SIGN_IN_REQUEST,
  payload: {
    email,
    password
  }
});

export const signUp = payload => ({
  type: MAGENTO.SIGN_UP_REQUEST,
  payload,
});

export const resetAuthState = () => ({
  type: RESET_AUTH_STATE,
});
