import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getCountries,
  getCustomerCart,
  getShippingMethod,
  getCurrentCustomer,
  addCartBillingAddress,
  resetCheckoutAddressState,
} from '../../store/actions';
import {
  Text,
  Button,
  Spinner,
  TextInput,
  ModalSelect,
  GenericTemplate,
} from '../../components';
import { NAVIGATION_SHIPPING_SCREEN } from '../../navigation/types';
import Status from '../../magento/Status';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';

// TODO: Use KeyboardAvoidingView
// TODO: Refactor code and make it optimize, it's higly messy
const CheckoutAddressScreen = ({
  countries,
  countryStatus,
  countryErrorMessage,
  billingAddressStatus,
  shippingMethodStatus,
  errorMessage,
  customer,
  customerStatus,
  navigation,
  getCountries: _getCountries,
  addCartBillingAddress: _addCartBillingAddress,
  getCurrentCustomer: _getCurrentCustomer,
  getShippingMethod: _getShippingMethod,
  getCustomerCart: _getCustomerCart,
  resetCheckoutAddressState: _resetCheckoutAddressState
}) => {
  const [form, setValues] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    streetAddress: '',
    city: '',
    country: '',
    zipCode: '',
    state: '',
  });
  const theme = useContext(ThemeContext);

  if (customerStatus === Status.SUCCESS) {
    if (form.firstName === '' && form.lastName === '') {
      setValues({
        ...form,
        firstName: customer.firstname,
        lastName: customer.lastname,
      });
    }
  }

  useEffect(() => {
    // componentDidMount
    if (countryStatus === Status.DEFAULT) {
      _getCountries();
    }
    if (customerStatus === Status.DEFAULT) {
      _getCurrentCustomer();
    }

    return () => {
      // componentDidUnmount: Reset Address related logic in Redux
      _resetCheckoutAddressState();
    };
  }, []);

  useEffect(() => {
    // If countries is not null, set first country selected
    if (countries != null && countries.length > 0) {
      setValues({
        ...form,
        country: countries[0].id,
        state: ''
      });
    }
  }, [countries]);

  // TODO: Function not optimized
  const getRegion = () => {
    const isAvailableRegion = 'available_regions' in getCountryData();
    let region = '';
    let regionId;
    let regionCode;

    if (isAvailableRegion) {
      const stateData = getCountryData().available_regions.find(state => state.code === form.state);
      region = stateData.name;
      regionId = stateData.id;
      regionCode = form.state;
    } else {
      region = form.state;
    }

    return {
      region,
      region_id: regionId,
      region_code: regionCode,
    };
  };

  const validation = () => {
    if (form.firstName === ''
      || form.lastName === ''
      || form.phoneNumber === ''
      || form.streetAddress === ''
      || form.city === ''
      || form.zipCode === ''
      || form.state === ''
    ) return false;

    return true;
  };

  const onSaveAddress = () => {
    if (!validation()) {
      console.log('Enter valid data!');
      return;
    }
    const address = {
      address: {
        // id: 0,
        ...getRegion(),
        country_id: form.country,
        street: [form.streetAddress],
        telephone: form.phoneNumber,
        postcode: form.zipCode,
        city: form.city,
        firstname: form.firstName,
        lastname: form.lastName,
        // email
        same_as_billing: 1,
      },
      useForShipping: true,
    };
    customer ? address.address.email = customer.email : '';
    _addCartBillingAddress(address);
  };

  // TODO: cache this value
  const getCountryData = () => countries.find(country => country.id === form.country) || {};

  const renderCountries = () => {
    if (countryStatus === Status.LOADING || countryStatus === Status.DEFAULT) return <Spinner size="small" />;
    if (countryStatus === Status.ERROR) throw new Exception('Unable to fetch country data');
    const countriesData = countries.map(country => ({
      label: country.full_name_english,
      key: country.id,
    }));

    return (
      <ModalSelect
        attribute={translate('addressScreen.country')}
        label={translate('addressScreen.selectCountry')}
        data={countriesData}
        style={styles.defaultMargin(theme)}
        onChange={(itemKey, item) => setValues({ ...form, country: itemKey, state: '' })}
      />
    );
  };

  // TODO: cache region value
  const renderState = () => {
    if (form.country && countries && countries.length > 0) {
      if ('available_regions' in getCountryData()) {
        const regionData = getCountryData().available_regions.map(state => ({
          label: state.name,
          key: state.code,
        }));

        return (
          <ModalSelect
            attribute={translate('addressScreen.state')}
            label={translate('addressScreen.selectState')}
            data={regionData}
            style={styles.defaultMargin(theme)}
            onChange={(itemKey, item) => setValues({ ...form, state: itemKey })}
          />
        );
      }
      return (
        <TextInput
          containerStyle={styles.defaultMargin(theme)}
          label={translate('addressScreen.stateLabel')}
          placeholder={translate('addressScreen.stateHint')}
          autoCorrect={false}
          value={form.state}
          onChangeText={value => setValues({ ...form, state: value })}
        />
      );
    }
    return <></>;
  };

  const renderButtons = () => (
    <Button
      loading={billingAddressStatus === Status.LOADING}
      title={translate('common.save')}
      style={[styles.defaultMargin(theme)]}
      onPress={onSaveAddress}
    />
  );

  if (billingAddressStatus === Status.SUCCESS && shippingMethodStatus === Status.DEFAULT) {
    const address = {
      address: {
        // id: 0,
        ...getRegion(),
        country_id: form.country,
        street: [form.streetAddress],
        telephone: form.phoneNumber,
        postcode: form.zipCode,
        city: form.city,
        firstname: form.firstName,
        lastname: form.lastName,
        // email
      },
    };
    customer ? address.address.email = customer.email : '';
    _getCustomerCart();
    _getShippingMethod(address);
    if (shippingMethodStatus === Status.DEFAULT) {
      navigation.navigate(NAVIGATION_SHIPPING_SCREEN);
    }
  }

  return (
    <GenericTemplate
      scrollable
      status={Status.SUCCESS}
      style={styles.container}
      footer={renderButtons()}
    >
      <Text type="label">{translate('addressScreen.formName')}</Text>
      <TextInput
        containerStyle={styles.defaultMargin(theme)}
        label={translate('addressScreen.firstNameLabel')}
        placeholder={translate('addressScreen.firstNameHint')}
        autoCorrect={false}
        value={form.firstName}
        onChangeText={value => setValues({ ...form, firstName: value })}
      />
      <TextInput
        containerStyle={styles.defaultMargin(theme)}
        label={translate('addressScreen.lastNameLabel')}
        placeholder={translate('addressScreen.lastNameHint')}
        autoCorrect={false}
        value={form.lastName}
        onChangeText={value => setValues({ ...form, lastName: value })}
      />
      <TextInput
        containerStyle={styles.defaultMargin(theme)}
        label={translate('addressScreen.phoneNumberLabel')}
        placeholder={translate('addressScreen.phoneNumberHint')}
        autoCorrect={false}
        keyboardType="numeric"
        value={form.phoneNumber}
        onChangeText={value => setValues({ ...form, phoneNumber: value })}
      />
      <TextInput
        containerStyle={styles.defaultMargin(theme)}
        label={translate('addressScreen.addressLabel')}
        placeholder={translate('addressScreen.addressHint')}
        autoCorrect={false}
        value={form.streetAddress}
        onChangeText={value => setValues({ ...form, streetAddress: value })}
      />
      <TextInput
        containerStyle={styles.defaultMargin(theme)}
        label={translate('addressScreen.cityLabel')}
        placeholder={translate('addressScreen.cityHint')}
        autoCorrect={false}
        value={form.city}
        onChangeText={value => setValues({ ...form, city: value })}
      />
      <TextInput
        containerStyle={styles.defaultMargin(theme)}
        label={translate('addressScreen.zipCodeLabel')}
        placeholder={translate('addressScreen.zipCodeHint')}
        autoCorrect={false}
        value={form.zipCode}
        onChangeText={value => setValues({ ...form, zipCode: value })}
      />
      {renderCountries()}
      {renderState()}
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
  center: {
    alignSelf: 'center',
  },
  linkContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch'
  }
});

