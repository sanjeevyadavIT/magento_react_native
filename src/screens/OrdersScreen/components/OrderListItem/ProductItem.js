import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Text, Price, Image } from '../../../../common';
import { translate } from '../../../../i18n';
import { SPACING, DIMENS } from '../../../../constants';
import { isObject } from '../../../../utils';

const propTypes = {
  item: PropTypes.shape({
    sku: PropTypes.string,
    price: PropTypes.number,
    row_total: PropTypes.nuymber,
    parent_item: PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number,
    row_total: PropTypes.nuymber,
    }),
  }).isRequired,
  currencySymbol: PropTypes.string.isRequired,
};

const defaultProps = {};

const ProductItem = ({ item: product, currencySymbol = '$' }) => {
  let { name, price, rowTotal } = product;

  if (isObject(product.parent_item)) {
    name = product.parent_item.name || name;
    if (price === 0) {
      price = product.parent_item.price || price;
      rowTotal = product.parent_item.row_total || rowTotal;
    }
  }

  return (
    <View style={styles.card}>
      <Image
        style={styles.imageStyle}
        source={{ uri: 'https://via.placeholder.com/150' }}
      />
      <View style={styles.detailContainer}>
        <Text bold>{name}</Text>
        <Text>{`${translate('common.sku')}: ${product.sku}`}</Text>
        <Text>{`${translate('common.quantity')}: ${product.qty_ordered}`}</Text>
        <View style={styles.row}>
          <Text>{`${translate('common.price')}: `}</Text>
          <Price
            basePrice={price}
            currencySymbol={currencySymbol}
            currencyRate={1}
          />
        </View>
        {product.qty_ordered > 1 && (
          <View style={styles.row}>
            <Text>{`${translate('common.subTotal')}: `}</Text>
            <Price
              basePrice={rowTotal}
              currencySymbol={currencySymbol}
              currencyRate={1}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: SPACING.small,
  },
  imageStyle: {
    resizeMode: 'cover',
    width: DIMENS.ordersScreen.productWidth,
    height: DIMENS.ordersScreen.productHeight,
    marginRight: SPACING.small,
  },
  detailContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
});

ProductItem.propTypes = propTypes;

ProductItem.defaultProps = defaultProps;

export default ProductItem;
