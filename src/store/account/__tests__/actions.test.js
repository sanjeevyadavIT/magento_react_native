import {
  logout,
  getOrderList,
  addAccountAddress,
  resetAddressStatus,
  getCurrentCustomer,
  getOrderedProductInfo,
} from '../actions';

describe('account actions', () => {
  test('getCurrentCustomer()', () => {
    // Exercise
    const result = getCurrentCustomer();

    // Verify
    expect(result).toMatchSnapshot();
  });

  test('logout()', () => {
    // Exercise
    const result = logout();

    // Verify
    expect(result).toMatchSnapshot();
  });

  test('getOrderList()', () => {
    // Setup
    const customerId = 2;

    // Exercise
    const result = getOrderList(customerId);

    // Verify
    expect(result).toMatchSnapshot();
  });

  test('getOrderedProductInfo()', () => {
    // Setup
    const sku = 'WH02-S';

    // Exercise
    const result = getOrderedProductInfo(sku);

    // Verify
    expect(result).toMatchSnapshot();
  });

  /**
   * Note: Any data can be modified inside in customerData
   * and sent to action, and this test won't reflect it.
   */
  test('addAccountAddress()', () => {
    // Setup
    const customerId = 51;
    const customerData = {
      customer: {
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
      }
    };

    // Exercise
    const result = addAccountAddress(customerId, customerData);

    // Verify
    expect(result).toMatchSnapshot();
  });

  test('resetAddressStatus()', () => {
    // Exercise
    const result = resetAddressStatus();

    // Verify
    expect(result).toMatchSnapshot();
  });
});
