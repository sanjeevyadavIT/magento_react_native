import React, { useState } from 'react';
import { Picker, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addCartShippingInfo } from '../../store/actions';
import { Spinner, Text, Button, GenericTemplate } from '../../components';
import { NAVIGATION_PAYMENT_SCREEN } from '../../navigation/types';
import Status from '../../magento/Status';
import { NO_SHIPPING_AVAILABLE } from '../../constants';

// TODO: Create a cutom picker component
const ShippingScreen = ({
  status,
  paymentMethodStatus,
  errorMessage,
  shipping,
  currencySymbol,
  billingAddress,
  navigation,
  addCartShippingInfo: _addCartShippingInfo,
}) => {
  const [shippingCode, setShippingCode] = useState();

  const renderShippingMethod = () => {
    if (!shipping || !shipping.length) {
      return <Text>{NO_SHIPPING_AVAILABLE}</Text>;
    }

    return (
      <>
        <Picker
          selectedValue={shippingCode}
          style={{ height: 50 }}
          onValueChange={(itemValue, itemIndex) => setShippingCode(itemValue)}
        >
          {
            [
              {
                carrier_title: "Select a shipping method",
                method_title: "",
                amount: "",
                carrier_code: "NO_OPTION"
              },
              ...shipping
            ].map(item => (
              <Picker.Item
                label={`${item.carrier_title} : ${item.method_title} : ${currencySymbol + item.amount}`}
                value={item.carrier_code}
                key={item.carrier_code}
              />
            ))
          }
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
      _addCartShippingInfo(address);
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

ShippingScreen.navigationOptions = {
  title: 'Shipping method'
};

ShippingScreen.propTypes = {
  status: PropTypes.oneOf(Object.values(Status)).isRequired,
  paymentMethodStatus: PropTypes.oneOf(Object.values(Status)).isRequired,
  errorMessage: PropTypes.string,
  shipping: PropTypes.object,
  currencySymbol: PropTypes.string.isRequired,
  billingAddress: PropTypes.object,
  addCartShippingInfo: PropTypes.func.isRequired,
};

ShippingScreen.defaultProps = {
  errorMessage: '',
  billingAddress: {},
  shipping: {},
};

const mapStateToProps = ({ checkout, magento, cart }) => {
  const {
    paymentMethodStatus,
    errorMessage,
    shipping, shippingMethodStatus: status
  } = checkout;
  const { default_display_currency_symbol: currencySymbol } = magento.currency;
  const { cart: { billing_address: billingAddress } } = cart;
  return {
    status,
    paymentMethodStatus,
    errorMessage,
    shipping,
    currencySymbol,
    billingAddress,
  };
};

export default connect(mapStateToProps, {
  addCartShippingInfo,
})(ShippingScreen);
