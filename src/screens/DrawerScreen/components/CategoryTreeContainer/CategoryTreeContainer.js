import React, { useContext } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GenericTemplate } from '../../../../common';
import CategoryTree from '../CategoryTree/CategoryTree';
import { ThemeContext } from '../../../../theme';
import Status from '../../../../magento/Status';

/**
 * Container to show categories
 *
 * Note(For Future): If SettingScreen has extar setting apart from change currency,
 * showFooter can always be set to true. And no need to access currency
 * data from reducer.
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
  navigation,
}) => {
  const { theme } = useContext(ThemeContext);

  const renderChildren = () => {
    if (categories) {
      return (
        <CategoryTree
          navigation={navigation}
          categories={categories}
        />
      );
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
    backgroundColor: theme.white,
  }),
};

CategoryTreeContainer.propTypes = {
  status: PropTypes.oneOf(Object.values(Status)).isRequired,
  errorMessage: PropTypes.string,

  categories: PropTypes.arrayOf(PropTypes.object),
};

CategoryTreeContainer.defaultProps = {
  categories: [],
  errorMessage: '',
};

const mapStateToProps = ({ categoryTree }) => {
  const { status, errorMessage, children_data: categories } = categoryTree;
  return {
    status,
    errorMessage,
    categories,
  };
};

export default React.memo(connect(mapStateToProps)(CategoryTreeContainer));
