import { MAGENTO } from '../../constants';
import Status from '../../magento/Status';

const INITIAL_STATE = {
  storeConfigStatus: Status.DEFAULT,
  currencyStatus: Status.DEFAULT,
  countryStatus: Status.DEFAULT,
  currency: {
    default_display_currency_code: '',
    default_display_currency_symbol: '',
  }
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case MAGENTO.INIT_APP_LOADING:
      return {
        ...state,
        storeConfigStatus: Status.LOADING,
      };
    case MAGENTO.INIT_APP_SUCCESS:
      return {
        ...state,
        status: Status.SUCCESS,
        storeConfigStatus: payload.storeConfig[0],
      };
    case MAGENTO.INIT_APP_FAILURE:
      return {
        ...state,
        storeConfigStatus: Status.ERROR,
        errorMessage: payload.errorMessage,
      };
    case MAGENTO.CURRENCY_LOADING:
      return {
        ...state,
        status: Status.LOADING,
      };
    case MAGENTO.CURRENCY_SUCCESS:
      return {
        ...state,
        status: Status.SUCCESS,
        currency: {
          ...state.currency,
          ...payload.currency
        },
      };
    case MAGENTO.CURRENCY_FAILURE:
      return {
        ...state,
        status: Status.ERROR,
        errorMessage: payload.errorMessage,
      };
    case MAGENTO.COUNTRIES_LOADING:
      return {
        ...state,
        countryStatus: Status.LOADING,
      };
    case MAGENTO.COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: payload.countries,
        countryStatus: Status.SUCCESS,
      };
    case MAGENTO.COUNTRIES_FAILURE:
      return {
        ...state,
        countryStatus: Status.ERROR,
        errorMessage: payload.errorMessage,
      };
    default:
      return state;
  }
};
