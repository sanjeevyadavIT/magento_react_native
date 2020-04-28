import React, {
  useRef,
  useState,
  useEffect,
  useContext,
} from 'react';
import { Alert, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as RNLocalize from 'react-native-localize';
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
import { NAVIGATION_TO_SHIPPING_SCREEN } from '../../navigation';
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

  const lastNameInputRef = useRef();
  const phoneNumberInputRef = useRef();
  const streetAddressInputRef = useRef();
  const cityInputRef = useRef();
  const zipCodeInputRef = useRef();

  const theme = useContext(ThemeContext);

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
    if (customer) {
      if (customer.addresses.length > 0) {
        // Pre fill the fields with previous stored address
        const address = customer.addresses[0]; // Currently the app supports only one address to be saved
        const streetAddress = address.street[0]; // Only one input field is shown for street
        console.log('///', address.region.region_code)
        setValues({
          ...form,
          streetAddress,
          firstName: address.firstname,
          lastName: address.lastname,
          phoneNumber: address.telephone,
          city: address.city,
          country: address.country_id,
          zipCode: address.postcode,
          state: address.region.region_code,
        });
      } else {
        // Get the first and last name from customer object
        setValues({
          ...form,
          firstName: customer.firstname,
          lastName: customer.lastname,
        });
      }
    }
  }, [customer]);

  useEffect(() => {
    // If countries is not null, set first country selected
    if (countries && countries.length > 0) {
      if (customer && customer.addresses.length === 0) {
        // Get country by locale
        const userCountryByLocale = RNLocalize.getCountry();
        const isUserCountrySupported = countries.find(country => country.id === userCountryByLocale);
        if (isUserCountrySupported) {
          setValues({
            ...form,
            firstName: customer.firstname,
            lastName: customer.lastname,
            country: isUserCountrySupported.id,
            state: '',
          });
        }
      }
    }
  }, [countries]);

  const onSaveAddress = () => {
    if (!validation()) {
      Alert.alert(translate('errors.emptyFieldsMessage'));
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
        email: '',
        same_as_billing: 1,
      },
      useForShipping: true,
    };
    if (customer) {
      address.address.email = customer.email;
    }
    _addCartBillingAddress(address);
  };

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
      || form.state === undefined
      || form.state === null
    ) return false;

    return true;
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
        disabled={billingAddressStatus === Status.LOADING}
        label={translate('addressScreen.selectCountry')}
        data={countriesData}
        selectedKey={form.country}
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
            selectedKey={form.state}
            disabled={billingAddressStatus === Status.LOADING}
            attribute={translate('addressScreen.state')}
            label={translate('addressScreen.selectState')}
            data={regionData}
            style={styles.lastElement(theme)}
            onChange={(itemKey, item) => setValues({ ...form, state: itemKey })}
          />
        );
      }
      return (
        <TextInput
          containerStyle={styles.lastElement(theme)}
          label={translate('addressScreen.stateLabel')}
          placeholder={translate('addressScreen.stateHint')}
          autoCorrect={false}
          value={form.state}
          editable={!(billingAddressStatus === Status.LOADING)}
          onChangeText={value => setValues({ ...form, state: value })}
        />
      );
    }
    return <></>;
  };

  const renderButtons = () => (
    <Button
      disabled={!validation()}
      loading={billingAddressStatus === Status.LOADING}
      title={translate('common.save')}
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
      navigation.navigate(NAVIGATION_TO_SHIPPING_SCREEN);
    }
  }

  return (
    <GenericTemplate
      scrollable
      status={Status.SUCCESS}
      style={styles.container}
      footer={renderButtons()}
    >
      <Text type="label">{translate('addressScreen.billingAndShippingAddress')}</Text>
      <TextInput
        autoCorrect={false}
        value={form.firstName}
        containerStyle={styles.defaultMargin(theme)}
        returnKeyType={translate('common.keyboardNext')}
        label={translate('addressScreen.firstNameLabel')}
        editable={!(billingAddressStatus === Status.LOADING)}
        placeholder={translate('addressScreen.firstNameHint')}
        onSubmitEditing={() => lastNameInputRef.current.focus()}
        onChangeText={value => setValues({ ...form, firstName: value })}
      />
      <TextInput
        autoCorrect={false}
        value={form.lastName}
        editable={!(billingAddressStatus === Status.LOADING)}
        containerStyle={styles.defaultMargin(theme)}
        returnKeyType={translate('common.keyboardNext')}
        label={translate('addressScreen.lastNameLabel')}
        placeholder={translate('addressScreen.lastNameHint')}
        onSubmitEditing={() => phoneNumberInputRef.current.focus()}
        onChangeText={value => setValues({ ...form, lastName: value })}
        assignRef={(component) => { lastNameInputRef.current = component; }}
      />
      <TextInput
        autoCorrect={false}
        keyboardType="numeric"
        value={form.phoneNumber}
        editable={!(billingAddressStatus === Status.LOADING)}
        containerStyle={styles.defaultMargin(theme)}
        returnKeyType={translate('common.keyboardNext')}
        label={translate('addressScreen.phoneNumberLabel')}
        placeholder={translate('addressScreen.phoneNumberHint')}
        onSubmitEditing={() => streetAddressInputRef.current.focus()}
        onChangeText={value => setValues({ ...form, phoneNumber: value })}
        assignRef={(component) => { phoneNumberInputRef.current = component; }}
      />
      <TextInput
        autoCorrect={false}
        value={form.streetAddress}
        editable={!(billingAddressStatus === Status.LOADING)}
        containerStyle={styles.defaultMargin(theme)}
        label={translate('addressScreen.addressLabel')}
        returnKeyType={translate('common.keyboardNext')}
        placeholder={translate('addressScreen.addressHint')}
        onSubmitEditing={() => cityInputRef.current.focus()}
        onChangeText={value => setValues({ ...form, streetAddress: value })}
        assignRef={(component) => { streetAddressInputRef.current = component; }}
      />
      <TextInput
        value={form.city}
        autoCorrect={false}
        editable={!(billingAddressStatus === Status.LOADING)}
        containerStyle={styles.defaultMargin(theme)}
        label={translate('addressScreen.cityLabel')}
        returnKeyType={translate('common.keyboardNext')}
        placeholder={translate('addressScreen.cityHint')}
        onSubmitEditing={() => zipCodeInputRef.current.focus()}
        onChangeText={value => setValues({ ...form, city: value })}
        assignRef={(component) => { cityInputRef.current = component; }}
      />
      <TextInput
        autoCorrect={false}
        value={form.zipCode}
        editable={!(billingAddressStatus === Status.LOADING)}
        containerStyle={styles.defaultMargin(theme)}
        label={translate('addressScreen.zipCodeLabel')}
        placeholder={translate('addressScreen.zipCodeHint')}
        onChangeText={value => setValues({ ...form, zipCode: value })}
        assignRef={(component) => { zipCodeInputRef.current = component; }}
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
  lastElement: theme => ({
    marginVertical: theme.spacing.large,
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
