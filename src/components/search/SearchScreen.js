import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import ProductList from '../common/ProductList';
import { getSearchProducts, setCurrentProductSku } from '../../actions';
import { SEARCH } from '../../reducers/types';

class SearchScreen extends React.Component {
  renderContent = () => {
    const {
      navigation,
      [SEARCH]: searchData,
      getSearchProducts: _getSearchProducts,
      setCurrentProductSku: _setCurrentProductSku,
    } = this.props;

    const currentSearchInput = navigation.getParam('search', 'ABCDE');
    if (searchData.searchInput === currentSearchInput) {
      if (searchData.products.items.length > 0) {
        return (
          <ProductList
            products={searchData.products.items}
            navigate={navigation.navigate}
            setCurrentProductSku={_setCurrentProductSku}
          />
        );
      }
      return (
        <View><Text>No product found!</Text></View>
      );
    }
    _getSearchProducts(currentSearchInput);
    return <ActivityIndicator />;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderContent()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  [SEARCH]: state[SEARCH]
});

export default connect(mapStateToProps, {
  getSearchProducts,
  setCurrentProductSku,
})(SearchScreen);
