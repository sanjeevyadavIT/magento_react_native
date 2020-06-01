import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetShippingState, addCartShippingInfo } from '../../store/actions';
import { Text, Button, ModalSelect, GenericTemplate } from '../../common';
import { NAVIGATION_TO_PAYMENT_SCREEN } from '../../navigation/routes';
import Status from '../../magento/Status';
import { translate } from '../../i18n';
import { SPACING } from '../../constants';
import { ThemeContext } from '../../theme';

const ShippingScreen = ({
  status,
  paymentMethodStatus,
  errorMessage,
  shipping,
  currencySymbol,
  currencyRate,
  billingAddress,
  navigation,
  addCartShippingInfo: _addCartShippingInfo,
  resetShippingState: _resetShippingState,
}) => {
  const { theme } = useContext(ThemeContext);
  const [shippingCode, setShippingCode] = useState();

  useEffect(
    () => () => {
      // componentDidUnmount: Reset Shipping related logic in Redux
      _resetShippingState();
    },
    [],
  );

  const renderShippingMethod = () => {
    if (!shipping || !shipping.length) {
      return <Text>{translate('shippingScreen.noShipping')}</Text>;
    }

    const data = shipping.map(
      ({
        base_amount: baseAmount,
        carrier_title: carrierTitle,
        method_title: methodTitle,
        carrier_code: carrierCode,
      }) => ({
        label: `${carrierTitle} : ${methodTitle} : ${
          currencySymbol + (baseAmount * currencyRate).toFixed(2)
        }`,
        key: carrierCode,
      }),
    );

    return (
      <ModalSelect
        label={translate('shippingScreen.selectShipping')}
        data={data}
        style={styles.defaultMargin(theme)}
        onChange={(itemKey, item) => setShippingCode(itemKey)}
      />
    );
  };

  const getShippingMethod = () =>
    shipping.find(item => item.carrier_code === shippingCode);

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
        },
      };
      _addCartShippingInfo(address);
    }
  };

  const renderButton = () => (
    <Button
      loading={paymentMethodStatus === Status.LOADING}
      onPress={onPress}
      title={translate('common.continue')}
    />
  );

  if (paymentMethodStatus === Status.SUCCESS) {
    navigation.navigate(NAVIGATION_TO_PAYMENT_SCREEN);
  }

  return (
    <GenericTemplate
      scrollable={false}
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
  defaultMargin: theme => ({
    marginTop: SPACING.large,
  }),
});

ShippingScreen.propTypes = {
  status: PropTypes.oneOf(Object.values(Status)).isRequired,
  paymentMethodStatus: PropTypes.oneOf(Object.values(Status)).isRequired,
  errorMessage: PropTypes.string,
  shipping: PropTypes.object,
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
  billingAddress: PropTypes.object,
  addCartShippingInfo: PropTypes.func.isRequired,
  resetShippingState: PropTypes.func.isRequired,
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
    shipping,
    shippingMethodStatus: status,
  } = checkout;
  const {
    displayCurrencySymbol: currencySymbol,
    displayCurrencyExchangeRate: currencyRate,
  } = magento.currency;
  const {
    cart: { billing_address: billingAddress },
  } = cart;
  return {
    status,
    paymentMethodStatus,
    errorMessage,
    shipping,
    currencySymbol,
    currencyRate,
    billingAddress,
  };
};

export default connect(mapStateToProps, {
  resetShippingState,
  addCartShippingInfo,
})(ShippingScreen);
