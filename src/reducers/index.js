import { combineReducers } from 'redux';
import CategoryListReducer from './categoryList';
import HomeReducer from './home';
import CategoryTreeReducer from './categoryTree';
import ProductReducer from './product';
import SearchReducer from './search';
import AccountReducer from './account';
import LoginReducer from './login';
import SignupReducer from './signup';
import {
  HOME,
  CATEGORY_TREE,
  CATEGORY_LIST,
  PRODUCT,
  SEARCH,
  ACCOUNT,
  LOGIN,
  SIGNUP,
} from './types';

export default combineReducers({
  [HOME]: HomeReducer,
  [CATEGORY_TREE]: CategoryTreeReducer,
  [CATEGORY_LIST]: CategoryListReducer,
  [PRODUCT]: ProductReducer,
  [SEARCH]: SearchReducer,
  [ACCOUNT]: AccountReducer,
  [LOGIN]: LoginReducer,
  [SIGNUP]: SignupReducer,
});
