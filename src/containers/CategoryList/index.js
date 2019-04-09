import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import ProductList from '../../components/common/ProductList';
import { getCategoryProducts, setCurrentProduct } from '../../actions';
import { CATEGORY_LIST } from '../../reducers/types';
import { BRAND_NAME } from '../../constants';
import { Spinner } from '../../components/common';

class CategoryList extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', BRAND_NAME),
  })

  constructor(props) {
    super(props);
    this.onEndReached = this.onEndReached.bind(this);
  }

  componentWillMount() {
    const {
      categoryId,
      getCategoryProducts: _getCategoryProducts,
    } = this.props;
    _getCategoryProducts(categoryId);
  }

  onEndReached() {
    const {
      categoryId,
      products,
      loadingMore,
      canLoadMoreContent,
      getCategoryProducts: _getCategoryProducts,
    } = this.props;

    if (!loadingMore && canLoadMoreContent) {
      _getCategoryProducts(categoryId, products.length);
    }
  }

  render() {
    const {
      navigation,
      products,
      canLoadMoreContent,
      setCurrentProduct: _setCurrentProduct,
    } = this.props;

    if (!products) {
      return <Spinner />;
    }

    return (
      <ProductList
        products={products}
        columnCount={2}
        onEndReached={this.onEndReached}
        navigate={navigation.navigate}
        setCurrentProduct={_setCurrentProduct}
        canLoadMoreContent={canLoadMoreContent}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const {
    totalCount,
    products,
    loadingMore,
    currentCategoryId: categoryId
  } = state[CATEGORY_LIST];
  const canLoadMoreContent = products ? products.length < totalCount : false;

  return {
    categoryId, products, totalCount, canLoadMoreContent, loadingMore
  };
};

export default connect(mapStateToProps, {
  getCategoryProducts,
  setCurrentProduct,
})(CategoryList);
