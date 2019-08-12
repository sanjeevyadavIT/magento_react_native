import React from 'react';
import { TouchableNativeFeedback, TouchableOpacity, View, Platform, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { withTheme } from '../../../config';

const OUTLINE = 'outline';
const CLEAR = 'clear';
const SHADOW = 'shadow';

const TouchReceptor = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

// TODO: TouchReceptor can be extracted into it's own component
// TODO: Add styling for shadow
const Card = ({
  /**
   * type can be
   * 1. 'outline' : border with width
   * 2. 'clear'   : no border, no shadow
   * 3. 'shadow'  : with shadow
   */
  type,
  /**
   * Custom style property for Card
   */
  style,
  /**
   * Action to perform on Card click
   */
  onPress,
  /**
   * Children to render inside Card
   */
  children,
  /**
   * Global theme
   */
  theme,
}) => {
  const ViewGroup = onPress ? TouchReceptor : View;

  return (
    <ViewGroup onPress={onPress}>
      <View style={StyleSheet.flatten([styles.conatiner(type, theme), style])}>
        {children}
      </View>
    </ViewGroup>
  );
};

const styles = {
  conatiner: (type, theme) => ({
    flex: 1,
    borderWidth: type === OUTLINE ? 1 : 0,
    borderColor: theme.colors.border,
    borderRadius: theme.dimens.borderRadius,
    backgroundColor: theme.colors.surface,
  }),
};

Card.propTypes = {
  type: PropTypes.oneOf([CLEAR, OUTLINE, SHADOW]),
  style: PropTypes.object,
  onPress: PropTypes.func,
  // children
  // theme
};

Card.defaultProps = {
  type: OUTLINE,
  style: {},
  onPress: null,
};

export default withTheme(Card);
