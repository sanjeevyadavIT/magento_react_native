import React, { useEffect, useContext } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getCartItemProduct,
  removeItemFromCart,
} from '../../store/actions';
import { getProductThumbnailFromAttribute } from '../../utils';
import { Card, Image, Text, Price, Icon } from '../../common';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';
import { DIMENS, SPACING } from '../../constants';

const propTypes = {
  item: PropTypes.object.isRequired,
  product: PropTypes.object,
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
  getCartItemProduct: PropTypes.func.isRequired,
  removeItemFromCart: PropTypes.func.isRequired,
};

const defaultProps = {
  product: undefined,
};

// NOTE: Is it better to create a wapper around CartListItem and extract state in it?
// It is in organisms folder because it is state aware
const CartListItem = ({
  item,
  product: productDetail,
  currencySymbol,
  currencyRate,
  getCartItemProduct: _getCartItemProduct,
  removeItemFromCart: _removeItemFromCart,
}) => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    // componentDidMount
    if (!item.thumbnail && !productDetail) {
      _getCartItemProduct(item.sku);
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

  const getImageUrl = () =>
    productDetail ? getProductThumbnailFromAttribute(productDetail) : '';

  return (
    <Card style={styles.mainContainer}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{ uri: getImageUrl() }}
      />
      <View style={styles.infoContainer}>
        <Text>{item.name}</Text>
        <View style={styles.row}>
          <Text>{`${translate('common.price')} : `}</Text>
          <Price
            basePrice={productDetail ? productDetail.price : item.price}
            currencyRate={currencyRate}
            currencySymbol={currencySymbol}
          />
        </View>
        <Text>{`${translate('common.quantity')} : ${item.qty}`}</Text>
      </View>
      <Icon style={styles.deleteIcon} name="delete" onPress={onPressRemoveItem} />
    </Card>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: SPACING.large,
  },
  image: {
    flex: 1,
    left: 0,
    height: DIMENS.cartScreen.imageSize,
    width: DIMENS.cartScreen.imageSize,
  },
  infoContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  deleteIcon: {
    paddingTop: SPACING.tiny,
    paddingEnd: SPACING.tiny
  }
});

CartListItem.propTypes = propTypes;

CartListItem.defaultProps = defaultProps;

const mapStateToProps = ({ cart }, { item }) => {
  const products = cart.products || {};
  const product = products[item.sku];
  return {
    product,
  };
};

export default connect(mapStateToProps, {
  getCartItemProduct,
  removeItemFromCart,
})(CartListItem);
