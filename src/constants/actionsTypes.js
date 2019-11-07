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
  'CURRENCY', // Default currency, currency symbol, exchange rates
  'HOME_DATA', // Fetch HomeBanner and featured products for home page
  'FEATURED_CATEGORY_PRODUCTS', // Fetch featured categories for home page
  'HOME_UPDATE_CONF_PRODUCT', // For each configurable product in featured category, fetch it's children, to calculate price
  'CATEGORY_TREE', // Fetch category tree
  /**
   * ======================================================
   * ===== {@link ProductDetailPage} related actions ======
   * ======================================================
   */
  'CONF_OPTIONS', // Product is configurable type, fetch all options
  'PRODUCT_MEDIA', // Fetch images related to products
  'CONFIGURABLE_CHILDREN', // Fetch child products of configurable product
  'ADD_TO_CART', // Add item to cart
  /**
   * ==========================================
   * =================== @ ====================
   * ==========================================
   */
  'SIGN_IN', // Sign in already existing user
  'SIGN_UP', // Create new user account
  'CURRENT_USER', // Fetch details of current logged in user
  'GET_ORDERS', // Fetch all order placed by current customer
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
  'ORDER_DETAIL', // Fetch order detail, using orderId
  'RESET_PASSWORD'
], suffixTypes);

// Events related to UI interaction
export const UI = createRequestTypes('UI', [
  /**
   * ======================================================
   * ===== {@link ProductDetailPage} related actions ======
   * ======================================================
   */
  'OPEN_SELECTED_PRODUCT', // Fetch details regarding current selected product for viewing
  'CHANGE_PRODUCT_OPTIONS', // Set options of `configurable` type product from picker into store
], suffixTypes);

export const ACTION_USER_LOGOUT = 'USER_LOGOUT';
export const RESET_ADD_TO_CART_STATE = 'RESET_ADD_TO_CART_STATE';
export const USER_LOGGED_IN_STATUS = 'IS_USER_LOGGED_IN';
export const RESET_AUTH_STATE = 'RESET_AUTH_STATE';
export const SET_NEW_CATEGORY = 'SET_NEW_CATEGORY';
export const RESET_CHECKOUT_STATE = 'RESET_CHECKOUT_STATE'; // Reset entire checkout reducer
export const RESET_CHECKOUT_ADDRESS_STATE = 'RESET_CHECKOUT_ADDRESS_STATE';
export const RESET_SHIPPING_STATE = 'RESET_SHIPPING_STATE';
export const RESET_PAYMENT_STATE = 'RESET_PAYMENT_STATE';
