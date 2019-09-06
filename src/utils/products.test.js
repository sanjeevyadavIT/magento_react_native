import { getPriceFromChildren, Price } from './products';

describe('Product related util functions', () => {
  describe('getPriceFromChildren()', () => {
    test('return minium and maximum price', () => {
      // Setup
      const products = [
        {
          name: 'Tshirt-s',
          price: 200,
        },
        {
          name: 'Tshirt-M',
          price: 199,
        },
        {
          name: 'Tshirt-L',
          price: 201,
        },
        {
          name: 'Tshirt-XL',
          price: 200,
        },
        {
          name: 'Tshirt-XLL',
          price: 205,
        },
      ];
      const expectedResponse = new Price(199, 205);

      // Exercise
      const repsonse = getPriceFromChildren(products);

      // Verify
      expect(repsonse).toEqual(expectedResponse);
    });
  });
});
