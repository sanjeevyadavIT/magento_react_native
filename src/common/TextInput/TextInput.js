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

const propTypes = {
  containerStyle: ViewPropTypes.style,
  inputContainerStyle: ViewPropTypes.style,
  inputStyle: Text.propTypes.style,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  errorMessage: PropTypes.string,
  leftIcon: PropTypes.oneOfType([PropTypes.element, null]),
  rightIcon: PropTypes.oneOfType([PropTypes.element, null]),
  assignRef: PropTypes.func,
};

const defaultProps = {
  containerStyle: {},
  inputStyle: {},
  inputContainerStyle: {},
  disabled: false,
  label: '',
  errorMessage: '',
  leftIcon: null,
  rightIcon: null,
  assignRef: () => {},
};

const TextInput = ({
  /**
   * Container style that wraps entire TextInput, Erro Text and Label
   */
  containerStyle,
  /**
   * Container style that wraps only TextInput
   */
  inputContainerStyle,
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
   * To access TextInput reference
   */
  assignRef,
  ...props
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      {!!label && (
        <Text bold type="label">
          {label}
        </Text>
      )}
      <View
        style={StyleSheet.flatten([
          styles.inputContainer(theme),
          inputContainerStyle,
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
          underlineColorAndroid={theme.transparent}
          editable={!disabled}
          style={[styles.input, inputStyle]}
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
      {!!errorMessage && (
        <Text style={styles.error(theme)}>{errorMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: SPACING.small,
  },
  inputContainer: theme => ({
    flexDirection: 'row',
    borderBottomWidth: 1,
    alignItems: 'center',
    borderColor: theme.labelTextColor,
  }),
  input: {
    ...TYPOGRAPHY.textInput,
    alignSelf: 'center',
    flex: 1,
    minHeight: DIMENS.common.textInputHeight,
  },
  error: theme => ({
    margin: SPACING.tiny,
    fontSize: 12,
    color: theme.errorColor,
  }),
  iconContainer: {
    height: DIMENS.common.textInputHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftIconContainer: {
    marginEnd: SPACING.medium,
  },
  rightIconContainer: {
    marginStart: SPACING.medium,
  },
});

TextInput.propTypes = propTypes;

TextInput.defaultProps = defaultProps;

export default TextInput;
