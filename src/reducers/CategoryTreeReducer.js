import {
    MAGENTO_SET_CATEGORY_TREE,
    MAGENTO_ERROR_CATEGORY_TREE,
} from '../actions/types';

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case MAGENTO_SET_CATEGORY_TREE:
            return action.payload;
        case MAGENTO_ERROR_CATEGORY_TREE:
            //TODO: set proper code to handle error
        default:
            return state;
    }
}