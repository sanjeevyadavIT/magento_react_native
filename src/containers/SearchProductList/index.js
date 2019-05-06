import { connect } from 'react-redux';
import { ProductList } from '../../components';
import { openSelectedProduct, getSearchProducts } from '../../actions';
import { SEARCH } from '../../reducers/types';

const mapStateToProps = (state) => {
  const {
    searchText,
    products,
    totalCount,
    loadingMore,
  } = state[SEARCH];
  const canLoadMoreProducts = products ? products.length < totalCount : false;
  const showHorizontalList = false;
  const columnCount = 2;

  return {
    loadFactor: searchText,
    showHorizontalList,
    columnCount,
    products,
    canLoadMoreProducts,
    loadingMore,
  };
};

const SearchProductList = connect(mapStateToProps, {
  openSelectedProduct,
  loadProducts: getSearchProducts,
})(ProductList);

export default SearchProductList;
