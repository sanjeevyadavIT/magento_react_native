import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { BRAND_NAME } from '../../constants';
import { PRODUCT } from '../../reducers/types';
import { getProductMedia } from '../../actions/RestActions';
import { Spinner } from '../common';
import ProductMedia from './ProductMedia';

class Product extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', BRAND_NAME),
  })

  componentDidMount() {
    const { product, medias, getProductMedia: _getProductMedia } = this.props;

    if (!medias || !medias[product.sku]) {
      _getProductMedia(product.sku);
    }
  }

  renderImage = (sku, medias) => (
    <ProductMedia media={medias[sku]} />
  )

  getDescription = (customAttributes) => {
    for (let i = 0; i < customAttributes.length; i++) {
      const customAttribute = customAttributes[i];
      if (customAttribute.attribute_code === 'description') return customAttribute.value;
    }
    return 'Lorem ipseum';
  }

  renderContent() {
    const { product, medias } = this.props;
    if (!product) {
      return <Spinner />;
    }

    return (
      <ScrollView>
        <View>
          {/* <Text>{product.name}</Text> */}
          {this.renderImage(product.sku, medias)}
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderContent()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const product = state[PRODUCT].current;
  const medias = state[PRODUCT].medias;
  return {
    product,
    medias,
  };
};

export default connect(mapStateToProps, { getProductMedia })(Product);
