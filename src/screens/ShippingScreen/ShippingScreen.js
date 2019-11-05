import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addCartShippingInfo } from '../../store/actions';
import {
  Text,
  Button,
  Spinner,
  ModalSelect,
  GenericTemplate
} from '../../components';
import { NAVIGATION_PAYMENT_SCREEN } from '../../navigation/types';
import Status from '../../magento/Status';
import { translate } from '../../i18n';
import { ThemeContext } from '../../theme';

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
  const theme = useContext(ThemeContext);
  const [shippingCode, setShippingCode] = useState();

  const renderShippingMethod = () => {
    if (!shipping || !shipping.length) {
      return <Text>{translate('shippingScreen.noShipping')}</Text>;
    }

    const data = shipping.map(({
      amount,
      carrier_title: carrierTitle,
      method_title: methodTitle,
      carrier_code: carrierCode,
    }) => ({
      label: `${carrierTitle} : ${methodTitle} : ${currencySymbol + amount}`,
      key: carrierCode,
    }));

    return (
      <ModalSelect
        label={translate('shippingScreen.selectShipping')}
        data={data}
        style={styles.defaultMargin(theme)}
        onChange={(itemKey, item) => setShippingCode(itemKey)}
      />
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
      <Button onPress={onPress} title={translate('common.continue')} />
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
  defaultMargin: theme => ({
    marginTop: theme.spacing.large,
  }),
});

ShippingScreen.navigationOptions = {
  title: translate('shippingScreen.title')
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
