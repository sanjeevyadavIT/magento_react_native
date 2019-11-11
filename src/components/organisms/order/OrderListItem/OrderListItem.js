import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Card, Text, Price } from '../../..';
import NavigationService from '../../../../navigation/NavigationService';
import { NAVIGATION_ORDER_DETAIL_SCREEN } from '../../../../navigation/types';
import { ThemeContext } from '../../../../theme';
import { translate } from '../../../../i18n';
import { priceSignByCode } from '../../../../utils/price';

const OrderListItem = ({ item }) => {
  const theme = useContext(ThemeContext);
  const currencySymbol = priceSignByCode(item.order_currency_code);

  const onPress = () => {
    NavigationService.navigate(
      NAVIGATION_ORDER_DETAIL_SCREEN,
      {
        item
      }
    );
  };

  return (
    <Card
      style={styles.mainContainer(theme)}
      onPress={onPress}
    >
      <View style={styles.infoContainer(theme)}>
        <Text>{`${translate('common.order')} # ${item.increment_id}`}</Text>
        <Text>{`${translate('orderScreen.orderCreated')}: ${item.created_at}`}</Text>
        <Text>
          {`${translate('orderScreen.shipTo')} ${item.customer_firstname} ${item.customer_lastname}`}
        </Text>
        <View style={styles.row}>
          <Text>
            {`${translate('orderScreen.orderTotal')}: `}
          </Text>
          <Price
            basePrice={item.grand_total}
            currencySymbol={currencySymbol}
            currencyRate={1}
          />
        </View>
        <Text>{`${translate('orderScreen.orderStatus')}: ${item.status}`}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  mainContainer: theme => ({
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: theme.spacing.small,
    marginRight: theme.spacing.small,
    marginBottom: theme.spacing.small,
  }),
  infoContainer: theme => ({
    flex: 1,
    padding: theme.spacing.small,
  }),
  row: {
    flexDirection: 'row',
  }
});

OrderListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

OrderListItem.defaultProps = {};

export default OrderListItem;
