import React from 'react';
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
import { withTheme } from '../../../config';

// NOTE: Can add functionality to show some fallback message in case of empty view
const GenericTemplate = ({
  children,
  footer,
  isScrollable,
  status,
  errorMessage,
  style,
  theme,
}) => {
  const ViewGroup = isScrollable ? ScrollView : View;
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
  children: PropTypes.any.isRequired,
  footer: PropTypes.element,
  isScrollable: PropTypes.bool.isRequired,
  status: PropTypes.oneOf(Object.values(Status)),
  errorMessage: PropTypes.string,
  style: PropTypes.object,
};

GenericTemplate.defaultProps = {
  status: Status.SUCCESS,
  errorMessage: '',
  style: {},
  footer: <></>
};

export default withTheme(GenericTemplate);
