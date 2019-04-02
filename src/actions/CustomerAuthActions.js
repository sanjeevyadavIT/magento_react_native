import { MAGENTO_AUTH } from './types';

export const auth = (email, password) => ({
  type: MAGENTO_AUTH,
  payload: {
    email,
    password
  }
});
