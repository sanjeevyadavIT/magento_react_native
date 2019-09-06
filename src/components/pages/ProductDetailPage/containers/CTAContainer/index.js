import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '../../../..';
import { addToCart } from '../../../../../store/actions';
import { ADD_TO_CART_BUTTON } from '../../../../../constants';

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
  selectedProduct,
  cartQuoteId,
  addToCart: _addToCart
}) => {
  const onBtnClick = () => {
    const qty = 1;
    if (productType === 'configurable') {
      // Configurable type product
      if (selectedProduct) {
        const cartItem = { sku: selectedProduct.sku, qty, quote_id: cartQuoteId };
        _addToCart(cartItem);
      }
    } else if (productType === 'simple') {
      // Simple type product
      const cartItem = { sku, qty, quote_id: cartQuoteId };
      _addToCart(cartItem);
    } else {
      // product type either virtual, downlodable or bundle
      console.log(`App doesn't support ${productType} products`);
    }
  };
  return (
    <Button type="solid" disabled={productType === 'configurable' && !selectedProduct} title={ADD_TO_CART_BUTTON} onPress={onBtnClick} />
  );
};

CTAButtons.propTypes = {
  productType: PropTypes.string.isRequired, // Redux
  sku: PropTypes.string.isRequired, // Redux
  cartQuoteId: PropTypes.number.isRequired,
  selectedProduct: PropTypes.oneOfType([PropTypes.object, null]), // redux
  addToCart: PropTypes.func.isRequired, // Redux
};

CTAButtons.defaultProps = {
  selectedProduct: null,
};

const mapStateToProps = (state) => {
  const { detail: { sku, type_id: productType }, selectedProduct } = state.product;
  const { cart } = state.cart;
  const cartQuoteId = cart.id;
  return {
    productType,
    sku,
    selectedProduct,
    cartQuoteId,
  };
};

export default connect(mapStateToProps, {
  addToCart,
})(CTAButtons);
