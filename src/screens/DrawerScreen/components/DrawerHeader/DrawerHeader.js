import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text } from '../../../../common';
import { magento } from '../../../../magento';
import Status from '../../../../magento/Status';
import {
  NAVIGATION_TO_LOGIN_SCREEN,
  NAVIGATION_TO_ACCOUNT_SCREEN,
} from '../../../../navigation';
import { ThemeContext } from '../../../../theme';
import { translate } from '../../../../i18n';
import { DIMENS, SPACING } from '../../../../constants';

/**
 * @param status need to be passed, so that {@link DrawerHeader} can refresh
 * when user is logged in
 *
 * @todo Show "Welcome logged_in_user_name" instead of "Welcome user" message
 *
 * @param {Object} props        - props related to component
 * @param {string} props.status - Status of whether user is logged in or not
 */
const DrawerHeader = ({ status, navigation }) => {
  let welcomeText = '';
  let NAVIGATION_PATH = null;
  const { theme } = useContext(ThemeContext);

  if (magento.isCustomerLogin()) {
    welcomeText = translate('drawerScreen.welcomeText');
    NAVIGATION_PATH = NAVIGATION_TO_ACCOUNT_SCREEN;
  } else {
    welcomeText = translate('drawerScreen.login');
    NAVIGATION_PATH = NAVIGATION_TO_LOGIN_SCREEN;
  }

  return (
    <TouchableOpacity
      style={styles.container(theme)}
      onPress={() => navigation.navigate(NAVIGATION_PATH)}
    >
      <View style={styles.lowerContainer(theme)}>
        <Text style={styles.text(theme)}>{welcomeText}</Text>
        <Icon name="chevron-right" size={30} color={theme.white} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    height: DIMENS.headerViewHeight,
    backgroundColor: theme.appbar.backgroundColor,
    borderWidth: 0,
  }),
  lowerContainer: theme => ({
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.large,
  }),
  text: theme => ({
    color: theme.white,
  }),
});

DrawerHeader.propTypes = {
  status: PropTypes.oneOf(Object.values(Status)).isRequired,
};

const mapStatetoProps = ({ account }) => {
  const { userLoggedInStatus: status } = account;
  return {
    status,
  };
};

export default React.memo(connect(mapStatetoProps)(DrawerHeader));
