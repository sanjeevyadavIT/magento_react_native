import React, { useState, useEffect, useContext } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signIn, resetAuthState } from '../../store/actions';
import { Spinner, Text, Button, TextInput, MessageView } from '../../components';
import { NAVIGATION_SIGNUP_SCREEN, NAVIGATION_FORGOT_PASSWORD_SCREEN } from '../../navigation/types';
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
  const theme = useContext(ThemeContext);

  useEffect(() => (() => {
    // componentWillUnmount
    _resetAuthState();
  }), []);

  const onSignInPress = () => {
    // TODO: Do validation
    _signIn(form.email, form.password);
  };

  const renderButtons = () => {
    if (status === Status.LOADING) {
      return <Spinner style={[styles.defaultMargin(theme)]} />;
    }
    return (
      <View style={styles.linkContainer}>
        <Button
          title={translate('signInScreen.signInButton')}
          style={[styles.defaultMargin(theme)]}
          onPress={onSignInPress}
        />
        <TouchableOpacity
          style={[styles.defaultMargin(theme), styles.center]}
          onPress={() => navigation.navigate(NAVIGATION_SIGNUP_SCREEN)}
        >
          <Text>{translate('signInScreen.createAccount')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.defaultMargin(theme), styles.center]}
          onPress={() => navigation.navigate(NAVIGATION_FORGOT_PASSWORD_SCREEN)}
        >
          <Text>{translate('signInScreen.forgotPassword')}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleStatusChange = () => {
    if (status === Status.SUCCESS) {
      navigation.popToTop();
    }
    const message = status === Status.ERROR ? errorMessage : status === Status.SUCCESS ? translate('forgetPasswordScreen.emailSent') : "";
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
        containerStyle={styles.defaultMargin(theme)}
        onChangeText={value => setValues({ ...form, email: value })}
      />
      <TextInput
        autoCapitalize="none"
        secureTextEntry
        textContentType="password"
        placeholder={translate('signInScreen.passwordHint')}
        autoCorrect={false}
        containerStyle={styles.defaultMargin(theme)}
        value={form.password}
        onChangeText={value => setValues({ ...form, password: value })}
      />
      {renderButtons()}
      {handleStatusChange()}
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
  linkContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch'
  }
});

SignInScreen.navigationOptions = {
  title: translate('signInScreen.title')
};

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
