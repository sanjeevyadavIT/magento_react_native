import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GenericTemplate } from '../../common';
import CategoryTree from './CategoryTree';
import Status from '../../magento/Status';
import { ThemeContext } from '../../theme';

const propTypes = {
  status: PropTypes.oneOf(Object.values(Status)).isRequired,
  errorMessage: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.object),
};

const defaultProps = {
  categories: [],
  errorMessage: '',
};

/**
 * Container to show categories
 */
const CategoriesScreen = ({ status, errorMessage, categories }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <GenericTemplate
      style={styles.container(theme)}
      status={status}
      errorMessage={errorMessage}
    >
      <CategoryTree categories={categories} />
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    backgroundColor: theme.colors.white,
  }),
});

CategoriesScreen.propTypes = propTypes;

CategoriesScreen.defaultProps = defaultProps;

const mapStateToProps = ({ categoryTree }) => {
  const { status, errorMessage, children_data: categories } = categoryTree;
  return {
    status,
    errorMessage,
    categories,
  };
};

export default React.memo(connect(mapStateToProps)(CategoriesScreen));
