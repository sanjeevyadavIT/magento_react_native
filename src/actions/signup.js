import { MAGENTO_SIGNUP } from './types';

export const signup = payload => ({
  type: MAGENTO_SIGNUP,
  payload,
});
