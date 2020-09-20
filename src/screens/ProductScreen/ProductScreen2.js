import React, { useContext, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GenericTemplate, Price, ImageSlider } from '../../common';
import { magento } from '../../magento';
import { NAVIGATION_TO_MEDIA_VIEWER } from '../../navigation/routes';
import { ThemeContext } from '../../theme';
import { SPACING, DIMENS, CUSTOM_ATTRIBUTES_SK } from '../../constants';
import ProductDescription from './ProductDescription';

const propTypes = {
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      sku: PropTypes.string.isRequired,
      product: PropTypes.shape({
        sku: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
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
  currencySymbol,
  currencyRate,
  route: {
    params: { sku, product },
  },
  navigation,
}) => {
  const { theme } = useContext(ThemeContext);
  const media = product?.media_gallery_entries.map(entry => ({
    source: {
      uri: `${magento.getProductMediaUrl()}${entry.file}`,
    },
  }));
  console.log({ sku, product });

  const openMediaViewer = useMemo(
    () => index => {
      navigation.navigate(NAVIGATION_TO_MEDIA_VIEWER, {
        index,
        media,
      });
    },
    [navigation, media],
  );

  return (
    <GenericTemplate scrollable>
      <ImageSlider
        media={media}
        resizeMode="contain"
        containerStyle={styles.imageContainer(theme)}
        height={DIMENS.productScreen.imageSliderHeight}
        onPress={openMediaViewer}
      />
      <Price
        containerStyle={styles.priceContainer(theme)}
        basePriceStyle={styles.price}
        currencySymbol={currencySymbol}
        currencyRate={currencyRate}
        basePrice={product.price}
      />
      <ProductDescription customAttributes={product[CUSTOM_ATTRIBUTES_SK]} />
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  imageContainer: theme => ({
    backgroundColor: theme.surfaceColor,
    marginBottom: SPACING.large,
  }),
  priceContainer: theme => ({
    backgroundColor: theme.surfaceColor,
    padding: SPACING.large,
    marginBottom: SPACING.large,
  }),
  price: {
    fontSize: DIMENS.productScreen.priceFontSize
  },
});

ProductScreen.propTypes = propTypes;

ProductScreen.defaultProps = defaultProps;

const mapStateToProps = ({ magento: magentoReducer }) => {
  const {
    currency: {
      displayCurrencySymbol: currencySymbol,
      displayCurrencyExchangeRate: currencyRate,
    },
  } = magentoReducer;

  return {
    currencySymbol,
    currencyRate,
  };
};

export default connect(mapStateToProps)(ProductScreen);
