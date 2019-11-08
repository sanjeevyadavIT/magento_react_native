import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { GenericTemplate, CategoryTree } from '../../../../components';
import { ThemeContext } from '../../../../theme';

/**
 * Container to show categories
 *
 * @param {Object} props              -
 * @param {string} props.status       -
 * @param {string} props.errorMessage -
 * @param {object[]} props.categories -
 */
const CategoryTreeContainer = ({
  status,
  errorMessage,
  categories,
}) => {
  const theme = useContext(ThemeContext);

  const renderChildren = () => {
    if (categories) {
      return <CategoryTree categories={categories} />;
    }
    return <></>;
  };

  return (
    <GenericTemplate
      scrollable={false}
      status={status}
      errorMessage={errorMessage}
      style={styles.container(theme)}
    >
      {renderChildren()}
    </GenericTemplate>
  );
};

const styles = {
  container: theme => ({
    backgroundColor: theme.colors.white
  })
};

CategoryTreeContainer.propTypes = {};

CategoryTreeContainer.defaultPorps = {};

const mapStateToProps = ({ categoryTree }) => {
  const { status, errorMessage, children_data: categories } = categoryTree;
  return {
    status,
    errorMessage,
    categories,
  };
};

export default React.memo(connect(mapStateToProps)(CategoryTreeContainer));
