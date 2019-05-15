import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentCustomer, logout } from '../../../actions';
import { NAVIGATION_ORDERS_SCREEN_PATH } from '../../../navigation/types';
import { ACCOUNT } from '../../../reducers/types';
import { Text, Button, GenericTemplate } from '../..';
import Status from '../../../magento/Status';

// TODO: Disable logout button, once clicked
const AccountPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const status = useSelector(state => state[ACCOUNT].status);
  const errorMessage = useSelector(state => state[ACCOUNT].errorMessage);
  const customer = useSelector(state => state[ACCOUNT].customer);

  useEffect(() => {
    // ComponentDidMount
    if (status === Status.DEFAULT && !customer) {
      dispatch(getCurrentCustomer());
    }
  }, []);

  const onLogoutPress = () => {
    dispatch(logout());
    navigation.popToTop();
  };

  return (
    <GenericTemplate isScrollable={false} status={status} errorMessage={errorMessage}>
      <Text style={styles.space}>{customer && `${customer.firstname} ${customer.lastname}`}</Text>
      <Text style={styles.space}>{customer && customer.email}</Text>
      <Button title="My Orders" onPress={() => navigation.navigate(NAVIGATION_ORDERS_SCREEN_PATH, { customerId: customer.id })} />
      <View style={styles.space} />
      <Button title="Logout" onPress={onLogoutPress} />
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  space: {
    marginBottom: 8,
  }
});

AccountPage.navigationOptions = {
  title: 'Account'
};

AccountPage.propTypes = {};

AccountPage.defaultProps = {};

export default AccountPage;
