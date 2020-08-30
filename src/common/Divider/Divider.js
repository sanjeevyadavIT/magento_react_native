import React, { useContext } from 'react';
import { View, ViewPropTypes, StyleSheet } from 'react-native';
import { ThemeContext } from '../../theme';
import { DIMENS } from '../../constants';

const propTypes = {
  style: ViewPropTypes.style,
};

const defaultProps = {
  style: {},
};

const Divider = ({
  /**
   * customm style to divider
   */
  style,
}) => {
  const { theme } = useContext(ThemeContext);
  return <View style={[styles.divider(theme), style]} />;
};

const styles = StyleSheet.create({
  divider: theme => ({
    display: 'flex',
    height: DIMENS.common.borderWidth,
    backgroundColor: theme.borderColor,
  }),
});

Divider.propTypes = propTypes;

Divider.defaultProps = defaultProps;

export default Divider;
