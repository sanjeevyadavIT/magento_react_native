import { MAGENTO } from '../actions/actionsTypes';

const INITIAL_STATE = {
  loading: false,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MAGENTO.CATEGORY_TREE_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case MAGENTO.CATEGORY_TREE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        ...action.payload,
      };
    case MAGENTO.CATEGORY_TREE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
