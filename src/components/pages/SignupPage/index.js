import React, { useState, useEffect, useContext } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { signUp, resetAuthState } from '../../../store/actions';
import { Spinner, Text, Button, TextInput } from '../..';
import { NAVIGATION_LOGIN_SCREEN } from '../../../navigation/types';
import Status from '../../../magento/Status';
import { ThemeContext } from '../../../config';

// TODO: Use KeyboardAvoidingView
const SignupPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const [form, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const status = useSelector(state => state.auth.signUpStatus);
  const errorMessage = useSelector(state => state.auth.signUpErrorMessage);
  const theme = useContext(ThemeContext);

  useEffect(() => (() => {
    // componentWillUnmount
    dispatch(resetAuthState());
  }), []);

  const onSignUpPress = () => {
    // TODO: Implement validation
    const customer = { firstname: form.firstName, lastname: form.lastName, email: form.email };
    const payload = { customer, password: form.password };
    dispatch(signUp(payload));
  };

  const renderButtons = () => {
    if (status === Status.LOADING) {
      return <Spinner style={[styles.defaultMargin(theme)]} />;
    }
    return (
      <View style={styles.linkContainer}>
        <Button title="Signup" style={[styles.defaultMargin(theme)]} onPress={onSignUpPress} />
        <TouchableOpacity style={[styles.defaultMargin(theme), styles.center]} onPress={() => navigation.navigate(NAVIGATION_LOGIN_SCREEN)}>
          <Text>Already have an account(Login)</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderMessages = () => {
    if (status === Status.ERROR) {
      return <Text type="subheading" style={[styles.errorText(theme)]}>{errorMessage}</Text>;
    }

    if (status === Status.SUCCESS) {
      return <Text type="subheading" style={[styles.successText(theme)]}>Signup successful, please login!</Text>;
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="First Name"
        autoCorrect={false}
        value={form.firstName}
        onChangeText={value => setValues({ ...form, firstName: value })}
      />
      <TextInput
        placeholder="Last name"
        autoCorrect={false}
        value={form.lastName}
        style={[styles.defaultMargin(theme)]}
        onChangeText={value => setValues({ ...form, lastName: value })}
      />
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCorrect={false}
        value={form.email}
        style={[styles.defaultMargin(theme)]}
        onChangeText={value => setValues({ ...form, email: value })}
      />
      <TextInput
        autoCapitalize="none"
        secureTextEntry
        textContentType="password"
        placeholder="Password"
        autoCorrect={false}
        value={form.password}
        style={[styles.defaultMargin(theme)]}
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
    marginTop: theme.spacing.sixteen,
  }),
  center: {
    alignSelf: 'center',
  },
  linkContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  errorText: theme => ({
    color: theme.colors.error,
  }),
  successText: theme => ({
    color: theme.colors.success,
  })
});

SignupPage.navigationOptions = {
  title: 'Signup'
};

export default SignupPage;
