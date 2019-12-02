import {
  MAGENTO,
  ACTION_USER_LOGOUT,
  RESET_ADDRESS_STATUS,
  USER_LOGGED_IN_STATUS,
} from '../../../constants';
import AccountReducer, { initialState } from '../reducer';
import Status from '../../../magento/Status';

describe('account reducer', () => {
  const customerData = {
    created_at: '2019-11-08 09:57:38',
    created_in: 'Default Store View',
    disable_auto_group_change: 0,
    email: 'Test3@gmail.com',
    firstname: 'Alex',
    group_id: 1,
    id: 51,
    lastname: 'Newman',
    store_id: 1,
    updated_at: '2019-11-28 10:15:49',
    website_id: 1,
    addresses: [
      {
        region: 'Arizona',
        region_id: '4',
        country_id: 'US',
        street: [
          'magical avenue'
        ],
        telephone: '123456789',
        postcode: '123456',
        city: 'dark valley',
        firstname: 'Alex',
        lastname: 'Newman',
      },
    ]
  };

  test('should return the initial state', () => {
    // Exercise
    const newState = AccountReducer(undefined, {});

    // verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle current user loading', () => {
    // Setup
    const action = {
      type: MAGENTO.CURRENT_USER_LOADING
    };

    // Exercise
    const newState = AccountReducer(initialState, action);

    // verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle current user success', () => {
    // Setup
    const action = {
      type: MAGENTO.CURRENT_USER_SUCCESS,
      payload: {
        customer: customerData,
      }
    };

    // Exercise
    const newState = AccountReducer(initialState, action);

    // verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle current user failure', () => {
    // Setup
    const action = {
      type: MAGENTO.CURRENT_USER_FAILURE,
      payload: {
        errorMessage: 'Unable to acess customer error'
      }
    };

    // Exercise
    const newState = AccountReducer(initialState, action);

    // verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle add account address loading', () => {
    // Setup
    const action = {
      type: MAGENTO.ADD_ACCOUNT_ADDRESS_LOADING,
    };

    // Exercise
    const newState = AccountReducer(initialState, action);

    // verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle add account address success', () => {
    // Setup
    const action = {
      type: MAGENTO.ADD_ACCOUNT_ADDRESS_SUCCESS,
      payload: {
        customer: customerData
      }
    };

    // Exercise
    const newState = AccountReducer(initialState, action);

    // verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle add account address failure', () => {
    // Setup
    const action = {
      type: MAGENTO.ADD_ACCOUNT_ADDRESS_FAILURE,
      payload: {
        errorMessage: 'Unable to add account address.',
      }
    };

    // Exercise
    const newState = AccountReducer(initialState, action);

    // verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle reset address status', () => {
    // Setup
    const action = {
      type: RESET_ADDRESS_STATUS,
    };

    // Exercise
    const newState = AccountReducer(initialState, action);

    // verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle get orders loading', () => {
    // Setup
    const action = {
      type: MAGENTO.GET_ORDERS_LOADING,
    };

    // Exercise
    const newState = AccountReducer(initialState, action);

    // verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle get orders success', () => {
    // Setup
    const action = {
      type: MAGENTO.GET_ORDERS_SUCCESS,
      payload: {
        orders: [
          {
            // This is a dummy order object, not actual
            mockOrderTitle: 'Mock Order Title 1'
          }
        ]
      }
    };

    // Exercise
    const newState = AccountReducer(initialState, action);

    // verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle get orders failure', () => {
    // Setup
    const action = {
      type: MAGENTO.GET_ORDERS_FAILURE,
      payload: {
        errorMessage: 'Unable to get orders.',
      }
    };

    // Exercise
    const newState = AccountReducer(initialState, action);

    // verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle get order product info success', () => {
    // Setup
    const action = {
      type: MAGENTO.GET_ORDERED_PRODUCT_INFO_SUCCESS,
      payload: {
        sku: 'MSH08-33-Blue',
        product: {
          id: 973,
          sku: 'MSH08-33-Blue',
          name: 'Orestes Fitness Short-33-Blue',
          attribute_set_id: 10,
          price: 35,
          status: 1,
          visibility: 1,
          type_id: 'simple',
          created_at: '2019-03-11 13:20:26',
          updated_at: '2019-03-11 13:20:26',
          weight: 1,
          extension_attributes: {
            stock_item: {
              item_id: 973,
              product_id: 973,
              stock_id: 1,
              qty: 96,
              is_in_stock: true,
              is_qty_decimal: false,
              show_default_notification_message: false,
              use_config_min_qty: true,
              min_qty: 0,
              use_config_min_sale_qty: 1,
              min_sale_qty: 1,
              use_config_max_sale_qty: true,
              max_sale_qty: 10000,
              use_config_backorders: true,
              backorders: 0,
              use_config_notify_stock_qty: true,
              notify_stock_qty: 1,
              use_config_qty_increments: true,
              qty_increments: 0,
              use_config_enable_qty_inc: true,
              enable_qty_increments: false,
              use_config_manage_stock: true,
              manage_stock: true,
              low_stock_date: null,
              is_decimal_divided: false,
              stock_status_changed_auto: 0
            }
          },
          product_links: [],
          options: [],
          media_gallery_entries: [
            {
              id: 1646,
              media_type: 'image',
              label: '',
              position: 1,
              disabled: false,
              types: [
                'image',
                'small_image',
                'thumbnail'
              ],
              file: '/m/s/msh08-blue_main.jpg'
            }
          ],
          tier_prices: [],
          custom_attributes: [
            {
              attribute_code: 'description',
              value: '<p>You\'re out of excuses not to run, lift, or play when you own a pair of the Orestes Fitness Short. You won\'t complain about the high-performance polyester wicking fabric, reflective safety trim or seamless built-in comfort brief, either.</p>\n<p>&bull; Black shorts with dark gray accents.<br />&bull; Elasticized waistband with interior drawstring.<br />&bull; Ventilating mesh detailing.<br />&bull; 100% polyester and recycled polyester.<br />&bull; Machine wash cold, tumble dry low.</p>'
            },
            {
              attribute_code: 'image',
              value: '/m/s/msh08-blue_main.jpg'
            },
            {
              attribute_code: 'small_image',
              value: '/m/s/msh08-blue_main.jpg'
            },
            {
              attribute_code: 'thumbnail',
              value: '/m/s/msh08-blue_main.jpg'
            },
            {
              attribute_code: 'color',
              value: '50'
            },
            {
              attribute_code: 'category_ids',
              value: [
                '19',
                '31',
                '2'
              ]
            },
            {
              attribute_code: 'options_container',
              value: 'container2'
            },
            {
              attribute_code: 'required_options',
              value: '0'
            },
            {
              attribute_code: 'has_options',
              value: '0'
            },
            {
              attribute_code: 'msrp_display_actual_price_type',
              value: '0'
            },
            {
              attribute_code: 'url_key',
              value: 'orestes-fitness-short-33-blue'
            },
            {
              attribute_code: 'tax_class_id',
              value: '2'
            },
            {
              attribute_code: 'size',
              value: '177'
            }
          ]
        }
      }
    };

    // Exercise
    const newState = AccountReducer(initialState, action);

    // verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle user logged in status', () => {
    // Setup
    const action = {
      type: USER_LOGGED_IN_STATUS,
      payload: {
        status: Status.SUCCESS,
      }
    };

    // Exercise
    const newState = AccountReducer(initialState, action);

    // verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle action user logout', () => {
    // Setup
    const action = {
      type: ACTION_USER_LOGOUT,
    };

    // Exercise
    const newState = AccountReducer(initialState, action);

    // verify
    expect(newState).toMatchSnapshot();
  });
});
