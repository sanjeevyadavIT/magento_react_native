import React, { useState } from 'react';
import { Picker, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import { placeCartOrder, createQuoteId } from '../../../store/actions';
import { Spinner, Text, Button, GenericTemplate } from '../..';
import { NAVIGATION_HOME_SCREEN, NAVIGATION_ORDER_CONFIRMATION_SCREEN } from '../../../navigation/types';
import Status from '../../../magento/Status';

// FIXME: Reset all status variable in checkout reducer,
// if order placed, unable to place second order after first has been placed
const PaymentPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const [paymentCode, setPaymentCode] = useState();
  const payment = useSelector(state => state.checkout.payment);
  const orderStatus = useSelector(state => state.checkout.orderStatus);
  const billingAddress = useSelector(state => state.cart.cart.billing_address);

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
    dispatch(placeCartOrder(paymentInformation))
  };

  const renderPaymentMethods = () => {
    if (!payment || !payment.payment_methods.length) {
      return <Text>Currently no payment method is available!</Text>;
    }

    return (
      <>
        <Picker
          selectedValue={paymentCode}
          style={{ height: 50 }}
          onValueChange={(itemValue, itemIndex) => setPaymentCode(itemValue)}
        >
          {[{ code: 'NO_OPTION', title: 'Select a payment option' }, ...payment.payment_methods].map(item => <Picker.Item label={item.title} value={item.code} key={item.code} />)}
        </Picker>
      </>
    );
  };

  const renderButton = () => {
    if (orderStatus === Status.LOADING) {
      return <Spinner />;
    }

    if (orderStatus === Status.SUCCESS) {
      dispatch(createQuoteId());
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
      <Button title="Place order" onPress={placeOrder} />
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
});

PaymentPage.navigationOptions = {
  title: 'Payment'
};

PaymentPage.propTypes = {};

PaymentPage.defaultProps = {};

export default PaymentPage;
