import React, { useEffect, useContext } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import LoadingView from '../LoadingView/LoadingView';
import GenericTemplate from '../GenericTemplate/GenericTemplate';
import ProductListItem from '../ProductListItem/ProductListItem';
import Status from '../../magento/Status';
import { ThemeContext } from '../../theme';
import { productType } from '../../utils';
import { SPACING } from '../../constants';

const propTypes = {
  products: PropTypes.arrayOf(productType),
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
  showHorizontalList: PropTypes.bool.isRequired,
  columnCount: PropTypes.number,
  status: PropTypes.oneOf(Object.values(Status)).isRequired,
  isLoadingMoreProducts: PropTypes.oneOf(Object.values(Status)).isRequired,
  canLoadMoreProducts: PropTypes.bool.isRequired,
  loadProducts: PropTypes.func.isRequired,
  loadFactor: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  errorMessage: PropTypes.string,
};

const defaultProps = {
  products: [],
  columnCount: 1,
  errorMessage: null,
};

/**
 * This component support rendering catalog, in Horizontal list
 * as well as in a grid.
 */
const ProductList = ({
  /**
   * Products to display in the list.
   */
  products,
  /**
   * Currency Symbol to append along with price
   */
  currencySymbol,
  /**
   * Exchange rate multiplier as compared to base currency price
   */
  currencyRate,
  /**
   * Show all products in single row
   */
  showHorizontalList,
  /**
   * If not showing list in horizontal, tell how many
   * columns in Grid. If `showHorizontalList` is specified true,
   * this value will not be considered.
   */
  columnCount,
  //------------------------------------------------------------
  status,
  isLoadingMoreProducts,
  canLoadMoreProducts,
  loadProducts,
  loadFactor,
  errorMessage,
}) => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    // componentDidMount
    if (status === Status.DEFAULT) {
      loadProducts(loadFactor);
    }
  }, []);

  const getLayoutManager = () => {
    const layoutManager = {};
    if (showHorizontalList) {
      layoutManager.horizontal = true;
      layoutManager.showsHorizontalScrollIndicator = false;
      layoutManager.ItemSeparatorComponent = () => (
        <View style={{ width: SPACING.large }} />
      );
      layoutManager.contentContainerStyle = { padding: SPACING.large };
    } else {
      layoutManager.numColumns = columnCount;
    }
    return layoutManager;
  };

  const renderRow = ({ item }) => (
    <ProductListItem
      columnCount={columnCount}
      product={item}
      currencySymbol={currencySymbol}
      currencyRate={currencyRate}
    />
  );

  const renderFooter = () => {
    if (canLoadMoreProducts) {
      return <LoadingView size="small" />;
    }
    return null;
  };

  const onEndReached = () => {
    if (isLoadingMoreProducts !== Status.LOADING && canLoadMoreProducts) {
      const sortOrder = null;
      loadProducts(loadFactor, products.length, sortOrder);
    }
  };

  return (
    <GenericTemplate
      status={status}
      errorMessage={errorMessage}
      style={styles.container(theme)}
    >
      <FlatList
        {...getLayoutManager()}
        data={products}
        renderItem={renderRow}
        keyExtractor={item => String(item.sku)}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    backgroundColor: theme.white,
  }),
});

ProductList.propTypes = propTypes;

ProductList.defaultProps = defaultProps;

export default ProductList;
