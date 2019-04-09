import React from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import ProductListItem from '../catalog/ProductListItem';

class ProductList extends React.Component {
  renderChild = ({ item, index }) => {
    return <ProductListItem product={item} navigate={this.props.navigate} setCurrentProduct={this.props.setCurrentProduct} index={index} columnCount={this.props.columns} />;
  }

  renderFooter = () => {
    const { canLoadMoreContent } = this.props;
    if (canLoadMoreContent) {
      return <Spinner />;
    }
    return null;
  }

  renderList = () => {
    const { products, columnCount, onEndReached } = this.props;

    return (
      <FlatList
        data={products}
        renderItem={this.renderChild}
        keyExtractor={(item, index) => item.id}
        numColumns={columnCount}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={this.renderFooter}
      />
    );

  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderList()}
      </View>
    );
  }
}

ProductList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  products: PropTypes.array.isRequired,
  columnCount: PropTypes.number.isRequired,
  onEndReached: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  setCurrentProduct: PropTypes.func.isRequired,
  canLoadMoreContent: PropTypes.bool.isRequired,
};

export default ProductList;
