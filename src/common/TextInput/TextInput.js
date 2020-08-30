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
  containerStyle: ViewPropTypes.style,
  inputContainerStyle: ViewPropTypes.style,
  inputStyle: Text.propTypes.style,
  labelStyle: Text.propTypes.style,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  errorMessage: PropTypes.string,
  leftIcon: PropTypes.oneOfType([PropTypes.element, null]),
  rightIcon: PropTypes.oneOfType([PropTypes.element, null]),
  placeholderTextColor: PropTypes.string,
  assignRef: PropTypes.func,
};

const defaultProps = {
  containerStyle: {},
  inputStyle: {},
  inputContainerStyle: {},
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
  /**
   * Container style that wraps entire TextInput
   */
  containerStyle,
  /**
   * Text Input style
   */
  inputStyle,
  /**
   * If set true, TextInput will not be editable
   */
  disabled,
  /**
   * Label text shown above TextInput
   */
  label,
  /**
   * Custom style for label,
   */
  labelStyle,
  /**
   * Error message to be shown
   */
  errorMessage,
  /**
   * Render left icon
   */
  leftIcon,
  /**
   * Render right icon
   */
  rightIcon,
  /**
   * Text color of the placeholder
   */
  placeholderTextColor,
  /**
   * To access TextInput reference
   */
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
          styles.inputContainer(theme),
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
          placeholderTextColor={placeholderTextColor || theme.labelTextColor}
          underlineColorAndroid={theme.transparent}
          editable={!disabled}
          style={[styles.input(theme), inputStyle]}
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
  inputContainer: theme => ({
    flexDirection: 'row',
    backgroundColor: theme.surfaceColor,
    borderWidth: DIMENS.common.borderWidth,
    borderRadius: DIMENS.common.borderRadius,
    alignItems: 'center',
    borderColor: theme.labelTextColor,
    minHeight: DIMENS.common.textInputHeight,
  }),
  input: theme => ({
    ...TYPOGRAPHY.formInput(theme),
    backgroundColor: 'transparent',
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
    flex: 1,
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
