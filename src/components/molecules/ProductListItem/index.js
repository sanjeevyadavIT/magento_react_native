import React from 'react';
import PropTypes from 'prop-types';
import NavigationService from '../../../navigation/NavigationService';
import { Text, Image, Card, CardMode } from '../..';
import { NAVIGATION_PRODUCT_DETAIL_PATH } from '../../../navigation/types';
import { BORDER_COLOR } from '../../../constants';
import { getProductThumbnailFromAttribute } from '../../../utils/products';

const ProductListItem = ({
  product,
  extra,
  openSelectedProduct,
}) => {
  const onRowPress = () => {
    openSelectedProduct(product);
    NavigationService.navigate(NAVIGATION_PRODUCT_DETAIL_PATH, {
      title: product.name,
    });
  };

  const getPrice = () => {
    let price = 0;
    switch (product.type_id) {
      case 'configurable':
        price = extra.price ? extra.price : price;
        break;
      case 'simple':
        price = product.price;
        break;
      default:
        price = 0;
    }
    return price;
  };

  return (
    <Card
      mode={CardMode.DEFAULT_MODE}
      style={styles.horizonatlContainer}
      onPress={onRowPress}
    >
      <Image
        style={{ flex: 1, height: 120, }}
        resizeMode="contain"
        source={{ uri: getProductThumbnailFromAttribute(product) }}
      />
      <Text>{product.name}</Text>
      <Text>${getPrice()}</Text>
    </Card>
  );
};

const styles = {
  container: {
    flex: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: BORDER_COLOR,
    height: 160,
    alignItems: 'stretch',
  },
  horizonatlContainer: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    marginRight: 8,
    marginTop: 8,
    marginBottom: 8,
  }
};

ProductListItem.propTypes = {
  product: PropTypes.object.isRequired,
  extra: PropTypes.object,
  openSelectedProduct: PropTypes.func.isRequired,
};

ProductListItem.defaultProps = {
  extra: {},
};

export default ProductListItem;
