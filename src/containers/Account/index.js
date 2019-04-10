import React from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { CUSTOMER_TOKEN } from '../../magento';
import { NAVIGATION_HOME_PATH } from '../../routes/types';
import { magento } from '../../magento';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.onLogoutPress = this.onLogoutPress.bind(this);
  }

  onLogoutPress() {
    AsyncStorage.removeItem(CUSTOMER_TOKEN);
    magento.setCustomerToken(null);
    this.props.navigation.navigate(NAVIGATION_HOME_PATH)
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 24 }}>Welcome user!</Text>
        <Button title="Logout" onPress={this.onLogoutPress} />
      </View>
    );
  }
}

export default Account;
