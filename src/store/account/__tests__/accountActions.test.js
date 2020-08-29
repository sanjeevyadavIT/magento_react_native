import { loginSuccess } from '../accountActions';

describe('accountActions', () => {
  test('loginSuccess()', () => {
    // Setup
    const token = 'abc123@#$';

    // Exercise
    const result = loginSuccess(token);

    // Verify
    expect(result).toMatchSnapshot();
  });
});
