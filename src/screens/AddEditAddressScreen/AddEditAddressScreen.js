import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as RNLocalize from 'react-native-localize';
import Toast from 'react-native-simple-toast';
import { getCountries, updateCustomer } from '../../store/actions';
import {
  Button,
  CheckBox,
  TextInput,
  ModalSelect,
  GenericTemplate,
} from '../../common';
import { magento } from '../../magento';
import Status from '../../magento/Status';
import { translate } from '../../i18n';
import { SPACING, LIMITS } from '../../constants';
import {
  isObject,
  addressType,
  countryType,
  customerType,
  isNonEmptyString,
  isPhoneNumberValid,
} from '../../utils';

const EDIT_MODE = 'edit';
const NEW_MODE = 'new';

const propTypes = {
  /**
   * @source react-navigation
   */
  route: PropTypes.shape({
    params: PropTypes.shape({
      /**
       * Whether screen is opened to add new address
       * or update existing address
       */
      mode: PropTypes.oneOf([EDIT_MODE, NEW_MODE]).isRequired,
      /**
       * In case of edit mode, address which need to be updated
       */
      address: addressType,
    }).isRequired,
  }).isRequired,
  /**
   * Logged in cutsomer data
   */
  customer: customerType.isRequired,
  countries: PropTypes.arrayOf(countryType),
  countryStatus: PropTypes.oneOf(Object.values(Status)).isRequired,
  countryErrorMessage: PropTypes.string,
  getCountries: PropTypes.func.isRequired,
  updateCustomer: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};

const defaultProps = {
  countries: [],
  countryErrorMessage: '',
};

