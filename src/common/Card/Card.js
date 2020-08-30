import React, { useContext } from 'react';
import {
  View,
  Platform,
  StyleSheet,
  ViewPropTypes,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../theme';
import { DIMENS } from '../../constants';

const OUTLINE = 'outline';
const CLEAR = 'clear';
const SHADOW = 'shadow';

const TouchReceptor =
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

const propTypes = {
  type: PropTypes.oneOf([CLEAR, OUTLINE, SHADOW]),
  style: ViewPropTypes.style,
  onPress: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.element, null])),
  ]).isRequired,
};

const defaultProps = {
  type: OUTLINE,
  style: {},
  onPress: null,
};

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
}) => {
  const ViewGroup = onPress ? TouchReceptor : View;
  const { theme } = useContext(ThemeContext);

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
    borderColor: theme.borderColor,
    borderRadius: DIMENS.common.borderRadius,
    backgroundColor: theme.surfaceColor,
  }),
};

Card.propTypes = propTypes;

Card.defaultProps = defaultProps;

export default Card;
