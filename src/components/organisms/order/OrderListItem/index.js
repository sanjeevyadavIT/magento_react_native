import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, Text } from '../../..';
import NavigationService from '../../../../navigation/NavigationService';
import { NAVIGATION_ORDER_DETAIL_SCREEN_PATH } from '../../../../navigation/types';

const OrderListItem = ({ item }) => {
  const currencySymbol = useSelector(state => (state.magento.currency.default_display_currency_code === item.order_currency_code ? state.magento.currency.default_display_currency_symbol : item.order_currency_code));
  const onPress = () => {
    NavigationService.navigate(
      NAVIGATION_ORDER_DETAIL_SCREEN_PATH,
      {
        item
      }
    );
  };

  return (
    <Card
      style={styles.mainContainer}
      onPress={onPress}
    >
      <View style={styles.infoContainer}>
        <Text>{`Order # ${item.increment_id}`}</Text>
        <Text>{`Created: ${item.created_at}`}</Text>
        <Text>
          {`Ship to ${item.customer_firstname} ${item.customer_lastname}`}
        </Text>
        <Text>
          {`Order Total: ${currencySymbol} ${item.grand_total}`}
        </Text>
        <Text>{`Status: ${item.status}`}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  infoContainer: {
    flex: 1,
    padding: 8,
  }
});

OrderListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

OrderListItem.defaultProps = {};

export default OrderListItem;
