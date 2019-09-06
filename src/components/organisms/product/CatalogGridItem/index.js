import React, { useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import NavigationService from '../../../../navigation/NavigationService';
import {
  Text,
  Image,
  Card,
  Price
} from '../../..';
import { NAVIGATION_PRODUCT_DETAIL_PATH } from '../../../../navigation/types';
import { getProductThumbnailFromAttribute } from '../../../../utils/products';
import { ThemeContext } from '../../../../config';

const CatalogGridItem = ({
  /**
   * Product to dispaly
   */
  product,
  /**
   * Currency symbol to be displayed along side price.
   */
  currencySymbol,
  /**
   * Open ProductDetailPage with current product
   */
  openSelectedProduct,
  /**
   * reducer name from where other details about this product need to be taken
   */
  stateAccessor,
  /**
   * product data doesn't contain price for configurable product,
   * fetch price manually for configurable product using sku
   */
  updateItem,
}) => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const extra = useSelector(state => ([product.sku] in state[stateAccessor].extra ? state[stateAccessor].extra[product.sku] : null));
  useEffect(() => {
    // componentDidMount
    if (!extra && product.type_id === 'configurable') {
      dispatch(updateItem(product.sku));
    }
  }, []);

  const onRowPress = () => {
    openSelectedProduct(product, extra ? extra.children : undefined);
    NavigationService.navigate(NAVIGATION_PRODUCT_DETAIL_PATH, {
      title: product.name,
    });
  };

  /**
   * @todo extract it into util function
   */
  const getPrice = () => {
    const priceProps = {};
    const { price } = product;
    priceProps.basePrice = price;
    switch (product.type_id) {
      case 'configurable':
        if (extra && extra.price) {
          if (extra.price.starting === extra.price.ending) {
            priceProps.basePrice = extra.price.starting;
          } else {
            priceProps.startingPrice = extra.price.starting;
            priceProps.endingPrice = extra.price.ending;
          }
        }
        break;
      default:
    }
    return priceProps;
  };

  return (
    <Card
      type="outline"
      style={styles.container(theme)}
      onPress={onRowPress}
    >
      <Image
        source={{ uri: getProductThumbnailFromAttribute(product) }}
        style={styles.imageStyle(theme)}
        resizeMode="contain"
      />
      <View style={styles.detail(theme)}>
        <Text ellipsizeMode="tail" numberOfLines={2}>{product.name}</Text>
        <Price {...getPrice()} currencySymbol={currencySymbol} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    width: theme.dimens.catalogGridItemWidth,
    height: theme.dimens.catalogGridItemHeight,
  }),
  imageStyle: theme => ({
    height: theme.dimens.catalogGridItemImageHeight,
  }),
  detail: theme => ({
    padding: theme.spacing.eight,
    flex: 1,
    justifyContent: 'space-between',
  })
});

CatalogGridItem.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    sku: PropTypes.string.isRequired,
    type_id: PropTypes.string,
    custom_attributes: PropTypes.arrayOf(PropTypes.shape({
      attribute_code: PropTypes.string,
      value: PropTypes.string,
    }))
  }).isRequired,
  currencySymbol: PropTypes.string.isRequired,
  openSelectedProduct: PropTypes.func.isRequired,
  stateAccessor: PropTypes.string.isRequired,
  updateItem: PropTypes.func.isRequired,
};

CatalogGridItem.defaultProps = {};

export default CatalogGridItem;
