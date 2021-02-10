/**
 * @TODO If error occured allow user to refresh
 */
import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Alert, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { Text } from '../../common';
import { LIMITS } from '../../constants';
import { NAVIGATION_TO_HOME_SCREEN } from '../../navigation/routes';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';
import { initializeApp } from '../../store/actions';

const propTypes = {
  /**
   * Dispatch an action to initiliaze app
   */
  initializeApp: PropTypes.func.isRequired,
  /**
   * @source react-navigation
   */
  navigation: PropTypes.shape({
    replace: PropTypes.func.isRequired,
    pop: PropTypes.func.isRequired,
  }).isRequired,
};

const defaultProps = {};

const SplashScreen = ({ initializeApp: _initializeApp, navigation }) => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    // componentDidMount
    internetCheck();
  }, []);

  const internetCheck = () =>
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        // No internet connection, alert user
        Alert.alert(
          translate('errors.noInternetTitle'),
          translate('splashScreen.noInternetMessage'),
          [
            {
              text: translate('common.cancel'),
              onPress: () => BackHandler.exitApp(),
              style: 'cancel',
            },
            { text: translate('common.ok'), onPress: () => internetCheck() },
          ],
          { cancelable: false },
        );
      } else {
        appStartLogic();
      }
    });

  const appStartLogic = () => {
    _initializeApp();
    setTimeout(
      () => navigation.replace(NAVIGATION_TO_HOME_SCREEN),
      LIMITS.splashScreenWaitTime,
    );
  };

  return (
    <View style={styles.container(theme)}>
      <Text type="subheading" bold style={styles.title}>
        {translate('common.brandName')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  title: {
    textAlign: 'center',
    color: '#fff',
  },
});

SplashScreen.propTypes = propTypes;

SplashScreen.defaultProps = defaultProps;

export default connect(null, { initializeApp })(SplashScreen);
