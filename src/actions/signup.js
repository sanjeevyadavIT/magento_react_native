import { MAGENTO, RESET_SIGNUP_STATE } from './actionsTypes';

export const signup = payload => ({
  type: MAGENTO.SIGNUP_REQUEST,
  payload,
});

export const resetSignupState = () => ({
  type: RESET_SIGNUP_STATE,
});
