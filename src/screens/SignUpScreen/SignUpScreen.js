import React, { useState, useEffect, useContext } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signUp, resetAuthState } from '../../store/actions';
import { Spinner, Text, Button, TextInput,MessageView } from '../../components';
import { NAVIGATION_LOGIN_SCREEN } from '../../navigation/types';
import Status from '../../magento/Status';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';

// TODO: Use KeyboardAvoidingView
const SignUpScreen = ({
  status,
  errorMessage,
  navigation,
  signUp: _signUp,
  resetAuthState: _resetAuthState,
}) => {
  const [form, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const theme = useContext(ThemeContext);

  useEffect(() => (() => {
    // componentWillUnmount
    _resetAuthState();
  }), []);

  const onSignUpPress = () => {
    // TODO: Implement validation
    const customer = { firstname: form.firstName, lastname: form.lastName, email: form.email };
    const payload = { customer, password: form.password };
    _signUp(payload);
  };

  const renderButtons = () => {
    if (status === Status.LOADING) {
      return <Spinner style={[styles.defaultMargin(theme)]} />;
    }
    return (
      <View style={styles.linkContainer}>
        <Button
          title={translate('signUpScreen.signUpButton')}
          onPress={onSignUpPress}
          style={[styles.defaultMargin(theme)]}
        />
        <TouchableOpacity
          style={[styles.defaultMargin(theme), styles.center]}
          onPress={() => navigation.navigate(NAVIGATION_LOGIN_SCREEN)}
        >
          <Text>{translate('signUpScreen.haveAccount')}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderMessages = () => {
    const message = status === Status.ERROR ? errorMessage : status === Status.SUCCESS ? translate('signUpScreen.successMessage') : "";
    const type = status === Status.ERROR ? "error" : status === Status.SUCCESS ? "success" : "info";
    return (
      <MessageView
        message={message}
        type={type}
      />
    )
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={translate('signUpScreen.firstNameHint')}
        autoCorrect={false}
        value={form.firstName}
        containerStyle={styles.defaultMargin(theme)}
        onChangeText={value => setValues({ ...form, firstName: value })}
      />
      <TextInput
        placeholder={translate('signUpScreen.lastNameHint')}
        autoCorrect={false}
        value={form.lastName}
        containerStyle={styles.defaultMargin(theme)}
        onChangeText={value => setValues({ ...form, lastName: value })}
      />
      <TextInput
        placeholder={translate('signUpScreen.emailHint')}
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
        placeholder={translate('signUpScreen.passwordHint')}
        autoCorrect={false}
        value={form.password}
        containerStyle={styles.defaultMargin(theme)}
        onChangeText={value => setValues({ ...form, password: value })}
      />
      {renderButtons()}
      {renderMessages()}
    </View>
  );
};

// TODO : Extract common code into a single style
const styles = StyleSheet.create({
  container: {
    flex: 1
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

SignUpScreen.navigationOptions = {
  title: translate('signUpScreen.title')
};

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
