import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
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
} from '../../components';
import {
  NAVIGATION_HOME_SCREEN,
  NAVIGATION_ORDER_CONFIRMATION_SCREEN
} from '../../navigation/types';
import Status from '../../magento/Status';
import { translate } from '../../i18n';
import { ThemeContext } from '../../theme';
import { priceSignByCode } from '../../utils/price';
import { PaymentTotalProps } from '../../types';

// TODO: Support `Cash On Delivery` Option, its Configuration name is `cashondelivery`
const PaymentScreen = ({
  totals,
  paymentMethods,
  orderStatus,
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
  const theme = useContext(ThemeContext);
  const [paymentCode, setPaymentCode] = useState();

  useEffect(() => (() => {
    // componentDidUnmount: Reset Payment related logic in Redux
    _resetPaymentState();
  }), []);

  useEffect(() => {
    if (orderStatus === Status.SUCCESS) {
      _createQuoteId();
      const resetAction = StackActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate(
            { routeName: NAVIGATION_HOME_SCREEN }
          ),
          NavigationActions.navigate(
            {
              routeName: NAVIGATION_ORDER_CONFIRMATION_SCREEN,
              params: { status: Status.SUCCESS }
            },
          ),
        ],
      });
      navigation.dispatch(resetAction);
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
    if (!paymentMethods.length) {
      return <Text>{translate('paymentScreen.noPaymentAvailable')}</Text>;
    }

    const data = paymentMethods.map(({ code, title }) => ({
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
      base_currency_code: baseCurrencyCode,
      base_subtotal: baseSubTotal,
      base_shipping_incl_tax: shippingTotal,
      base_tax_amount: taxAmount,
      base_grand_total: grandTotal,
    } = totals;

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
        {
          taxAmount !== 0 && (
            <View style={styles.row}>
              <Text>{`${translate('common.tax')}: `}</Text>
              <Price
                basePrice={taxAmount}
                currencySymbol={currencySymbol}
                currencyRate={currencyRate}
              />
            </View>
          )
        }
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
    marginTop: theme.spacing.large,
  }),
  row: {
    flexDirection: 'row'
  },
});

PaymentScreen.navigationOptions = {
  title: translate('paymentScreen.title')
};

PaymentScreen.propTypes = {
  billingAddress: PropTypes.shape({
    id: PropTypes.number,
    region: PropTypes.string,
    region_id: PropTypes.number,
    region_code: PropTypes.string,
    country_id: PropTypes.string,
    street: PropTypes.arrayOf(PropTypes.string),
    telephone: PropTypes.string,
    postcode: PropTypes.string,
    city: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    customer_id: PropTypes.number,
    email: PropTypes.string,
    same_as_billing: PropTypes.number,
    save_in_address_book: PropTypes.number
  }),
  paymentMethods: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    title: PropTypes.string,
  })),
  totals: PaymentTotalProps,
  navigation: PropTypes.object.isRequired,
  orderStatus: PropTypes.oneOf(Object.values(Status)).isRequired,
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
  paymentMethods: [],
  totals: {},
};

const mapStateToProps = ({ checkout, cart, magento }) => {
  const {
    payment: {
      totals,
      payment_methods: paymentMethods,
    },
    orderStatus,
  } = checkout;
  const {
    cart: {
      billing_address: billingAddress
    }
  } = cart;
  const {
    base_currency_symbol: baseCurrencySymbol,
    displayCurrencyCode: currencyCode,
    displayCurrencySymbol: currencySymbol,
    displayCurrencyExchangeRate: currencyRate,
  } = magento.currency;
  return {
    totals,
    paymentMethods,
    orderStatus,
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
