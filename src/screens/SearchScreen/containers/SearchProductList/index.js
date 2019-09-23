import { connect } from 'react-redux';
import { ProductList } from '../../../../components';
import { openSelectedProduct, getSearchProducts } from '../../../../store/actions';

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
  openSelectedProduct,
  loadProducts: getSearchProducts,
})(ProductList);

export default SearchProductList;
