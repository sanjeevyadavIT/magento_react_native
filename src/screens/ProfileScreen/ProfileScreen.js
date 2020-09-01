import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentCustomer, logout } from '../../store/actions';
import {
  NAVIGATION_TO_HOME_SCREEN,
  NAVIGATION_TO_ORDERS_SCREEN,
  NAVIGATION_TO_EDIT_ACCOUNT_ADDRESS_SCREEN,
} from '../../navigation/routes';
import { Text, Button, GenericTemplate, MessageView } from '../../common';
import Status from '../../magento/Status';
import { translate } from '../../i18n';
import { SPACING } from '../../constants';

const propTypes = {
  status: PropTypes.oneOf(Object.values(Status)).isRequired,
  getCurrentCustomer: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  customer: PropTypes.object,
  navigation: PropTypes.shape({
    popToTop: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const defaultProps = {
  errorMessage: '',
  customer: {},
};

// TODO: Disable logout button, once clicked
const ProfileScreen = ({
  status,
  errorMessage,
  customer,
  navigation,
  getCurrentCustomer: _getCurrentCustomer,
  logout: _logout,
}) => {
  useEffect(() => {
    // ComponentDidMount
    if (status === Status.DEFAULT) {
      _getCurrentCustomer();
    }
  }, []);

  const onLogoutPress = () => {
    _logout();
    navigation.navigate(NAVIGATION_TO_HOME_SCREEN);
  };

  if (status === Status.ERROR) {
    return (
      <View style={styles.errorContainer}>
        <MessageView type="error" message={errorMessage} />
        <Button
          title={translate('accountScreen.logoutButton')}
          onPress={onLogoutPress}
        />
      </View>
    );
  }

  return (
    <GenericTemplate status={status} scrollable={false}>
      {customer && (
        <>
          <Text style={styles.space}>
            {`${customer.firstname} ${customer.lastname}`}
          </Text>
          <Text style={styles.space}>{customer.email}</Text>
        </>
      )}
      <Button
        title={translate('accountScreen.myOrderButton')}
        onPress={() => {
          navigation.navigate(NAVIGATION_TO_ORDERS_SCREEN, {
            customerId: customer.id,
          });
        }}
        style={styles.space}
      />
      <Button
        title={translate('accountScreen.myAddressButton')}
        onPress={() => {
          navigation.navigate(NAVIGATION_TO_EDIT_ACCOUNT_ADDRESS_SCREEN, {
            customerId: customer.id,
          });
        }}
        style={styles.space}
      />
      <Button
        title={translate('accountScreen.logoutButton')}
        onPress={onLogoutPress}
      />
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  space: {
    marginBottom: SPACING.small,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.large,
  },
});

ProfileScreen.propTypes = propTypes;

ProfileScreen.defaultProps = defaultProps;

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
})(ProfileScreen);
