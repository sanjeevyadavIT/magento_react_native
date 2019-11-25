import {
  addToCart,
  getProductMedia,
  setCurrentProduct,
  resetAddToCartState,
  getConfigurableChildren,
  getConfigurableProductOptions,
} from '../actions';

describe('product actions', () => {
  test('setCurrentProduct()', () => {
    // Setup
    const productType = 'simple';
    const sku = 'WH02-S';
    const children = null;

    // Exercise
    const result = setCurrentProduct(productType, sku, children);

    // Verify
    expect(result).toMatchSnapshot();
  });

  test('getConfigurableProductOptions()', () => {
    // Setup
    const sku = 'WH02-S';

    // Exercise
    const result = getConfigurableProductOptions(sku);

    // Verify
    expect(result).toMatchSnapshot();
  });

  test('getConfigurableChildren()', () => {
    // Setup
    const sku = 'WH02-S';

    // Exercise
    const result = getConfigurableChildren(sku);

    // Verify
    expect(result).toMatchSnapshot();
  });

  test('getProductMedia()', () => {
    // Setup
    const sku = 'WH02-S';

    // Exercise
    const result = getProductMedia(sku);

    // Verify
    expect(result).toMatchSnapshot();
  });

  test('addToCart()', () => {
    // Setup
    const cartItem = {
      sku: 'WH02-S',
      qty: 1,
      quote_id: 23,
    };

    // Exercise
    const result = addToCart(cartItem);

    // Verify
    expect(result).toMatchSnapshot();
  });

  test('resetAddToCartState()', () => {
    // Setup
    const sku = 'WH02-S';

    // Exercise
    const result = resetAddToCartState(sku);

    // Verify
    expect(result).toMatchSnapshot();
  });
});
