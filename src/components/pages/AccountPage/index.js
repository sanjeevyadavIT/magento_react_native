import React, { useEffect } from 'react';
import { useSelector, useActions } from 'react-redux';
import { getCurrentCustomer, logout } from '../../../actions';
import { NAVIGATION_HOME_PATH } from '../../../navigation/types';
import { ACCOUNT } from '../../../reducers/types';
import { Text, Button, GenericTemplate } from '../..';
import Status from '../../../magento/Status';

// TODO: Disable logout button, once clicked
const AccountPage = ({ navigation }) => {
  const status = useSelector(state => state[ACCOUNT].status);
  const errorMessage = useSelector(state => state[ACCOUNT].errorMessage);
  const customer = useSelector(state => state[ACCOUNT].customer);
  const fetchCurrentCustomer = useActions(() => getCurrentCustomer(), []);
  const userLogout = useActions(() => logout(), []);

  useEffect(() => {
    // ComponentDidMount
    if (status === Status.DEFAULT && !customer) {
      fetchCurrentCustomer();
    }
  }, []);

  const onLogoutPress = () => {
    userLogout();
    navigation.navigate(NAVIGATION_HOME_PATH);
  };

  return (
    <GenericTemplate isScrollable={false} status={status} errorMessage={errorMessage}>
      <Text>{customer && `${customer.firstname} ${customer.lastname}`}</Text>
      <Text>{customer && customer.email}</Text>
      <Button title="Logout" onPress={onLogoutPress} />
    </GenericTemplate>
  );
};

AccountPage.navigationOptions = {
  title: 'Account'
};

AccountPage.propTypes = {};

AccountPage.defaultProps = {};

export default AccountPage;
