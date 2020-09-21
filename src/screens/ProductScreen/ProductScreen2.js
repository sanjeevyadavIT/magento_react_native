import React, { useEffect, useContext, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import {
  GenericTemplate,
  Price,
  ImageSlider,
  Button,
} from '../../common';
import Status from '../../magento/Status';
import { magento } from '../../magento';
import { NAVIGATION_TO_MEDIA_VIEWER } from '../../navigation/routes';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';
import {
  SPACING,
  DIMENS,
  CUSTOM_ATTRIBUTES_SK,
  SIMPLE_TYPE_SK,
  CONFIGURABLE_TYPE_SK,
  LIMITS,
} from '../../constants';
import ProductDescription from './ProductDescription';

const propTypes = {
  cartQuoteId: PropTypes.number.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      sku: PropTypes.string.isRequired,
      product: PropTypes.shape({
        sku: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        type_id: PropTypes.oneOf([SIMPLE_TYPE_SK, CONFIGURABLE_TYPE_SK]),
        media_gallery_entries: PropTypes.arrayOf(
          PropTypes.shape({
            disabled: PropTypes.bool,
            file: PropTypes.string,
            id: PropTypes.number,
            label: PropTypes.string,
            media_type: PropTypes.oneOf(['image', 'video']),
            position: PropTypes.number,
            types: PropTypes.arrayOf(PropTypes.string),
          }),
        ),
      }),
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const defaultProps = {};

const ProductScreen = ({
  route: {
    params: { sku, product },
  },
  cartQuoteId,
  currencySymbol,
  currencyRate,
  navigation,
}) => {
  console.log({ sku, product }); // delete later
  const [addToCartStatus, setAddToCartStatus] = useState(Status.DEFAULT);
  const [quantity, setQuantity] = useState(1);
  const { theme } = useContext(ThemeContext);
  const media = product?.media_gallery_entries.map(entry => ({
    source: {
      uri: `${magento.getProductMediaUrl()}${entry.file}`,
    },
  }));

  useEffect(() => {
    if (addToCartStatus === Status.SUCCESS) {
      Toast.show(translate('productScreen.addToCartSuccess'), Toast.LONG);
    }
  }, [addToCartStatus]);

  const openMediaViewer = useMemo(
    () => index => {
      navigation.navigate(NAVIGATION_TO_MEDIA_VIEWER, {
        index,
        media,
      });
    },
    [navigation, media],
  );

  const onAddToCartClick = () => {
    // Add validation if needed
    if (product.type_id !== SIMPLE_TYPE_SK) {
      Toast.show(
        translate('productScreen.unsupportedProductType').replace(
          '%s',
          product.type_id,
        ),
        Toast.LONG,
      );
      return;
    }
    setAddToCartStatus(Status.LOADING);
    const request = {
      cartItem: {
        sku,
        qty: quantity,
        quote_id: cartQuoteId,
      },
    };
    magento.customer
      .addItemToCart(request)
      .then(response => {
        console.log(response);
        setAddToCartStatus(Status.SUCCESS);
      })
      .catch(error => {
        Toast.show(
          error.message || translate('errors.genericError'),
          Toast.LONG,
        );
        setAddToCartStatus(Status.ERROR);
      });
  };

  return (
    <GenericTemplate
      scrollable
      footer={
        <Button
          style={styles.addToCart}
          loading={addToCartStatus === Status.LOADING}
          title={translate('productScreen.addToCartButton')}
          onPress={onAddToCartClick}
        />
      }
    >
      <ImageSlider
        media={media}
        resizeMode="contain"
        containerStyle={styles.imageContainer(theme)}
        height={DIMENS.productScreen.imageSliderHeight}
        onPress={openMediaViewer}
      />
      <View style={styles.priceContainer(theme)}>
        <Price
          basePriceStyle={styles.price}
          currencySymbol={currencySymbol}
          currencyRate={currencyRate}
          basePrice={product.price}
        />
        {/* <TextInput
          value={quantity}
          containerStyle={{ width: 40 }}
          keyboardType="numeric"
          disabled={addToCartStatus === Status.LOADING}
          onChangeText={setQuantity}
          onBlur={() => {
            if (quantity < 1) {
              setQuantity(1);
            } else if (quantity > LIMITS.MAX_QUANITY_ALLOW_TO_CART) {
              setQuantity(LIMITS.MAX_QUANITY_ALLOW_TO_CART);
            }
          }}
        /> */}
      </View>
      <ProductDescription customAttributes={product[CUSTOM_ATTRIBUTES_SK]} />
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  addToCart: {
    borderRadius: 0,
  },
  imageContainer: theme => ({
    backgroundColor: theme.surfaceColor,
    marginBottom: SPACING.large,
  }),
  priceContainer: theme => ({
    flexDirection: 'row',
    backgroundColor: theme.surfaceColor,
    padding: SPACING.large,
    marginBottom: SPACING.large,
  }),
  price: {
    fontSize: DIMENS.productScreen.priceFontSize,
  },
});

ProductScreen.propTypes = propTypes;

ProductScreen.defaultProps = defaultProps;

const mapStateToProps = ({ magento: magentoReducer, cart }) => {
  const {
    currency: {
      displayCurrencySymbol: currencySymbol,
      displayCurrencyExchangeRate: currencyRate,
    },
  } = magentoReducer;
  const {
    cart: { id: cartQuoteId },
  } = cart;
  return {
    cartQuoteId,
    currencySymbol,
    currencyRate,
  };
};

export default connect(mapStateToProps)(ProductScreen);
