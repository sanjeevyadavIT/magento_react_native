import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Icon, Text, Divider, TouchReceptor } from '../../common';
import { ThemeContext } from '../../theme';
import { SPACING, DIMENS } from '../../constants';
import { isNonEmptyString } from '../../utils';

const propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number,
  }).isRequired,
  onPress: PropTypes.func,
};

const defaultProps = {
  onPress: () => {},
  subtitle: '',
};

const ProfileItem = ({ title, subtitle, icon, onPress }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <TouchReceptor onPress={onPress}>
        <View style={styles.container}>
          <Icon
            name={icon.name}
            type={icon.type || 'material'}
            color={icon.color || theme.iconColor}
            size={icon.size || DIMENS.common.iconSize}
          />
          <View style={styles.detail}>
            <Text bold type="subheading" style={styles.text}>{title}</Text>
            {isNonEmptyString(subtitle) && (
              <Text type="label" style={styles.text}>{subtitle}</Text>
            )}
          </View>
          <Icon name="keyboard-arrow-right" />
        </View>
      </TouchReceptor>
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.large,
    paddingVertical: SPACING.medium,
    alignItems: 'center',
  },
  detail: {
    flex: 1,
    marginHorizontal: SPACING.large,
  },
  text: {
    flex: 1,
  },
});

ProfileItem.propTypes = propTypes;

ProfileItem.defaultProps = defaultProps;

export default ProfileItem;
