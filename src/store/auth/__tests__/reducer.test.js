import authReducer, { INITIAL_STATE } from '../reducer';
import {
  MAGENTO,
  ACTION_USER_LOGOUT,
  RESET_AUTH_STATE
} from '../../../constants';

describe('auth reducer', () => {
  test('should return the initial state', () => {
    // Exercise
    const newState = authReducer(undefined, {});

    // verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle sign in loading', () => {
    // Setup
    const action = {
      type: MAGENTO.SIGN_IN_LOADING,
    };

    // Exercise
    const newState = authReducer(INITIAL_STATE, action);

    // verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle sign in success', () => {
    // Setup
    const action = {
      type: MAGENTO.SIGN_IN_SUCCESS,
    };

    // Exercise
    const newState = authReducer(INITIAL_STATE, action);

    // verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle sign in failure', () => {
    // Setup
    const action = {
      type: MAGENTO.SIGN_IN_FAILURE,
      payload: {
        errorMessage: 'Unable to sign in, wrong credentials'
      }
    };

    // Exercise
    const newState = authReducer(INITIAL_STATE, action);

    // verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle sign up loading', () => {
    // Setup
    const action = {
      type: MAGENTO.SIGN_UP_LOADING,
    };

    // Exercise
    const newState = authReducer(INITIAL_STATE, action);

    // verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle sign up success', () => {
    // Setup
    const action = {
      type: MAGENTO.SIGN_UP_SUCCESS,
    };

    // Exercise
    const newState = authReducer(INITIAL_STATE, action);

    // verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle sign up failure', () => {
    // Setup
    const action = {
      type: MAGENTO.SIGN_UP_FAILURE,
      payload: {
        errorMessage: 'Unable to sign up, invalid credentials'
      }
    };

    // Exercise
    const newState = authReducer(INITIAL_STATE, action);

    // verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle reset password loading', () => {
    // Setup
    const action = {
      type: MAGENTO.RESET_PASSWORD_LOADING,
    };

    // Exercise
    const newState = authReducer(INITIAL_STATE, action);

    // verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle reset password success', () => {
    // Setup
    const action = {
      type: MAGENTO.RESET_PASSWORD_SUCCESS,
    };

    // Exercise
    const newState = authReducer(INITIAL_STATE, action);

    // verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle reset password failure', () => {
    // Setup
    const action = {
      type: MAGENTO.RESET_PASSWORD_FAILURE,
      payload: {
        errorMessage: 'Unable to reset password, invalid email'
      }
    };

    // Exercise
    const newState = authReducer(INITIAL_STATE, action);

    // verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle action user logout', () => {
    // Setup
    const action = {
      type: ACTION_USER_LOGOUT,
    };

    // Exercise
    const newState = authReducer(INITIAL_STATE, action);

    // verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle reset auth state', () => {
    // Setup
    const action = {
      type: RESET_AUTH_STATE,
    };

    // Exercise
    const newState = authReducer(INITIAL_STATE, action);

    // verify
    expect(newState).toMatchSnapshot();
  });
});
