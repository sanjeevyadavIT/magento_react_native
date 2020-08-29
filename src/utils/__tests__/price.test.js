import { priceSignByCode } from '../price';

describe('Price related util functions', () => {
  describe('priceSignByCode', () => {
    test('Return currency code, if no symbol present', () => {
      // Setup
      const currencyCode = 'XYZ';
      const expectedResult = 'XYZ';

      // Exercise
      const response = priceSignByCode(currencyCode);

      // Verify
      expect(response).toBe(expectedResult);
    });

    test('Return correct correct currency symbol', () => {
      // Setup
      const currencyCode = 'USD';
      const expectedResult = '$';

      // Exercise
      const response = priceSignByCode(currencyCode);

      // Verify
      expect(response).toBe(expectedResult);
    });
  });
});
