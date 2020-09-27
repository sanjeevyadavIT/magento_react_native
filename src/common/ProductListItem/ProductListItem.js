import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import Text from '../Text/Text';
import Image from '../Image/Image';
import Card from '../Card/Card';
import Price from '../Price/Price';
import { magento } from '../../magento';
import { NAVIGATION_TO_PRODUCT_SCREEN } from '../../navigation/routes';
import {
  getProductThumbnailFromAttribute,
  getPriceFromChildren,
} from '../../utils/products';
import { ThemeContext } from '../../theme';
import { ProductType } from '../../types';
import { DIMENS, SPACING, CONFIGURABLE_TYPE_SK } from '../../constants';

const propTypes = {
  product: ProductType.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
  columnCount: PropTypes.number,
};

const defaultProps = {
  columnCount: 1,
};

const ProductListItem = ({
  /**
   * Number of colums in `ProductList` being displayed,
   * is specified, will effect `ProductListItem` component width.
   *
   * If `ProductList` render items in horizontal list,
   * then `ProductListItem` has fixed width defined by `DIMENS.catalogGridItemWidth`
   *
   * else if `ProductList` render items in a Grid of row * coulumnCount
   * then `CatalogridItem` width is (total_screen_width) / (columnCount)
   */
  columnCount,
  /**
   * Product to dispaly
   */
  product,
  /**
   * Currency symbol to be displayed along side price.
   */
  currencySymbol,
  /**
   * Exchange rate multiplier as compared to base currency price
   */
  currencyRate,
}) => {
  const { theme } = useContext(ThemeContext);
  const [children, setChildren] = useState(null);
  const [price, setPrice] = useState({
    basePrice: product.price,
  });
  const navigation = useNavigation();

  useEffect(() => {
    // componentDidMount
    if (product.type_id === CONFIGURABLE_TYPE_SK) {
      magento.admin
        .getConfigurableChildren(product.sku)
        .then(response => setChildren(response))
        .catch(error => console.log(error));
    }
  }, []);

  useEffect(() => {
    if (
      product.type_id === CONFIGURABLE_TYPE_SK &&
      Array.isArray(children) &&
      children.length > 0
    ) {
      const priceObject = getPriceFromChildren(children);
      if (priceObject.starting === priceObject.ending) {
        setPrice({ basePrice: priceObject.starting });
      } else {
        setPrice({
          startingPrice: priceObject.starting,
          endingPrice: priceObject.ending,
        });
      }
    }
  }, [children]);

  const onItemPress = () =>
    navigation.navigate(NAVIGATION_TO_PRODUCT_SCREEN, {
      product,
      children,
      sku: product.sku,
      title: product.name,
    });

  return (
    <Card
      type="outline"
      style={styles.container(theme, columnCount)}
      onPress={onItemPress}
    >
      <Image
        source={{
          uri: product
            ? `${magento.getProductMediaUrl()}${getProductThumbnailFromAttribute(
                product,
              )}`
            : '',
        }}
        style={styles.imageStyle}
        resizeMode="contain"
      />
      <View style={styles.detail}>
        <Text ellipsizeMode="tail" numberOfLines={2}>
          {product.name}
        </Text>
        <Price
          {...price}
          currencyRate={currencyRate}
          currencySymbol={currencySymbol}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: (theme, columnCount) => ({
    width:
      columnCount > 1
        ? DIMENS.common.WINDOW_WIDTH / columnCount
        : DIMENS.catalogGridItemWidth,
    height: DIMENS.catalogGridItemHeight,
  }),
  imageStyle: {
    height: DIMENS.catalogGridItemImageHeight,
  },
  detail: {
    padding: SPACING.small,
    flex: 1,
    justifyContent: 'space-between',
  },
});

ProductListItem.propTypes = propTypes;

ProductListItem.defaultProps = defaultProps;

export default ProductListItem;
