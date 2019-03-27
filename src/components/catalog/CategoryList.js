import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import ProductList from '../common/ProductList';
import { getCategoryProducts, setCurrentProductSku } from '../../actions';
import { CATEGORY } from '../../reducers/types';
import { BRAND_NAME } from '../../constants';

class CategoryList extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', BRAND_NAME),
  })

  renderContent = () => {
    const {
      navigation,
      [CATEGORY]: categoryData,
      getCategoryProducts: _getCategoryProducts,
      setCurrentProductSku: _setCurrentProductSku,
    } = this.props;
    if (categoryData.currentCategoryId) {
      if (categoryData.products) {
        return (
          <ProductList
            products={categoryData.products.items}
            navigate={navigation.navigate}
            setCurrentProductSku={_setCurrentProductSku}
          />
        );
      }
      _getCategoryProducts(categoryData.currentCategoryId);
      return <ActivityIndicator />;
    }
    return null;
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
  [CATEGORY]: state[CATEGORY]
});

export default connect(mapStateToProps, {
  getCategoryProducts,
  setCurrentProductSku,
})(CategoryList);
