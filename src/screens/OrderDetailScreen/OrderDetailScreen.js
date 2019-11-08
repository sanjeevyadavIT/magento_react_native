import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { GenericTemplate, Text, Image, Card } from '../../components';
import { getOrderDetail } from '../../store/actions';
import Status from '../../magento/Status';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';

// TODO: Show product image in place of placeholder
// TODO: Handle orderId, when coming for OrderAcknowledgementPage, fetch data
// TODO: use currency symbol from magento reducer
const OrderDetailScreen = ({
  status,
  orderDetail,
  errorMessage,
  navigation,
  getOrderDetail: _getOrderDetail,
}) => {
  const orderId = navigation.getParam('orderId', -1); // Used when coming from OrderAcknowledgementPage
  const item = navigation.getParam('item', null) || orderDetail;
  const currency = '$';
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
        <Text>
          {`${translate('common.price')}: ${currency} ${product.price}`}
        </Text>
        <Text>{`${translate('common.quantity')}: ${product.qty_ordered}`}</Text>
        <Text>{`${translate('common.subTotal')}: ${currency} ${product.row_total}`}</Text>
      </View>
    </Card>
  );

  const renderFooter = () => (
    <>
      <Text>{`${translate('orderScreen.orderStatus')}: ${item.status}`}</Text>
      <Text>
        {`${translate('common.subTotal')}: ${currency} ${item.subtotal}`}
      </Text>
      <Text>{`${translate('orderScreen.shippingAndHandling')}: ${currency} ${item.shipping_amount}`}</Text>
      <Text>{`${translate('common.discount')}: - ${currency} ${Math.abs(item.discount_amount)}`}</Text>
      <Text style={{ fontWeight: 'bold' }}>
        {`${translate('common.grandTotal')}: ${currency} ${item.total_due}`}
      </Text>
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
  })
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
