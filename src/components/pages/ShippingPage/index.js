import React, { useState } from 'react';
import { View, TouchableOpacity, Picker, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addCartShippingInfo } from '../../../store/actions';
import { Spinner, Text, Button, TextInput, GenericTemplate } from '../..';
import { NAVIGATION_PAYMENT_SCREEN } from '../../../navigation/types';
import Status from '../../../magento/Status';

// TODO: Create a cutom picker component
const ShippingPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const [shippingCode, setShippingCode] = useState();
  const errorMessage = useSelector(state => state.checkout.errorMessage);
  const shipping = useSelector(state => state.checkout.shipping);
  const currencySymbol = useSelector(state => state.magento.currency.default_display_currency_symbol);
  const paymentMethodStatus = useSelector(state => state.checkout.paymentMethodStatus);
  const status = useSelector(state => state.checkout.shippingMethodStatus);
  const billingAddress = useSelector(state => state.cart.cart.billing_address);

  const renderShippingMethod = () => {
    if (!shipping || !shipping.length) {
      return <Text>Shipping methods not found for selected address</Text>;
    }

    return (
      <>
        <Picker
          selectedValue={shippingCode}
          style={{ height: 50 }}
          onValueChange={(itemValue, itemIndex) => setShippingCode(itemValue)}
        >
          {[{ carrier_title: 'Select a shipping method', method_title: '', amount: '', carrier_code: 'NO_OPTION' }, ...shipping].map(item => <Picker.Item label={`${item.carrier_title} : ${item.method_title} : ${currencySymbol + item.amount}`} value={item.carrier_code} key={item.carrier_code} />)}
        </Picker>
      </>
    );
  };

  const getShippingMethod = () => shipping.find(item => item.carrier_code === shippingCode);

  const onPress = () => {
    if (shippingCode) {
      const address = {
        addressInformation: {
          shipping_address: {
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
          billing_address: {
            region: billingAddress.region,
            region_id: billingAddress.regionId,
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
          shipping_method_code: getShippingMethod().method_code,
          shipping_carrier_code: getShippingMethod().carrier_code,
          extension_attributes: {},
        }
      };
      dispatch(addCartShippingInfo(address));
    }
  };

  const renderButton = () => {
    if (paymentMethodStatus === Status.LOADING) {
      return <Spinner />;
    }

    if (paymentMethodStatus === Status.SUCCESS) {
      navigation.navigate(NAVIGATION_PAYMENT_SCREEN);
    }

    return (
      <Button onPress={onPress} title="Continue" />
    );
  };

  return (
    <GenericTemplate
      isScrollable={false}
      status={status}
      errorMessage={errorMessage}
      style={styles.container}
      footer={renderButton()}
    >
      {renderShippingMethod()}
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

ShippingPage.navigationOptions = {
  title: 'Shipping method'
};

ShippingPage.propTypes = {};

ShippingPage.defaultProps = {};

export default ShippingPage;
