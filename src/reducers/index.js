import { combineReducers } from 'redux';
import CategoryTreeReducer from './CategoryTreeReducer';
import CategoryReducer from './CategoryReducer';
import ProductReducer from './ProductReducer';
import SearchReducer from './SearchReducer';
import {
  CATEGORY_TREE,
  CATEGORY,
  PRODUCT,
  SEARCH,
} from './types';

export default combineReducers({
  [CATEGORY_TREE]: CategoryTreeReducer,
  [CATEGORY]: CategoryReducer,
  [PRODUCT]: ProductReducer,
  [SEARCH]: SearchReducer,
});
