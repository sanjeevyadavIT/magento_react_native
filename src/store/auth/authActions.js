import { MAGENTO, RESET_AUTH_STATE } from '../../constants';

export const resetPassword = email => ({
  type: MAGENTO.RESET_PASSWORD_REQUEST,
  payload: { email },
});

export const resetAuthState = () => ({
  type: RESET_AUTH_STATE,
});
