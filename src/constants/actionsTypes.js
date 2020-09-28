const REQUEST = 'REQUEST';
const LOADING = 'LOADING';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

const suffixTypes = [REQUEST, LOADING, SUCCESS, FAILURE];

function createRequestTypes(prefix = '', bases, suffixes = suffixTypes) {
  const req = {};
  bases.forEach(base => {
    suffixes.forEach(suffix => {
      req[`${base}_${suffix}`] = `${prefix}_${base}_${suffix}`;
    });
  });
  return req;
}

// Events related to Magento REST API
export const MAGENTO = createRequestTypes(
  'MAGENTO',
  [
    'INIT_APP', // Configure magento with admin credentials, access token and base url
    'CURRENCY', // Default currency, currency symbol, exchange rates
    'HOME_DATA', // Fetch HomeBanner and featured products for home page
    'FEATURED_CATEGORY_PRODUCTS', // Fetch featured categories for home page
    'CATEGORY_TREE', // Fetch category tree
    'PRODUCT_DETAIL', // fetch details of product given it's sku
    'GET_PRODUCT_MEDIA', // If product detail doesn't contain images, use this
    /**
     * ==========================================
     * =================== @ ====================
     * ==========================================
     */
    'CURRENT_USER', // Fetch details of current logged in user
    'GET_ORDERS', // Fetch order placed by current customer for page = 1
    'GET_MORE_ORDERS', // Fetch order placed by current customer for page > 1
    'SEARCH_PRODUCTS', // Load search products
    'MORE_SEARCH_PRODUCTS', // pagination in search
    'CREATE_QUOTE_ID', // Create new quote id for cart
    'CUSTOMER_CART', // Get cart of logged in user
    'REMOVE_ITEM_FROM_CART', // Remove an item from a cart
    'COUNTRIES', // Get all available countries along with their state
    'ADD_CART_BILLING_ADDRESS', // Add new billing address for a cart
    'GET_SHIPPING_METHOD', // Get shipping method
    'ADD_CART_SHIPPING_INFO', // Send billing, shipping, shipping method
    'PLACE_CART_ORDER', // Place cart order
  ],
  suffixTypes,
);

export const USER_LOGGED_IN_STATUS = 'IS_USER_LOGGED_IN';
export const SET_NEW_CATEGORY = 'SET_NEW_CATEGORY';
export const RESET_CHECKOUT_STATE = 'RESET_CHECKOUT_STATE'; // Reset entire checkout reducer
export const RESET_CHECKOUT_ADDRESS_STATE = 'RESET_CHECKOUT_ADDRESS_STATE';
export const RESET_SHIPPING_STATE = 'RESET_SHIPPING_STATE';
export const RESET_PAYMENT_STATE = 'RESET_PAYMENT_STATE';
export const CHANGE_CURRENCY = 'CHANGE_CURRENCY';
// ---
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const ACTION_USER_LOGOUT = 'USER_LOGOUT';
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';
