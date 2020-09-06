import React, { useState, useEffect, useContext, useRef } from 'react';
import { ScrollView, StyleSheet, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { signUp, resetAuthState } from '../../store/actions';
import { Button, TextInput } from '../../common';
import { NAVIGATION_TO_LOGIN_SCREEN } from '../../navigation/routes';
import Status from '../../magento/Status';
import { magento } from '../../magento';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';
import { SPACING } from '../../constants';
import { isEmailValid, isPasswordValid, isNonEmptyString } from '../../utils';

const propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

const defaultProps = {};

// TODO: Check KeyboardAvoidingView behaviour on iOS, on Android it's working fine
const SignupScreen = ({ navigation }) => {
  const [apiStatus, setApiStatus] = useState(Status.DEFAULT);
  const [form, setValues] = useState({
    firstName: '',
    incorrectFirstName: false,
    lastName: '',
    incorrectLastName: false,
    email: '',
    incorrectEmail: false,
    password: '',
    incorrectPassword: false,
  });
  const [secureEntry, toggleSecureEntry] = useState(true);
  const { theme } = useContext(ThemeContext);
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    if (apiStatus === Status.SUCCESS) {
      Toast.show(translate('signupScreen.signupSuccessMessage'), Toast.LONG);
      navigation.goBack();
    }
  }, [apiStatus]);

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
    isValid =
      isValid &&
      checkField('firstName', 'incorrectFirstName', isNonEmptyString);
    isValid =
      isValid && checkField('lastName', 'incorrectLastName', isNonEmptyString);
    isValid = isValid && checkField('email', 'incorrectEmail', isEmailValid);
    isValid =
      isValid && checkField('password', 'incorrectPassword', isPasswordValid);
    return isValid;
  };

  const onSignupPress = () => {
    Keyboard.dismiss();
    if (!checkValidation()) {
      return;
    }
    // Api call
    setApiStatus(Status.LOADING);
    const { firstName, lastName, email, password } = form;
    magento.guest
      .signup({
        firstName,
        lastName,
        email,
        password,
      })
      .then(() => {
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
    <SafeAreaView style={styles.safeAreaView(theme)}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TextInput
          placeholder={translate('signupScreen.firstNameHint')}
          autoCorrect={false}
          editable={!(apiStatus === Status.LOADING)}
          containerStyle={styles.defaultMargin}
          onChangeText={value =>
            setValues(prevState => ({
              ...prevState,
              firstName: value.trim(),
              incorrectFirstName: false,
            }))
          }
          returnKeyType={translate('common.keyboardNext')}
          onSubmitEditing={() => lastNameInputRef.current.focus()}
          errorMessage={
            form.incorrectFirstName ? translate('errors.invalidFirstName') : ''
          }
          onBlur={() =>
            checkField('firstName', 'incorrectFirstName', isNonEmptyString)
          }
        />
        <TextInput
          placeholder={translate('signupScreen.lastNameHint')}
          autoCorrect={false}
          editable={!(apiStatus === Status.LOADING)}
          containerStyle={styles.defaultMargin}
          onChangeText={value =>
            setValues(prevState => ({
              ...prevState,
              lastName: value.trim(),
              incorrectLastName: false,
            }))
          }
          assignRef={component => {
            lastNameInputRef.current = component;
          }}
          returnKeyType={translate('common.keyboardNext')}
          onSubmitEditing={() => emailInputRef.current.focus()}
          errorMessage={
            form.incorrectLastName ? translate('errors.invalidLastName') : ''
          }
          onBlur={() =>
            checkField('lastName', 'incorrectLastName', isNonEmptyString)
          }
        />
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
          assignRef={component => {
            emailInputRef.current = component;
          }}
          errorMessage={
            form.incorrectEmail ? translate('errors.invalidEmail') : ''
          }
          returnKeyType={translate('common.keyboardNext')}
          onSubmitEditing={() => passwordInputRef.current.focus()}
          onBlur={() => checkField('email', 'incorrectEmail', isEmailValid)}
        />
        <TextInput
          autoCapitalize="none"
          secureTextEntry={secureEntry}
          rightIcon={
            <Icon
              name={secureEntry ? 'eye' : 'eye-off'}
              size={20}
              style={styles.iconPadding}
              color={theme.labelTextColor}
              onPress={() => toggleSecureEntry(!secureEntry)}
            />
          }
          textContentType="password"
          placeholder={translate('common.password')}
          autoCorrect={false}
          editable={!(apiStatus === Status.LOADING)}
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
          onSubmitEditing={onSignupPress}
        />
        <Button
          loading={apiStatus === Status.LOADING}
          title={translate('common.signup')}
          onPress={onSignupPress}
          style={styles.defaultMargin}
        />
        <Button
          type="clear"
          style={styles.defaultMargin}
          disabled={apiStatus === Status.LOADING}
          title={translate('signupScreen.haveAccount')}
          onPress={() => navigation.navigate(NAVIGATION_TO_LOGIN_SCREEN)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: theme => ({
    flex: 1,
    backgroundColor: theme.backgroundColor,
  }),
  scrollView: {
    padding: SPACING.large,
  },
  container: {
    flex: 1,
  },
  defaultMargin: {
    marginTop: SPACING.large,
  },
  iconPadding: {
    padding: SPACING.small,
  },
});

SignupScreen.propTypes = propTypes;

SignupScreen.defaultProps = defaultProps;

export default connect(null, {
  signUp,
  resetAuthState,
})(SignupScreen);
