import React from 'react';
import {
  FlatList,
  View,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  CartListItem,
  Text,
  Button,
  MessageView,
  Price,
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
  currencyRate,
}) => {
  const renderRow = ({ item, index }) => (
    <CartListItem
      item={item}
      index={index}
      currencySymbol={currencySymbol}
      currencyRate={currencyRate}
    />
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
    return parseFloat(sum.toFixed(2));
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
      <View style={styles.row}>
        <Text type="heading" bold>
          {`${translate('common.total')} : `}
        </Text>
        <Price
          basePrice={renderTotal()}
          currencyRate={currencyRate}
          currencySymbol={currencySymbol}
        />
      </View>
      <Button
        loading={!allItemPricesAvailable()}
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
      ListFooterComponent={items.length ? renderFooter : <></>}
      ListEmptyComponent={(
        <MessageView
          message={translate('cartScreen.cartEmptyMessage')}
        />
      )}
    />
  );
};

const styles = {
  row: {
    flexDirection: 'row'
  },
};

CartList.propTypes = {
  items: PropTypes.array.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
};

CartList.defaultProps = {};

export default CartList;
