import React, { useContext } from 'react';
import { View, ViewPropTypes, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../theme';
import { DIMENS } from '../../constants';

const propTypes = {
  /**
   * Make divider vertical
   *
   * default value is false
   */
  vertical: PropTypes.bool,
  /**
   * customm style to divider
   */
  style: ViewPropTypes.style,
};

const defaultProps = {
  style: {},
  vertical: false,
};

const Divider = ({ vertical, style }) => {
  const { theme } = useContext(ThemeContext);
  return <View style={[styles.divider(vertical, theme), style]} />;
};

const styles = StyleSheet.create({
  divider: (vertical, theme) => ({
    display: 'flex',
    height: vertical ? '100%' : DIMENS.common.borderWidth,
    width: vertical ? DIMENS.common.borderWidth : '100%',
    backgroundColor: theme.colors.border,
  }),
});

Divider.propTypes = propTypes;

Divider.defaultProps = defaultProps;

export default Divider;
