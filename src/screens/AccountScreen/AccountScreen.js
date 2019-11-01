import React, { useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentCustomer, logout } from '../../store/actions';
import { NAVIGATION_ORDERS_SCREEN } from '../../navigation/types';
import { Text, Button, GenericTemplate } from '../../components';
import Status from '../../magento/Status';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';

// TODO: Disable logout button, once clicked
const AccountScreen = ({
  status,
  errorMessage,
  customer,
  navigation,
  getCurrentCustomer: _getCurrentCustomer,
  logout: _logout,
}) => {
  const theme = useContext(ThemeContext);

  useEffect(() => {
    // ComponentDidMount
    if (status === Status.DEFAULT && !customer) {
      _getCurrentCustomer();
    }
  }, []);

  const onLogoutPress = () => {
    _logout();
    navigation.popToTop();
  };

  return (
    <GenericTemplate isScrollable={false} status={status} errorMessage={errorMessage}>
      <Text style={styles.space(theme)}>{customer && `${customer.firstname} ${customer.lastname}`}</Text>
      <Text style={styles.space(theme)}>{customer && customer.email}</Text>
      <Button
        title={translate('accountScreen.myOrderButton')}
        onPress={() => navigation.navigate(NAVIGATION_ORDERS_SCREEN, { customerId: customer.id })}
      />
      <View style={styles.space(theme)} />
      <Button
        title={translate('accountScreen.logoutButton')}
        onPress={onLogoutPress}
      />
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  space: theme => ({
    marginBottom: theme.spacing.small,
  })
});

AccountScreen.navigationOptions = {
  title: translate('accountScreen.title')
};

AccountScreen.propTypes = {
  status: PropTypes.oneOf(Object.values(Status)).isRequired,
  getCurrentCustomer: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  customer: PropTypes.object,
};

AccountScreen.defaultProps = {
  errorMessage: '',
  customer: {},
};

const mapStatetoProps = ({ account }) => {
  const { status, errorMessage, customer } = account;
  return {
    customer,
    status,
    errorMessage,
  };
};

export default connect(mapStatetoProps, {
  getCurrentCustomer,
  logout
})(AccountScreen);
