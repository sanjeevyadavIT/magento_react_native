import React, { useContext } from 'react';
import {
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text/Text';
import Spinner from '../Spinner/Spinner';
import { ThemeContext } from '../../theme';

const SOLID = 'solid';
const OUTLINE = 'outline';
const CLEAR = 'clear';

const defaultLoadingProps = (type, theme) => ({
  color: type === 'solid' ? theme.colors.white : theme.colors.secondary,
  size: 'small',
});

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

  const containerStyle = StyleSheet.flatten([
    styles.button(type, theme),
    style,
    disabled && styles.disabled(type, theme)
  ]);

  const titleStyle = StyleSheet.flatten([
    styles.title(type, theme),
    disabled && styles.disabledTitle(theme),
  ]);

  return (
    <TouchReceptor onPress={!loading && onPress} disabled={disabled}>
      <View
        style={containerStyle}
      >
        {
          (loading && !disabled) ? (
            <Spinner style={styles.loading} {...defaultLoadingProps(type, theme)} />
          ) : (
              <Text style={titleStyle}>
                {title}
              </Text>
            )
        }
      </View>
    </TouchReceptor>
  );
};


const styles = StyleSheet.create({
  button: (type, theme) => ({
    flexDirection: 'row',
    padding: theme.spacing.small,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: type === SOLID ? theme.colors.secondary : theme.colors.transparent,
    borderWidth: type === OUTLINE ? StyleSheet.hairlineWidth : 0,
    borderColor: theme.colors.secondary,
    borderRadius: theme.dimens.borderRadius,
  }),
  disabled: (type, theme) => ({
    backgroundColor: type === SOLID ? theme.colors.disabled : theme.colors.transparent,
    borderColor: theme.colors.disabledDark,
  }),
  title: (type, theme) => ({
    ...theme.typography.buttonText,
    color: type === SOLID ? theme.colors.white : theme.colors.secondary,
  }),
  disabledTitle: theme => ({
    color: theme.colors.disabledDark,
  }),
  loading: {
    marginVertical: 2,
  }
});

Button.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf([SOLID, OUTLINE, CLEAR]),
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  style: ViewPropTypes.style,
};

Button.defaultProps = {
  type: SOLID,
  onPress: () => { },
  disabled: false,
  style: {},
  loading: false,
};

export default Button;
