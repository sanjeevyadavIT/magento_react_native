import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Card, Text, Divider } from '../../common';
import { NAVIGATION_TO_ORDER_DETAIL_SCREEN } from '../../navigation/routes';
import { translate } from '../../i18n';
import { SPACING, CONFIGURABLE_TYPE_SK } from '../../constants';
import {
  orderType,
  isDateValid,
  stringToDate,
  getFormattedDate,
} from '../../utils';
import { priceSignByCode } from '../../utils/price';
import ProductItem from './ProductItem';

const propTypes = {
  item: orderType.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const defaultProps = {};

/**
 * Note: Inside order.items array, If a configurable product was bought,
 * it would contain configurable as well as simple product which was bought,
 * in that case ignore configurable poroducts
 *
 * @param {orderType} item  - Contain order Details
 */
const OrderListItem = ({ item: order, navigation }) => {
  const placedOn = stringToDate(order.created_at);
  const currencySymbol = priceSignByCode(order.order_currency_code);

  const onPress = () => {
    navigation.navigate(NAVIGATION_TO_ORDER_DETAIL_SCREEN, {
      order,
    });
  };

  return (
    <Card style={styles.container} onPress={onPress}>
      <View style={styles.orderDetailsContainer}>
        <View style={styles.orderNumberContainer}>
          <Text type="subheading">{`${translate(
            'common.orderNumber',
          )}: `}</Text>
          <Text type="subheading" bold>
            {order.increment_id}
          </Text>
        </View>
        <Text>{`${translate('common.placedOn')}: ${
          isDateValid(placedOn) ? getFormattedDate(placedOn) : order.created_at
        }`}</Text>
        <Text>{`${translate('common.status')}: ${order.status}`}</Text>
      </View>
      {order.items
        .filter(item => item.product_type !== CONFIGURABLE_TYPE_SK)
        .map(item => (
          <View key={item.sku}>
            <Divider />
            <ProductItem item={item} currencySymbol={currencySymbol} />
          </View>
        ))}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.large,
  },
  orderDetailsContainer: {
    padding: SPACING.small,
  },
  orderNumberContainer: {
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
  },
});

OrderListItem.propTypes = propTypes;

OrderListItem.defaultProps = defaultProps;

export default OrderListItem;
