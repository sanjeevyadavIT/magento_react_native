import {
  MAGENTO,
} from '../actions/actionsTypes';

const initialState = {
  loading: false,
  error: null,
  cmsBlockConfigured: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MAGENTO.INIT_APP_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case MAGENTO.INIT_APP_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    case MAGENTO.INIT_APP_FAILURE:
    case MAGENTO.HOME_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case MAGENTO.HOME_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case MAGENTO.HOME_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload,
      };

    default:
      return state;
  }
};
