import { MAGENTO } from '../../constants';
import Status from '../../magento/Status';

const INITIAL_STATE = {
  status: Status.DEFAULT,
  countryStatus: Status.DEFAULT,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case MAGENTO.INIT_APP_LOADING:
      return {
        ...state,
        status: Status.LOADING,
      };
    case MAGENTO.INIT_APP_SUCCESS:
      return {
        ...state,
        status: Status.SUCCESS,
        storeConfig: payload.storeConfig[0],
      };
    case MAGENTO.INIT_APP_FAILURE:
      return {
        ...state,
        status: Status.ERROR,
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
