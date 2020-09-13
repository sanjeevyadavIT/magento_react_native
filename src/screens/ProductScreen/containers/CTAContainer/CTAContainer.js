import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NAVIGATION_TO_ALERT_DIALOG } from '../../../../navigation/routes';
import { Button } from '../../../../common';
import { addToCart } from '../../../../store/actions';
import { translate } from '../../../../i18n';
import Status from '../../../../magento/Status';

const propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  status: PropTypes.oneOf(Object.values(Status)).isRequired,
  errorMessage: PropTypes.string,
  productType: PropTypes.string.isRequired,
  sku: PropTypes.string.isRequired,
  cartQuoteId: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  selectedOptions: PropTypes.object,
  addToCart: PropTypes.func.isRequired, // Redux
};

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
  loggedIn,
  status, // Points to Add To Cart status
  errorMessage, // Error message if failed to add item to cart
  productType,
  sku,
  quantity,
  selectedOptions,
  cartQuoteId,
  addToCart: _addToCart,
}) => {
  const navigation = useNavigation();
  useEffect(() => {
    if (status === Status.SUCCESS) {
      Toast.show(translate('productScreen.addToCartSuccess'), Toast.LONG);
    } else if (status === Status.ERROR) {
      Toast.show(errorMessage, Toast.LONG);
    }
  }, [status]);

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
    Object.keys(selectedOptions).forEach(key => {
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
    navigation.navigate(NAVIGATION_TO_ALERT_DIALOG, {
      dismissible: true,
      hideNegativeButton: true,
      title: translate('common.attention'),
      description: `${translate(
        'productScreen.unsupportedProductType',
      )} ${productType} products`,
    });
  };

  const onAddToCartClick = () => {
    if (!loggedIn) {
      navigation.navigate(NAVIGATION_TO_ALERT_DIALOG, {
        title: translate('common.hello'),
        description: translate('productScreen.loginPromptMessage'),
        loginMode: true,
      });
      return;
    }
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

  return (
    <Button
      loading={status === Status.LOADING}
      title={translate('productScreen.addToCartButton')}
      onPress={onAddToCartClick}
    />
  );
};

CTAButtons.propTypes = propTypes;

CTAButtons.defaultProps = {
  selectedOptions: {},
  errorMessage: '',
};

const mapStateToProps = ({ cart, product, account }, { sku }) => {
  const { loggedIn } = account;
  const {
    current: {
      [sku]: { addToCartStatus: status, addToCartErrorMessage: errorMessage },
    },
  } = product;
  const {
    cart: { id: cartQuoteId },
  } = cart;
  return {
    loggedIn,
    status,
    errorMessage,
    cartQuoteId,
  };
};

export default connect(mapStateToProps, {
  addToCart,
})(CTAButtons);
