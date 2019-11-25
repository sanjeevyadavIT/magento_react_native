import {
  getFeaturedProducts,
  getHomeConfigurableProductOptions,
} from '../actions';

describe('home actions', () => {
  test('getFeaturedProducts()', () => {
    // Setup
    const categoryId = '2';

    // Exercise
    const result = getFeaturedProducts(categoryId);

    // Verify
    expect(result).toMatchSnapshot();
  });

  test('getHomeConfigurableProductOptions()', () => {
    // Setup
    const sku = 'WH02-S';

    // Exercise
    const result = getHomeConfigurableProductOptions(sku);

    // Verify
    expect(result).toMatchSnapshot();
  });
});
