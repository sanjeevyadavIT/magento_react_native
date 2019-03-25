import React from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { BASE_MEDIA_URL } from '../../constants';
import { PRODUCT } from '../../reducers/types';
import { getProductDetail } from '../../actions/RestActions';

class Product extends React.Component {
  renderImage = (images) => {
    images.map(image => console.log(`${BASE_MEDIA_URL}/catalog/product${image.file}`))
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {images.map(image => (<Image source={{ uri: `${BASE_MEDIA_URL}/catalog/product${image.file}` }} style={{ borderColor: '#222', borderWidth: 1, width: 150, height: 150 }} />))}
      </View>
    );

  }

  getDescription = (customAttributes) => {
    for (let i = 0; i < customAttributes.length; i++) {
      const customAttribute = customAttributes[i];
      if (customAttribute.attribute_code === 'description') return customAttribute.value;
    }
    return 'Lorem ipseum';
  }

  renderContent() {
    const { [PRODUCT]: productData, getProductDetail: _getProductDetail } = this.props;
    if (productData.product) {
      const { product } = productData;
      return (
        <ScrollView>
          <View>
            <Text>{product.name}</Text>
            {this.renderImage(product.media_gallery_entries)}
            <View style={{}}>
              <Text>{this.getDescription(product.custom_attributes)}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>price </Text>
              <Text style={{ fontSize: 18, color: 'green' }}>${product.price}</Text>
            </View>
          </View>
        </ScrollView>
      );
    }
    _getProductDetail(productData.currentProductSku);
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
  [PRODUCT]: state[PRODUCT]
});

export default connect(mapStateToProps, { getProductDetail })(Product);
