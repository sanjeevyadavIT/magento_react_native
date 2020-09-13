import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Text, Icon } from '../../../../common';
import {
  NAVIGATION_TO_LOGIN_SCREEN,
  NAVIGATION_TO_PROFILE_SCREEN,
} from '../../../../navigation/routes';
import { ThemeContext } from '../../../../theme';
import { translate } from '../../../../i18n';
import { DIMENS, SPACING } from '../../../../constants';

const propTypes = {
  /**
   * Tells whether user is logged in or not
   *
   * @source redux
   */
  loggedIn: PropTypes.bool.isRequired,
  /**
   * If logged in, user first name
   */
  firstname: PropTypes.string,
  /**
   * @source react-navigation
   */
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const defaultProps = {
  firstname: '',
};

const DrawerHeader = ({ loggedIn, firstname, navigation }) => {
  let welcomeText = '';
  let NAVIGATION_PATH = null;
  const { theme } = useContext(ThemeContext);

  if (loggedIn) {
    welcomeText = `${translate('common.hello')} ${
      firstname || translate('common.user')
    }!`;
    NAVIGATION_PATH = NAVIGATION_TO_PROFILE_SCREEN;
  } else {
    welcomeText = translate('common.login');
    NAVIGATION_PATH = NAVIGATION_TO_LOGIN_SCREEN;
  }

  return (
    <TouchableOpacity
      style={styles.container(theme)}
      onPress={() => navigation.navigate(NAVIGATION_PATH)}
    >
      <Icon name="person" style={styles.icon(theme)} />
      <View style={styles.lowerContainer}>
        <Text type="subheading" bold style={styles.text(theme)}>
          {welcomeText}
        </Text>
        <Icon name="chevron-right" color={theme.white} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    height: DIMENS.drawerScreen.headerHeight,
    backgroundColor: theme.appbar.backgroundColor,
    borderWidth: 0,
    padding: SPACING.large,
  }),
  icon: theme => ({
    backgroundColor: theme.white,
    alignSelf: 'flex-start',
    borderRadius: DIMENS.common.borderRadius,
    padding: SPACING.small,
    marginBottom: SPACING.small,
  }),
  lowerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: theme => ({
    color: theme.white,
  }),
});

DrawerHeader.propTypes = propTypes;

DrawerHeader.defaultProps = defaultProps;

const mapStatetoProps = ({ account }) => {
  const {
    loggedIn,
    customer: { firstname },
  } = account;
  return {
    loggedIn,
    firstname,
  };
};

export default connect(mapStatetoProps)(DrawerHeader);
