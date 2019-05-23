import { MAGENTO } from '../../constants/actionsTypes';
import Status from '../../magento/Status';

const INITIAL_STATE = {
  status: Status.LOADING,
  errorMessage: '',
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case MAGENTO.CATEGORY_TREE_SUCCESS:
      return {
        ...state,
        status: Status.SUCCESS,
        ...payload.categoryTree,
      };
    case MAGENTO.CATEGORY_TREE_FAILURE:
      return {
        ...state,
        status: Status.ERROR,
        errorMessage: payload.errorMessage
      };
    default:
      return state;
  }
};
