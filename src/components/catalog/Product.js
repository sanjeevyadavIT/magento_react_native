import React from 'react';
import { View, Text, Button, Picker, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { BRAND_NAME } from '../../constants';
import { PRODUCT } from '../../reducers/types';
import { getProductMedia, getConfigurableProductOptions } from '../../actions/RestActions';
import { Spinner } from '../common';
import ProductMedia from './ProductMedia';

class Product extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', BRAND_NAME),
  })

  constructor(props) {
    super(props);
    this.renderOptions = this.renderOptions.bind(this);
    this.renderPickerOptions = this.renderPickerOptions.bind(this);
  }

  componentDidMount() {
    const {
      product,
      medias,
      getProductMedia: _getProductMedia,
      getConfigurableProductOptions: _getConfigurableProductOptions,
    } = this.props;

    if (product.type_id === 'configurable') {
      _getConfigurableProductOptions(product.sku);
    }

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

  renderPickerOptions(values) {
    return values.map(({ label, value }) => <Picker.Item label={label} value={String(value)} />);
  }

  renderOptions() {
    const { product, attributes } = this.props;
    const state = this.state;
    console.log('===============')
    console.log(product);
    const { options } = product;

    if (options && Array.isArray(options)) {
      return options.sort((first, second) => first.position - second.position)
        .map((option) => {
          if (!attributes[option.attribute_id]) {
            return <Spinner size="small" />
          }

          console.log("()()()")
          const optionIds = option.values.map(value => String(value.value_index))
          console.log(optionIds)
          const values = attributes[option.attribute_id].options.filter(({ value }) => optionIds.includes(value));
          console.log(values)
          return (
            <View>
              <Text>Select {option.label}</Text>
              <Picker
                style={{ height: 50, flex: 1 }}
                onValueChange={(itemValue, itemIndex) => {
                  console.log(itemValue)
                }}
              >
                {this.renderPickerOptions(values)}
              </Picker>
            </View >
          );
        });
    }
    return null;
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
          <View>
            {this.renderOptions()}
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Button style={{ flex: 1, marginRIght: 16 }} title="Buy now" />
            <Button style={{ flex: 1 }} title="Add to cart" />
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
  const { current: product, medias, attributes } = state[PRODUCT];
  return {
    product,
    attributes,
    medias,
  };
};

export default connect(mapStateToProps, {
  getProductMedia,
  getConfigurableProductOptions
})(Product);
