import React, { useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentCustomer, logout } from '../../../store/actions';
import { NAVIGATION_ORDERS_SCREEN_PATH } from '../../../navigation/types';
import { Text, Button, GenericTemplate } from '../..';
import Status from '../../../magento/Status';
import { ThemeContext } from '../../../config';

// TODO: Disable logout button, once clicked
const AccountPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const theme = useContext(ThemeContext);
  const status = useSelector(state => state.account.status);
  const errorMessage = useSelector(state => state.account.errorMessage);
  const customer = useSelector(state => state.account.customer);

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
      <Text style={styles.space(theme)}>{customer && `${customer.firstname} ${customer.lastname}`}</Text>
      <Text style={styles.space(theme)}>{customer && customer.email}</Text>
      <Button title="My Orders" onPress={() => navigation.navigate(NAVIGATION_ORDERS_SCREEN_PATH, { customerId: customer.id })} />
      <View style={styles.space(theme)} />
      <Button title="Logout" onPress={onLogoutPress} />
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  space: theme => ({
    marginBottom: theme.spacing.eight,
  })
});

AccountPage.navigationOptions = {
  title: 'Account'
};

AccountPage.propTypes = {};

AccountPage.defaultProps = {};

export default AccountPage;
