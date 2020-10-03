import React, { useContext } from 'react';
import { View, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text/Text';
import Spinner from '../Spinner/Spinner';
import TouchReceptor from '../TouchReceptor/TouchReceptor';
import { ThemeContext } from '../../theme';
import { DIMENS, SPACING, TYPOGRAPHY } from '../../constants';

const SOLID = 'solid';
const OUTLINE = 'outline';
const CLEAR = 'clear';

const defaultLoadingProps = (type, theme) => ({
  color: type === 'solid' ? theme.white : theme.primaryColor,
  size: 'small',
});

const propTypes = {
  /**
   * type can be
   * 1. 'solid'
   * 2. 'outline'
   * 3. 'clear'
   */
  type: PropTypes.oneOf([SOLID, OUTLINE, CLEAR]),
  /**
   * text to be shown in button
   */
  title: PropTypes.string.isRequired,
  /**
   * click listener
   */
  onPress: PropTypes.func,
  /**
   * set true to disable onPress and custom style
   */
  disabled: PropTypes.bool,
  /**
   *  If true, show spinner
   */
  loading: PropTypes.bool,
  /**
   * custom style for button
   */
  style: ViewPropTypes.style,
  /**
   * Overwrite the primary color of the Button used either in background, border or spinner
   */
  tintColor: PropTypes.string,
  /**
   * custom style for text
   */
  titleStyle: Text.propTypes.style,
};

const defaultProps = {
  type: SOLID,
  onPress: () => {},
  disabled: false,
  style: {},
  titleStyle: {},
  loading: false,
  tintColor: '',
};

const Button = ({
  type,
  title,
  onPress,
  disabled,
  loading,
  style,
  titleStyle: _titleStyle,
  tintColor,
}) => {
  const { theme } = useContext(ThemeContext);

  const containerStyle = StyleSheet.flatten([
    styles.button(type, theme, tintColor),
    style,
    disabled && styles.disabled(type, theme),
  ]);

  const titleStyle = StyleSheet.flatten([
    styles.title(type, theme, tintColor),
    _titleStyle,
    disabled && styles.disabledTitle(theme),
  ]);

  const accessibilityState = {
    disabled,
    busy: loading,
  };

  return (
    <TouchReceptor
      accessible
      accessibilityRole="button"
      accessibilityState={accessibilityState}
      onPress={loading || disabled ? () => {} : onPress}
      disabled={loading || disabled}
    >
      <View style={containerStyle}>
        {loading && !disabled ? (
          <Spinner
            style={styles.loading}
            {...defaultLoadingProps(type, theme)}
          />
        ) : (
          <Text style={titleStyle}>{title}</Text>
        )}
      </View>
    </TouchReceptor>
  );
};

const styles = StyleSheet.create({
  button: (type, theme, tintColor) => ({
    flexDirection: 'row',
    padding: SPACING.small,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:
      type === SOLID ? tintColor || theme.primaryColor : theme.transparent,
    borderWidth: type === OUTLINE ? DIMENS.common.borderWidth : 0,
    borderColor: tintColor || theme.primaryColor,
    borderRadius: DIMENS.common.borderRadius,
  }),
  disabled: (type, theme) => ({
    backgroundColor: type === SOLID ? theme.disabledColor : theme.transparent,
    borderColor: theme.disabledDarkColor,
  }),
  title: (type, theme, tintColor) => ({
    ...TYPOGRAPHY.buttonText,
    color: type === SOLID ? theme.white : tintColor || theme.primaryColor,
  }),
  disabledTitle: theme => ({
    color: theme.disabledDarkColor,
  }),
  loading: {
    marginVertical: SPACING.tiny / 2,
  },
});

Button.propTypes = propTypes;

Button.defaultProps = defaultProps;

export default Button;
