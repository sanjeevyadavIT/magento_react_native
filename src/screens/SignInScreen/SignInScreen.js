import React, {
  useState,
  useEffect,
  useContext,
  useRef,
} from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { signIn, resetAuthState } from '../../store/actions';
import {
  Button,
  TextInput,
  MessageView
} from '../../components';
import { NAVIGATION_TO_SIGNUP_SCREEN, NAVIGATION_TO_FORGOT_PASSWORD_SCREEN } from '../../navigation';
import Status from '../../magento/Status';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';

// TODO: create Button to have a style of no background and border
// TODO: Use KeyboardAvoidingView
const SignInScreen = ({
  status,
  errorMessage,
  navigation,
  signIn: _signIn,
  resetAuthState: _resetAuthState,
}) => {
  const [form, setValues] = useState({
    email: '',
    password: '',
  });
  const [secureEntry, toggleSecureEntry] = useState(true);
  const theme = useContext(ThemeContext);
  // Reference
  const passwordInputRef = useRef();

  useEffect(() => {
    if (status === Status.SUCCESS) {
      navigation.popToTop();
    }
  }, [status]);

  useEffect(() => (() => {
    // componentWillUnmount
    _resetAuthState();
  }), []);

  const onSignInPress = () => {
    Keyboard.dismiss();
    if (!(form.email && form.password)) return;
    // TODO: Do validation
    _signIn(form.email, form.password);
  };

  const renderButtons = () => (
    <>
      <Button
        disabled={!(form.email && form.password)}
        loading={status === Status.LOADING}
        title={translate('signInScreen.signInButton')}
        style={[styles.defaultMargin(theme)]}
        onPress={onSignInPress}
      />
      <Button
        type="clear"
        style={styles.defaultMargin(theme)}
        title={translate('signInScreen.createAccount')}
        onPress={() => navigation.navigate(NAVIGATION_TO_SIGNUP_SCREEN)}
      />
      <Button
        type="clear"
        style={styles.defaultMargin(theme)}
        title={translate('signInScreen.forgotPassword')}
        onPress={() => navigation.navigate(NAVIGATION_TO_FORGOT_PASSWORD_SCREEN)}
      />
    </>
  );

  const renderMessage = () => {
    const message = status === Status.ERROR ? errorMessage : (status === Status.SUCCESS ? translate('forgetPasswordScreen.emailSent') : "");
    const type = status === Status.ERROR ? "error" : status === Status.SUCCESS ? "success" : "info";
    return (
      <MessageView
        message={message}
        type={type}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={translate('signInScreen.emailHint')}
        keyboardType="email-address"
        autoCorrect={false}
        value={form.email}
        autoCapitalize="none"
        editable={!(status === Status.LOADING)}
        containerStyle={styles.defaultMargin(theme)}
        onChangeText={value => setValues({ ...form, email: value })}
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
            color={theme.colors.labelColor}
            onPress={() => toggleSecureEntry(!secureEntry)}
          />
        )}
        textContentType="password"
        editable={!(status === Status.LOADING)}
        placeholder={translate('signInScreen.passwordHint')}
        autoCorrect={false}
        containerStyle={styles.defaultMargin(theme)}
        value={form.password}
        onChangeText={value => setValues({ ...form, password: value })}
        assignRef={(component) => { passwordInputRef.current = component; }}
        onSubmitEditing={onSignInPress}
      />
      {renderButtons()}
      {renderMessage()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  defaultMargin: theme => ({
    marginTop: theme.spacing.large,
  }),
  center: {
    alignSelf: 'center',
  },
  iconPadding: theme => ({
    padding: theme.spacing.small
  })
});

SignInScreen.propTypes = {
  status: PropTypes.oneOf(Object.values(Status)).isRequired,
  errorMessage: PropTypes.string,
  signIn: PropTypes.func.isRequired,
  resetAuthState: PropTypes.func.isRequired,
};

SignInScreen.defaultProps = {
  errorMessage: '',
};

const mapStateToProps = ({ auth }) => {
  const { signInStatus: status, signInErrorMessage: errorMessage } = auth;
  return {
    status,
    errorMessage,
  };
};
export default connect(mapStateToProps, {
  signIn,
  resetAuthState,
})(SignInScreen);
