import { combineReducers } from 'redux';
import CategoryTreeReducer from './CategoryTreeReducer';
import CategoryReducer from './CategoryReducer';
import ProductReducer from './ProductReducer';
import SearchReducer from './SearchReducer';
import HomeReducer from './HomeReducer';
import {
  HOME,
  CATEGORY_TREE,
  CATEGORY,
  PRODUCT,
  SEARCH,
} from './types';

export default combineReducers({
  [HOME]: HomeReducer,
  [CATEGORY_TREE]: CategoryTreeReducer,
  [CATEGORY]: CategoryReducer,
  [PRODUCT]: ProductReducer,
  [SEARCH]: SearchReducer,
});
