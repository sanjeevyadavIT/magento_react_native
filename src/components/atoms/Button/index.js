import React from 'react';
import {
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text';
import { withTheme } from '../../../config';

const SOLID = 'solid';
const OUTLINE = 'outline';

const TouchReceptor = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

const Button = ({
  /**
   * type can be
   * 1. 'solid'
   * 2. 'outline'
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
   * TODO: Implement way to incorporate children
   */
  children,
  /**
   * will be provided by withTheme High order component
   */
  theme,
  ...props
}) => (
  <TouchReceptor onPress={onPress} {...props}>
    <View
      style={StyleSheet.flatten([
        styles.button(type, theme),
      ])}
    >
      <Text style={styles.text(type, theme)}>{title}</Text>
    </View>
  </TouchReceptor>
);


const styles = StyleSheet.create({
  button: (type, theme) => ({
    padding: theme.spacing.eight,
    alignItems: 'center',
    backgroundColor: type === SOLID ? theme.colors.secondary : theme.colors.transparent,
    borderWidth: type === OUTLINE ? 1 : 0,
    borderColor: theme.colors.secondary,
    borderRadius: theme.dimens.borderRadius,
  }),
  text: (type, theme) => ({
    ...theme.typography.bodyText,
    color: type === SOLID ? theme.colors.white : theme.colors.secondary,
  }),
});

Button.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf([SOLID, OUTLINE]),
  onPress: PropTypes.func,
};

Button.defaultProps = {
  type: SOLID,
  onPress: () => {},
};

export default withTheme(Button);
