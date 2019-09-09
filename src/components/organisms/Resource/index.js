import React, { useContext } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import { LoadingView, MessageView } from '../..';
import Status from '../../../magento/Status';
import { ThemeContext } from '../../../config';

/**
 * Component meant to used when loading resources over network,
 * major difference between {@link Resource} & {@link GenericTemplate}
 * is {@link GenericTemplate} is meant to be used for top most page layout
 * whereas {@link Resource} component is meant to be used inside component.
 *
 * @note Resource component is not network aware
 *
 * @param {Object} props              - props related to component
 * @param {string} props.status       - string denoting state of the network call, can be
 *                                      one of ["NOT_STARTED", "LOADING", "SUCCESS", "ERROR"]
 * @param {string} props.errorMessage - in case of status === "ERROR", error message will contain reason
 * @param {Object} props.children     - React component to render once status === "SUCCESS"
 * @param {Object} props.style        - Extra styling over the root container
 */
const Resource = ({
  status,
  errorMessage,
  children,
  style,
}) => {
  const theme = useContext(ThemeContext);

  if (status === Status.ERROR) {
    return <MessageView type="error" message={errorMessage} />;
  }

  if (status === Status.DEFAULT || status === Status.LOADING) {
    return <LoadingView />;
  }

  return (
    <View style={[styles.container(theme), style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    backgroundColor: theme.colors.background,
  })
});

Resource.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  status: PropTypes.oneOf(Object.values(Status)),
  errorMessage: PropTypes.string,
  style: PropTypes.object,
};

Resource.defaultProps = {
  status: Status.SUCCESS,
  errorMessage: '',
  style: {},
};

export default Resource;
