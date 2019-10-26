import React, { useEffect, useContext } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import CatalogGridItem from '../CatalogGridItem';
import { LoadingView, GenericTemplate } from '../../index';
import Status from '../../../magento/Status';
import { ThemeContext } from '../../../theme';

// Distance between two list item
const SEPERATOR_SPACE = 12;

const CatalogGrid = ({
  products, // Change it to items
  currencySymbol,
  stateAccessor,
  /**
   * Show all products in single row
   */
  showHorizontalList,
  columnCount,
  status,
  isLoadingMoreProducts,
  canLoadMoreProducts,
  loadProducts,
  setCurrentProduct,
  updateItem,
  loadFactor,
  errorMessage,
}) => {
  console.log('-------------------------');
  console.log('Inside CatalogGrid render');
  console.log('-------------------------');
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
      layoutManager.ItemSeparatorComponent = () => <View style={{ width: SEPERATOR_SPACE }} />;
      layoutManager.contentContainerStyle = { padding: SEPERATOR_SPACE };
    } else {
      layoutManager.numColumns = columnCount;
    }
    return layoutManager;
  };

  const renderRow = ({ item }) => (
    <CatalogGridItem
      product={item}
      stateAccessor={stateAccessor}
      columnCount={columnCount}
      updateItem={updateItem}
      currencySymbol={currencySymbol}
      setCurrentProduct={setCurrentProduct}
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
      isScrollable={false}
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
  // eslint-disable-next-line react/forbid-prop-types
  products: PropTypes.array,
  currencySymbol: PropTypes.string.isRequired,
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
  setCurrentProduct: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

CatalogGrid.defaultProps = {
  products: [],
  columnCount: 1,
  errorMessage: null,
};

export default CatalogGrid;
