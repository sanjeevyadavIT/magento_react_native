import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { Text, Card, Image, Price, GenericTemplate } from '../../common';
import { getOrderDetail, getOrderedProductInfo } from '../../store/actions';
import Status from '../../magento/Status';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';
import { getProductThumbnailFromAttribute } from '../../utils';
import { priceSignByCode } from '../../utils/price';
import { DIMENS, SPACING, CONFIGURABLE_TYPE_SK } from '../../constants';

// TODO: Show product image in place of placeholder
const OrderDetailScreen = ({
  status,
  products,
  orderDetail,
  errorMessage,
  route,
  navigation,
  getOrderDetail: _getOrderDetail,
  getOrderedProductInfo: _getOrderedProductInfo,
}) => {
  const { orderId = -1, item = orderDetail } = route.params;
  const currencySymbol = priceSignByCode(
    (item && item.order_currency_code) || '$',
  );
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (!item && !orderDetail) {
      _getOrderDetail(orderId);
    }
  }, []);

  useEffect(() => {
    if (item) {
      item.items.forEach(_item => {
        if (!(_item.sku in products)) {
          _getOrderedProductInfo(_item.sku);
        }
      });
    }
  }, [item]);

  const getImageUrl = sku =>
    sku in products ? getProductThumbnailFromAttribute(products[sku]) : null;

  const renderItem = ({ item: product }) => (
    <Card style={styles.card}>
      <Image
        style={styles.imageStyle}
        source={{ uri: getImageUrl(product.sku) }}
      />
      <View>
        <Text>{product.name}</Text>
        <Text>{`${translate('common.sku')}: ${product.sku}`}</Text>
        <View style={styles.row}>
          <Text>{`${translate('common.price')}: `}</Text>
          <Price
            basePrice={product.price}
            currencySymbol={currencySymbol}
            currencyRate={1}
          />
        </View>
        <Text>{`${translate('common.quantity')}: ${product.qty_ordered}`}</Text>
        <View style={styles.row}>
          <Text>{`${translate('common.subTotal')}: `}</Text>
          <Price
            basePrice={product.row_total}
            currencySymbol={currencySymbol}
            currencyRate={1}
          />
        </View>
      </View>
    </Card>
  );

  const renderFooter = () => (
    <>
      <Text>{`${translate('ordersScreen.orderStatus')}: ${item.status}`}</Text>
      <View style={styles.row}>
        <Text>{`${translate('common.subTotal')}: `}</Text>
        <Price
          basePrice={item.subtotal}
          currencySymbol={currencySymbol}
          currencyRate={1}
        />
      </View>
      <View style={styles.row}>
        <Text>{`${translate('common.shippingAndHandling')}: `}</Text>
        <Price
          basePrice={item.shipping_amount}
          currencySymbol={currencySymbol}
          currencyRate={1}
        />
      </View>
      <View style={styles.row}>
        <Text>{`${translate('common.discount')}: - `}</Text>
        <Price
          basePrice={Math.abs(item.discount_amount)}
          currencySymbol={currencySymbol}
          currencyRate={1}
        />
      </View>
      <View style={styles.row}>
        <Text>{`${translate('common.grandTotal')}: `}</Text>
        <Price
          basePrice={item.total_due}
          currencySymbol={currencySymbol}
          currencyRate={1}
        />
      </View>
    </>
  );

  const renderChildren = () => {
    if (!item) {
      return <></>;
    }

    return (
      <FlatList
        style={styles.container}
        data={item.items.filter(entity => entity.product_type !== CONFIGURABLE_TYPE_SK)}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        keyExtractor={_item => _item.sku}
      />
    );
  };

  return (
    <GenericTemplate
      status={!item ? status : Status.SUCCESS}
      errorMessage={errorMessage}
    >
      {renderChildren()}
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: SPACING.small,
    marginBottom: SPACING.small,
  },

  imageStyle: {
    resizeMode: 'contain',
    width: DIMENS.ordersScreen.productWidth,
    height: DIMENS.ordersScreen.productHeight,
    marginRight: SPACING.small,
  },
  infoContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
});

OrderDetailScreen.propTypes = {
  status: PropTypes.oneOf(Object.values(Status)).isRequired,
  orderDetail: PropTypes.object,
  errorMessage: PropTypes.string,
  getOrderDetail: PropTypes.func.isRequired,
  getOrderedProductInfo: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
};

OrderDetailScreen.defaultProps = {
  errorMessage: '',
  orderDetail: null,
};

const mapStateToProps = ({ checkout, account }) => {
  const { products } = account;
  const {
    order: orderDetail,
    orderDetailStatus: status,
    errorMessage,
  } = checkout;
  return {
    products,
    status,
    orderDetail,
    errorMessage,
  };
};

export default connect(mapStateToProps, {
  getOrderDetail,
  getOrderedProductInfo,
})(OrderDetailScreen);
