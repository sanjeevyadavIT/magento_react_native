import React, { useState, useEffect, useContext, useRef } from 'react';
import { StyleSheet, Keyboard, View } from 'react-native';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GenericTemplate, Button, TextInput, Icon } from '../../common';
import {
  NAVIGATION_TO_SIGNUP_SCREEN,
  NAVIGATION_TO_FORGOT_PASSWORD_SCREEN,
} from '../../navigation/routes';
import { loginSuccess } from '../../store/actions';
import Status from '../../magento/Status';
import { magento } from '../../magento';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';
import { SPACING, DIMENS } from '../../constants';
import { isEmailValid, isPasswordValid } from '../../utils';
import LoginImage from '../../assets/images/login.svg';

const propTypes = {
  loginSuccess: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    popToTop: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const defaultProps = {};

// TODO: Check KeyboardAvoidingView behaviour on iOS, on Android it's working fine
const LoginScreen = ({ loginSuccess: _loginSuccess, navigation }) => {
  const [apiStatus, setApiStatus] = useState(Status.DEFAULT);
  const [form, setValues] = useState({
    email: '',
    incorrectEmail: false,
    password: '',
    incorrectPassword: false,
  });
  const [secureEntry, toggleSecureEntry] = useState(true);
  const { theme } = useContext(ThemeContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    if (apiStatus === Status.SUCCESS) {
      navigation.popToTop();
    }
  }, [apiStatus]);

  const resetState = () => {
    setValues(prevState => ({
      ...prevState,
      email: '',
      incorrectEmail: false,
      password: '',
      incorrectPassword: false,
    }));
    toggleSecureEntry(true);
    if (emailInputRef.current) {
      emailInputRef.current.clear();
    }
    if (passwordInputRef.current) {
      passwordInputRef.current.clear();
    }
  };

  const checkField = (fieldKey, fieldErrorKey, fieldValidator) => {
    if (!fieldValidator(form[fieldKey])) {
      setValues(prevState => ({
        ...prevState,
        [fieldErrorKey]: true,
      }));
      return false;
    }
    return true;
  };

  const checkValidation = () => {
    let isValid = true;
    isValid = isValid && checkField('email', 'incorrectEmail', isEmailValid);
    isValid =
      isValid && checkField('password', 'incorrectPassword', isPasswordValid);
    return isValid;
  };

  const onSignInPress = () => {
    Keyboard.dismiss();
    // Validations
    if (!checkValidation()) {
      return;
    }
    // Api call
    setApiStatus(Status.LOADING);
    const { email, password } = form;
    magento.guest
      .login({
        email,
        password,
      })
      .then(token => {
        _loginSuccess(token);
        setApiStatus(Status.SUCCESS);
      })
      .catch(error => {
        Toast.show(
          error.message || translate('errors.genericError'),
          Toast.LONG,
        );
        setApiStatus(Status.ERROR);
      });
  };

  return (
    <GenericTemplate scrollable style={styles.container}>
      <View style={styles.imageContainer}>
        <LoginImage
          width={DIMENS.loginScreen.loginImageSize}
          height={DIMENS.loginScreen.loginImageSize}
        />
      </View>
      <TextInput
        placeholder={translate('common.email')}
        keyboardType="email-address"
        autoCorrect={false}
        autoCapitalize="none"
        editable={!(apiStatus === Status.LOADING)}
        containerStyle={styles.defaultMargin}
        onChangeText={value =>
          setValues(prevState => ({
            ...prevState,
            email: value.trim(),
            incorrectEmail: false,
          }))
        }
        errorMessage={
          form.incorrectEmail ? translate('errors.invalidEmail') : ''
        }
        returnKeyType={translate('common.keyboardNext')}
        onSubmitEditing={() => passwordInputRef.current.focus()}
        assignRef={component => {
          emailInputRef.current = component;
        }}
        onBlur={() => checkField('email', 'incorrectEmail', isEmailValid)}
      />
      <TextInput
        autoCapitalize="none"
        secureTextEntry={secureEntry}
        rightIcon={
          <Icon
            type="material-community"
            name={secureEntry ? 'eye' : 'eye-off'}
            size={20}
            style={styles.iconPadding}
            color={theme.labelTextColor}
            onPress={() => toggleSecureEntry(prevState => !prevState)}
          />
        }
        textContentType="password"
        editable={!(apiStatus === Status.LOADING)}
        placeholder={translate('common.password')}
        autoCorrect={false}
        containerStyle={styles.defaultMargin}
        onChangeText={value =>
          setValues(prevState => ({
            ...prevState,
            password: value.trim(),
            incorrectPassword: false,
          }))
        }
        errorMessage={
          form.incorrectPassword ? translate('errors.invalidPassword') : ''
        }
        assignRef={component => {
          passwordInputRef.current = component;
        }}
        onSubmitEditing={onSignInPress}
      />
      <Button
        loading={apiStatus === Status.LOADING}
        title={translate('common.login')}
        titleStyle={styles.loginButtonText}
        style={styles.defaultMargin}
        onPress={onSignInPress}
      />
      <Button
        type="clear"
        style={styles.defaultMargin}
        disabled={apiStatus === Status.LOADING}
        title={translate('loginScreen.createAccount')}
        onPress={() => {
          navigation.navigate(NAVIGATION_TO_SIGNUP_SCREEN);
          resetState();
        }}
      />
      <Button
        type="clear"
        style={styles.defaultMargin}
        disabled={apiStatus === Status.LOADING}
        title={translate('loginScreen.forgotPassword')}
        onPress={() => {
          navigation.navigate(NAVIGATION_TO_FORGOT_PASSWORD_SCREEN, {
            email: form.email,
          });
          resetState();
        }}
      />
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.large,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultMargin: {
    marginTop: SPACING.large,
  },
  loginButtonText: {
    textTransform: 'uppercase',
  },
  iconPadding: {
    padding: SPACING.small,
  },
});

LoginScreen.propTypes = propTypes;

LoginScreen.defaultProps = defaultProps;

export default connect(null, { loginSuccess })(LoginScreen);
