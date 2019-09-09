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

// NOTE: Can add functionality to show some fallback message in case of empty view
const GenericTemplate = ({
  children,
  footer,
  isScrollable,
  status,
  errorMessage,
  networkConnected,
  style,
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
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  footer: PropTypes.element,
  isScrollable: PropTypes.bool.isRequired,
  status: PropTypes.oneOf(Object.values(Status)),
  errorMessage: PropTypes.string,
  networkConnected: PropTypes.bool,
  style: PropTypes.object,
};

GenericTemplate.defaultProps = {
  status: Status.SUCCESS,
  errorMessage: '',
  networkConnected: false,
  style: {},
  footer: <></>
};

export default GenericTemplate;
