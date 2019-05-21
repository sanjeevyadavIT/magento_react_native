import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { signup, resetSignupState } from '../../../actions';
import { SIGNUP } from '../../../reducers/types';
import { Spinner, Text, Button, TextInput } from '../..';
import { NAVIGATION_LOGIN_SCREEN_PATH } from '../../../navigation/types';
import Status from '../../../magento/Status';

// TODO: Use KeyboardAvoidingView
const SignupPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const [form, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const status = useSelector(state => state[SIGNUP].status);
  const errorMessage = useSelector(state => state[SIGNUP].errorMessage);

  useEffect(() => (() => {
    // componentDidMount
    dispatch(resetSignupState());
  }), []);

  const onSignupPress = () => {
    // TODO: Implement validation
    const customer = { firstname: form.firstName, lastname: form.lastName, email: form.email };
    const payload = { customer, password: form.password };
    dispatch(signup(payload));
  };

  const renderButtons = () => {
    if (status === Status.LOADING) {
      return <Spinner style={[styles.defaultMargin]} />;
    }
    return (
      <View style={styles.linkContainer}>
        <Button title="Signup" style={[styles.defaultMargin]} onPress={onSignupPress} />
        <TouchableOpacity style={[styles.defaultMargin, styles.center]} onPress={() => navigation.navigate(NAVIGATION_LOGIN_SCREEN_PATH)}>
          <Text>Already have an account(Login)</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderMessages = () => {
    if (status === Status.ERROR) {
      return <Text style={[styles.errorText]}>{errorMessage}</Text>;
    }

    if (status === Status.SUCCESS) {
      return <Text style={[styles.successText]}>Signup successful, please login!</Text>;
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
        style={[styles.defaultMargin]}
        onChangeText={value => setValues({ ...form, lastName: value })}
      />
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCorrect={false}
        value={form.email}
        style={[styles.defaultMargin]}
        onChangeText={value => setValues({ ...form, email: value })}
      />
      <TextInput
        autoCapitalize="none"
        secureTextEntry
        textContentType="password"
        placeholder="Password"
        autoCorrect={false}
        value={form.password}
        style={[styles.defaultMargin]}
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
  defaultMargin: {
    marginTop: 16,
  },
  center: {
    alignSelf: 'center',
  },
  linkContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  errorText: {
    fontSize: 20,
    color: 'red',
  },
  successText: {
    fontSize: 20,
    color: 'green',
  }
});

SignupPage.navigationOptions = {
  title: 'Signup'
};

export default SignupPage;
