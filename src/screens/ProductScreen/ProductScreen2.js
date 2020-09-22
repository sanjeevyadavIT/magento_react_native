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
  ModalSelect,
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
} from '../../constants';
import ProductDescription from './ProductDescription';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  attributes: PropTypes.object.isRequired,
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
  attributes,
  cartQuoteId,
  currencySymbol,
  currencyRate,
  navigation,
}) => {
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [optionsApiStatus, setOptionsApiStatus] = useState(Status.DEFAULT);
  const [optionsApiErrorMessage, setOptionsApiErrorMessage] = useState('');
  const [addToCartStatus, setAddToCartStatus] = useState(Status.DEFAULT);
  const [quantity, setQuantity] = useState(1);
  const [addToCartAvailable, setAddToCartAvailable] = useState(true); // In case something went wrong, set false
  const { theme } = useContext(ThemeContext);
  const media = product?.media_gallery_entries.map(entry => ({
    source: {
      uri: `${magento.getProductMediaUrl()}${entry.file}`,
    },
  }));
  console.log({ sku, product, media, options, selectedOptions }); // delete later

  useEffect(() => {
    if (product.type_id === CONFIGURABLE_TYPE_SK) {
      setOptionsApiStatus(Status.LOADING);
      magento.admin
        .getConfigurableProductOptions(sku)
        .then(response => {
          setOptions(
            [...response].sort(
              (first, second) => first.position - second.position,
            ),
          );
          setOptionsApiStatus(Status.SUCCESS);
        })
        .catch(error => {
          setOptionsApiErrorMessage(
            error.message || translate('errors.genericError'),
          );
          setOptionsApiStatus(Status.ERROR);
          setAddToCartAvailable(true);
        });
    }
  }, []);

  useEffect(() => {
    // WIP
    if(optionsApiStatus === Status.SUCCESS) {
      options.forEach(option => {
        magento.admin.getAttributeByCode(option.attribute_id)
        .then(response => console.log(response))
        .catch(error => console.log(error))
      })
    }
  }, [optionsApiStatus]);

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
    // TODO: Show Toast if all options are not selected, in case of configurable product
    if (
      !(product.type_id === SIMPLE_TYPE_SK ||
      product.type_id === CONFIGURABLE_TYPE_SK)
    ) {
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
    if (product.type_id === CONFIGURABLE_TYPE_SK) {
      request.cartItem.extension_attributes = {};
      request.cartItem.product_option = {
        extension_attributes: {
          configurable_item_options: Object.keys(selectedOptions).map(key => ({
            option_id: key,
            option_value: selectedOptions[key],
          })),
        },
      };
    }
    magento.customer
      .addItemToCart(request)
      .then(() => {
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
          disabled={!addToCartAvailable}
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
        {/* TODO: Add logic to increase quantity, but quantitiy should not increase over the stocks remaning */}
      </View>
      {product.type_id === CONFIGURABLE_TYPE_SK && (
        <GenericTemplate
          status={optionsApiStatus}
          errorMessage={optionsApiErrorMessage}
          style={styles.optionsContainer(theme)}
        >
          {options.map((option, index) => (
            // TODO: Show label for valueIndex by fetching `/V1/products/attributes/${attributeId}` api
            <ModalSelect
              key={option.attribute_id}
              data={option.values.map(({ value_index: valueIndex }) => ({
                label: valueIndex,
                key: valueIndex,
              }))}
              label={`${translate('common.select')} ${option.label}`}
              disabled={
                option.values.length === 0 || addToCartStatus === Status.LOADING
              }
              onChange={itemKey =>
                setSelectedOptions(prevState => ({
                  ...prevState,
                  [option.attribute_id]: itemKey,
                }))
              }
              style={index < options.length - 1 ? styles.optionContainer : {}}
            />
          ))}
        </GenericTemplate>
      )}
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
  optionsContainer: theme => ({
    backgroundColor: theme.surfaceColor,
    padding: SPACING.large,
    marginBottom: SPACING.large,
  }),
  optionContainer: {
    marginBottom: SPACING.large,
  },
  price: {
    fontSize: DIMENS.productScreen.priceFontSize,
  },
});

ProductScreen.propTypes = propTypes;

ProductScreen.defaultProps = defaultProps;

const mapStateToProps = ({ magento: magentoReducer, cart, product }) => {
  const {
    currency: {
      displayCurrencySymbol: currencySymbol,
      displayCurrencyExchangeRate: currencyRate,
    },
  } = magentoReducer;
  const {
    cart: { id: cartQuoteId },
  } = cart;
  const {
    cachedAttributes: attributes
  } = product;
  return {
    attributes,
    cartQuoteId,
    currencySymbol,
    currencyRate,
  };
};

export default connect(mapStateToProps)(ProductScreen);
