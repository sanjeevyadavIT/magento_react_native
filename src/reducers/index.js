import { combineReducers } from 'redux';
import CategoryTreeReducer from './CategoryTreeReducer';
import CategoryReducer from './CategoryReducer';
import ProductReducer from './ProductReducer';
import SearchReducer from './SearchReducer';
import HomeReducer from './HomeReducer';
import LoginReducer from './LoginReducer';
import SignupReducer from './SignupReducer';
import {
  HOME,
  CATEGORY_TREE,
  CATEGORY,
  PRODUCT,
  SEARCH,
  LOGIN,
  SIGNUP,
} from './types';

export default combineReducers({
  [HOME]: HomeReducer,
  [CATEGORY_TREE]: CategoryTreeReducer,
  [CATEGORY]: CategoryReducer,
  [PRODUCT]: ProductReducer,
  [SEARCH]: SearchReducer,
  [LOGIN]: LoginReducer,
  [SIGNUP]: SignupReducer,
});
