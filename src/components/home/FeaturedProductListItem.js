import React from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import { magento } from '../../magento';
import NavigationService from '../../navigation/NavigationService';
import { NAVIGATION_PRODUCT_DETAIL_PATH } from '../../navigation/types';
import { BORDER_COLOR } from '../../constants';

class FeaturedProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onRowPress = this.onRowPress.bind(this);
  }

  image() {
    let imageUrl = '';
    for (let i = 0; i < this.props.product.custom_attributes.length; i++) {
      const customAttribute = this.props.product.custom_attributes[i];
      if (customAttribute.attribute_code === 'thumbnail') {
        imageUrl = customAttribute.value;
        break;
      }
    }
    return `${magento.getProductMediaUrl()}${imageUrl}`.trim();
  }

  onRowPress() {
    const { product, setCurrentProduct } = this.props;
    setCurrentProduct(product);
    NavigationService.navigate(NAVIGATION_PRODUCT_DETAIL_PATH, {
      title: product.name,
    });
  }

  render() {
    const { product, index } = this.props;
    const firstItemStyle = {};
    if (index === 0) {
      firstItemStyle.marginLeft = 8;
    }
    return (
      <TouchableOpacity
        style={[styles.mainContainer, firstItemStyle]}
        onPress={this.onRowPress}
      >
        <Image
          style={{ flex: 1, height: 120, }}
          resizeMode="contain"
          source={{ uri: this.image() }}
        />
        <Text style={{ padding: 8, fontSize: 13 }}>{product.name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = {
  mainContainer: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    marginRight: 8,
    marginTop: 8,
    marginBottom: 8,
  }
}

FeaturedProductListItem.propTypes = {
  product: PropTypes.object.isRequired,
  setCurrentProduct: PropTypes.func.isRequired,
};

export default FeaturedProductListItem;
