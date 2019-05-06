import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { ProductListItem, LoadingView, GenericTemplate } from '../..';
import Status from '../../../magento/Status';

const ProductList = ({
  products, // Change it to items
  showHorizontalList,
  columnCount,
  status,
  isLoadingMoreProducts,
  canLoadMoreProducts,
  loadProducts,
  openSelectedProduct,
  loadFactor,
  errorMessage,
}) => {
  useEffect(() => {
    // componentDidMount
    if (status === Status.DEFAULT) {
      console.log('MNMNMN')
      loadProducts(loadFactor);
    }
  }, []);
  console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
  console.log('Inside ProductList render')
  console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')

  const renderRow = ({ item, index }) => {
    return (
      <ProductListItem
        product={item}
        openSelectedProduct={openSelectedProduct}
        index={index}
        columnCount={columnCount}
      />
    );
  };

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

  const flatListLayout = {};
  if (showHorizontalList) {
    flatListLayout.horizontal = true;
  } else {
    flatListLayout.numColumns = columnCount;
  }

  return (
    <GenericTemplate
      isScrollable={false}
      status={status}
      errorMessage={errorMessage}
      style={styles.container}
    >
      <FlatList
        {...flatListLayout}
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
  container: {
    backgroundColor: 'white',
  },
});

ProductList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  products: PropTypes.array,
  showHorizontalList: PropTypes.bool.isRequired,
  columnCount: PropTypes.number,
  status: PropTypes.oneOf(Object.values(Status)).isRequired,
  isLoadingMoreProducts: PropTypes.bool.isRequired,
  canLoadMoreProducts: PropTypes.bool.isRequired,
  loadProducts: PropTypes.func.isRequired,
  loadFactor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  openSelectedProduct: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

ProductList.defaultProps = {
  products: [],
  columnCount: 1,
  errorMessage: null,
};

export default ProductList;
