import React, { useState, useEffect, useContext } from 'react';
import { Picker, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getCountries,
  addCartBillingAddress,
  getCurrentCustomer,
  getShippingMethod,
  getCustomerCart,
} from '../../store/actions';
import { GenericTemplate, Spinner, Text, Button, TextInput } from '../../components';
import { NAVIGATION_SHIPPING_SCREEN } from '../../navigation/types';
import Status from '../../magento/Status';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';

// TODO: create Button to have a style of no background and border
// TODO: Use KeyboardAvoidingView
// TODO: Refactor code and make it optimize, it's higly messy
const AddressScreen = ({
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
    return (
      <Picker
        selectedValue={form.country}
        style={{ height: 50 }}
        onValueChange={(itemValue, itemIndex) => setValues({ ...form, country: itemValue, state: '' })}
      >
        {countries.map(country => <Picker.Item label={country.full_name_english} value={country.id} key={country.id} />)}
      </Picker>
    );
  };

  // TODO: cache region value
  const renderState = () => {
    if (form.country && countries && countries.length > 0) {
      if ('available_regions' in getCountryData()) {
        return (
          <>
            <Text type="label" bold>{translate('addressScreen.selectState')}</Text>
            <Picker
              selectedValue={form.state}
              style={{ height: 50 }}
              onValueChange={(itemValue, itemIndex) => setValues({ ...form, state: itemValue })}
            >
              {getCountryData().available_regions.map(state => <Picker.Item label={state.name} value={state.code} key={state.code} />)}
            </Picker>
          </>
        );
      }
      return (
        <>
          <Text type="label" bold>{translate('addressScreen.stateLabel')}</Text>
          <TextInput
            placeholder={translate('addressScreen.stateHint')}
            autoCorrect={false}
            value={form.state}
            onChangeText={value => setValues({ ...form, state: value })}
          />
        </>
      );
    }
  };

  const renderButtons = () => {
    if (billingAddressStatus === Status.LOADING) {
      return <Spinner style={[styles.defaultMargin(theme)]} />;
    }

    return (
      <Button
        title={translate('common.save')}
        style={[styles.defaultMargin(theme)]}
        onPress={onSaveAddress}
      />
    );
  };

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
      isScrollable
      status={Status.SUCCESS}
      style={styles.container}
      footer={renderButtons()}
    >
      <Text type="label">{translate('addressScreen.formName')}</Text>
      <Text type="label" bold>{translate('addressScreen.firstNameLabel')}</Text>
      <TextInput
        placeholder={translate('addressScreen.firstNameHint')}
        autoCorrect={false}
        value={form.firstName}
        onChangeText={value => setValues({ ...form, firstName: value })}
      />
      <Text type="label" bold>{translate('addressScreen.lastNameLabel')}</Text>
      <TextInput
        placeholder={translate('addressScreen.lastNameHint')}
        autoCorrect={false}
        value={form.lastName}
        onChangeText={value => setValues({ ...form, lastName: value })}
      />
      <Text type="label" bold>{translate('addressScreen.phoneNumberLabel')}</Text>
      <TextInput
        placeholder={translate('addressScreen.phoneNumberHint')}
        autoCorrect={false}
        keyboardType="numeric"
        value={form.phoneNumber}
        onChangeText={value => setValues({ ...form, phoneNumber: value })}
      />
      <Text type="label" bold>{translate('addressScreen.addressLabel')}</Text>
      <TextInput
        placeholder={translate('addressScreen.addressHint')}
        autoCorrect={false}
        value={form.streetAddress}
        onChangeText={value => setValues({ ...form, streetAddress: value })}
      />
      <Text type="label" bold>{translate('addressScreen.cityLabel')}</Text>
      <TextInput
        placeholder={translate('addressScreen.cityHint')}
        autoCorrect={false}
        value={form.city}
        onChangeText={value => setValues({ ...form, city: value })}
      />
      <Text type="label" bold>{translate('addressScreen.selectCountry')}</Text>
      {renderCountries()}
      <Text type="label" bold>{translate('addressScreen.zipCodeLabel')}</Text>
      <TextInput
        placeholder={translate('addressScreen.zipCodeHint')}
        autoCorrect={false}
        value={form.zipCode}
        onChangeText={value => setValues({ ...form, zipCode: value })}
      />
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

AddressScreen.navigationOptions = {
  title: translate('addressScreen.title')
};

AddressScreen.propTypes = {
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
};

AddressScreen.defaultProps = {
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
})(AddressScreen);
