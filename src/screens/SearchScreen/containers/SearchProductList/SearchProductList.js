import { connect } from 'react-redux';
import { ProductList } from '../../../../common';
import {
  setCurrentProduct,
  getSearchProducts,
} from '../../../../store/actions';

const mapStateToProps = ({ search, magento }) => {
  const { searchText, products, totalCount, loadingMore } = search;
  const {
    displayCurrencySymbol: currencySymbol,
    displayCurrencyExchangeRate: currencyRate,
  } = magento.currency;
  const canLoadMoreProducts = products ? products.length < totalCount : false;
  const showHorizontalList = false;
  const columnCount = 2;

  return {
    loadFactor: searchText,
    showHorizontalList,
    columnCount,
    products,
    currencySymbol,
    currencyRate,
    canLoadMoreProducts,
    loadingMore,
    stateAccessor: 'search',
    updateItem: () => ({ type: 'IMPLEMENT SEARCH PRICING' }),
  };
};

const SearchProductList = connect(mapStateToProps, {
  setCurrentProduct,
  loadProducts: getSearchProducts,
})(ProductList);

export default SearchProductList;
