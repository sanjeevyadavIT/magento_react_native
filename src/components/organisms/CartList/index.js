import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { CartListItem, Text, Button, MessageView } from '../..';
import NavigationService from '../../../navigation/NavigationService';
import { NAVIGATION_ADDRESS_SCREEN_PATH } from '../../../navigation/types';

// TODO: Make place order button stick at the bottom
// TODO: Make ListEmptyComponent center in the view
// TODO: Extract strings into string.js
const CartList = ({
  items,
}) => {
  const renderRow = ({ item, index }) => (<CartListItem item={item} index={index} />);

  const renderTotal = () => {
    let sum = 0;
    if (items) {
      items.forEach((item) => {
        sum += item.price * item.qty;
      });
    }
    return sum.toFixed(2);
  };

  const renderFooter = () => (
    <View>
      <Text style={styles.priceText}>Total : {renderTotal()}</Text>
      <Button title="Place order" onPress={() => NavigationService.navigate(NAVIGATION_ADDRESS_SCREEN_PATH)} />
    </View>
  );

  return (
    <FlatList
      data={items}
      renderItem={renderRow}
      keyExtractor={item => String(item.item_id)}
      ListFooterComponent={!!items.length && renderFooter}
      ListEmptyComponent={<MessageView message="Cart is empty, Add some products" />}
    />
  );
};

const styles = StyleSheet.create({
  priceText: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

CartList.propTypes = {
  items: PropTypes.array.isRequired,
};

CartList.defaultProps = {};

export default CartList;
