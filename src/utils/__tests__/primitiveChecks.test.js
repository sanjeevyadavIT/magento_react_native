import { isObject, isNumber, isString, isNonEmptyString } from '../primitiveChecks';

describe('primtiveChecks.js', () => {
  describe('isObject()', () => {
    test('Should return false for invalid values', () => {
      // Setup
      const inputs = [
        null,
        undefined,
        true,
        false,
        1,
        0,
        '',
        'AMM',
        function A() {},
        [],
        ['AMM'],
      ];

      // Exercise
      const results = inputs.map(input => isObject(input));

      // Verify
      results.forEach(result => expect(result).toBe(false));
    });

    test('Should return true for object', () => {
      // Setup
      const inputs = [{}, { a: 1 }];

      // Exercise
      const results = inputs.map(input => isObject(input));

      // Verify
      results.forEach(result => expect(result).toBe(true));
    });
  });

  describe('isNumber()', () => {
    test('Should return false for invalid values', () => {
      // Setup
      const inputs = [
        null,
        undefined,
        true,
        false,
        {},
        {a: 1},
        Infinity,
        1/0,
        '',
        'AMM',
        function A() {},
        [],
        ['AMM'],
      ];

      // Exercise
      const results = inputs.map(input => isNumber(input));

      // Verify
      results.forEach(result => expect(result).toBe(false));
    });

    test('Should return true for valid nbumber', () => {
      // Setup
      const inputs = [1, 0, 2.3, -4, -0, 0.000001];

      // Exercise
      const results = inputs.map(input => isNumber(input));

      // Verify
      results.forEach(result => expect(result).toBe(true));
    });
  });

  describe('isString()', () => {
    test('Should return false for invalid values', () => {
      // Setup
      const inputs = [
        null,
        undefined,
        true,
        false,
        1,
        0,
        function A() {},
        [],
        ['AMM'],
      ];

      // Exercise
      const results = inputs.map(input => isString(input));

      // Verify
      results.forEach(result => expect(result).toBe(false));
    });

    test('Should return true for valid string', () => {
      // Setup
      const emptyString = '';
      const nonEmptyString = 'AMM';

      // Exercise
      const resultForEmptyString = isString(emptyString);
      const resultForNonEmptyString = isString(nonEmptyString);

      // Verify
      expect(resultForEmptyString).toBe(true);
      expect(resultForNonEmptyString).toBe(true);
    });
  });

  describe('isNonEmptyString()', () => {
    test('Should return false for invalid values', () => {
      // Setup
      const inputs = [
        null,
        undefined,
        true,
        false,
        1,
        0,
        '',
        function A() {},
        [],
        ['AMM'],
      ];

      // Exercise
      const results = inputs.map(input => isNonEmptyString(input));

      // Verify
      results.forEach(result => expect(result).toBe(false));
    });

    test('Should return true for valid non empty string', () => {
      // Setup
      const input = 'AMM';

      // Exercise
      const result = isNonEmptyString(input);

      // Verify
      expect(result).toBe(true);
    });

    test('Should return true for string with spaces inside it', () => {
      // Setup
      const stringWithSpaces = ' ';

      // Exercise
      const result = isNonEmptyString(stringWithSpaces);

      // Verify
      expect(result).toBe(true);
    });
  });
});
