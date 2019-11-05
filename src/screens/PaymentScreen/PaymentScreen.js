import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { placeCartOrder, createQuoteId } from '../../store/actions';
import {
  Text,
  Button,
  Spinner,
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

// FIXME: Reset all status variable in checkout reducer,
// if order placed, unable to place second order after first has been placed
// TODO: Support `Cash On Delivery` Option, its Configuration name is `cashondelivery`
// TODO: Show the breakdown of all prices, shipping rate summary
const PaymentScreen = ({
  payment,
  orderStatus,
  billingAddress,
  navigation,
  placeCartOrder: _placeCartOrder,
  createQuoteId: _createQuoteId,
}) => {
  const theme = useContext(ThemeContext);
  const [paymentCode, setPaymentCode] = useState();

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

  const renderButton = () => {
    if (orderStatus === Status.LOADING) {
      return <Spinner />;
    }

    if (orderStatus === Status.SUCCESS) {
      _createQuoteId();
      const resetAction = StackActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate(
            { routeName: NAVIGATION_HOME_SCREEN }
          ),
          NavigationActions.navigate(
            { routeName: NAVIGATION_ORDER_CONFIRMATION_SCREEN, params: { status: Status.SUCCESS } },
          ),
        ],
      });
      navigation.dispatch(resetAction);
      // navigation.navigate(NAVIGATION_ORDER_CONFIRMATION_SCREEN, { status: Status.SUCCESS });
    }

    return (
      <Button title={translate('paymentScreen.placeOrderButton')} onPress={placeOrder} />
    );
  };

  return (
    <GenericTemplate
      isScrollable={false}
      footer={renderButton()}
    >
      {renderPaymentMethods()}
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
});

PaymentScreen.navigationOptions = {
  title: translate('paymentScreen.title')
};

PaymentScreen.propTypes = {
  billingAddress: PropTypes.object,
  payment: PropTypes.object,
  orderStatus: PropTypes.oneOf(Object.values(Status)).isRequired,
  placeCartOrder: PropTypes.func.isRequired,
  createQuoteId: PropTypes.func.isRequired,
};

PaymentScreen.defaultProps = {
  billingAddress: {},
  payment: [],
};

const mapStateToProps = ({ checkout, cart }) => {
  const { payment, orderStatus } = checkout;
  const { cart: { billing_address: billingAddress }} = cart;
  return {
    payment,
    orderStatus,
    billingAddress
  };
};

export default connect(mapStateToProps, {
  placeCartOrder,
  createQuoteId,
})(PaymentScreen);
