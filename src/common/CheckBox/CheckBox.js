import React from 'react';
import { View, ViewPropTypes, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import CheckBoxIcon from './CheckBoxIcon';
import Text from '../Text/Text';
import TouchReceptor from '../TouchReceptor/TouchReceptor';
import { SPACING, DIMENS } from '../../constants';
import { isNonEmptyString } from '../../utils';

const propTypes = {
  /**
   * Value of the checkbox, whether true or false
   */
  checked: PropTypes.bool,
  /**
   * Invoked when the user tries to change the value of the checkbox.
   */
  onPress: PropTypes.func,
  /**
   * Text to be shown on right side of the CheckBox
   */
  title: PropTypes.string,
  /**
   * Size of the checkbox
   */
  size: PropTypes.number,
  /**
   * If true, checkbox icon will be render on right side of title text
   * default value is false
   */
  iconRight: PropTypes.bool,
  /**
   * If true the user won't be able to toggle the CheckBox.
   * Default value is false.
   */
  disabled: PropTypes.bool,
  /**
   * Style for the text component
   */
  titleStyle: Text.propTypes.style,
  /**
   * Style for the container that wrap CheckBox and Label text
   */
  containerStyle: ViewPropTypes.style,
  /**
   * If given custom checked and unchecked icon name,
   * the type icon belongs to
   */
  iconType: PropTypes.string,
  /**
   * Default checked icon (Material Icons) (optional)
   * default value `check-box`
   */
  checkedIcon: PropTypes.string,
  /**
   * Default checked icon (Material Awesome Icon) (optional)
   * default value `check-box-outline-blank`
   */
  uncheckedIcon: PropTypes.string,
};

const defaultProps = {
  checked: false,
  onPress: () => {},
  size: DIMENS.common.checkboxIconSize,
  iconRight: false,
  disabled: false,
  title: '',
  titleStyle: {},
  containerStyle: {},
  iconType: 'material',
  checkedIcon: 'check-box',
  uncheckedIcon: 'check-box-outline-blank',
};

const CheckBox = ({
  checked,
  onPress,
  title,
  disabled,
  iconRight,
  size,
  checkedIcon,
  uncheckedIcon,
  iconType,
  containerStyle,
  titleStyle,
}) => {
  const checkBoxIconProps = {
    size,
    checked,
    iconType,
    checkedIcon,
    uncheckedIcon,
  };

  const accessibilityState = {
    checked: !!checked,
  };

  return (
    <TouchReceptor
      accessibilityRole="checkbox"
      accessibilityState={accessibilityState}
      testID="checkbox"
      disabled={disabled}
      onPress={onPress}
    >
      <View style={[styles.container, containerStyle]}>
        {!iconRight && <CheckBoxIcon {...checkBoxIconProps} />}
        {isNonEmptyString(title) && (
          <Text
            style={StyleSheet.flatten([styles.text(iconRight), titleStyle])}
          >
            {title}
          </Text>
        )}
        {iconRight && <CheckBoxIcon {...checkBoxIconProps} />}
      </View>
    </TouchReceptor>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: iconRight => ({
    flexShrink: 1,
    marginStart: iconRight ? 0 : SPACING.tiny,
    marginEnd: iconRight ? SPACING.tiny : 0,
  }),
});

CheckBox.propTypes = propTypes;

CheckBox.defaultProps = defaultProps;

export default CheckBox;
