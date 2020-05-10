import { combineReducers } from 'redux';
import accountReducer from './account/accountReducer';
import authReducer from './auth/authReducer';
import cartReducer from './cart/cartReducer';
import magentoReducer from './magento/magentoReducer';
import homeReducer from './home/homeReducer';
import categoryTreeReducer from './categoryTree/categoryTreeReducer';
import categoryListReducer from './categoryList/categoryListReducer';
import checkoutReducer from './checkout/checkoutReducer';
import productReducer from './product/productReducer';
import searchReducer from './search/searchReducer';

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
