import React from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '../../../../components';
import { addToCart } from '../../../../store/actions';
import { translate } from '../../../../i18n';

/**
 * CTA stands for Call To Action, which will contain
 * add to cart button.
 *
 * If the product is `simple` type product use @param sku to add to cart
 * If the product is `configurable` type use @param selectedProduct.sky to add to cart
 *
 * @todo Show on screen when product added to cart
 *
 * @todo Doesn't handle case when product is `virtual`, `downlodable` or `bundle` case
 */
const CTAButtons = ({
  productType,
  sku,
  quantity,
  selectedProduct,
  cartQuoteId,
  addToCart: _addToCart
}) => {
  const onBtnClick = () => {
    if (productType === 'configurable') {
      // Configurable type product
      if (selectedProduct) {
        const cartItem = {
          sku: selectedProduct.sku,
          qty: quantity,
          quote_id: cartQuoteId
        };
        _addToCart(cartItem);
      }
    } else if (productType === 'simple') {
      // Simple type product
      const cartItem = {
        sku,
        qty: quantity,
        quote_id: cartQuoteId
      };
      _addToCart(cartItem);
    } else {
      // product type either virtual, downlodable or bundle
      Alert.alert(`${translate('productScreen.unsupportedProductType')} ${productType} products`);
      console.log(`App doesn't support ${productType} products`);
    }
  };
  return (
    <Button
      type="solid"
      title={translate('productScreen.addToCartButton')}
      disabled={productType === 'configurable' && !selectedProduct}
      onPress={onBtnClick}
    />
  );
};

CTAButtons.propTypes = {
  productType: PropTypes.string.isRequired,
  sku: PropTypes.string.isRequired,
  cartQuoteId: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  selectedProduct: PropTypes.oneOfType([PropTypes.object, null]),
  addToCart: PropTypes.func.isRequired, // Redux
};

CTAButtons.defaultProps = {
  selectedProduct: null,
};

const mapStateToProps = ({ cart }) => {
  const { cart: { id: cartQuoteId } } = cart;
  return {
    cartQuoteId,
  };
};

export default connect(mapStateToProps, {
  addToCart,
})(CTAButtons);
