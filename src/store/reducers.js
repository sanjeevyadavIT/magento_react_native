import { combineReducers } from 'redux';
import accountReducer from './account/accountReducer';
import cartReducer from './cart/cartReducer';
import appReducer from './app/appReducer';
import homeReducer from './home/homeReducer';
import categoryTreeReducer from './categoryTree/categoryTreeReducer';
import checkoutReducer from './checkout/checkoutReducer';
import productReducer from './product/productReducer';
import searchReducer from './search/searchReducer';

export default combineReducers({
  magento: appReducer,
  home: homeReducer,
  categoryTree: categoryTreeReducer,
  account: accountReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  product: productReducer,
  search: searchReducer,
});
