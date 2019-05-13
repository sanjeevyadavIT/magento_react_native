import React, { useState } from 'react';
import { Picker, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { placeCartOrder, createQuoteId } from '../../../actions';
import { CHECKOUT, CART } from '../../../reducers/types';
import { Spinner, Text, Button, GenericTemplate } from '../..';
import Status from '../../../magento/Status';

const PaymentPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const [paymentCode, setPaymentCode] = useState();
  const { payment, orderStatus } = useSelector(state => state[CHECKOUT]);
  const { billing_address: billingAddress } = useSelector(state => state[CART].cart);

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
      navigation.popToTop();
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