CheckoutAddressScreen.navigationOptions = {
  title: translate('addressScreen.title')
};

CheckoutAddressScreen.propTypes = {
  countries: PropTypes.array,
  countryStatus: PropTypes.oneOf(Object.values(Status)).isRequired,
  countryErrorMessage: PropTypes.string,
  billingAddressStatus: PropTypes.oneOf(Object.values(Status)).isRequired,
  shippingMethodStatus: PropTypes.oneOf(Object.values(Status)).isRequired,
  errorMessage: PropTypes.string,
  customer: PropTypes.object,
  customerStatus: PropTypes.oneOf(Object.values(Status)).isRequired,
  getCountries: PropTypes.func.isRequired,
  addCartBillingAddress: PropTypes.func.isRequired,
  getCurrentCustomer: PropTypes.func.isRequired,
  getShippingMethod: PropTypes.func.isRequired,
  getCustomerCart: PropTypes.func.isRequired,
  resetCheckoutAddressState: PropTypes.func.isRequired,
};

CheckoutAddressScreen.defaultProps = {
  countries: [],
  customer: {},
  errorMessage: '',
  countryErrorMessage: '',
};

const mapStateToProps = ({ magento, checkout, account }) => {
  const { countries, countryStatus, errorMessage: countryErrorMessage } = magento;
  const { billingAddressStatus, shippingMethodStatus, errorMessage } = checkout;
  const { customer, status: customerStatus } = account;
  return {
    countries,
    countryStatus,
    countryErrorMessage,
    billingAddressStatus,
    shippingMethodStatus,
    customer,
    customerStatus,
  };
};

export default connect(mapStateToProps, {
  getCountries,
  addCartBillingAddress,
  getCurrentCustomer,
  getShippingMethod,
  getCustomerCart,
  resetCheckoutAddressState,
})(CheckoutAddressScreen);
