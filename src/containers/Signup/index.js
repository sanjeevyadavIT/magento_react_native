import React from 'react';
import { View, TextInput, Text, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { signup } from '../../actions';
import { SIGNUP } from '../../reducers/types';
import { Spinner } from '../../components/common';
import { NAVIGATION_LOGIN_SCREEN_PATH } from '../../routes/types';

class Signup extends React.Component {
  static navigationOptions = {
    title: 'Signup'
  }

  constructor(props) {
    super(props);
    this.onSignupPress = this.onSignupPress.bind(this);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  }

  onSignupPress() {
    const {
      email,
      password,
      firstName: firstname,
      lastName: lastname,
    } = this.state;
    const { signup: _signup } = this.props;
    const customer = { firstname, lastname, email };
    const payload = { customer, password };
    _signup(payload);
  }

  renderButtons() {
    const { loading } = this.props;
    if (loading) {
      return <Spinner style={{ marginTop: 16 }} />;
    }
    return (
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'stretch' }}>
        <Button title="Signup" style={{ marginTop: 16 }} onPress={this.onSignupPress} />
        <TouchableOpacity style={{ alignSelf: 'center', marginTop: 16 }} onPress={() => this.props.navigation.navigate(NAVIGATION_LOGIN_SCREEN_PATH)}>
          <Text>Already have an account(Login)</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderMessages() {
    const { error, success } = this.props;
    if (error) {
      return <Text style={{ fontSize: 20, color: 'red' }}>{error}</Text>;
    }

    if (success) {
      return <Text style={{ fontSize: 20, color: 'green' }}>{JSON.stringify(success)}</Text>;
    }

    return null;
  }

  render() {
    const { firstName, lastName, gender, email, password } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder="First Name"
          autoCorrect={false}
          value={firstName}
          onChangeText={value => this.setState({ firstName: value })}
        />
        <TextInput
          placeholder="Last name"
          autoCorrect={false}
          value={lastName}
          onChangeText={value => this.setState({ lastName: value })}
        />
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          autoCorrect={false}
          value={email}
          onChangeText={value => this.setState({ email: value })}
        />
        <TextInput
          autoCapitalize="none"
          secureTextEntry
          textContentType="password"
          placeholder="Password"
          autoCorrect={false}
          value={password}
          onChangeText={value => this.setState({ password: value })}
        />
        {this.renderButtons()}
        {this.renderMessages()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { loading, error, success } = state[SIGNUP];
  return {
    loading,
    error,
    success,
  };
};

export default connect(mapStateToProps, {
  signup
})(Signup);
