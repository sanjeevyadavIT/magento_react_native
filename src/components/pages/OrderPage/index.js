import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { Text, Image, Card, CardMode } from '../..';
import { priceSignByCode } from '../../../utils/price';

// TODO: Show product image in place of placeholder
const OrderPage = ({
  navigation,
}) => {
  const item = navigation.getParam('item', null);
  const currency = priceSignByCode(item.order_currency_code);
  const renderItem = ({ item: product }) => (
    <Card mode={CardMode.OUTLINE_MODE} style={styles.card}>
      <Image style={styles.imageStyle} source={{ uri: 'https://via.placeholder.com/100' }} />
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

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 8,
    marginBottom: 8
  },
  imageStyle: {
    width: 100,
    height: 100,
    marginRight: 8,
  }
});

OrderPage.navigationOptions = ({ navigation }) => ({
  title: `Order no: ${navigation.getParam('item', {}).increment_id}`,
});

OrderPage.propTypes = {};

export default OrderPage;
