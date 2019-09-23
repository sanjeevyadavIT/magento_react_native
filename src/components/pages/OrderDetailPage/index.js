import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { GenericTemplate, Text, Image, Card } from '../..';
import { getOrderDetail } from '../../../store/actions';
import Status from '../../../magento/Status';
import { ThemeContext } from '../../../theme';

// TODO: Show product image in place of placeholder
// TODO: Extract strings in strings.js
// TODO: Handle orderId, when coming for OrderAcknowledgementPage, fetch data
// TODO: use currency symbol from magento reducer
const OrderDetailPage = ({
  navigation,
}) => {
  const dispatch = useDispatch();
  const orderId = navigation.getParam('orderId', -1); // Used when coming from OrderAcknowledgementPage
  let item = navigation.getParam('item', null);
  const status = !item ? useSelector(state => state.checkout.orderDetailStatus) : Status.SUCCESS;
  const errorMessage = useSelector(state => state.checkout.errorMessage);
  const orderDetail = useSelector(state => state.checkout.order);
  let currency = '$';
  const theme = useContext(ThemeContext);

  if (!item && status === Status.DEFAULT) {
    dispatch(getOrderDetail(orderId));
  } else if (!item && status === Status.SUCCESS) {
    item = orderDetail;
  }

  const renderItem = ({ item: product }) => (
    <Card style={styles.card(theme)}>
      <Image style={styles.imageStyle(theme)} source={{ uri: 'https://via.placeholder.com/100' }} />
      <View>
        <Text>{product.name}</Text>
        <Text>{`SKU: ${product.sku}`}</Text>
        <Text>
          {`Price: ${currency} ${product.price}`}
        </Text>
        <Text>{`Qty: ${product.qty_ordered}`}</Text>
        <Text>{`Subtotal: ${currency} ${product.row_total}`}</Text>
      </View>
    </Card>
  );

  const renderFooter = () => (
    <>
      <Text>{`Status: ${item.status}`}</Text>
      <Text>
        {`Subtotal: ${currency} ${item.subtotal}`}
      </Text>
      <Text>{`Shipping & Handling: ${currency} ${item.shipping_amount}`}</Text>
      <Text>{`Discount: - ${currency} ${Math.abs(item.discount_amount)}`}</Text>
      <Text style={{ fontWeight: 'bold' }}>
        {`Grand Total: ${currency} ${item.total_due}`}
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
      isScrollable={false}
      status={status}
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

OrderDetailPage.navigationOptions = ({ navigation }) => {
  const item = navigation.getParam('item', null);
  const orderId = !item ? navigation.getParam('orderId', -1) : item.increment_id;
  return {
    title: `Order no: ${orderId}`
  };
};

OrderDetailPage.propTypes = {};

export default OrderDetailPage;
