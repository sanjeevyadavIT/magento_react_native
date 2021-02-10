import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Icon, Text, Divider, TouchReceptor } from '../../common';
import { ThemeContext } from '../../theme';
import { SPACING, DIMENS } from '../../constants';

const propTypes = {
  title: PropTypes.string.isRequired,
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
};

const DrawerItem = ({ title, icon, onPress }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <TouchReceptor onPress={onPress}>
        <View style={styles.container}>
          <Icon
            name={icon.name}
            type={icon.type || 'material'}
            color={icon.color || theme.colors.icon}
            size={icon.size || DIMENS.common.iconSize}
          />
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchReceptor>
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: SPACING.large,
  },
  title: {
    flex: 1,
    marginStart: SPACING.large,
  },
});

DrawerItem.propTypes = propTypes;

DrawerItem.defaultProps = defaultProps;

export default DrawerItem;
