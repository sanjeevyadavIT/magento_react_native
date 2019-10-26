import { connect } from 'react-redux';
import { CatalogGrid } from '../../../../components';
import { setCurrentProduct, getSearchProducts } from '../../../../store/actions';

const mapStateToProps = (state) => {
  const {
    searchText,
    products,
    totalCount,
    loadingMore,
  } = state.search;
  const { default_display_currency_symbol: currencySymbol } = state.magento.currency;
  const canLoadMoreProducts = products ? products.length < totalCount : false;
  const showHorizontalList = false;
  const columnCount = 2;

  return {
    loadFactor: searchText,
    showHorizontalList,
    columnCount,
    products,
    currencySymbol,
    canLoadMoreProducts,
    loadingMore,
    stateAccessor: 'search',
    updateItem: () => ({ type: 'IMPLEMENT SEARCH PRICING' }),
  };
};

const SearchProductList = connect(mapStateToProps, {
  setCurrentProduct,
  loadProducts: getSearchProducts,
})(CatalogGrid);

export default SearchProductList;
