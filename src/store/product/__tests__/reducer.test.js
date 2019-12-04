import productReducer, { INITIAL_STATE } from '../reducer';
import {
  MAGENTO,
  UI,
  RESET_ADD_TO_CART_STATE,
} from '../../../constants';
import Status from '../../../magento/Status';

describe('product reducer', () => {
  const sku = 'WH02';

  test('should return the initial state', () => {
    // Exercise
    const newState = productReducer(undefined, {});

    // Verify
    expect(newState).toMatchSnapshot();
  });

  describe('<product detail data>', () => {
    let initialState;

    beforeEach(() => {
      const action = {
        type: UI.OPEN_SELECTED_PRODUCT_REQUEST,
        payload: {
          sku,
          children: [
            {
              sku: 'WH02-XS-Blue'
            }
          ],
        }
      };

      // Exercise
      initialState = productReducer(INITIAL_STATE, action);
    });

    test('should handle open selected product request', () => {
      // Verify
      expect(initialState).toMatchSnapshot();
    });

    test('should handle product media loading', () => {
      // Setup
      const action = {
        type: MAGENTO.PRODUCT_MEDIA_LOADING,
        payload: {
          sku,
        }
      };

      // Exercise
      const newState = productReducer(initialState, action);

      // Verify
      expect(newState).toMatchSnapshot();
    });

    test('should handle product media success', () => {
      // Setup
      const action = {
        type: MAGENTO.PRODUCT_MEDIA_SUCCESS,
        payload: {
          sku,
          medias: [{
            callToAction: '',
            imageTitle: 'First Image',
            imageUrl: '/w/h/wh02-blue_main.jpg',
          }]
        }
      };

      // Exercise
      const newState = productReducer(initialState, action);

      // Verify
      expect(newState).toMatchSnapshot();
    });

    test('should handle product media failure', () => {
      // Setup
      const action = {
        type: MAGENTO.PRODUCT_MEDIA_FAILURE,
        payload: {
          sku,
          errorMessage: 'Unable to fetch images related to product',
        }
      };

      // Exercise
      const newState = productReducer(initialState, action);

      // Verify
      expect(newState).toMatchSnapshot();
    });

    test('should handle configurable chidlren success', () => {
      // Setup
      const action = {
        type: MAGENTO.CONFIGURABLE_CHILDREN_SUCCESS,
        payload: {
          sku,
          children: [
            {
              sku: 'WH02-XS-Blue'
            },
            {
              sku: 'WH02-XS-Green'
            },
            {
              sku: 'WH02-XS-Orange'
            }
          ]
        }
      };
      const product = initialState.current[sku];
      initialState = {
        ...initialState,
        current: {
          ...initialState.current,
          [sku]: {
            ...product,
            children: [],
          }
        }
      };

      // Exercise
      const newState = productReducer(initialState, action);

      // Verify
      expect(newState).toMatchSnapshot();
    });

    test('should handle configurable options loading', () => {
      // Setup
      const action = {
        type: MAGENTO.CONF_OPTIONS_LOADING,
        payload: {
          sku,
        }
      };

      // Exercise
      const newState = productReducer(initialState, action);

      // Verify
      expect(newState).toMatchSnapshot();
    });

    test('should handle configurable options success', () => {
      // Setup
      const action = {
        type: MAGENTO.CONF_OPTIONS_SUCCESS,
        payload: {
          sku,
          options: [
            {
              id: 160,
              attribute_id: '141',
              label: 'Size',
              values: [],
            },
            {
              id: 161,
              attribute_id: '93',
              label: 'Color',
              values: [],
            }
          ],
          attributes: {
            93: { attributeCode: 'color', options: [] },
            141: { attributeCode: 'size', options: [] },
          },
        }
      };

      // Exercise
      const newState = productReducer(initialState, action);

      // Verify
      expect(newState).toMatchSnapshot();
    });

    test('should handle configurable options failure', () => {
      // Setup
      const action = {
        type: MAGENTO.CONF_OPTIONS_FAILURE,
        payload: {
          sku,
          errorMessage: 'Unable to load configurable options of the product.',
        }
      };

      // Exercise
      const newState = productReducer(initialState, action);

      // Verify
      expect(newState).toMatchSnapshot();
    });

    test('should handle add to cart loading', () => {
      // Setup
      const action = {
        type: MAGENTO.ADD_TO_CART_LOADING,
        payload: {
          sku,
        }
      };

      // Exercise
      const newState = productReducer(initialState, action);

      // Verify
      expect(newState).toMatchSnapshot();
    });

    test('should handle add to cart success', () => {
      // Setup
      const action = {
        type: MAGENTO.ADD_TO_CART_SUCCESS,
        payload: {
          sku,
        }
      };

      // Exercise
      const newState = productReducer(initialState, action);

      // Verify
      expect(newState).toMatchSnapshot();
    });

    test('should handle add to cart failure', () => {
      // Setup
      const action = {
        type: MAGENTO.ADD_TO_CART_FAILURE,
        payload: {
          sku,
          errorMessage: 'Unable to add product to the cart.',
        }
      };

      // Exercise
      const newState = productReducer(initialState, action);

      // Verify
      expect(newState).toMatchSnapshot();
    });

    test('should handle reset add to cart state', () => {
      // Setup
      const action = {
        type: RESET_ADD_TO_CART_STATE,
        payload: {
          sku,
        }
      };
      const product = initialState.current[sku];
      initialState = {
        ...initialState,
        current: {
          ...initialState.current,
          [sku]: {
            ...product,
            addToCartStatus: Status.ERROR,
            addToCartErrorMessage: 'Unable to add product to the cart.',
          }
        }
      };

      // Exercise
      const newState = productReducer(initialState, action);

      // Verify
      expect(newState).toMatchSnapshot();
    });
  });
});
