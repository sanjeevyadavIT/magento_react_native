import React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { getCurrentCustomer } from '../../actions';
import { CUSTOMER_TOKEN, magento } from '../../magento';
import { NAVIGATION_HOME_PATH } from '../../routes/types';
import { ACCOUNT } from '../../reducers/types';
import { Spinner } from '../../components/common';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.onLogoutPress = this.onLogoutPress.bind(this);
  }

  componentDidMount() {
    const { loading, customer, getCurrentCustomer: _getCurrentCustomer } = this.props;
    if (!customer && !loading) {
      _getCurrentCustomer();
    }
  }

  onLogoutPress() {
    AsyncStorage.removeItem(CUSTOMER_TOKEN);
    magento.setCustomerToken(null);
    this.props.navigation.navigate(NAVIGATION_HOME_PATH);
  }

  renderUserDetails() {
    const { loading, customer, error } = this.props;

    if (error) {
      return <Text>{error}</Text>;
    }

    if (loading || !customer) {
      return <Spinner />;
    }

    const fullName = `${customer.firstname} ${customer.lastname}`;

    return (
      <View>
        <Text>{fullName}</Text>
        <Text>{customer.email}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderUserDetails()}
        <Button title="Logout" onPress={this.onLogoutPress} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { loading, customer, error } = state[ACCOUNT];
  return {
    loading,
    customer,
    error,
  };
};

export default connect(mapStateToProps, {
  getCurrentCustomer
})(Account);
