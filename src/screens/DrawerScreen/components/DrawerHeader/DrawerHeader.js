import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text } from '../../../../common';
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
    welcomeText = `${translate('drawerScreen.welcomeText')} ${
      firstname || translate('common.user')
    }!`;
    NAVIGATION_PATH = NAVIGATION_TO_PROFILE_SCREEN;
  } else {
    welcomeText = translate('drawerScreen.login');
    NAVIGATION_PATH = NAVIGATION_TO_LOGIN_SCREEN;
  }

  return (
    <TouchableOpacity
      style={styles.container(theme)}
      onPress={() => navigation.navigate(NAVIGATION_PATH)}
    >
      <View style={styles.lowerContainer}>
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
  lowerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.large,
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
