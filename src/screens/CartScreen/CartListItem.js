import React, { useEffect } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { magento } from '../../magento';
import { getProductDetail, removeItemFromCart } from '../../store/actions';
import { Card, Image, Text, Price, Icon } from '../../common';
import { translate } from '../../i18n';
import { DIMENS, SPACING } from '../../constants';
import { getProductThumbnailFromAttribute, cartItemType } from '../../utils';

const propTypes = {
  /**
   * Contaning product name, price & sku
   */
  item: cartItemType.isRequired,
  /**
   * Product detail contain more data about product reprsented by item object
   *
   * @source redux
   */
  productDetail: PropTypes.object,
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
  getProductDetail: PropTypes.func.isRequired,
  removeItemFromCart: PropTypes.func.isRequired,
};

const defaultProps = {
  productDetail: undefined,
};

const CartListItem = ({
  item,
  productDetail,
  currencySymbol,
  currencyRate,
  getProductDetail: _getProductDetail,
  removeItemFromCart: _removeItemFromCart,
}) => {

  useEffect(() => {
    // componentDidMount
    if (!productDetail) {
      _getProductDetail(item.sku);
    }
  }, []);

  const onPressRemoveItem = () => {
    Alert.alert(
      translate('cartScreen.removeItemDialogTitle'),
      `${translate('cartScreen.removeItemDialogMessage')}: ${item.name}`,
      [
        {
          text: translate('common.cancel'),
          onPress: () => console.log('Cancel pressed'),
          style: 'cancel',
        },
        {
          text: translate('common.ok'),
          onPress: () => _removeItemFromCart(item.item_id),
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <Card style={styles.mainContainer}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{
          uri: productDetail
            ? `${magento.getProductMediaUrl()}${getProductThumbnailFromAttribute(
                productDetail,
              )}`
            : '',
        }}
      />
      <View style={styles.infoContainer}>
        <Text numberOfLines={2} bold>
          {item.name}
        </Text>
        <Text>{`${translate('common.quantity')} : ${item.qty}`}</Text>
        <View style={styles.row}>
          <Text>{`${translate('common.price')} : `}</Text>
          <Price
            basePrice={productDetail ? productDetail.price : item.price}
            currencyRate={currencyRate}
            currencySymbol={currencySymbol}
          />
        </View>
      </View>
      <Icon
        style={styles.deleteIcon}
        name="delete"
        onPress={onPressRemoveItem}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: SPACING.large,
    overflow: 'hidden',
  },
  image: {
    height: DIMENS.cartScreen.imageSize,
    width: DIMENS.cartScreen.imageSize,
  },
  infoContainer: {
    flex: 1,
    paddingStart: SPACING.medium,
    padding: SPACING.small,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteIcon: {
    paddingTop: SPACING.small,
    paddingEnd: SPACING.tiny,
  },
});

CartListItem.propTypes = propTypes;

CartListItem.defaultProps = defaultProps;

const mapStateToProps = ({ product }, { item }) => {
  const {
    cachedProductDetails: { [item.sku]: productDetail },
  } = product;
  return {
    productDetail,
  };
};

export default connect(mapStateToProps, {
  getProductDetail,
  removeItemFromCart,
})(CartListItem);
