import React from 'react';
import { TouchableNativeFeedback, TouchableOpacity, View, Platform, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { withTheme } from '../../../config';

const TouchReceptor = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

// TODO: TouchReceptor can be extracted into it's own component
const Card = ({
  style,
  onPress,
  children,
  theme,
}) => {
  const ViewGroup = onPress ? TouchReceptor : View;

  return (
    <ViewGroup onPress={onPress}>
      <View style={StyleSheet.flatten([styles.conatiner(theme), style])}>
        {children}
      </View>
    </ViewGroup>
  );
};

const styles = {
  conatiner: theme => ({
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.dimens.borderRadius,
    padding: theme.padding.sixteen,
    backgroundColor: theme.colors.surface,
  }),
};

Card.propTypes = {
  style: PropTypes.object,
  onPress: PropTypes.func,
};

Card.defaultProps = {
  style: {},
  onPress: null,
};

export default withTheme(Card);
