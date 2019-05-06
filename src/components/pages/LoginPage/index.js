import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useActions } from 'react-redux';
import { auth } from '../../../actions';
import { LOGIN } from '../../../reducers/types';
import { Spinner, Text, Button, TextInput } from '../..';
import { NAVIGATION_SIGNUP_SCREEN_PATH } from '../../../navigation/types';
import Status from '../../../magento/Status';

// TODO: create Button to have a style of no background and border
// TODO: Use KeyboardAvoidingView
const LoginPage = ({ navigation }) => {
  const [form, setValues] = useState({
    email: '',
    password: '',
  });
  const status = useSelector(state => state[LOGIN].status);
  const errorMessage = useSelector(state => state[LOGIN].errorMessage);
  const login = useActions(({ email, password }) => auth(email, password), []);

  const onLoginPress = () => {
    // TODO: Do validation
    login(form);
  };

  const renderButtons = () => {
    if (status === Status.LOADING) {
      return <Spinner style={[styles.defaultMargin]} />;
    }
    return (
      <View style={styles.linkContainer}>
        <Button title="login" style={[styles.defaultMargin]} onPress={onLoginPress} />
        <TouchableOpacity style={[styles.defaultMargin, styles.center]} onPress={() => navigation.navigate(NAVIGATION_SIGNUP_SCREEN_PATH)}>
          <Text>Create an account(Signup)</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleStatusChange = () => {
    if (status === Status.ERROR) {
      return <Text style={styles.errorText}>{errorMessage}</Text>;
    }
    if (status === Status.SUCCESS) {
      navigation.popToTop();
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCorrect={false}
        value={form.email}
        onChangeText={value => setValues({ ...form, email: value })}
      />
      <TextInput
        autoCapitalize="none"
        secureTextEntry
        textContentType="password"
        placeholder="Password"
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
  defaultMargin: {
    marginTop: 16,
  },
  center: {
    alignSelf: 'center',
  },
  errorText: {
    fontSize: 20,
    color: 'red',
  },
  linkContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch'
  }
});

LoginPage.navigationOptions = {
  title: 'Login'
};

LoginPage.propTypes = {};

LoginPage.defaultProps = {};

export default LoginPage;
