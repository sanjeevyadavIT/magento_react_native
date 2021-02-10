import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  ViewPropTypes,
  TextInput as InputComponent,
} from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text/Text';
import { ThemeContext } from '../../theme';
import { DIMENS, SPACING, TYPOGRAPHY } from '../../constants';
import { isNonEmptyString } from '../../utils';

const propTypes = {
  /**
   * Container style that wraps entire TextInput
   */
  containerStyle: ViewPropTypes.style,
  /**
   * Text Input style
   */
  inputStyle: Text.propTypes.style,
  /**
   * If set true, TextInput will not be editable
   */
  disabled: PropTypes.bool,
  /**
   * Label text shown above TextInput
   */
  label: PropTypes.string,
  /**
   * Custom style for label,
   */
  labelStyle: Text.propTypes.style,
  /**
   * Error message to be shown
   */
  errorMessage: PropTypes.string,
  /**
   * Render left icon
   */
  leftIcon: PropTypes.oneOfType([PropTypes.element, null]),
  /**
   * Render right icon
   */
  rightIcon: PropTypes.oneOfType([PropTypes.element, null]),
  /**
   * Text color of the placeholder
   */
  placeholderTextColor: PropTypes.string,
  /**
   * To access TextInput reference
   */
  assignRef: PropTypes.func,
};

const defaultProps = {
  containerStyle: {},
  inputStyle: {},
  disabled: false,
  label: '',
  labelStyle: {},
  errorMessage: '',
  leftIcon: null,
  rightIcon: null,
  placeholderTextColor: '',
  assignRef: () => {},
};

const TextInput = ({
  containerStyle,
  inputStyle,
  disabled,
  label,
  labelStyle,
  errorMessage,
  leftIcon,
  rightIcon,
  placeholderTextColor,
  assignRef,
  ...props
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      {isNonEmptyString(label) && (
        <Text style={[styles.label(theme), labelStyle]}>{label}</Text>
      )}
      <View
        style={StyleSheet.flatten([
          styles.inputContainer(disabled, theme),
          containerStyle,
        ])}
      >
        {leftIcon && (
          <View
            style={StyleSheet.flatten([
              styles.iconContainer,
              styles.leftIconContainer,
            ])}
          >
            {leftIcon}
          </View>
        )}

        <InputComponent
          placeholderTextColor={placeholderTextColor || theme.colors.gray400}
          underlineColorAndroid={theme.colors.transparent}
          editable={!disabled}
          style={[
            styles.input(theme),
            disabled && styles.disabledInput(theme),
            inputStyle,
          ]}
          ref={component => assignRef && assignRef(component)}
          {...props}
        />

        {rightIcon && (
          <View
            style={StyleSheet.flatten([
              styles.iconContainer,
              styles.rightIconContainer,
            ])}
          >
            {rightIcon}
          </View>
        )}
      </View>
      {isNonEmptyString(errorMessage) && (
        <Text style={styles.error(theme)}>{errorMessage}</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  label: theme => ({
    ...TYPOGRAPHY.formLabel(theme),
    marginBottom: SPACING.tiny,
  }),
  inputContainer: (disabled, theme) => ({
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderWidth: DIMENS.common.borderWidth,
    borderRadius: DIMENS.common.borderRadius,
    alignItems: 'center',
    borderColor: disabled ? theme.colors.disabledDark : theme.colors.gray400,
    minHeight: DIMENS.common.textInputHeight,
  }),
  input: theme => ({
    ...TYPOGRAPHY.formInput(theme),
    backgroundColor: 'transparent',
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
    flex: 1,
  }),
  disabledInput: theme => ({
    color: theme.colors.disabled,
  }),
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.tiny,
  },
  leftIconContainer: {
    paddingStart: SPACING.small,
  },
  rightIconContainer: {
    paddingEnd: SPACING.small,
  },
  error: theme => ({
    ...TYPOGRAPHY.formError(theme),
    margin: SPACING.tiny,
  }),
});

TextInput.propTypes = propTypes;

TextInput.defaultProps = defaultProps;

export default TextInput;
