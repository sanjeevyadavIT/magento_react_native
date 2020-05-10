import React, {
  useState,
  useEffect,
  useContext,
  useRef,
} from 'react';
import { StyleSheet, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { signUp, resetAuthState } from '../../store/actions';
import {
  Button,
  TextInput,
  MessageView,
  GenericTemplate
} from '../../common';
import { NAVIGATION_TO_LOGIN_SCREEN } from '../../navigation';
import Status from '../../magento/Status';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';
import { SPACING } from '../../constants';

// TODO: Use KeyboardAvoidingView
const SignUpScreen = ({
  status,
  navigation,
  errorMessage,
  signUp: _signUp,
  resetAuthState: _resetAuthState,
}) => {
  const [form, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [secureEntry, toggleSecureEntry] = useState(true);
  const { theme } = useContext(ThemeContext);
  // Reference
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => (() => {
    // componentWillUnmount
    _resetAuthState();
  }), []);

  const onSignUpPress = () => {
    Keyboard.dismiss();
    if (!(form.firstName && form.lastName && form.email && form.password)) return;
    // TODO: Implement validation
    const customer = { firstname: form.firstName, lastname: form.lastName, email: form.email };
    const payload = { customer, password: form.password };
    _signUp(payload);
  };

  const renderButtons = () => (
    <>
      <Button
        loading={status === Status.LOADING}
        disabled={!(form.firstName && form.lastName && form.email && form.password)}
        title={translate('signUpScreen.signUpButton')}
        onPress={onSignUpPress}
        style={[styles.defaultMargin(theme)]}
      />
      <Button
        type="clear"
        style={styles.defaultMargin(theme)}
        title={translate('signUpScreen.haveAccount')}
        onPress={() => navigation.navigate(NAVIGATION_TO_LOGIN_SCREEN)}
      />
    </>
  );

  const renderMessage = () => {
    const message = status === Status.ERROR ? errorMessage : status === Status.SUCCESS ? translate('signUpScreen.successMessage') : "";
    const type = status === Status.ERROR ? "error" : status === Status.SUCCESS ? "success" : "info";
    return (
      <MessageView
        message={message}
        type={type}
      />
    );
  };

  return (
    <GenericTemplate
      scrollable
      status={Status.SUCCESS}
      style={styles.container}
    >
      <TextInput
        placeholder={translate('signUpScreen.firstNameHint')}
        autoCorrect={false}
        value={form.firstName}
        editable={!(status === Status.LOADING)}
        containerStyle={styles.defaultMargin(theme)}
        onChangeText={value => setValues({ ...form, firstName: value })}
        returnKeyType={translate('common.keyboardNext')}
        onSubmitEditing={() => lastNameInputRef.current.focus()}
      />
      <TextInput
        placeholder={translate('signUpScreen.lastNameHint')}
        autoCorrect={false}
        value={form.lastName}
        editable={!(status === Status.LOADING)}
        containerStyle={styles.defaultMargin(theme)}
        onChangeText={value => setValues({ ...form, lastName: value })}
        assignRef={(component) => { lastNameInputRef.current = component; }}
        returnKeyType={translate('common.keyboardNext')}
        onSubmitEditing={() => emailInputRef.current.focus()}
      />
      <TextInput
        placeholder={translate('signUpScreen.emailHint')}
        keyboardType="email-address"
        autoCorrect={false}
        autoCapitalize="none"
        value={form.email}
        editable={!(status === Status.LOADING)}
        containerStyle={styles.defaultMargin(theme)}
        onChangeText={value => setValues({ ...form, email: value })}
        assignRef={(component) => { emailInputRef.current = component; }}
        returnKeyType={translate('common.keyboardNext')}
        onSubmitEditing={() => passwordInputRef.current.focus()}
      />
      <TextInput
        autoCapitalize="none"
        secureTextEntry={secureEntry}
        rightIcon={(
          <Icon
            name={secureEntry ? 'eye' : 'eye-off'}
            size={20}
            style={styles.iconPadding(theme)}
            color={theme.labelTextColor}
            onPress={() => toggleSecureEntry(!secureEntry)}
          />
        )}
        textContentType="password"
        placeholder={translate('signUpScreen.passwordHint')}
        autoCorrect={false}
        value={form.password}
        editable={!(status === Status.LOADING)}
        containerStyle={styles.defaultMargin(theme)}
        onChangeText={value => setValues({ ...form, password: value })}
        assignRef={(component) => { passwordInputRef.current = component; }}
        onSubmitEditing={onSignUpPress}
      />
      {renderButtons()}
      {renderMessage()}
    </GenericTemplate>
  );
};

// TODO : Extract common code into a single style
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  defaultMargin: theme => ({
    marginTop: SPACING.large,
  }),
  iconPadding: theme => ({
    padding: SPACING.small
  })
});

SignUpScreen.propTypes = {
  status: PropTypes.oneOf(Object.values(Status)).isRequired,
  errorMessage: PropTypes.string,
  signUp: PropTypes.func.isRequired,
  resetAuthState: PropTypes.func.isRequired,
};

SignUpScreen.defaultProps = {
  errorMessage: '',
};

const mapStateToProps = ({ auth }) => {
  const { signUpStatus: status, signUpErrorMessage: errorMessage } = auth;
  return {
    status,
    errorMessage,
  };
};

export default connect(mapStateToProps, {
  signUp,
  resetAuthState
})(SignUpScreen);
