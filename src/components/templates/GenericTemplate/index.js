import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { LoadingView, MessageView } from '../..';
import Status from '../../../magento/Status';
import { BACKGROUND_COLOR } from '../../../constants';

const GenericTemplate = ({
  children,
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
    <ViewGroup style={[styles.container, style]} {...props}>
      {children}
    </ViewGroup>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  }
});

GenericTemplate.propTypes = {
  children: PropTypes.any.isRequired,
  isScrollable: PropTypes.bool.isRequired,
  status: PropTypes.oneOf(Object.values(Status)),
  errorMessage: PropTypes.string,
  style: PropTypes.object,
};

GenericTemplate.defaultProps = {
  status: Status.SUCCESS,
  errorMessage: '',
  style: {},
};

export default GenericTemplate;
