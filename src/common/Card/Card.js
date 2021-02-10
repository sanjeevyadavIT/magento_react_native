import React, { useContext } from 'react';
import { View, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import TouchReceptor from '../TouchReceptor/TouchReceptor';
import { ThemeContext } from '../../theme';
import { DIMENS } from '../../constants';

const OUTLINE = 'outline';
const CLEAR = 'clear';
const SHADOW = 'shadow';

const propTypes = {
  /**
   * type can be
   * 1. 'outline' : border with width
   * 2. 'clear'   : no border, no shadow
   * 3. 'shadow'  : with shadow
   */
  type: PropTypes.oneOf([CLEAR, OUTLINE, SHADOW]),
  /**
   * Custom style property for Card
   */
  style: ViewPropTypes.style,
  /**
   * Action to perform on Card click
   */
  onPress: PropTypes.func,
  /**
   * Disable onPress
   */
  disabled: PropTypes.bool,
  /**
   * Children to render inside Card
   */
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.element, null])),
  ]).isRequired,
};

const defaultProps = {
  type: OUTLINE,
  style: {},
  disabled: false,
  onPress: null,
};

const Card = ({ type, style, onPress, disabled, children }) => {
  const ViewGroup = onPress ? TouchReceptor : React.Fragment;
  const { theme } = useContext(ThemeContext);
  const shadow = type === SHADOW ? shadowStyle(theme) : {};

  return (
    <ViewGroup {...(onPress && { onPress, disabled })}>
      <View
        style={StyleSheet.flatten([
          styles.container(type, theme),
          shadow,
          style,
        ])}
      >
        {children}
      </View>
    </ViewGroup>
  );
};

const shadowStyle = theme => ({
  shadowColor: theme.colors.black,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 1,
});

const styles = {
  container: (type, theme) => ({
    borderWidth: type === OUTLINE ? DIMENS.common.borderWidth : 0,
    borderColor: theme.colors.border,
    borderRadius: DIMENS.common.borderRadius,
    backgroundColor: theme.colors.surface,
  }),
};

Card.propTypes = propTypes;

Card.defaultProps = defaultProps;

export default Card;
