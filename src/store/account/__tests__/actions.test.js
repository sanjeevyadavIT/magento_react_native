import {
  logout,
  getOrderList,
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
});
