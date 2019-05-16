import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { LoadingView, MessageView } from '../..';
import Status from '../../../magento/Status';
import { BACKGROUND_COLOR } from '../../../constants';

// NOTE: Can add functionality to show some fallback message in case of empty view
const GenericTemplate = ({
  children,
  footer,
  isScrollable,
  status,
  errorMessage,
  style,
  ...props
}) => {
  const ViewGroup = isScrollable ? ScrollView : View;
  if (status === Status.ERROR) {
    return <MessageView message={errorMessage} />;
  }

  if (status === Status.DEFAULT || status === Status.LOADING) {
    return <LoadingView />;
  }

  return (
    <View style={styles.container}>
      <ViewGroup style={[styles.content, style]} {...props}>
        {children}
      </ViewGroup>
      {footer}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
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

export default GenericTemplate;
