import { MAGENTO } from './actionsTypes';

export const signup = payload => ({
  type: MAGENTO.SIGNUP_REQUEST,
  payload,
});
