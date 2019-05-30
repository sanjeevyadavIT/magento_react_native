import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Spinner from '../../atoms/Spinner';
import { withTheme } from '../../../config';

const LoadingView = ({ size, backgroundColor, theme }) => (
  <View style={styles.container(backgroundColor, theme)}>
    <Spinner size={size} />
  </View>
);

const styles = {
  container: (backgroundColor, theme) => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: !backgroundColor ? theme.colors.transparent : backgroundColor,
  }),
};

LoadingView.propTypes = {
  size: PropTypes.string,
  backgroundColor: PropTypes.string,
};

LoadingView.defaultProps = {
  size: 'large',
  backgroundColor: null,
};

export default withTheme(LoadingView);
