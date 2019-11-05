import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  ViewPropTypes,
  TextInput as InputComponent
} from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text';
import { ThemeContext } from '../../../theme';

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
  ...props
}) => {
  const theme = useContext(ThemeContext);
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
          underlineColorAndroid={theme.colors.transparent}
          editable={!disabled}
          style={[
            styles.input(theme),
            inputStyle,
          ]}
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
    paddingHorizontal: theme.spacing.small,
  }),
  inputContainer: theme => ({
    flexDirection: 'row',
    borderBottomWidth: 1,
    alignItems: 'center',
    borderColor: theme.colors.labelColor,
  }),
  input: theme => ({
    ...theme.typography.textInput,
    alignSelf: 'center',
    flex: 1,
    minHeight: theme.dimens.textInputHeight,
  }),
  error: theme => ({
    margin: theme.spacing.tiny,
    fontSize: 12,
    color: theme.colors.error,
  }),
  iconContainer: theme => ({
    height: theme.dimens.textInputHeight,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  leftIconContainer: theme => ({
    marginEnd: theme.spacing.medium
  }),
  rightIconContainer: theme => ({
    marginStart: theme.spacing.medium
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
  ])
};

TextInput.defaultProps = {
  containerStyle: {},
  inputContainerStyle: {},
  disabled: false,
  label: '',
  errorMessage: '',
  leftIcon: null,
  rightIcon: null,
};

export default TextInput;
