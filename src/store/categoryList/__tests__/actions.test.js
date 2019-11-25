import {
  setNewCategory,
  getCategoryProducts,
  getCategoryConfigurableProductOptions,
} from '../actions';

describe('categoryList actions', () => {
  test('setNewCategory()', () => {
    // Setup
    const categoryId = '23';

    // Exercise
    const result = setNewCategory(categoryId);

    // Verify
    expect(result).toMatchSnapshot();
  });

  test('getCategoryProducts()', () => {
    // Setup
    const categoryId = '23';
    const offset = 20;
    const sortOrder = '';

    // Exercise
    const result = getCategoryProducts(categoryId, offset, sortOrder);

    // Verify
    expect(result).toMatchSnapshot();
  });

  test('getCategoryConfigurableProductOptions()', () => {
    // Setup
    const sku = 'WH02-S';

    // Exercise
    const result = getCategoryConfigurableProductOptions(sku);

    // Verify
    expect(result).toMatchSnapshot();
  });
});
