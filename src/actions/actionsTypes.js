const REQUEST = 'REQUEST';
const LOADING = 'LOADING';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

const suffixTypes = [REQUEST, LOADING, SUCCESS, FAILURE];

function createRequestTypes(prefix = '', bases, suffixes = suffixTypes) {
  const req = {};
  bases.forEach((base) => {
    suffixes.forEach((suffix) => {
      req[`${base}_${suffix}`] = `${prefix}_${base}_${suffix}`;
    });
  });
  return req;
}

// Events related to Magento REST API
export const MAGENTO = createRequestTypes('MAGENTO', [
  'INIT_APP', // Configure magento with admin credentials, access token and base url
  'HOME_DATA', // Fetch HomeBanner and featured products for home page
  'CATEGORY_TREE', // Fetch category tree
  'CONF_OPTIONS', // Product is configurable type, fetch all options
  'PRODUCT_MEDIA', // Fetch images related to products
  'AUTH', // Login
  'SIGNUP', // Create new user account
  'CURRENT_USER', // Fetch details of current logged in user
  'CATEGORY_PRODUCTS', // Fetch all products in a category
  'MORE_CATEGORY_PRODUCTS', // Pagination in category list
  'SEARCH_PRODUCTS', // Load search products
  'MORE_SEARCH_PRODUCTS', // pagination in search
  'CUSTOMER_CART', // Get cart of logged in user
  'CART_ITEM_PRODUCT', // fetch details of items present in cart
  'REMOVE_ITEM_FROM_CART', // Remove an item from a cart
], suffixTypes);

export const UI_SET_CURRENT_PRODUCT = 'SET_CURRENT_PRODUCT';
export const MAGENTO_SAVE_PRODUCT_ATTRIBUTE_OPTIONS = 'MAGENTO_SAVE_PRODUCT_ATTRIBUTE_OPTIONS';
export const UI_PRODUCT_UPDATE_OPTIONS = 'UI_PRODUCT_UPDATE_OPTIONS';
