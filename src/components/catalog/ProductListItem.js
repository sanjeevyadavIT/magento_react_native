import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import NavigationService from '../../navigation/NavigationService';
import { NAVIGATION_PRODUCT_DETAIL_PATH } from '../../navigation/types';
import { BORDER_COLOR } from '../../constants';
import { getProductThumbnailFromAttribute } from '../../utils/products';

class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onRowPress = this.onRowPress.bind(this);
  }

  onRowPress() {
    const { product, setCurrentProduct } = this.props;
    setCurrentProduct(product);
    NavigationService.navigate(NAVIGATION_PRODUCT_DETAIL_PATH, {
      title: product.name,
    });
  }

  render() {
    const { product } = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.onRowPress}
      >
        <Image
          style={{ flex: 1, height: 120, }}
          resizeMode="contain"
          source={{ uri: getProductThumbnailFromAttribute(product) }}
        />
        <Text>{product.name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: BORDER_COLOR,
    height: 160,
    alignItems: 'stretch',
  },
};

export default ProductListItem;
