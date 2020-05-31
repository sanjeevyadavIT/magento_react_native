import { MAGENTO, CHANGE_CURRENCY } from '../../constants';

export const initializeApp = () => ({
  type: MAGENTO.INIT_APP_REQUEST,
});

export const changeCurrency = (
  currencyCode,
  currencySymbol,
  currencyExchangeRate,
) => ({
  type: CHANGE_CURRENCY,
  payload: {
    currencyCode,
    currencySymbol,
    currencyExchangeRate,
  },
});
