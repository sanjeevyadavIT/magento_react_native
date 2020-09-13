import React, { useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import Text from '../Text/Text';
import Image from '../Image/Image';
import Card from '../Card/Card';
import Price from '../Price/Price';
import { magento } from '../../magento';
import { NAVIGATION_TO_PRODUCT_SCREEN } from '../../navigation/routes';
import { getProductThumbnailFromAttribute } from '../../utils/products';
import { ThemeContext } from '../../theme';
import { ProductType } from '../../types';
import { DIMENS, SPACING } from '../../constants';

const propTypes = {
  product: ProductType.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
  stateAccessor: PropTypes.string.isRequired,
  updateItem: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
  columnCount: PropTypes.number,
};

const defaultProps = {
  columnCount: 1,
};

const CatalogGridItem = ({
  /**
   * Number of colums in `CatalogGrid` being displayed,
   * is specified, will effect `CatalogGridItem` component width.
   *
   * If `CatalogGrid` render items in horizonatl list,
   * then `CatalogGridItem` has fixed width defined by `DIMENS.catalogGridItemWidth`
   *
   * else if `CatalogGrid` render items in a Grid of row * coulumnCount
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
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const extra = useSelector(state =>
    [product.sku] in state[stateAccessor].extra
      ? state[stateAccessor].extra[product.sku]
      : null,
  );
  useEffect(() => {
    // componentDidMount
    if (!extra && product.type_id === 'configurable') {
      dispatch(updateItem(product.sku));
    }
  }, []);

  const onItemPress = () => {
    onPress(product.type_id, product.sku, extra ? extra.children : undefined);
    navigation.navigate(NAVIGATION_TO_PRODUCT_SCREEN, {
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
      style={styles.container(theme, columnCount)}
      onPress={onItemPress}
    >
      <Image
        source={{ uri: product? `${magento.getProductMediaUrl()}${getProductThumbnailFromAttribute(product)}`: '' }}
        style={styles.imageStyle}
        resizeMode="contain"
      />
      <View style={styles.detail}>
        <Text ellipsizeMode="tail" numberOfLines={2}>
          {product.name}
        </Text>
        <Price
          {...getPrice()}
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

CatalogGridItem.propTypes = propTypes;

CatalogGridItem.defaultProps = defaultProps;

export default CatalogGridItem;
