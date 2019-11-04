import React, { useState, useEffect, useContext } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signIn, resetAuthState } from '../../store/actions';
import { Spinner, Text, Button, TextInput } from '../../components';
import { NAVIGATION_SIGNUP_SCREEN } from '../../navigation/types';
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
      </View>
    );
  };

  const handleStatusChange = () => {
    if (status === Status.ERROR) {
      return <Text type="subheading" style={styles.errorText(theme)}>{errorMessage}</Text>;
    }
    if (status === Status.SUCCESS) {
      navigation.popToTop();
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={translate('signInScreen.emailHint')}
        keyboardType="email-address"
        autoCorrect={false}
        value={form.email}
        onChangeText={value => setValues({ ...form, email: value })}
      />
      <TextInput
        autoCapitalize="none"
        secureTextEntry
        textContentType="password"
        placeholder={translate('signInScreen.passwordHint')}
        autoCorrect={false}
        style={[styles.defaultMargin]}
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
  errorText: theme => ({
    color: theme.colors.error,
  }),
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
