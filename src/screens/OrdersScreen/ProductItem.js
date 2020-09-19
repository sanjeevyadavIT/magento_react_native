import React, { useEffect } from 'react';
import { View, StyleSheet, ViewPropTypes, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { magento } from '../../magento';
import { getProductMedia } from '../../store/actions';
import { Text, Price } from '../../common';
import { translate } from '../../i18n';
import { SPACING, DIMENS } from '../../constants';
import { isObject } from '../../utils';

const propTypes = {
  /**
   * Product in Order
   */
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
  /**
   * Array contaning product media, if fetch is successful
   */
  media: PropTypes.arrayOf(PropTypes.shape({
    file: PropTypes.string,
    id: PropTypes.number,
    label: PropTypes.string,
    media_type: PropTypes.string,
    types: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  /**
   * Order Item doesn't contain product media,
   * so in order to show image, we have to
   * manually fetch media of each order individually
   */
  getProductMedia: PropTypes.func.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  containerStyle: ViewPropTypes.style,
};

const defaultProps = {
  containerStyle: {},
};

// TODO: Fetch Media of each product and show image
const ProductItem = ({
  item: product,
  media,
  currencySymbol = '$',
  containerStyle,
  getProductMedia: _getProductMedia,
}) => {
  let { name, price, row_total: rowTotal } = product;

  useEffect(() => {
    if (!media) {
      _getProductMedia(product.sku);
    }
  }, []);

  if (isObject(product.parent_item)) {
    name = product.parent_item.name || name;
    if (price === 0) {
      price = product.parent_item.price || price;
      rowTotal = product.parent_item.row_total || rowTotal;
    }
  }

  return (
    <View style={[styles.card, containerStyle]}>
      <Image
        style={styles.imageStyle}
        source={{ uri: Array.isArray(media) && media.length > 0? `${magento.getProductMediaUrl()}${media[0].file}` : '' }}
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

const mapStateToProps = ({ product }, { item }) => {
  const {
    cachedProductMedia: { [item.sku]: media },
  } = product;
  return {
    media,
  };
};

export default connect(mapStateToProps, { getProductMedia })(ProductItem);
