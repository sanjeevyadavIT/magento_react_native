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
import { getOrderDetail } from '../../store/actions';
import Status from '../../magento/Status';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';
import { priceSignByCode } from '../../utils/price';

// TODO: Show product image in place of placeholder
const OrderDetailScreen = ({
  status,
  orderDetail,
  errorMessage,
  navigation,
  getOrderDetail: _getOrderDetail,
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

  console.log('^', item);

  const renderItem = ({ item: product }) => (
    <Card style={styles.card(theme)}>
      <Image style={styles.imageStyle(theme)} source={{ uri: 'https://via.placeholder.com/100' }} />
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
    width: theme.dimens.orderDetailImageWidth,
    height: theme.dimens.orderDetailImageHeight,
    marginRight: theme.spacing.small,
  }),
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
};

OrderDetailScreen.defaultProps = {
  errorMessage: '',
  orderDetail: null,
};

const mapStateToProps = ({ checkout }) => {
  const { order: orderDetail, orderDetailStatus: status, errorMessage } = checkout;
  return {
    status,
    orderDetail,
    errorMessage,
  };
};

export default connect(mapStateToProps, {
  getOrderDetail,
})(OrderDetailScreen);
