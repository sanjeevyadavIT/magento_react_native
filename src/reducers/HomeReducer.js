import {
  MAGENTO_SET_HOME_DATA,
  MAGENTO_NO_HOME_DATA,
  MAGENTO_ERROR_HOME_DATA,
} from '../actions/types';

const initialState = {
  text: null,
  loading: true,
  cmsBlockConfigured: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MAGENTO_NO_HOME_DATA:
      return {
        ...state,
        loading: false,
        cmsBlockConfigured: false,
      };
    case MAGENTO_SET_HOME_DATA:
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    case MAGENTO_ERROR_HOME_DATA:
      return {
        ...state,
        loading: false,
        cmsBlockConfigured: false,
      };
    default:
      return state;
  }
}
