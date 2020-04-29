import React, { useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentCustomer, logout } from '../../store/actions';
import {
  NAVIGATION_TO_ORDERS_SCREEN,
  NAVIGATION_TO_EDIT_ACCOUNT_ADDRESS_SCREEN,
} from '../../navigation';
import { Text, Button, GenericTemplate } from '../../common';
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
    <GenericTemplate
      status={status}
      scrollable={false}
      errorMessage={errorMessage}
    >
      {
        customer && (
          <>
            <Text style={styles.space(theme)}>
              {`${customer.firstname} ${customer.lastname}`}
            </Text>
            <Text style={styles.space(theme)}>
              {customer.email}
            </Text>
          </>
        )
      }
      <Button
        title={translate('accountScreen.myOrderButton')}
        onPress={() => {
          navigation.navigate(
            NAVIGATION_TO_ORDERS_SCREEN,
            { customerId: customer.id }
          );
        }}
        style={styles.space(theme)}
      />
      <Button
        title={translate('accountScreen.myAddressButton')}
        onPress={() => {
          navigation.navigate(
            NAVIGATION_TO_EDIT_ACCOUNT_ADDRESS_SCREEN,
            { customerId: customer.id }
          );
        }}
        style={styles.space(theme)}
      />
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
  logout,
  getCurrentCustomer,
})(AccountScreen);
