import React, { useEffect, useContext } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import LoadingView from '../LoadingView/LoadingView';
import GenericTemplate from '../GenericTemplate/GenericTemplate'
import CatalogGridItem from '../CatalogGridItem/CatalogGridItem';
import Status from '../../magento/Status';
import { ThemeContext } from '../../theme';
import { ProductType } from '../../types';

/**
 * This component support rendering catalog, in Horizonatl list
 * as well as in a grid.
 *
 * @todo Remove @param stateAccessor
 */
const CatalogGrid = ({
  /**
   * Products to display in the grid.
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
  /**
   * Item click handler, called upon `CatalogGridItem` clicked.
   */
  onItemClick,
  //------------------------------------------------------------
  status,
  isLoadingMoreProducts,
  canLoadMoreProducts,
  loadProducts,
  updateItem,
  loadFactor,
  errorMessage,
  //-----------------------------------------------------------
  /**
   * This is a temp solution, tells which reducer to look for,
   * when searching for children of `configurable` type product.
   */
  stateAccessor,
}) => {
  const theme = useContext(ThemeContext);

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
      layoutManager.ItemSeparatorComponent = () => <View style={{ width: theme.spacing.large }} />;
      layoutManager.contentContainerStyle = { padding: theme.spacing.large };
    } else {
      layoutManager.numColumns = columnCount;
    }
    return layoutManager;
  };

  const renderRow = ({ item }) => (
    <CatalogGridItem
      columnCount={columnCount}
      product={item}
      stateAccessor={stateAccessor}
      updateItem={updateItem}
      currencySymbol={currencySymbol}
      currencyRate={currencyRate}
      onPress={onItemClick}
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
      scrollable={false}
      status={status}
      errorMessage={errorMessage}
      style={styles.container(theme)}
    >
      <FlatList
        {...getLayoutManager()}
        data={products}
        renderItem={renderRow}
        keyExtractor={item => String(item.id)}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    backgroundColor: theme.colors.white,
  }),
});

CatalogGrid.propTypes = {
  products: PropTypes.arrayOf(ProductType),
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
  stateAccessor: PropTypes.string.isRequired,
  showHorizontalList: PropTypes.bool.isRequired,
  columnCount: PropTypes.number,
  status: PropTypes.oneOf(Object.values(Status)).isRequired,
  isLoadingMoreProducts: PropTypes.oneOf(Object.values(Status)).isRequired,
  canLoadMoreProducts: PropTypes.bool.isRequired,
  loadProducts: PropTypes.func.isRequired,
  loadFactor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  updateItem: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

CatalogGrid.defaultProps = {
  products: [],
  columnCount: 1,
  errorMessage: null,
};

export default CatalogGrid;
