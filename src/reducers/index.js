import { combineReducers } from 'redux';
import CategoryTreeReducer from './CategoryTreeReducer';
import CategoryReducer from './CategoryReducer';
import ProductReducer from './ProductReducer';
import SearchReducer from './SearchReducer';
import HomeReducer from './HomeReducer';
import CustomerAuthReducer from './CustomerAuthReducer';
import {
  HOME,
  CATEGORY_TREE,
  CATEGORY,
  PRODUCT,
  SEARCH,
  CUSTOMER_AUTH,
} from './types';

export default combineReducers({
  [HOME]: HomeReducer,
  [CATEGORY_TREE]: CategoryTreeReducer,
  [CATEGORY]: CategoryReducer,
  [PRODUCT]: ProductReducer,
  [SEARCH]: SearchReducer,
  [CUSTOMER_AUTH]: CustomerAuthReducer,
});
