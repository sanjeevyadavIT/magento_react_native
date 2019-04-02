import React from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { auth } from '../../actions';
import { CUSTOMER_AUTH } from '../../reducers/types';
import { Spinner } from '../../components/common';

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
      <Button title="login" style={{ marginTop: 16 }} onPress={this.onLoginPress} />
    )
  }

  renderMessages() {
    const { error, success } = this.props;
    if (error) {
      return <Text style={{ fontSize: 20, color: 'red' }}>{error}</Text>;
    }

    if (success) {
      return <Text style={{ fontSize: 20, color: 'green' }}>{success}</Text>;
    }

    return null;
  }

  render() {
    return (
      <View>
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
  const { loading, error, success } = state[CUSTOMER_AUTH];
  return {
    loading,
    error,
    success,
  };
};

export default connect(mapStateToProps, {
  auth
})(Login);
