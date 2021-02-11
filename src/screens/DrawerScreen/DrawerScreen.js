import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { showMessage } from 'react-native-flash-message';
import DrawerHeader from './DrawerHeader';
import DrawerItem from './DrawerItem';
import {
  NAVIGATION_TO_HOME_SCREEN,
  NAVIGATION_TO_ALERT_DIALOG,
  NAVIGATION_TO_SETTING_SCREEN,
  NAVIGATION_TO_CATEGORIES_SCREEN,
} from '../../navigation/routes';
import { Button } from '../../common';
import { logout } from '../../store/actions';
import { SPACING } from '../../constants';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';

const propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  /**
   * Redux action to dispatch logout action
   */
  logout: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const defaultProps = {};

const DrawerScreen = ({ loggedIn, logout: _logout, navigation }) => {
  const { theme } = useContext(ThemeContext);

  function onLogoutPress() {
    navigation.navigate(NAVIGATION_TO_ALERT_DIALOG, {
      description: translate('profileScreen.logoutConfirmationMessage'),
      positiveButtonTitle: translate('common.yes'),
      negativeButtonTitle: translate('common.no'),
      positiveButtonCallback: () => {
        _logout();
        showMessage({
          message: translate('common.logoutSuccessMessage'),
          type: 'success',
        });
        navigation.navigate(NAVIGATION_TO_HOME_SCREEN, {
          screen: NAVIGATION_TO_HOME_SCREEN,
          params: {
            screen: NAVIGATION_TO_HOME_SCREEN,
          },
        });
      },
    });
  }

  return (
    <SafeAreaView style={styles.container(theme)}>
      <DrawerHeader navigation={navigation} />
      <DrawerItem
        title={translate('drawerScreen.shopCategories')}
        icon={{ name: 'appstore-o', type: 'antdesign' }}
        onPress={() => navigation.navigate(NAVIGATION_TO_CATEGORIES_SCREEN)}
      />
      <DrawerItem
        title={translate('settingScreen.title')}
        icon={{ name: 'settings' }}
        onPress={() => navigation.navigate(NAVIGATION_TO_SETTING_SCREEN)}
      />
      {loggedIn && (
        <Button
          type="outline"
          title={translate('common.logout')}
          tintColor={theme.colors.error}
          style={styles.logout}
          onPress={onLogoutPress}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    backgroundColor: theme.colors.surface,
  }),
  logout: {
    margin: SPACING.large,
  },
});

DrawerScreen.propTypes = propTypes;

DrawerScreen.defaultProps = defaultProps;

const mapStateToProps = ({ account }) => {
  const { loggedIn } = account;
  return {
    loggedIn,
  };
};

export default connect(mapStateToProps, { logout })(DrawerScreen);