// TODO: Use KeyboardAvoidingView
// TODO: Add valid zip code validation
// TODO: Add valid mobile number validation
const AddEditAddressScreen = ({
  customer,
  countries,
  countryStatus,
  countryErrorMessage,
  navigation,
  getCountries: _getCountries,
  updateCustomer: _updateCustomer,
  route,
}) => {
  const {
    params: { mode = NEW_MODE, address = {} },
  } = route;
  const [apiStatus, setApiStatus] = useState(Status.DEFAULT);
  const [form, setValues] = useState({
    firstName: '',
    incorrectFirstName: false,
    lastName: '',
    incorrectLastName: false,
    phoneNumber: '',
    incorrectPhoneNumber: false,
    streetAddress: '',
    incorrectStreetAddress: false,
    city: '',
    incorrectCity: false,
    zipCode: '',
    incorrectZipCode: false,
  });
  const [country, setCountry] = useState({});
  const [state, setState] = useState({});
  const [defaultAddress, setDefaultAddress] = useState(false);
  const countriesData = countries.map(item => ({
    key: item.id,
    label: item.full_name_english,
    ...item,
  }));
  const lastNameInputRef = useRef();
  const phoneNumberInputRef = useRef();
  const streetAddressInputRef = useRef();
  const cityInputRef = useRef();
  const zipCodeInputRef = useRef();

  useEffect(() => {
    // componentDidMount
    if (countryStatus === Status.DEFAULT) {
      _getCountries();
    }
    if (
      mode === EDIT_MODE &&
      isObject(address) &&
      Object.keys(address).length > 0
    ) {
      // Pre fill the address in case of edit mode
      const streetAddress = address.street[0]; // Only one input field is shown for street
      setValues({
        ...form,
        streetAddress,
        firstName: address.firstname,
        lastName: address.lastname,
        phoneNumber: address.telephone,
        city: address.city,
        zipCode: address.postcode,
        // state: address.region.region_code,
      });
      setDefaultAddress(address.default_billing && address.default_shipping);
    }
  }, []);

  useEffect(() => {
    if (apiStatus === Status.SUCCESS) {
      Toast.show(
        translate(
          mode === EDIT_MODE
            ? 'addEditAddressScreen.addressUpdated'
            : 'addEditAddressScreen.newAddressAdded',
        ),
        Toast.LONG,
      );
      navigation.goBack();
    }
  }, [apiStatus]);

  useEffect(() => {
    if (countryStatus === Status.SUCCESS && countriesData.length > 0) {
      let countryCode = '';
      if (mode === EDIT_MODE && isNonEmptyString(address.country_id)) {
        countryCode = address.country_id;
      } else {
        countryCode = RNLocalize.getCountry(); // Get country code by locale
      }
      const countryObject = countriesData.find(item => item.id === countryCode);
      if (isObject(countryObject)) {
        setCountry(countryObject);
        // TODO: Set state in case of edit mode and available region
      }
    }
  }, [countryStatus]);

  const checkField = (fieldKey, fieldErrorKey, fieldValidator) => {
    if (!fieldValidator(form[fieldKey])) {
      setValues(prevState => ({
        ...prevState,
        [fieldErrorKey]: true,
      }));
      return false;
    }
    return true;
  };

  const onSaveAddress = () => {
    setApiStatus(Status.LOADING);
    // New/Updated address object
    const newAddress = {
      firstname: form.firstName,
      lastname: form.lastName,
      telephone: form.phoneNumber,
      street: [form.streetAddress],
      city: form.city,
      postcode: form.zipCode,
      country_id: country.id,
      region: {
        region: state.name || state.customRegionName,
        region_code: state.code,
        region_id: state.id,
      },
    };

    let addressList = [...customer.addresses];
    if (mode === EDIT_MODE) {
      addressList = addressList.filter(item => item.id !== address.id);
      newAddress.id = address.id;
    }

    if (defaultAddress) {
      newAddress.default_billing = true;
      newAddress.default_shipping = true;
      addressList = addressList.map(item => ({
        ...item,
        default_billing: false,
        default_shipping: false,
      }));
    }

    const customerData = {
      customer: {
        ...customer,
        addresses: [...addressList, newAddress],
      },
    };
    // Api call
    magento.admin
      .updateCustomerData({
        customerId: customer.id,
        customerData,
      })
      .then(response => {
        _updateCustomer(response);
        setApiStatus(Status.SUCCESS);
      })
      .catch(error => {
        Toast.show(
          error.message || translate('errors.genericError'),
          Toast.LONG,
        );
        setApiStatus(Status.ERROR);
      });
  };

  const checkValidation = () => {
    let isValid = true;
    isValid = isValid && isNonEmptyString(form.firstName);
    isValid = isValid && isNonEmptyString(form.lastName);
    isValid = isValid && isPhoneNumberValid(form.phoneNumber);
    isValid = isValid && isNonEmptyString(form.streetAddress);
    isValid = isValid && isNonEmptyString(form.city);
    isValid = isValid && isNonEmptyString(form.zipCode);
    isValid = isValid && isNonEmptyString(country.id);
    if (
      isValid &&
      Array.isArray(country.available_regions) &&
      country.available_regions.length > 0 &&
      !('id' in state)
    ) {
      isValid = false;
    }
    if (isValid && !('available_regions' in country)) {
      isValid = isNonEmptyString(state.customRegionName);
    }
    return isValid;
  };

  const renderState = () => {
    if ('available_regions' in country) {
      const regionData = country.available_regions.map(item => ({
        label: item.name,
        key: item.code,
        ...item,
      }));

      return (
        <ModalSelect
          selectedKey={state.key}
          disabled={
            countryStatus === Status.LOADING || apiStatus === Status.LOADING
          }
          attribute={translate('addressScreen.state')}
          label={translate('addressScreen.selectState')}
          data={regionData}
          style={styles.defaultMargin}
          onChange={(itemKey, item) => setState(item)}
        />
      );
    }

    return (
      <TextInput
        autoCorrect={false}
        value={state.customRegionName}
        containerStyle={styles.defaultMargin}
        placeholder={`${translate('addressScreen.stateHint')} *`}
        editable={!(apiStatus === Status.LOADING)}
        onChangeText={value =>
          setState(prevState => ({
            ...prevState,
            customRegionName: value,
            incorrectCustomRegionName: false,
          }))
        }
        errorMessage={
          state.incorrectCustomRegionName
            ? translate('errors.invalidInput')
            : ''
        }
        onBlur={() => {
          if (!isNonEmptyString(state.customRegionName)) {
            setState(prevState => ({
              ...prevState,
              incorrectCustomRegionName: true,
            }));
          }
        }}
      />
    );
  };

  return (
    <GenericTemplate
      scrollable
      status={Status.SUCCESS}
      style={styles.container}
      footer={
        <Button
          disabled={!checkValidation()}
          loading={apiStatus === Status.LOADING}
          title={translate('common.save')}
          onPress={onSaveAddress}
        />
      }
    >
      <TextInput
        autoCorrect={false}
        editable={!(apiStatus === Status.LOADING)}
        value={form.firstName}
        containerStyle={styles.defaultMargin}
        returnKeyType={translate('common.keyboardNext')}
        placeholder={`${translate('addressScreen.firstNameHint')} *`}
        onSubmitEditing={() => lastNameInputRef.current.focus()}
        onChangeText={value =>
          setValues(prevState => ({
            ...prevState,
            firstName: value.trim(),
            incorrectFirstName: false,
          }))
        }
        errorMessage={
          form.incorrectFirstName ? translate('errors.invalidFirstName') : ''
        }
        onBlur={() =>
          checkField('firstName', 'incorrectFirstName', isNonEmptyString)
        }
      />
      <TextInput
        autoCorrect={false}
        value={form.lastName}
        editable={!(apiStatus === Status.LOADING)}
        containerStyle={styles.defaultMargin}
        returnKeyType={translate('common.keyboardNext')}
        placeholder={`${translate('addressScreen.lastNameHint')} *`}
        onSubmitEditing={() => phoneNumberInputRef.current.focus()}
        onChangeText={value =>
          setValues(prevState => ({
            ...prevState,
            lastName: value.trim(),
            incorrectLastName: false,
          }))
        }
        assignRef={component => {
          lastNameInputRef.current = component;
        }}
        errorMessage={
          form.incorrectLastName ? translate('errors.invalidLastName') : ''
        }
        onBlur={() =>
          checkField('lastName', 'incorrectLastName', isNonEmptyString)
        }
      />
      <TextInput
        autoCorrect={false}
        keyboardType="numeric"
        value={form.phoneNumber}
        editable={!(apiStatus === Status.LOADING)}
        containerStyle={styles.defaultMargin}
        returnKeyType={translate('common.keyboardNext')}
        maxLength={LIMITS.maxPhoneNumberLength}
        placeholder={`${translate('addressScreen.phoneNumberHint')} *`}
        onSubmitEditing={() => streetAddressInputRef.current.focus()}
        onChangeText={value =>
          setValues(prevState => ({
            ...prevState,
            phoneNumber: value.trim(),
            incorrectPhoneNumber: false,
          }))
        }
        assignRef={component => {
          phoneNumberInputRef.current = component;
        }}
        errorMessage={
          form.incorrectPhoneNumber ? translate('errors.invalidInput') : ''
        }
        onBlur={() =>
          checkField('phoneNumber', 'incorrectPhoneNumber', isPhoneNumberValid)
        }
      />
      <TextInput
        autoCorrect={false}
        value={form.streetAddress}
        editable={!(apiStatus === Status.LOADING)}
        containerStyle={styles.defaultMargin}
        returnKeyType={translate('common.keyboardNext')}
        placeholder={`${translate('addressScreen.addressHint')} *`}
        onSubmitEditing={() => cityInputRef.current.focus()}
        onChangeText={value =>
          setValues(prevState => ({
            ...prevState,
            streetAddress: value,
            incorrectStreetAddress: false,
          }))
        }
        assignRef={component => {
          streetAddressInputRef.current = component;
        }}
        errorMessage={
          form.incorrectStreetAddress ? translate('errors.invalidInput') : ''
        }
        onBlur={() =>
          checkField(
            'streetAddress',
            'incorrectStreetAddress',
            isNonEmptyString,
          )
        }
      />
      <TextInput
        value={form.city}
        autoCorrect={false}
        editable={!(apiStatus === Status.LOADING)}
        containerStyle={styles.defaultMargin}
        returnKeyType={translate('common.keyboardNext')}
        placeholder={`${translate('addressScreen.cityHint')} *`}
        onSubmitEditing={() => zipCodeInputRef.current.focus()}
        onChangeText={value =>
          setValues(prevState => ({
            ...prevState,
            city: value,
            incorrectCity: false,
          }))
        }
        assignRef={component => {
          cityInputRef.current = component;
        }}
        errorMessage={
          form.incorrectCity ? translate('errors.invalidInput') : ''
        }
        onBlur={() => checkField('city', 'incorrectCity', isNonEmptyString)}
      />
      <TextInput
        autoCorrect={false}
        value={form.zipCode}
        editable={!(apiStatus === Status.LOADING)}
        containerStyle={styles.defaultMargin}
        placeholder={`${translate('addressScreen.zipCodeHint')} *`}
        onChangeText={value =>
          setValues(prevState => ({
            ...prevState,
            zipCode: value.trim(),
            incorrectZipCode: false,
          }))
        }
        assignRef={component => {
          zipCodeInputRef.current = component;
        }}
        errorMessage={
          form.incorrectZipCode ? translate('errors.invalidInput') : ''
        }
        onBlur={() =>
          checkField('zipCode', 'incorrectZipCode', isNonEmptyString)
        }
      />
      <ModalSelect
        loading={countryStatus === Status.LOADING}
        disabled={countriesData.length === 0 || apiStatus === Status.LOADING}
        attribute={translate('addressScreen.country')}
        label={translate('addressScreen.selectCountry')}
        data={countriesData}
        selectedKey={country.key}
        style={styles.defaultMargin}
        onChange={(itemKey, item) => {
          setCountry(item);
          setState({}); // Reset State
        }}
      />
      {renderState()}
      <CheckBox
        title={translate('addEditAddressScreen.makeDefaultAddress')}
        checked={defaultAddress}
        containerStyle={styles.defaultMargin}
        onPress={() => setDefaultAddress(prevState => !prevState)}
      />
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.large,
    paddingBottom: SPACING.large,
  },
  defaultMargin: {
    marginTop: SPACING.large,
  },
  lastElement: {
    marginVertical: SPACING.large,
  },
  center: {
    alignSelf: 'center',
  },
  linkContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
});

AddEditAddressScreen.propTypes = propTypes;

AddEditAddressScreen.defaultProps = defaultProps;

const mapStateToProps = ({ magento: magentoReducer, account }) => {
  const {
    countries,
    countryStatus,
    errorMessage: countryErrorMessage,
  } = magentoReducer;
  const { customer } = account;
  return {
    customer,
    countries,
    countryStatus,
    countryErrorMessage,
  };
};

export default connect(mapStateToProps, {
  getCountries,
  updateCustomer,
})(AddEditAddressScreen);
