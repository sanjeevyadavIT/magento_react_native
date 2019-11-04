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
   * Container style that wraps TextInput
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
   * Error message to be shown
   */
  errorMessage,
  ...props
}) => {
  const theme = useContext(ThemeContext);
  return (
    <View style={StyleSheet.flatten([styles.container(theme), containerStyle])}>
      {!!label && (
        <Text bold type="label">{label}</Text>
      )}
      <View style={styles.inputContainer(theme)}>
        <InputComponent
          underlineColorAndroid={theme.colors.transparent}
          editable={!disabled}
          style={[
            styles.input(theme),
            inputStyle,
          ]}
          {...props}
        />
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
});

TextInput.propTypes = {
  containerStyle: ViewPropTypes.style,
  inputStyle: PropTypes.object,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  errorMessage: PropTypes.string,
};

TextInput.defaultProps = {
  containerStyle: {},
  disabled: false,
  label: '',
  errorMessage: '',
};

export default TextInput;
