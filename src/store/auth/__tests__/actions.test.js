import {
  signIn,
  signUp,
  resetPassword,
  resetAuthState,
} from '../actions';

describe('auth actions', () => {
  test('signIn()', () => {
    // Setup
    const email = 'sanjeev@gmail.com';
    const password = '123456789';

    // Exercise
    const result = signIn(email, password);

    // Verify
    expect(result).toMatchSnapshot();
  });

  test('signUp()', () => {
    // Setup
    const customer = {
      firstname: 'Sanjeev',
      lastname: 'Yadav',
      email: 'sajeev@gmail.com',
    };
    const payload = {
      customer,
      password: '123456789',
    };

    // Exercise
    const result = signUp(payload);

    // Verify
    expect(result).toMatchSnapshot();
  });

  test('resetPassword()', () => {
    // Setup
    const email = 'sanjeev@gmail.com';

    // Exercise
    const result = resetPassword(email);

    // Verify
    expect(result).toMatchSnapshot();
  });

  test('resetAuthState()', () => {
    // Exercise
    const result = resetAuthState();

    // Verify
    expect(result).toMatchSnapshot();
  });
});
