import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  ViewPropTypes,
} from 'react-native';
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
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf([SOLID, OUTLINE, CLEAR]),
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  style: ViewPropTypes.style,
  tintColor: PropTypes.string,
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

/**
 * @todo Add different styling of @param disabled is true
 */
const Button = ({
  /**
   * type can be
   * 1. 'solid'
   * 2. 'outline'
   * 3. 'clear'
   */
  type,
  /**
   * text to be shown in button
   */
  title,
  /**
   * click listener
   */
  onPress,
  /**
   * set true to disable onPress and custom style
   */
  disabled,
  /**
   *  If true, show spinner
   */
  loading,
  /**
   * custom style for button
   */
  style,
  /**
   * custom style for text
   */
  titleStyle: _titleStyle,
  /**
   * Overwrite the primary color of the Button used either in background, border or spinner
   */
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
    marginVertical: 2,
  },
});

Button.propTypes = propTypes;

Button.defaultProps = defaultProps;

export default Button;
