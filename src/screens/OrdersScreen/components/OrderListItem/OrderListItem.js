import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { Card, Text, Price } from '../../../../common';
import { NAVIGATION_TO_ORDER_DETAIL_SCREEN } from '../../../../navigation';
import { ThemeContext } from '../../../../theme';
import { translate } from '../../../../i18n';
import { SPACING } from '../../../../constants';
import { priceSignByCode } from '../../../../utils/price';

const OrderListItem = ({ item }) => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const currencySymbol = priceSignByCode(item.order_currency_code);

  const onPress = () => {
    navigation.navigate(NAVIGATION_TO_ORDER_DETAIL_SCREEN, {
      item,
    });
  };

  return (
    <Card style={styles.mainContainer(theme)} onPress={onPress}>
      <View style={styles.infoContainer(theme)}>
        <Text>{`${translate('common.order')} # ${item.increment_id}`}</Text>
        <Text>{`${translate('orderScreen.orderCreated')}: ${
          item.created_at
        }`}</Text>
        <Text>
          {`${translate('orderScreen.shipTo')} ${
            item.billing_address.firstname
          } ${item.billing_address.lastname}`}
        </Text>
        <View style={styles.row}>
          <Text>{`${translate('orderScreen.orderTotal')}: `}</Text>
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
    backgroundColor: theme.white,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: SPACING.small,
    marginRight: SPACING.small,
    marginBottom: SPACING.small,
  }),
  infoContainer: theme => ({
    flex: 1,
    padding: SPACING.small,
  }),
  row: {
    flexDirection: 'row',
  },
});

OrderListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

OrderListItem.defaultProps = {};

export default OrderListItem;
