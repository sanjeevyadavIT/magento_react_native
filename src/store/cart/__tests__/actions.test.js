import {
  createQuoteId,
  getCustomerCart,
  getCartItemProduct,
  removeItemFromCart,
} from '../actions';

describe('cart actions', () => {
  test('createQuoteId()', () => {
    // Exercise
    const result = createQuoteId();

    // Verify
    expect(result).toMatchSnapshot();
  });

  test('getCustomerCart()', () => {
    // Exercise
    const result = getCustomerCart();

    // Verify
    expect(result).toMatchSnapshot();
  });

  test('getCartItemProduct()', () => {
    // Setup
    const sku = 'WH02-S';

    // Exercise
    const result = getCartItemProduct(sku);

    // Verify
    expect(result).toMatchSnapshot();
  });

  test('removeItemFromCart()', () => {
    // Setup
    const itemId = 'WH02-S';

    // Exercise
    const result = removeItemFromCart(itemId);

    // Verify
    expect(result).toMatchSnapshot();
  });
});
