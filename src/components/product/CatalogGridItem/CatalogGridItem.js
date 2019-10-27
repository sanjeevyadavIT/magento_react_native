import React, { useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import NavigationService from '../../../navigation/NavigationService';
import {
  Text,
  Image,
  Card,
  Price
} from '../..';
import { NAVIGATION_PRODUCT_SCREEN } from '../../../navigation/types';
import { getProductThumbnailFromAttribute } from '../../../utils/products';
import { ThemeContext } from '../../../theme';
import { ProductType } from '../../../types';

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
   * Item Click Handler
   */
  onPress,
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

  const onItemPress = () => {
    onPress(product.type_id, product.sku, extra ? extra.children : undefined);
    NavigationService.navigate(NAVIGATION_PRODUCT_SCREEN, {
      product,
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
      onPress={onItemPress}
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
    padding: theme.spacing.small,
    flex: 1,
    justifyContent: 'space-between',
  })
});

CatalogGridItem.propTypes = {
  product: ProductType.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  stateAccessor: PropTypes.string.isRequired,
  updateItem: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
};

CatalogGridItem.defaultProps = {};

export default CatalogGridItem;
