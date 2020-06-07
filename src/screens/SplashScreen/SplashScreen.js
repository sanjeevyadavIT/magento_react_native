/**
 * @TODO Add internet check
 * @TODO If error occured allow user to refresh
 */
import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
  }).isRequired,
};

const defaultProps = {};

const SplashScreen = ({
  initializeApp: _initializeApp,
  navigation,
}) => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    // componentDidMount
    _initializeApp();
    const timeout = setTimeout(
      () => navigation.replace(NAVIGATION_TO_HOME_SCREEN),
      LIMITS.splashScreenWaitTime,
    );
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <View style={styles.container(theme)}>
      <Text type="subheading" bold style={styles.title(theme)}>{translate('common.brandName')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    backgroundColor: theme.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  title: theme => ({
    textAlign: 'center',
    color: theme.white,
  }),
});

SplashScreen.propTypes = propTypes;

SplashScreen.defaultProps = defaultProps;

export default connect(null, { initializeApp })(SplashScreen);
