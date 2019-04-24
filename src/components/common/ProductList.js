import React from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import ProductListItem from '../catalog/ProductListItem';

// TODO: Make it a functional component
class ProductList extends React.Component {
  renderChild = ({ item, index }) => {
    const { setCurrentProduct, columns, extra } = this.props;
    return (
      <ProductListItem
        product={item}
        extraData={extra[item.sku]}
        setCurrentProduct={setCurrentProduct}
        index={index}
        columnCount={columns}
      />
    );
  }

  renderFooter = () => {
    const { canLoadMoreContent } = this.props;
    if (canLoadMoreContent) {
      return <Spinner size="small" />;
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
  extra: PropTypes.object,
  columnCount: PropTypes.number.isRequired,
  onEndReached: PropTypes.func.isRequired,
  setCurrentProduct: PropTypes.func.isRequired,
  canLoadMoreContent: PropTypes.bool.isRequired,
};

ProductList.defaultProps = {
  extra: {},
};

export default ProductList;
