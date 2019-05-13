import React from 'react';
import { View, Picker, ScrollView, StyleSheet } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { BRAND_NAME, PRODUCT_DETAIL_PAGE_SLIDER_HEIGHT } from '../../../constants';
import { PRODUCT, CART } from '../../../reducers/types';
import { getConfigurableProductOptions, uiProductUpdate, addToCart } from '../../../actions';
import { Spinner, Text, Button } from '../..';
import { ProductSliderContainer } from '../../../containers';

// TODO: Improve the render cycle
class ProductDetailPage extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', BRAND_NAME),
  })

  constructor(props) {
    super(props);
    this.renderOptions = this.renderOptions.bind(this);
    this.renderPickerOptions = this.renderPickerOptions.bind(this);
    this.onPressAddToCart = this.onPressAddToCart.bind(this);
  }

  componentDidMount() {
    const {
      product,
      getConfigurableProductOptions: _getConfigurableProductOptions,
    } = this.props;

    if (product.type_id === 'configurable') {
      _getConfigurableProductOptions(product.sku);
    }
  }

  onPressAddToCart() {
    const { product, selectedOptions, cartQuoteId, addToCart: _addToCart } = this.props;
    const qty = 1;
    const cartItem = { sku: product.sku, qty, quote_id: cartQuoteId };
    if (product.type_id === 'simple') {
      _addToCart(cartItem);
    } else if (product.type_id === 'configurable') {
      cartItem.product_option = {};
      cartItem.product_option.extension_attributes = {};
      cartItem.product_option.extension_attributes.configurable_item_options = [];
      Object.keys(selectedOptions).map((key, index) => {
        cartItem.product_option.extension_attributes.configurable_item_options.push({
          option_id: key,
          option_value: selectedOptions[key],
        });
      });
      _addToCart(cartItem);
    } else {
      console.log('Implement functionality for other types of products');
    }
  }

  getDescription = (customAttributes) => {
    for (let i = 0; i < customAttributes.length; i += 1) {
      const customAttribute = customAttributes[i];
      if (customAttribute.attribute_code === 'description') return customAttribute.value;
    }
    return 'Lorem ipseum';
  }

  renderPickerOptions = (values, title) => ([{ label: `Select ${title}`, value: null }, ...values].map(({ label, value }) => <Picker.Item label={label} value={String(value)} key={String(value)} />));

  // TODO: extract this into own component
  renderOptions() {
    const { product, confOptionsLoading, confOptionsError, attributes, selectedOptions } = this.props;
    const { options } = product;

    if (confOptionsLoading) {
      return <Spinner size="small" />;
    }

    if (confOptionsError) {
      // TODO: Disable add to cart and buy now button
      return <Text>{confOptionsError}</Text>
    }

    if (options && Array.isArray(options)) {
      return options.sort((first, second) => first.position - second.position)
        .map((option, index) => {
          if (!attributes[option.attribute_id]) {
            return <Spinner size="small" key={String(index)} />;
          }

          const optionIds = option.values.map(value => String(value.value_index));
          const values = attributes[option.attribute_id].options.filter(({ value }) => optionIds.includes(value));
          return (
            <View key={String(index)}>
              <Text>Select {option.label}</Text>
              <Picker
                selectedValue={selectedOptions[option.attribute_id]}
                style={{ height: 50, flex: 1 }}
                onValueChange={(itemValue, itemIndex) => {
                  this.props.uiProductUpdate({ [option.attribute_id]: itemValue });
                }}
              >
                {this.renderPickerOptions(values, option.label)}
              </Picker>
            </View >
          );
        });
    }
    return null;
  }

  renderActionButtons() {
    const { addToCartLoading, addToCartError } = this.props;
    let addtoCartButton = <Button style={{ flex: 1 }} title="Add to cart" onPress={this.onPressAddToCart} />;
    if (addToCartLoading) {
      addtoCartButton = <Spinner />;
    }
    let addToCartErrorMessage = null;
    if (addToCartError) {
      addToCartErrorMessage = <Text style={{ fontSize: 14, color: 'red' }}>{addToCartError}</Text>;
    }
    return (
      <View>
        {addToCartErrorMessage}
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 8 }}>
          <Button style={{ flex: 1, marginRight: 8 }} title="Add to Wishlist" />
          {addtoCartButton}
        </View>
      </View>
    );
  }

  renderContent() {
    const { product } = this.props;
    if (!product) {
      return <Spinner />;
    }

    return (
      <ScrollView>
        <View>
          <View style={{ height: PRODUCT_DETAIL_PAGE_SLIDER_HEIGHT }}>
            <ProductSliderContainer sku={product.sku} imageHeight={PRODUCT_DETAIL_PAGE_SLIDER_HEIGHT} />
          </View>
          <View>
            <Text>{this.getDescription(product.custom_attributes)}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>price </Text>
            <Text style={{ fontSize: 18, color: 'green' }}>${product.price}</Text>
          </View>
          {this.renderOptions()}
          {this.renderActionButtons()}
        </View>
      </ScrollView>
    );
  }

  render() {
    console.log('Rendering productDetail page')
    console.log(this.props)
    return (
      <View style={{ flex: 1 }}>
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

const mapStateToProps = (state) => {
  const {
    confOptionsLoading,
    confOptionsError,
    addToCartLoading,
    addToCartError,
    attributes,
    selectedOptions,
    current: product,
  } = state[PRODUCT];
  const { cart } = state[CART];
  const cartQuoteId = cart.id;
  return {
    product,
    attributes,
    addToCartLoading,
    addToCartError,
    confOptionsLoading,
    confOptionsError,
    selectedOptions,
    cartQuoteId,
  };
};

export default connect(mapStateToProps, {
  getConfigurableProductOptions,
  uiProductUpdate,
  addToCart,
})(ProductDetailPage);
