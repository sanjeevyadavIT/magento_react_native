import {
  getSearchProducts
} from '../actions';

describe('search actions', () => {
  test('getSearchProducts()', () => {
    // Setup
    const searchInput = 'Jacket';
    const offset = 0;
    const sortOrder = '';

    // Exercise
    const result = getSearchProducts(searchInput, offset, sortOrder);

    // Verify
    expect(result).toMatchSnapshot();
  });
});
