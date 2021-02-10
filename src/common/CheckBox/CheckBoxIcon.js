import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import { ThemeContext } from '../../theme';

const propTypes = {
  size: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
  iconType: PropTypes.string.isRequired,
  checkedIcon: PropTypes.string.isRequired,
  uncheckedIcon: PropTypes.string.isRequired,
};

const defaultProps = {};

const CheckBoxIcon = ({
  size,
  iconType,
  checked,
  checkedIcon,
  uncheckedIcon,
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Icon
      name={checked ? checkedIcon : uncheckedIcon}
      type={iconType}
      size={size}
      color={checked ? theme.colors.primary : theme.colors.icon}
    />
  );
};

CheckBoxIcon.propTypes = propTypes;

CheckBoxIcon.defaultProps = defaultProps;

export default CheckBoxIcon;
