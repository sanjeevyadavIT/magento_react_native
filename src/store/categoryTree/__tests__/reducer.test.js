import categoryTreeReducer, { INITIAL_STATE } from '../reducer';
import { MAGENTO } from '../../../constants';

describe('category tree', () => {
  test('should return the initial state', () => {
    // Exercise
    const newState = categoryTreeReducer(undefined, {});

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle catgeory tree success', () => {
    // Setup
    const action = {
      type: MAGENTO.CATEGORY_TREE_SUCCESS,
      payload: {
        categoryTree: {
          children_data: [],
          id: 2,
          is_active: true,
          level: 1,
          name: 'Default Category',
          parent_id: 1,
          position: 1,
          product_count: 1181,
        }
      }
    };

    // Exercise
    const newState = categoryTreeReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle catgeory tree failure', () => {
    // Setup
    const action = {
      type: MAGENTO.CATEGORY_TREE_FAILURE,
      payload: {
        errorMessage: 'Unable to fetch category tree',
      }
    };

    // Exercise
    const newState = categoryTreeReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });
});
