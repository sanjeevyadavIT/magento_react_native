import React, { useMemo, useState, useEffect, useContext } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import {
  Card,
  Text,
  Icon,
  Price,
  GenericTemplate,
  Divider,
} from '../../common';
import Status from '../../magento/Status';
import { magento } from '../../magento';
import { translate } from '../../i18n';
import { ThemeContext } from '../../theme';
import {
  orderType,
  isDateValid,
  getFormattedDate,
  stringToDate,
} from '../../utils';
import { priceSignByCode } from '../../utils/price';
import { SPACING, CONFIGURABLE_TYPE_SK } from '../../constants';
import ProductItem from '../OrdersScreen/ProductItem';

const propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      orderId: PropTypes.number,
      order: orderType,
    }),
  }).isRequired,
};

const defaultProps = {};

// TODO: Show product image in place of placeholder
const OrderDetailScreen = ({
  route: {
    params: { orderId = -1, order = {} },
  },
}) => {
  const [apiStatus, setApiStatus] = useState(
    orderId === -1 ? Status.SUCCESS : Status.DEFAULT,
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [orderDetail, setOrderDetail] = useState(order);
  const { theme } = useContext(ThemeContext);
  const listItemStyle = useMemo(() => styles.listItem(theme), [theme]);
  const currencySymbol =
    priceSignByCode(orderDetail.order_currency_code) || '$';
  const placedOn = stringToDate(order.created_at);

  useEffect(() => {
    if (orderId !== -1) {
      magento.admin
        .getOrderDetail(orderId)
        .then(orderResponse => {
          setOrderDetail(orderResponse);
          setApiStatus(Status.SUCCESS);
        })
        .catch(error => {
          setApiStatus(Status.ERROR);
          setErrorMessage(error.message);
        });
    }
  }, []);

  const renderHeader = () => (
    <>
      <Card type="clear" style={styles.headerContainer}>
        <Text>{`${translate('common.status')}: ${orderDetail.status}`}</Text>
        <Text>{`${translate('common.placedOn')}: ${
          isDateValid(placedOn) ? getFormattedDate(placedOn) : order.created_at
        }`}</Text>
        <View style={styles.row}>
          <Text>{`${translate('common.subTotal')}: `}</Text>
          <Price
            basePrice={orderDetail.subtotal}
            currencySymbol={currencySymbol}
            currencyRate={1}
          />
        </View>
        <View style={styles.row}>
          <Text>{`${translate('common.shippingAndHandling')}: `}</Text>
          <Price
            basePrice={orderDetail.shipping_amount}
            currencySymbol={currencySymbol}
            currencyRate={1}
          />
        </View>
        <View style={styles.row}>
          <Text>{`${translate('common.discount')}: - `}</Text>
          <Price
            basePrice={Math.abs(orderDetail.discount_amount)}
            currencySymbol={currencySymbol}
            currencyRate={1}
          />
        </View>
        <View style={styles.row}>
          <Text>{`${translate('common.grandTotal')}: `}</Text>
          <Price
            basePrice={orderDetail.total_due}
            currencySymbol={currencySymbol}
            currencyRate={1}
          />
        </View>
        <Divider style={styles.divider} />
        <Text style={styles.label} type="label">
          {translate('orderDetailScreen.updatesSentOn')}
        </Text>
        <View style={styles.row}>
          <Icon
            name="phone"
            type="antdesign"
            size={14}
            color={theme.successColor}
            style={styles.iconStyle}
          />
          <Text>{orderDetail.billing_address.telephone}</Text>
        </View>
        <View style={styles.row}>
          <Icon
            name="email"
            type="fontisto"
            size={14}
            color={theme.errorColor}
            style={styles.iconStyle}
          />
          <Text>{orderDetail.billing_address.email}</Text>
        </View>
        <Divider style={styles.divider} />
        <Text style={styles.label} type="label">
          {translate('addressScreen.billingAndShippingAddress')}
        </Text>
        <Text bold>{`${orderDetail.billing_address.firstname} ${
          orderDetail.billing_address.lastname || ''
        }`}</Text>
        <Text>{`${orderDetail.billing_address.street.reduce(
          (total, part) => `${total}${part}, `,
          '',
        )}${orderDetail.billing_address.city}, ${
          orderDetail.billing_address.region
        } - ${orderDetail.billing_address.postcode}`}</Text>
      </Card>
      <Text style={styles.listLabel} bold>
        {translate('orderDetailScreen.itemsOrdered')}
      </Text>
    </>
  );

  return (
    <GenericTemplate status={apiStatus} errorMessage={errorMessage}>
      <FlatList
        data={(orderDetail.items || []).filter(
          entity => entity.product_type !== CONFIGURABLE_TYPE_SK,
        )}
        renderItem={({ item }) => (
          <ProductItem
            item={item}
            currencySymbol={currencySymbol}
            containerStyle={listItemStyle}
          />
        )}
        ListHeaderComponent={renderHeader}
        keyExtractor={_item => _item.sku}
      />
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: SPACING.large,
    marginBottom: SPACING.large,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    marginVertical: SPACING.large,
  },
  label: {
    marginBottom: SPACING.tiny,
  },
  iconStyle: {
    marginEnd: SPACING.small,
  },
  listLabel: {
    paddingHorizontal: SPACING.large,
    marginBottom: SPACING.small,
  },
  listItem: theme => ({
    backgroundColor: theme.surfaceColor,
    paddingHorizontal: SPACING.large,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.borderColor,
  }),
});

OrderDetailScreen.propTypes = propTypes;

OrderDetailScreen.defaultProps = defaultProps;

export default OrderDetailScreen;
