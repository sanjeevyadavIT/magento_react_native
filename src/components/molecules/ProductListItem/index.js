import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import NavigationService from '../../../navigation/NavigationService';
import { Text, Image, Card, CardMode } from '../..';
import { NAVIGATION_PRODUCT_DETAIL_PATH } from '../../../navigation/types';
import { BORDER_COLOR } from '../../../constants';
import { getProductThumbnailFromAttribute } from '../../../utils/products';

const ProductListItem = ({
  item, // Required prop
  openSelectedProduct, // Required prop
  stateAccessor,
  updateItem
}) => {
  const dispatch = useDispatch();
  const extra = useSelector(state => ([item.sku] in state[stateAccessor].extra ? state[stateAccessor].extra[item.sku] : null));

  useEffect(() => {
    // componentDidMount
    if (item.type_id === 'configurable') {
      dispatch(updateItem(item.sku));
    }
  }, []);

  const onRowPress = () => {
    openSelectedProduct(item);
    NavigationService.navigate(NAVIGATION_PRODUCT_DETAIL_PATH, {
      title: item.name,
    });
  };

  const getPrice = () => {
    let { price } = item;
    switch (item.type_id) {
      case 'configurable':
        price = extra && extra.price ? extra.price : 0;
        break;
      default:
        price = 0;
    }
    return price;
  };

  return (
    <Card
      mode={CardMode.DEFAULT_MODE}
      style={styles.container}
      onPress={onRowPress}
    >
      <Image
        style={styles.imageStyle}
        resizeMode="contain"
        source={{ uri: getProductThumbnailFromAttribute(item) }}
      />
      <View style={styles.detail}>
        <Text>{item.name}</Text>
        <Text>${getPrice()}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 200,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    marginRight: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  imageStyle: {
    height: 120,
  },
  detail: {
    padding: 8,
  }
});

ProductListItem.propTypes = {
  item: PropTypes.object.isRequired,
  openSelectedProduct: PropTypes.func.isRequired,
  extra: PropTypes.object,
};

ProductListItem.defaultProps = {
  extra: {},
};

export default ProductListItem;
