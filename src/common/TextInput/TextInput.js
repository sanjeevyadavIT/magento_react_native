import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  ViewPropTypes,
  TextInput as InputComponent
} from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text/Text';
import { ThemeContext } from '../../theme';
import { DIMENS, SPACING, TYPOGRAPHY } from '../../constants';

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
    <View style={StyleSheet.flatten([styles.container(theme), containerStyle])}>
      {!!label && (
        <Text bold type="label">{label}</Text>
      )}
      <View style={StyleSheet.flatten([styles.inputContainer(theme), inputContainerStyle])}>
        {leftIcon && (
          <View
            style={StyleSheet.flatten([
              styles.iconContainer(theme),
              styles.leftIconContainer(theme)
            ])}
          >
            {leftIcon}
          </View>
        )}

        <InputComponent
          underlineColorAndroid={theme.transparent}
          editable={!disabled}
          style={[
            styles.input(theme),
            inputStyle,
          ]}
          ref={(component) => { assignRef && assignRef(component); }}
          {...props}
        />

        {rightIcon && (
          <View
            style={StyleSheet.flatten([
              styles.iconContainer(theme),
              styles.rightIconContainer(theme)
            ])}
          >
            {rightIcon}
          </View>
        )}
      </View>
      {!!errorMessage && (
        <Text
          style={styles.error(theme)}
        >
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    width: '100%',
    paddingHorizontal: SPACING.small,
  }),
  inputContainer: theme => ({
    flexDirection: 'row',
    borderBottomWidth: 1,
    alignItems: 'center',
    borderColor: theme.labelTextColor,
  }),
  input: theme => ({
    ...TYPOGRAPHY.textInput,
    alignSelf: 'center',
    flex: 1,
    minHeight: DIMENS.textInputHeight,
  }),
  error: theme => ({
    margin: SPACING.tiny,
    fontSize: 12,
    color: theme.errorColor,
  }),
  iconContainer: theme => ({
    height: DIMENS.textInputHeight,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  leftIconContainer: theme => ({
    marginEnd: SPACING.medium
  }),
  rightIconContainer: theme => ({
    marginStart: SPACING.medium
  })
});

TextInput.propTypes = {
  containerStyle: ViewPropTypes.style,
  inputContainerStyle: ViewPropTypes.style,
  inputStyle: PropTypes.object,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  errorMessage: PropTypes.string,
  leftIcon: PropTypes.oneOfType([
    PropTypes.element,
    null
  ]),
  rightIcon: PropTypes.oneOfType([
    PropTypes.element,
    null
  ]),
  assignRef: PropTypes.func,
};

TextInput.defaultProps = {
  containerStyle: {},
  inputContainerStyle: {},
  disabled: false,
  label: '',
  errorMessage: '',
  leftIcon: null,
  rightIcon: null,
  assignRef: () => { }
};

export default TextInput;
