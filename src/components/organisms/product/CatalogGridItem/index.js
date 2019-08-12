import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import NavigationService from '../../../../navigation/NavigationService';
import { Text, Image, Card } from '../../..';
import { NAVIGATION_PRODUCT_DETAIL_PATH } from '../../../../navigation/types';
import { getProductThumbnailFromAttribute } from '../../../../utils/products';

// TODO: If name is in one line, price is appearing just after and if the name occupies two line, price is appearing down, ceating uneven view
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
   * TODO: Add description
   */
  updateItem
}) => {
  const dispatch = useDispatch();
  const extra = useSelector(state => ([product.sku] in state[stateAccessor].extra ? state[stateAccessor].extra[product.sku] : null));

  useEffect(() => {
    // componentDidMount
    if (!extra && product.type_id === 'configurable') {
      dispatch(updateItem(product.sku));
    }
  }, []);

  const onRowPress = () => {
    openSelectedProduct(product);
    NavigationService.navigate(NAVIGATION_PRODUCT_DETAIL_PATH, {
      title: product.name,
    });
  };

  const getPrice = () => {
    let { price } = product;
    switch (product.type_id) {
      case 'configurable':
        price = extra && extra.price ? extra.price : 0;
        break;
      default:
    }
    return price;
  };

  return (
    <Card
      type="outline"
      style={styles.container}
      onPress={onRowPress}
    >
      <Image
        style={styles.imageStyle}
        resizeMode="contain"
        source={{ uri: getProductThumbnailFromAttribute(product) }}
      />
      <View style={styles.detail}>
        <Text ellipsizeMode="tail" numberOfLines={2}>{product.name}</Text>
        <Text>{currencySymbol + getPrice()}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 200,
  },
  imageStyle: {
    height: 120,
  },
  detail: {
    padding: 8,
  }
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
