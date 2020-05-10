import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  placeCartOrder,
  createQuoteId,
  resetPaymentState,
} from '../../store/actions';
import {
  Text,
  Price,
  Button,
  ModalSelect,
  GenericTemplate
} from '../../common';
import {
  NAVIGATION_TO_HOME_SCREEN,
  NAVIGATION_TO_ORDER_CONFIRMATION_SCREEN
} from '../../navigation';
import Status from '../../magento/Status';
import { translate } from '../../i18n';
import { SPACING } from '../../constants';
import { ThemeContext } from '../../theme';
import { priceSignByCode } from '../../utils/price';

// TODO: Support `Cash On Delivery` Option, its Configuration name is `cashondelivery`
const PaymentScreen = ({
  payment,
  orderStatus,
  orderId,
  billingAddress,
  navigation,
  currencyCode,
  currencySymbol,
  baseCurrencySymbol,
  currencyRate,
  placeCartOrder: _placeCartOrder,
  createQuoteId: _createQuoteId,
  resetPaymentState: _resetPaymentState
}) => {
  const { theme } = useContext(ThemeContext);
  const [paymentCode, setPaymentCode] = useState();

  useEffect(() => (() => {
    // componentDidUnmount: Reset Payment related logic in Redux
    _resetPaymentState();
  }), []);

  useEffect(() => {
    if (orderStatus === Status.SUCCESS) {
      _createQuoteId();
      navigation.reset({
        index: 1,
        routes: [{ name: NAVIGATION_TO_HOME_SCREEN }, { name: NAVIGATION_TO_ORDER_CONFIRMATION_SCREEN, params: { status: Status.SUCCESS, orderId } }],
      });
    }
  }, [orderStatus]);

  const placeOrder = () => {
    if (!paymentCode) return;

    const paymentInformation = {
      billingAddress: {
        region: billingAddress.region,
        region_id: billingAddress.region_id,
        region_code: billingAddress.region_code,
        country_id: billingAddress.country_id,
        street: billingAddress.street,
        telephone: billingAddress.telephone,
        postcode: billingAddress.postcode,
        city: billingAddress.city,
        firstname: billingAddress.firstname,
        lastname: billingAddress.lastname,
        email: billingAddress.email,
      },
      paymentMethod: {
        method: paymentCode
      }
    };
    _placeCartOrder(paymentInformation);
  };

  const renderPaymentMethods = () => {
    if (!payment || !payment.payment_methods.length) {
      return <Text>{translate('paymentScreen.noPaymentAvailable')}</Text>;
    }

    const data = payment.payment_methods.map(({ code, title }) => ({
      label: title,
      key: code
    }));

    return (
      <ModalSelect
        label={translate('paymentScreen.selectOption')}
        data={data}
        style={styles.defaultMargin(theme)}
        onChange={(itemKey, item) => setPaymentCode(itemKey)}
      />
    );
  };

  const renderOrderSummary = () => {
    const {
      totals: {
        base_currency_code: baseCurrencyCode,
        base_subtotal: baseSubTotal,
        base_shipping_incl_tax: shippingTotal,
        base_grand_total: grandTotal,
      }
    } = payment;

    return (
      <View style={styles.defaultMargin(theme)}>
        <View style={styles.row}>
          <Text>{`${translate('common.subTotal')}: `}</Text>
          <Price
            basePrice={baseSubTotal}
            currencySymbol={currencySymbol}
            currencyRate={currencyRate}
          />
        </View>
        <View style={styles.row}>
          <Text>{`${translate('common.shippingAndHandling')}: `}</Text>
          <Price
            basePrice={shippingTotal}
            currencySymbol={currencySymbol}
            currencyRate={currencyRate}
          />
        </View>
        <View style={styles.row}>
          <Text>{`${translate('common.grandTotal')}: `}</Text>
          <Price
            basePrice={grandTotal}
            currencySymbol={currencySymbol}
            currencyRate={currencyRate}
          />
        </View>
        {
          baseCurrencyCode !== currencyCode && (
            <View style={styles.row}>
              <Text>{`${translate('paymentScreen.youWillBeCharged')}: `}</Text>
              <Price
                basePrice={grandTotal}
                currencySymbol={baseCurrencySymbol || priceSignByCode(baseCurrencyCode)}
                currencyRate={1}
              />
            </View>
          )
        }
      </View>
    );
  };

  const renderButton = () => (
    <Button
      loading={orderStatus === Status.LOADING}
      title={translate('paymentScreen.placeOrderButton')}
      onPress={placeOrder}
    />
  );

  return (
    <GenericTemplate
      scrollable={false}
      footer={renderButton()}
    >
      {renderPaymentMethods()}
      {renderOrderSummary()}
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  defaultMargin: theme => ({
    marginTop: SPACING.large,
  }),
  row: {
    flexDirection: 'row'
  },
});

PaymentScreen.propTypes = {
  billingAddress: PropTypes.object,
  payment: PropTypes.object,
  orderStatus: PropTypes.oneOf(Object.values(Status)).isRequired,
  orderId: PropTypes.string,
  placeCartOrder: PropTypes.func.isRequired,
  createQuoteId: PropTypes.func.isRequired,
  currencyCode: PropTypes.string.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  baseCurrencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
  resetPaymentState: PropTypes.func.isRequired,
};

PaymentScreen.defaultProps = {
  billingAddress: {},
  payment: [],
  orderId: -1,
};

const mapStateToProps = ({ checkout, cart, magento }) => {
  const { payment, orderStatus, orderId } = checkout;
  const { cart: { billing_address: billingAddress } } = cart;
  const {
    base_currency_symbol: baseCurrencySymbol,
    displayCurrencyCode: currencyCode,
    displayCurrencySymbol: currencySymbol,
    displayCurrencyExchangeRate: currencyRate,
  } = magento.currency;
  return {
    payment,
    orderStatus,
    orderId,
    billingAddress,
    baseCurrencySymbol,
    currencyCode,
    currencySymbol,
    currencyRate,
  };
};

export default connect(mapStateToProps, {
  placeCartOrder,
  createQuoteId,
  resetPaymentState,
})(PaymentScreen);
