import React from 'react';
import { View, Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import FeaturedProductListItem from './FeaturedProductListItem';

class FeaturedProductList extends React.Component {
  renderListItem = ({ item, index }) => {
    const { setCurrentProduct } = this.props;
    return <FeaturedProductListItem index={index} product={item} setCurrentProduct={setCurrentProduct} />
  }

  renderList() {
    const { products } = this.props;

    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={products}
        renderItem={this.renderListItem}
      />
    );
  }

  render() {
    const { title } = this.props;
    return (
      <View style={{ backgroundColor: '#fff', marginTop: 16, paddingBottom: 8 }}>
        <Text style={{ fontSize: 13, fontWeight: 'bold', marginTop: 8, marginLeft: 8 }}>{title}</Text>
        {this.renderList()}
      </View>
    );
  }
}

FeaturedProductList.propTypes = {
  title: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
  setCurrentProduct: PropTypes.func.isRequired,
};

export default FeaturedProductList;
