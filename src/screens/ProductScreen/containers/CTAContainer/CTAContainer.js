import React from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '../../../../common';
import { addToCart } from '../../../../store/actions';
import { translate } from '../../../../i18n';
import Status from '../../../../magento/Status';

/**
 * CTA stands for Call To Action, which will contain
 * add to cart button.
 *
 * If the product is `simple` type product use @param sku to add to cart
 * If the product is `configurable` type use @param selectedProduct.sku to add to cart
 *
 * @todo Show on screen when product added to cart
 *
 * @todo Doesn't handle case when product is `virtual`, `downlodable` or `bundle` case
 */
const CTAButtons = ({
  status, // Points to Add To Cart status
  errorMessage, // Error message if failed to add item to cart
  productType,
  sku,
  quantity,
  selectedOptions,
  cartQuoteId,
  addToCart: _addToCart
}) => {
  const handleSimpleTypeProductAdd = (productOptions = {}) => {
    const cartItem = {
      sku,
      qty: quantity,
      quote_id: cartQuoteId,
      ...productOptions,
    };
    _addToCart(cartItem);
  };

  const handleConfigurableTypeProductAdd = () => {
    const configurableItemOptions = [];
    Object.keys(selectedOptions).forEach((key) => {
      configurableItemOptions.push({
        option_id: key,
        option_value: selectedOptions[key],
      });
    });

    let productOptions = {};
    if (configurableItemOptions.length) {
      productOptions = {
        product_option: {
          extension_attributes: {
            configurable_item_options: configurableItemOptions,
          },
        },
      };
    }
    handleSimpleTypeProductAdd(productOptions);
  };

  const productTypeNotSupported = () => {
    // product type either virtual, downlodable or bundle
    Alert.alert(`${translate('productScreen.unsupportedProductType')} ${productType} products`);
    console.log(`App doesn't support ${productType} products`);
  };

  const onAddToCartClick = () => {
    switch (productType) {
      case 'simple':
        handleSimpleTypeProductAdd();
        break;
      case 'configurable':
        handleConfigurableTypeProductAdd();
        break;
      default:
        productTypeNotSupported();
    }
  };

  if (status === Status.SUCCESS) {
    Alert.alert(translate('productScreen.addToCartSuccess'));
  } else if (status === Status.ERROR) {
    Alert.alert(errorMessage);
  }

  return (
    <Button
      loading={status === Status.LOADING}
      title={translate('productScreen.addToCartButton')}
      onPress={onAddToCartClick}
    />
  );
};

CTAButtons.propTypes = {
  status: PropTypes.oneOf(Object.values(Status)).isRequired,
  errorMessage: PropTypes.string,
  productType: PropTypes.string.isRequired,
  sku: PropTypes.string.isRequired,
  cartQuoteId: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  selectedOptions: PropTypes.object,
  addToCart: PropTypes.func.isRequired, // Redux
};

CTAButtons.defaultProps = {
  selectedOptions: {},
  errorMessage: '',
};

const mapStateToProps = ({ cart, product }, { sku }) => {
  const {
    current: {
      [sku]: {
        addToCartStatus: status,
        addToCartErrorMessage: errorMessage,
      }
    }
  } = product;
  const { cart: { id: cartQuoteId } } = cart;
  return {
    status,
    errorMessage,
    cartQuoteId,
  };
};

export default connect(mapStateToProps, {
  addToCart,
})(CTAButtons);
