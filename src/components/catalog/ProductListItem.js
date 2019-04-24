import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
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

  getPrice() {
    const { product, extraData } = this.props;
    let price = 0;
    switch (product.type_id) {
      case 'configurable':
        price = extraData.price ? extraData.price : price;
        break;
      case 'simple':
        price = product.price;
        break;
      default:
        price = 0;
    }
    return price;
  }

  render() {
    const { product } = this.props;
    const { name } = product;
    const price = this.getPrice();

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
        <Text>{name}</Text>
        <Text>${price}</Text>
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

ProductListItem.propTypes = {
  product: PropTypes.object.isRequired,
  extraData: PropTypes.object,
  setCurrentProduct: PropTypes.func.isRequired,
};

ProductListItem.defaultProps = {
  extraData: {},
};

export default ProductListItem;
