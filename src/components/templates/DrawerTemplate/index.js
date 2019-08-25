import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../../config';

const DrawerTemplate = ({
  headerView,
  categoryTree,
  style,
  children,
  ...props
}) => {
  const theme = useContext(ThemeContext);
  return (
    <View style={[styles.container, style]} {...props}>
      <View style={styles.header(theme)}>
        {headerView}
      </View>
      { categoryTree }
      { children }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: theme => ({
    height: theme.dimens.headerViewHeight,
  }),
});

DrawerTemplate.propTypes = {
  headerView: PropTypes.element,
  categoryTree: PropTypes.element.isRequired,
  style: PropTypes.object,
  children: PropTypes.element,
};

DrawerTemplate.defaultProps = {
  headerView: null,
  style: null,
  children: <></>
};

export default DrawerTemplate;
