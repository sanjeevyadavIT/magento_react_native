import { MAGENTO } from './actionsTypes';

export const auth = (email, password) => ({
  type: MAGENTO.AUTH_REQUEST,
  payload: {
    email,
    password
  }
});
