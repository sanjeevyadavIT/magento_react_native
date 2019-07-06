import { combineReducers } from 'redux';
import magentoReducer from './magento/reducer';
import homeReducer from './home/reducer';
import categoryTreeReducer from './categoryTree/reducer';
import authReducer from './auth/reducer';
import accountReducer from './account/reducer';
import cartReducer from './cart/reducer';
import categoryListReducer from './categoryList/reducer';
import checkoutReducer from './checkout/reducer';
import productReducer from './product/reducer';
import searchReducer from './search/reducer';

export default combineReducers({
  magento: magentoReducer,
  home: homeReducer,
  categoryTree: categoryTreeReducer,
  auth: authReducer,
  account: accountReducer,
  cart: cartReducer,
  categoryList: categoryListReducer,
  checkout: checkoutReducer,
  product: productReducer,
  search: searchReducer,
});
