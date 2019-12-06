import React, { useContext } from 'react';
import { ActivityIndicator, ViewPropTypes, ColorPropType } from 'react-native';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../../theme';

const Spinner = ({
  /**
   * size of the spinner, can be
   * 1. 'large'
   * 2. 'small'
   */
  size,
  /**
   * custom color for the spinner
   */
  color,
  /**
   * style containing padding & margin
   */
  style
}) => {
  const theme = useContext(ThemeContext);
  return (
    <ActivityIndicator
      style={style}
      size={size}
      color={color || theme.colors.secondary}
    />
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOf(['large', 'small']),
  color: ColorPropType,
  style: ViewPropTypes.style,
};

Spinner.defaultProps = {
  size: 'large',
  color: '',
  style: {},
};

export default Spinner;
