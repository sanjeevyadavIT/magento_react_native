import { isEmailValid, isPasswordValid } from '../validations';

describe('validations.js', () => {
  describe('isEmailValid()', () => {
    test('empty values are invalid', () => {
      // Setup
      const nullValue = null;
      const undefinedValue = undefined;
      const emptyString = '';
      const stringWithSpaces = '     ';

      // Exercise
      const resultNullValue = isEmailValid(nullValue);
      const resultUndefinedValue = isEmailValid(undefinedValue);
      const resultEmptyString = isEmailValid(emptyString);
      const resultStringWithSpaces = isEmailValid(stringWithSpaces);

      // Verify
      expect(resultNullValue).toBe(false);
      expect(resultUndefinedValue).toBe(false);
      expect(resultEmptyString).toBe(false);
      expect(resultStringWithSpaces).toBe(false);
    });

    test('return true for valid emails', () => {
      // Setup
      const validEmailList = [
        'email@example.com',
        'firstname.lastname@example.com',
        'email@subdomain.example.com',
        'firstname+lastname@example.com',
        'email@123.123.123.123',
        'email@[123.123.123.123]',
        '1234567890@example.com',
        'email@example-one.com',
        '_______@example.com',
        'email@example.name',
        'email@example.museum',
        'email@example.co.in',
        'email@example.org',
        'firstname-lastname@example.com',
      ];

      // Excerise
      const resultList = validEmailList.map(email => isEmailValid(email));

      // Verify
      resultList.forEach(result => expect(result).toBe(true));
    });

    test('return false for invalid emails', () => {
      // Setup
      const invalidEmailList = [
        '#@%^%#$@#$@#.com',
        '@example.com',
        'Joe Smith <email@example.com>',
        'email.example.com',
        'email@example@example.com',
        '.email@example.com',
        'email.@example.com',
        'email..email@example.com',
        'あいうえお@example.com',
        'email@example.com (Joe Smith)',
        'email@example',
        'email@-example.com',
        'email@example..com',
        'Abc..123@example.com',
      ];

      // Excerise
      const resultList = invalidEmailList.map(email => isEmailValid(email));

      // Verify
      resultList.forEach(result => expect(result).toBe(false));
    });
  });

  describe('isPasswordValid()', () => {
    test('return false for invalid passwords', () => {
      // Setup
      const invalidPasswordList = [
        '',
        '        ',
        'Aa1!sdf',  // Less than 8 character
        'abc123@&', // No capital letter
        'ABC321*&', // No small letter
        'Abc12376', // No Special character
        'Abc@#$%^', // No Number
      ];

      // Excerise
      const resultList = invalidPasswordList.map(password => isPasswordValid(password));

      // Verify
      resultList.forEach(result => expect(result).toBe(false));
    });

    test('return true for valid passwords', () => {
      // Setup
      const invalidPasswordList = [
        'Aa1abx&e',
        'Abc!2@31kdn991nkqk'
      ];

      // Excerise
      const resultList = invalidPasswordList.map(password => isPasswordValid(password));

      // Verify
      resultList.forEach(result => expect(result).toBe(true));
    });
  })
});
