import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { magento } from '../../magento';
import { BORDER_COLOR } from '../../constants';

class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onRowPress = this.onRowPress.bind(this);
  }

  onRowPress() {
    const { product, setCurrentProduct, navigate } = this.props;
    setCurrentProduct(product);
    navigate('product', {
      title: product.name,
    });
  }

  image = () => {
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

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.onRowPress}
      >
        <Image
          style={{ flex: 1, height: 120, }}
          resizeMode="contain"
          source={{ uri: this.image() }}
        />
        <Text>{this.props.product.name}</Text>
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
