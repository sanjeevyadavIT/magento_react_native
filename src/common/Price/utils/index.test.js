import { isNumber, formatPrice } from '.';

describe('Price component util functions', () => {
  describe('isNumber()', () => {
    test('return false, when no input/null/undefined/empty values supplied', () => {
      // Setup
      const nanInput = NaN;
      const infinityInput = Infinity;
      const nullInput = null;
      const undefinedInput = undefined;
      const emptyStringInput = '';
      const emptyObjectInput = {};
      const emptyArrayInput = [];
      const expectedResponse = false;

      // Exercise
      const noInputResponse = isNumber();
      const nanResponse = isNumber(nanInput);
      const infinityResponse = isNumber(infinityInput);
      const nullResponse = isNumber(nullInput);
      const undefinedInputResponse = isNumber(undefinedInput);
      const emptyStringResponse = isNumber(emptyStringInput);
      const emptyObjectResponse = isNumber(emptyObjectInput);
      const emptyArrayResponse = isNumber(emptyArrayInput);

      // Verify
      expect(noInputResponse).toBe(expectedResponse);
      expect(nanResponse).toBe(expectedResponse);
      expect(infinityResponse).toBe(expectedResponse);
      expect(nullResponse).toBe(expectedResponse);
      expect(undefinedInputResponse).toBe(expectedResponse);
      expect(emptyStringResponse).toBe(expectedResponse);
      expect(emptyObjectResponse).toBe(expectedResponse);
      expect(emptyArrayResponse).toBe(expectedResponse);
    });

    test('return true, if number are passed', () => {
      // Setup
      const integer = 123;
      const decimal = 199.99;
      const expectedResponse = true;

      // Exercise
      const integerResponse = isNumber(integer);
      const decimalResponse = isNumber(decimal);

      // Verify
      expect(integerResponse).toBe(expectedResponse);
      expect(decimalResponse).toBe(expectedResponse);
    });

    test('return false, if string, objects, arrays are passed', () => {
      // Setup
      const integerStr = '123';
      const decimalStr = '199.99';
      const nameStr = 'sanjeev';
      const objectInput = { price: 123 };
      const arrayInput = [123];
      const expectedResponse = false;

      // Exercise
      const integerStrResponse = isNumber(integerStr);
      const decimalStrResponse = isNumber(decimalStr);
      const nameStrResponse = isNumber(nameStr);
      const objectResponse = isNumber(objectInput);
      const arrayResponse = isNumber(arrayInput);

      // Verify
      expect(integerStrResponse).toBe(expectedResponse);
      expect(decimalStrResponse).toBe(expectedResponse);
      expect(nameStrResponse).toBe(expectedResponse);
      expect(objectResponse).toBe(expectedResponse);
      expect(arrayResponse).toBe(expectedResponse);
    });
  });

  describe('formatPrice()', () => {
    test('return decimal fixed at two digit', () => {
      // Setup
      const input = 101.4523;
      const currencyRate = 1;
      const expectedResponse = 101.45;

      // Exercise
      const response = formatPrice(input, currencyRate);

      // Verify
      expect(response).toBe(expectedResponse);
    });

    test('return twice the value when exchange rate is 2', () => {
      // Setup
      const input = 101.4523;
      const currencyRate = 2;
      const expectedResponse = 202.90;

      // Exercise
      const response = formatPrice(input, currencyRate);

      // Verify
      expect(response).toBe(expectedResponse);
    });

    test('return 0 if string, objects, array passed as price', () => {
      // Setup
      const integerStrInput = '101';
      const decimalStrInput = '101.4523';
      const objectInput = { price: 123 };
      const arrayInput = [123];
      const currencyRate = 1;
      const expectedResponse = 0;

      // Exercise
      const integerStrResponse = formatPrice(integerStrInput, currencyRate);
      const decimalStrResponse = formatPrice(decimalStrInput, currencyRate);
      const objectResponse = formatPrice(objectInput, currencyRate);
      const arrayResponse = formatPrice(arrayInput, currencyRate);

      // Verify
      expect(integerStrResponse).toBe(expectedResponse);
      expect(decimalStrResponse).toBe(expectedResponse);
      expect(objectResponse).toBe(expectedResponse);
      expect(arrayResponse).toBe(expectedResponse);
    });
  });
});
