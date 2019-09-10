import React, { useContext } from 'react';
import {
  ScrollView,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import { LoadingView, MessageView } from '../..';
import Status from '../../../magento/Status';
import { ThemeContext } from '../../../config';
import { NO_NETWORK_CONNECTION_MESSAGE } from '../../../constants';

/**
 * Top most layout template for All pages.
 * Has four different ways to displaty content.
 * 1. Show `No Internet` message if status is in default or error mode and no network connection
 * 2. Show error message if status is in error mode and there is network connection.
 * 3. Show a loader if status is in loading mode
 * 4. Show child component passed in `GenericTemplate` if status is in success mode
 *
 * @param {Object}  props                   - props related to the component
 * @param {boolean} props.isScrollable      - weather to load view in ScrollView or not
 * @param {string}  props.status            - state of the component
 * @param {string}  props.errorMessage      - message to display in case of error
 * @param {boolean} props.networkConnected  - network connection state
 * @param {footer}  props.style             - style for the outer container
 * @param {footer}  props.footer            - sticky component to always load at bottom
 * @param {Object}  props.children          - components to render in case of success
 */
const GenericTemplate = ({
  isScrollable,
  status,
  errorMessage,
  networkConnected,
  style,
  footer,
  children,
}) => {
  const theme = useContext(ThemeContext);
  const ViewGroup = isScrollable ? ScrollView : View;
  if ((status === Status.DEFAULT || status === Status.ERROR) && !networkConnected) {
    return <MessageView type="error" message={NO_NETWORK_CONNECTION_MESSAGE} />;
  }

  if (status === Status.ERROR) {
    return <MessageView type="error" message={errorMessage} />;
  }

  if (status === Status.DEFAULT || status === Status.LOADING) {
    return <LoadingView />;
  }

  return (
    <SafeAreaView style={styles.container(theme)}>
      <StatusBar
        barStyle="default"
        backgroundColor={theme.colors.statusBarColor}
      />
      <ViewGroup style={[styles.content, style]}>
        {children}
      </ViewGroup>
      {footer}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    backgroundColor: theme.colors.background,
  }),
  content: {
    flex: 1,
  },
  stickyFooter: {
  },
});

GenericTemplate.propTypes = {
  isScrollable: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  status: PropTypes.oneOf(Object.values(Status)),
  errorMessage: PropTypes.string,
  networkConnected: PropTypes.bool,
  style: PropTypes.object,
  footer: PropTypes.element,
};

GenericTemplate.defaultProps = {
  status: Status.SUCCESS,
  errorMessage: '',
  networkConnected: false,
  style: {},
  footer: <></>
};

export default GenericTemplate;
