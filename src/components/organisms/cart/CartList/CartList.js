import React from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  CartListItem,
  Text,
  Button,
  MessageView,
  Spinner
} from '../../..';
import NavigationService from '../../../../navigation/NavigationService';
import { NAVIGATION_ADDRESS_SCREEN } from '../../../../navigation/types';
import { translate } from '../../../../i18n';

// TODO: Make place order button stick at the bottom
// TODO: Make ListEmptyComponent center in the view
// FIXME: For some products the price in items[i] are 0 and for some actual value, hence need to fetch each item price individually
// FIXME: The logic has become two complex, extract into smaller components
const CartList = ({
  items,
  extra,
  currencySymbol,
}) => {
  const renderRow = ({ item, index }) => (
    <CartListItem item={item} index={index} currencySymbol={currencySymbol} />
  );

  const allItemPricesAvailable = () => {
    for (let i = 0; i < items.length; i += 1) {
      const { [items[i].sku]: product } = extra;
      if (!items[i].price) {
        // don't nest below if with above if
        if (!product || !product.price) {
          return false;
        }
      }
    }
    return true;
  };

  const renderTotal = () => {
    let sum = 0;
    if (items) {
      items.forEach(({ price, sku, qty }) => {
        const { [sku]: product } = extra;
        if (!price && product && product.price) {
          price = product.price;
        }

        sum += price * qty;
      });
    }
    return sum.toFixed(2);
  };

  const handlePlaceOrder = () => {
    if (allItemPricesAvailable()) {
      NavigationService.navigate(NAVIGATION_ADDRESS_SCREEN);
    } else {
      Alert.alert(translate('cartScreen.priceNotAvailable'));
    }
  };

  const renderFooter = () => (
    <View>
      <Text type="heading" bold>{`${translate('common.total')} : ${currencySymbol + renderTotal()}`}</Text>
      <Button
        title={translate('cartScreen.placeOrderButton')}
        onPress={handlePlaceOrder}
      />
    </View>
  );

  return (
    <FlatList
      data={items}
      renderItem={renderRow}
      keyExtractor={item => String(item.item_id)}
      ListFooterComponent={!!items.length ? (allItemPricesAvailable() ? renderFooter : <Spinner />) : <></>}
      ListEmptyComponent={<MessageView message={translate('cartScreen.cartEmptyMessage')} />}
    />
  );
};

const styles = StyleSheet.create({});

CartList.propTypes = {
  items: PropTypes.array.isRequired,
};

CartList.defaultProps = {};

export default CartList;
