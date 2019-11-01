import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, Text } from '../../..';
import NavigationService from '../../../../navigation/NavigationService';
import { NAVIGATION_ORDER_DETAIL_SCREEN } from '../../../../navigation/types';
import { ThemeContext } from '../../../../theme';
import { translate } from '../../../../i18n';

const OrderListItem = ({ item }) => {
  const theme = useContext(ThemeContext);
  const currencySymbol = useSelector(state => (state.magento.currency.default_display_currency_code === item.order_currency_code ? state.magento.currency.default_display_currency_symbol : item.order_currency_code));

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
        <Text>
          {`${translate('orderScreen.orderTotal')}: ${currencySymbol} ${item.grand_total}`}
        </Text>
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
  })
});

OrderListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

OrderListItem.defaultProps = {};

export default OrderListItem;
