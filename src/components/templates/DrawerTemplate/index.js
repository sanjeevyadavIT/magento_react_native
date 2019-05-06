import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const DrawerTemplate = ({
  headerView,
  categoryTree,
  style,
  children,
  ...props
}) => (
  <View style={[styles.container, style]} {...props}>
    <View style={styles.header}>
      {headerView}
    </View>
    { categoryTree }
    { children }
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 100,
  }
});

DrawerTemplate.propTypes = {
  headerView: PropTypes.element,
  categoryTree: PropTypes.element.isRequired,
  style: PropTypes.object,
  children: PropTypes.any,
};

DrawerTemplate.defaultProps = {
  headerView: null,
  style: null,
  children: <></>
};

export default DrawerTemplate;
