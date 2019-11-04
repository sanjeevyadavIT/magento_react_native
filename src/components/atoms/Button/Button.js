import React, { useContext } from 'react';
import {
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text';
import Spinner from '../Spinner';
import { ThemeContext } from '../../../theme';

const SOLID = 'solid';
const OUTLINE = 'outline';

const TouchReceptor = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
/**
 * @todo Add different styling of @param disabled is true
 */
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
}) => {
  const theme = useContext(ThemeContext);
  return (
    <TouchReceptor onPress={!loading && onPress} disabled={disabled}>
      <View
        style={StyleSheet.flatten([
          styles.button(type, theme),
          style
        ])}
      >
        {
          loading ? <Spinner size="small" color={type === SOLID ? theme.colors.white : ''} /> : <Text style={styles.text(type, theme)}>{title}</Text>
        }
      </View>
    </TouchReceptor>
  );
};


const styles = StyleSheet.create({
  button: (type, theme) => ({
    padding: theme.spacing.small,
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
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  style: PropTypes.object,
};

Button.defaultProps = {
  type: SOLID,
  onPress: () => { },
  disabled: false,
  style: {},
  loading: false,
};

export default Button;
