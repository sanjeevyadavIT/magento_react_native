import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import {
  Text,
  Card,
  Image,
  Price,
  GenericTemplate,
} from '../../components';
import { getOrderDetail, getOrderedProductInfo } from '../../store/actions';
import Status from '../../magento/Status';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';
import { getProductThumbnailFromAttribute } from '../../utils';
import { priceSignByCode } from '../../utils/price';

// TODO: Show product image in place of placeholder
const OrderDetailScreen = ({
  status,
  products,
  orderDetail,
  errorMessage,
  navigation,
  getOrderDetail: _getOrderDetail,
  getOrderedProductInfo: _getOrderedProductInfo,
}) => {
  const orderId = navigation.getParam('orderId', -1); // Used when coming from OrderAcknowledgementPage
  const item = navigation.getParam('item', null) || orderDetail;
  const currencySymbol = priceSignByCode((item && item.order_currency_code) || '$');
  const theme = useContext(ThemeContext);

  useEffect(() => {
    if (!item && !orderDetail) {
      _getOrderDetail(orderId);
    }
  }, []);


  useEffect(() => {
    item && item.items.forEach((item) => {
      if (!(item.sku in products)) {
        _getOrderedProductInfo(item.sku);
      }
    });
  }, [item]);

  const getImageUrl = (sku) => (sku in products ? getProductThumbnailFromAttribute(products[sku]) : '');
  const renderItem = ({ item: product }) => (
    <Card style={styles.card(theme)}>
      <Image style={styles.imageStyle(theme)} source={{ uri: getImageUrl(product.sku) }} />
      <View>
        <Text>{product.name}</Text>
        <Text>{`${translate('common.sku')}: ${product.sku}`}</Text>
        <View style={styles.row}>
          <Text>
            {`${translate('common.price')}: `}
          </Text>
          <Price
            basePrice={product.price}
            currencySymbol={currencySymbol}
            currencyRate={1}
          />
        </View>
        <Text>{`${translate('common.quantity')}: ${product.qty_ordered}`}</Text>
        <View style={styles.row}>
          <Text>
            {`${translate('common.subTotal')}: `}
          </Text>
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
      <Text>{`${translate('orderScreen.orderStatus')}: ${item.status}`}</Text>
      <View style={styles.row}>
        <Text>
          {`${translate('common.subTotal')}: `}
        </Text>
        <Price
          basePrice={item.subtotal}
          currencySymbol={currencySymbol}
          currencyRate={1}
        />
      </View>
      <View style={styles.row}>
        <Text>
          {`${translate('common.shippingAndHandling')}: `}
        </Text>
        <Price
          basePrice={item.shipping_amount}
          currencySymbol={currencySymbol}
          currencyRate={1}
        />
      </View>
      <View style={styles.row}>
        <Text>
          {`${translate('common.discount')}: - `}
        </Text>
        <Price
          basePrice={Math.abs(item.discount_amount)}
          currencySymbol={currencySymbol}
          currencyRate={1}
        />
      </View>
      <View style={styles.row}>
        <Text>
          {`${translate('common.grandTotal')}: `}
        </Text>
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
        data={item.items}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        keyExtractor={_item => _item.sku}
      />
    );
  };

  return (
    <GenericTemplate
      scrollable={false}
      status={!item ? status : Status.SUCCESS}
      errorMessage={errorMessage}
    >
      {renderChildren()}
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  card: theme => ({
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: theme.spacing.small,
    marginBottom: theme.spacing.small
  }),

  imageStyle: theme => ({
    resizeMode: 'contain',
    width: theme.dimens.orderDetailImageWidth,
    height: theme.dimens.orderDetailImageHeight,
    marginRight: theme.spacing.small,
  }),
  infoContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row'
  }
});

OrderDetailScreen.navigationOptions = ({ navigation }) => {
  const item = navigation.getParam('item', null);
  const orderId = !item ? navigation.getParam('orderId', -1) : item.increment_id;
  return {
    title: `${translate('orderScreen.orderDetailScreenTitle')}: ${orderId}`
  };
};

OrderDetailScreen.propTypes = {
  status: PropTypes.oneOf(Object.values(Status)).isRequired,
  orderDetail: PropTypes.object,
  errorMessage: PropTypes.string,
  getOrderDetail: PropTypes.func.isRequired,
  getOrderedProductInfo: PropTypes.func.isRequired,
};

OrderDetailScreen.defaultProps = {
  errorMessage: '',
  orderDetail: null,
  product: undefined,
};

const mapStateToProps = ({ checkout, account }) => {
  const { products } = account;
  const { order: orderDetail, orderDetailStatus: status, errorMessage } = checkout;
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
