import React from 'react';
import { View, TextInput, Text, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { auth, getCurrentCustomer } from '../../actions';
import { LOGIN } from '../../reducers/types';
import { Spinner } from '../../components/common';
import { NAVIGATION_SIGNUP_SCREEN_PATH } from '../../navigation/types';

class Login extends React.Component {
  static navigationOptions = {
    title: 'Login'
  }

  constructor(props) {
    super(props);
    this.onLoginPress = this.onLoginPress.bind(this);
    this.state = {
      email: '',
      password: '',
    }
  }

  onLoginPress() {
    const { email, password } = this.state;
    this.props.auth(email, password);
  }

  renderButtons() {
    if (this.props.loading) {
      return <Spinner style={{ marginTop: 16 }} />;
    }
    return (
      <View style={{  flex: 1, flexDirection: 'column', alignItems: 'stretch' }}>
        <Button title="login" style={{ marginTop: 16 }} onPress={this.onLoginPress} />
        <TouchableOpacity style={{ marginTop: 16, alignSelf: 'center' }} onPress={() => this.props.navigation.navigate(NAVIGATION_SIGNUP_SCREEN_PATH)}>
          <Text>Create an account(Signup)</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderMessages() {
    const { error, success, navigation, getCurrentCustomer: _getCurrentCustomer } = this.props;
    if (error) {
      return <Text style={{ fontSize: 20, color: 'red' }}>{error}</Text>;
    }

    if (success) {
      _getCurrentCustomer();
      navigation.popToTop();
      return null;
    }

    return null;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          autoCorrect={false}
          value={this.state.email}
          onChangeText={value => this.setState({ email: value })}
        />
        <TextInput
          autoCapitalize="none"
          secureTextEntry
          textContentType="password"
          placeholder="Password"
          autoCorrect={false}
          style={{ marginTop: 16 }}
          value={this.state.password}
          onChangeText={value => this.setState({ password: value })}
        />
        {this.renderButtons()}
        {this.renderMessages()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { loading, error, success } = state[LOGIN];
  return {
    loading,
    error,
    success,
  };
};

export default connect(mapStateToProps, {
  auth,
  getCurrentCustomer
})(Login);
