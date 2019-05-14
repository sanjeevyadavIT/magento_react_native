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
  'FEATURED_CATEGORY_PRODUCTS', // Fetch featured categories for home page
  'HOME_UPDATE_CONF_PRODUCT', // For each configurable product in featured category, fetch it's children, to calculate price
  'CATEGORY_TREE', // Fetch category tree
  'CONF_OPTIONS', // Product is configurable type, fetch all options
  'PRODUCT_MEDIA', // Fetch images related to products
  'ADD_TO_CART', // Add item to cart
  'AUTH', // Login
  'SIGNUP', // Create new user account
  'CURRENT_USER', // Fetch details of current logged in user
  'CATEGORY_PRODUCTS', // Fetch all products in a category
  'CATEGORY_UPDATE_CONF_PRODUCT', // Fetch price of configurable product in category list
  'MORE_CATEGORY_PRODUCTS', // Pagination in category list
  'SEARCH_PRODUCTS', // Load search products
  'MORE_SEARCH_PRODUCTS', // pagination in search
  'CREATE_QUOTE_ID', // Create new quote id for cart
  'CUSTOMER_CART', // Get cart of logged in user
  'CART_ITEM_PRODUCT', // fetch details of items present in cart
  'REMOVE_ITEM_FROM_CART', // Remove an item from a cart
  'COUNTRIES', // Get all available countries along with their state
  'ADD_CART_BILLING_ADDRESS', // Add new billing address for a cart
  'GET_SHIPPING_METHOD', // Get shipping method
  'ADD_CART_SHIPPING_INFO', // Send billing, shipping, shipping method
  'PLACE_CART_ORDER', // Place cart order
], suffixTypes);

export const OPEN_SELECTED_PRODUCT = 'OPEN_SELECTED_PRODUCT';
export const MAGENTO_SAVE_PRODUCT_ATTRIBUTE_OPTIONS = 'MAGENTO_SAVE_PRODUCT_ATTRIBUTE_OPTIONS';
export const UI_PRODUCT_UPDATE_OPTIONS = 'UI_PRODUCT_UPDATE_OPTIONS';
export const ACTION_USER_LOGOUT = 'USER_LOGOUT';
export const RESET_SIGNUP_STATE = 'RESET_SIGNUP_STATE';
export const SET_NEW_CATEGORY = 'SET_NEW_CATEGORY';
