import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text } from '../../..';
import { magento } from '../../../../magento';
import Status from '../../../../magento/Status';
import NavigationService from '../../../../navigation/NavigationService';
import { NAVIGATION_LOGIN_SCREEN, NAVIGATION_ACCOUNT_SCREEN } from '../../../../navigation/types';
import { ThemeContext } from '../../../../theme';
import { translate } from '../../../../i18n';

/**
 * @param status need to be passed, so that {@link DrawerHeader} can refresh
 * when user is logged in
 *
 * @todo Show "Welcome logged_in_user_name" instead of "Welcome user" message
 *
 * @param {Object} props        - props related to component
 * @param {string} props.status - Status of whether user is logged in or not
 */
const DrawerHeader = ({
  status,
}) => {
  let welcomeText = '';
  let NAVIGATION_PATH = null;
  const theme = useContext(ThemeContext);

  if (magento.isCustomerLogin()) {
    welcomeText = translate('drawerScreen.welcomeText');
    NAVIGATION_PATH = NAVIGATION_ACCOUNT_SCREEN;
  } else {
    welcomeText = translate('drawerScreen.login');
    NAVIGATION_PATH = NAVIGATION_LOGIN_SCREEN;
  }

  return (
    <TouchableOpacity
      style={styles.container(theme)}
      onPress={() => NavigationService.navigate(NAVIGATION_PATH)}
    >
      <View style={styles.lowerContainer(theme)}>
        <Text style={styles.text(theme)}>{welcomeText}</Text>
        <Icon name="chevron-right" size={30} color={theme.colors.white} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    height: theme.dimens.headerViewHeight,
    backgroundColor: theme.colors.primary,
    borderWidth: 0,
  }),
  lowerContainer: theme => ({
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.large,
  }),
  text: theme => ({
    color: theme.colors.white,
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
