import { combineReducers } from 'redux';
import CategoryTreeReducer from './CategoryTreeReducer';
import CategoryReducer from './CategoryReducer';
import ProductReducer from './ProductReducer';
import {
  CATEGORY_TREE,
  CATEGORY,
  PRODUCT,
} from './types';

export default combineReducers({
  [CATEGORY_TREE]: CategoryTreeReducer,
  [CATEGORY]: CategoryReducer,
  [PRODUCT]: ProductReducer,
});
