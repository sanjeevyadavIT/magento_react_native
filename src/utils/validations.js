import { isNonEmptyString } from './primitiveChecks';
import { LIMITS } from '../constants';

/**
 * Return true, if email is valid else false
 *
 * @param {string} email
 */
export function isEmailValid(_email) {
  if (isNonEmptyString(_email) && _email.trim().length > 0) {
    const email = _email.trim();
    const regexEmail = /^(?:[\w!#$%&'*+\-/=?^`{|}~]+\.)*[\w!#$%&'*+\-/=?^`{|}~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
    if (!email.match(regexEmail)) {
      return false;
    }
    return true;
  }
  return false;
}

/**
 * Returns true if password is valid, else false
 * current check:
 * 1. Atleast 8 character
 * 2. Atleast 1 uppercase
 * 3. Atleast 1 lowercase
 * 4. Atleast 1 digit
 * 5. Atleast 1 special chacater
 *
 * @todo: Use limits.js to know min & max password length
 *
 * @param {string} password - password entered by user
 */
export function isPasswordValid(password) {
  // At least one number, one uppercase letter, one lowercase letter and one special symbol.
  const passwordregix = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,50}$/;

  return Array.isArray(password.match(passwordregix));
}

/**
 * Basic validation for phone number
 *
 * @todo Add proper validation for mobile number
 */
export function isPhoneNumberValid(phoneNumber) {
  return isNonEmptyString(phoneNumber) && phoneNumber.length >= LIMITS.minPhoneNumberLength;
}
