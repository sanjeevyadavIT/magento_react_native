import { runSaga } from 'redux-saga';
import AsyncStorage from '@react-native-community/async-storage';
import { magento, CUSTOMER_TOKEN } from '../../../magento';
import { magentoOptions } from '../../../../config/magento';
import {
  getCurrentUser,
  addAccountAddress,
  getOrdersForCustomer,
  getOrderedProductInfo,
  clearCustomerAccessToken
} from '../sagas';
import { MAGENTO } from '../../../constants';

jest.mock('@react-native-community/async-storage', () => ({
  removeItem: jest.fn(),
}));

jest.mock('react-native-localize', () => ({
  findBestAvailableLanguage: jest.fn(),
}));

describe('account sagas', () => {
  beforeAll(() => {
    magento.setOptions(magentoOptions);
  });

  describe('getCurrentUser()', () => {
    const response = {
      success: {
        id: 12,
        firstname: 'sanjeev',
        lastname: 'yadav',
      },
      error: {
        message: 'Unable to get current customer data'
      }
    };

    beforeAll(() => {
      magento.customer.getCurrentCustomer = jest.fn()
        /** Success Flow mock */
        .mockImplementationOnce(() => new Promise((resolve, reject) => {
          resolve(response.success);
        }))
        /** Error Flow mock */
        .mockImplementationOnce(() => new Promise((resolve, reject) => {
          reject(response.error);
        }));
    });

    test('should handle success flow', async () => {
      // Setup
      const dispatched = [];

      // Exercise
      await runSaga({
        dispatch: action => dispatched.push(action),
      }, getCurrentUser);

      // Verify
      expect(magento.customer.getCurrentCustomer.mock.calls).toEqual([
        []
      ]);
      expect(dispatched).toEqual([
        {
          type: MAGENTO.CURRENT_USER_LOADING
        },
        {
          type: MAGENTO.CURRENT_USER_SUCCESS,
          payload: {
            customer: response.success,
          }
        }
      ]);
    });

    test('should handle error flow', async () => {
      // Setup
      const dispatched = [];

      // Exercise
      await runSaga({
        dispatch: action => dispatched.push(action),
      }, getCurrentUser);

      // Verify
      expect(magento.customer.getCurrentCustomer.mock.calls).toEqual([
        [],
        [],
      ]);
      expect(dispatched).toEqual([
        {
          type: MAGENTO.CURRENT_USER_LOADING
        },
        {
          type: MAGENTO.CURRENT_USER_FAILURE,
          payload: {
            errorMessage: response.error.message,
          }
        }
      ]);
    });
  });

  describe('clearCustomerAccessToken()', () => {
    test('clear customer token', async () => {
      // Setup
      magento.setCustomerToken('xyz');

      // Exercise
      await runSaga({}, clearCustomerAccessToken);

      // Verify
      expect(magento.customerToken).toBeNull();
      expect(AsyncStorage.removeItem.mock.calls).toEqual([
        [CUSTOMER_TOKEN]
      ]);
    });
  });

  describe('getOrdersForCustomer()', () => {
    const customerId = 23;
    const action = {
      payload: {
        customerId,
      }
    };
    const response = {
      success: {
        items: [
          {
            quote_id: 66,
            items: [
              {
                product_type: 'simple',
                price: 0,
                row_total: 0,
                name: 'Orestes Fitness Short-33-Blue',
                parent_item: {
                  price: 2498.65,
                  row_total: 2498.65,
                  name: 'Orestes Fitness Short',
                },
              },
              {
                product_type: 'configurable',
                price: 2498.65,
                row_weight: 0,
                name: 'Orestes Fitness Short',
              }
            ]
          },
        ],
        total_count: 1,
      },
      error: {
        message: 'Unable to get customer order list'
      }
    };

    beforeAll(() => {
      magento.admin.getOrderList = jest.fn()
        /** Success Flow mock */
        .mockImplementationOnce(customerId => new Promise((resolve, reject) => {
          resolve(response.success);
        }))
        /** Error Flow mock */
        .mockImplementationOnce(customerId => new Promise((resolve, reject) => {
          reject(response.error);
        }));
    });

    test('should handle success flow', async () => {
      // Setup
      const dispatched = [];
      const expectedResult = [
        {
          quote_id: 66,
          items: [
            {
              product_type: 'simple',
              price: 2498.65,
              row_total: 2498.65,
              name: 'Orestes Fitness Short',
              parent_item: {
                price: 2498.65,
                row_total: 2498.65,
                name: 'Orestes Fitness Short',
              },
            }
          ]
        },
      ];

      // Exercise
      await runSaga({
        dispatch: _action => dispatched.push(_action),
      }, getOrdersForCustomer, action);

      // Verify
      expect(magento.admin.getOrderList.mock.calls).toEqual([
        [customerId]
      ]);
      expect(dispatched).toEqual([
        {
          type: MAGENTO.GET_ORDERS_LOADING
        },
        {
          type: MAGENTO.GET_ORDERS_SUCCESS,
          payload: {
            orders: expectedResult,
          }
        }
      ]);
    });

    test('should handle error flow', async () => {
      // Setup
      const dispatched = [];

      // Exercise
      await runSaga({
        dispatch: _action => dispatched.push(_action),
      }, getOrdersForCustomer, action);

      // Verify
      expect(magento.admin.getOrderList.mock.calls).toEqual([
        [customerId],
        [customerId]
      ]);
      expect(dispatched).toEqual([
        {
          type: MAGENTO.GET_ORDERS_LOADING
        },
        {
          type: MAGENTO.GET_ORDERS_FAILURE,
          payload: {
            errorMessage: response.error.message,
          }
        }
      ]);
    });
  });

  describe('getOrderedProductInfo()', () => {
    const sku = 'MSH08-33-Blue';
    const action = {
      payload: {
        sku,
      }
    };
    const response = {
      success: {
        attribute_set_id: 10,
        created_at: '2019-03-11 13:20:26',
        custom_attributes: [{}, {}, {}],
        extension_attributes: { stock_item: {} },
        id: 973,
        media_gallery_entries: [{
          disabled: false,
          file: '/m/s/msh08-blue_main.jpg',
          id: 1646,
          label: '',
          media_type: 'image',
          position: 1,
          types: ['image', 'small_image', 'thumbnail'],
        }],
        name: 'Orestes Fitness Short-33-Blue',
        options: [],
        price: 35,
        product_links: [],
        sku: 'MSH08-33-Blue',
        status: 1,
        tier_prices: [],
        type_id: 'simple',
        updated_at: '2019-03-11 13:20:26',
        visibility: 1,
        weight: 1,
      },
      error: {
        message: 'Unable to load product detail info'
      }
    };

    beforeAll(() => {
      magento.admin.getProductBySku = jest.fn()
        /** Success Flow mock */
        .mockImplementationOnce(sku => new Promise((resolve, reject) => {
          resolve(response.success);
        }))
        /** Error Flow mock */
        .mockImplementationOnce(sku => new Promise((resolve, reject) => {
          reject(response.error);
        }));
    });

    test('should handle success flow', async () => {
      // Setup
      const dispatched = [];

      // Exercise
      await runSaga({
        dispatch: _action => dispatched.push(_action),
      }, getOrderedProductInfo, action);

      // Verify
      expect(magento.admin.getProductBySku.mock.calls).toEqual([
        [sku]
      ]);
      expect(dispatched).toEqual([
        {
          type: MAGENTO.GET_ORDERED_PRODUCT_INFO_SUCCESS,
          payload: {
            sku,
            product: response.success,
          }
        }
      ]);
    });

    test('should handle error flow', async () => {
      // Setup
      const dispatched = [];

      // Exercise
      await runSaga({
        dispatch: _action => dispatched.push(_action),
      }, getOrderedProductInfo, action);

      // Verify
      expect(magento.admin.getProductBySku.mock.calls).toEqual([
        [sku],
        [sku]
      ]);
      expect(dispatched).toEqual([
        {
          type: MAGENTO.GET_ORDERED_PRODUCT_INFO_FAILURE,
          payload: {
            errorMessage: response.error.message,
          }
        }
      ]);
    });
  });

  describe('addAccountAddress()', () => {
    const customerId = 23;
    const customer = {
      addresses: [{
        city: 'dark valley',
        country_id: 'US',
        firstname: 'Alex',
        lastname: 'Newman',
        postcode: '1234567',
        region: 'Arizona',
        region_id: '4',
        street: ['magical avenue'],
        telephone: '1234567890',
      }],
      created_at: '2019-11-08 09:57:38',
      created_in: 'Default Store View',
      disable_auto_group_change: 0,
      email: 'Test3@gmail.com',
      firstname: 'Alex',
      group_id: 1,
      id: 51,
      lastname: 'Newman',
      store_id: 1,
      updated_at: '2019-12-02 10:03:26',
      website_id: 1,
    };
    const action = {
      payload: {
        customerId,
        customerData: {
          customer,
        },
      }
    };
    const response = {
      success: customer,
      error: {
        message: 'Unable to save address to the account'
      }
    };

    beforeAll(() => {
      magento.admin.updateCustomerData = jest.fn()
        /** Success Flow mock */
        .mockImplementationOnce((customerId, customerData) => new Promise((resolve, reject) => {
          resolve(response.success);
        }))
        /** Error Flow mock */
        .mockImplementationOnce((customerId, customerData) => new Promise((resolve, reject) => {
          reject(response.error);
        }));
    });

    test('should handle success flow', async () => {
      // Setup
      const dispatched = [];

      // Exercise
      await runSaga({
        dispatch: _action => dispatched.push(_action),
      }, addAccountAddress, action);

      // Verify
      expect(magento.admin.updateCustomerData.mock.calls).toEqual([
        [customerId, { customer }]
      ]);
      expect(dispatched).toEqual([
        {
          type: MAGENTO.ADD_ACCOUNT_ADDRESS_LOADING,
        },
        {
          type: MAGENTO.ADD_ACCOUNT_ADDRESS_SUCCESS,
          payload: {
            customer,
          }
        },
      ]);
    });

    test('should handle error flow', async () => {
      // Setup
      const dispatched = [];

      // Exercise
      await runSaga({
        dispatch: _action => dispatched.push(_action),
      }, addAccountAddress, action);

      // Verify
      expect(magento.admin.updateCustomerData.mock.calls).toEqual([
        [customerId, { customer }],
        [customerId, { customer }]
      ]);
      expect(dispatched).toEqual([
        {
          type: MAGENTO.ADD_ACCOUNT_ADDRESS_LOADING,
        },
        {
          type: MAGENTO.ADD_ACCOUNT_ADDRESS_FAILURE,
          payload: {
            errorMessage: response.error.message,
          }
        }
      ]);
    });
  });
});
