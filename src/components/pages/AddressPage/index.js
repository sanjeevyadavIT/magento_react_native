import React, { useState, useEffect } from 'react';
import { View, Picker, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getCountries, addCartBillingAddress, getCurrentCustomer, getShippingMethod, getCustomerCart } from '../../../actions';
import { ACCOUNT, CHECKOUT } from '../../../reducers/types';
import { Spinner, Text, Button, TextInput } from '../..';
import { NAVIGATION_SHIPPING_SCREEN_PATH } from '../../../navigation/types';
import Status from '../../../magento/Status';

// TODO: create Button to have a style of no background and border
// TODO: Use KeyboardAvoidingView
// TODO: Refactor code and make it optimize, it's higly messy
const AddressPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const [form, setValues] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '123456789',
    streetAddress: '234 warington',
    city: 'noida',
    country: 'US',
    zipCode: '43245',
    state: 'AL',
  });
  const {
    countries,
    countryStatus,
    billingAddressStatus,
    shippingMethodStatus,
    errorMessage
  } = useSelector(state => state[CHECKOUT]);
  const {
    customer,
    status: customerStatus
  } = useSelector(state => state[ACCOUNT]); 

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
      dispatch(getCountries());
    }
    if (customerStatus === Status.DEFAULT) {
      dispatch(getCurrentCustomer());
    }
  }, []);

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

  const onSaveAddress = () => {
    // TODO: Do validation
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
    dispatch(addCartBillingAddress(address));
  };

  // TODO: cache this value
  const getCountryData = () => countries.find(country => country.id === form.country);

  const renderCountries = () => {
    if (countryStatus === Status.LOADING) return <Spinner size="small" />;
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
    if (form.country && countries.length > 0) {
      if ('available_regions' in getCountryData()) {
        return (
          <>
            <Text>Select state</Text>
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
          <Text>Enter state</Text>
          <TextInput
            placeholder="State"
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
      return <Spinner style={[styles.defaultMargin]} />;
    }

    return (
      <View style={styles.linkContainer}>
        <Button title="Save" style={[styles.defaultMargin]} onPress={onSaveAddress} />
      </View>
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
    dispatch(getCustomerCart());
    dispatch(getShippingMethod(address));
    if (shippingMethodStatus === Status.DEFAULT) {
      navigation.navigate(NAVIGATION_SHIPPING_SCREEN_PATH);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Contact Information</Text>
      <TextInput
        placeholder="First Name"
        autoCorrect={false}
        value={form.firstName}
        onChangeText={value => setValues({ ...form, firstName: value })}
      />
      <TextInput
        placeholder="Last Name"
        autoCorrect={false}
        value={form.lastName}
        onChangeText={value => setValues({ ...form, lastName: value })}
      />
      <TextInput
        placeholder="Phone Number"
        autoCorrect={false}
        keyboardType="numeric"
        value={form.phoneNumber}
        onChangeText={value => setValues({ ...form, phoneNumber: value })}
      />
      <Text>Address</Text>
      <TextInput
        placeholder="Street Address"
        autoCorrect={false}
        value={form.streetAddress}
        onChangeText={value => setValues({ ...form, streetAddress: value })}
      />
      <TextInput
        placeholder="City"
        autoCorrect={false}
        value={form.city}
        onChangeText={value => setValues({ ...form, city: value })}
      />
      <Text>Select Country</Text>
      {renderCountries()}
      <TextInput
        placeholder="zip code"
        autoCorrect={false}
        value={form.zipCode}
        onChangeText={value => setValues({ ...form, zipCode: value })}
      />
      {renderState()}
      {renderButtons()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  defaultMargin: {
    marginTop: 16,
  },
  center: {
    alignSelf: 'center',
  },
  errorText: {
    fontSize: 20,
    color: 'red',
  },
  linkContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch'
  }
});

AddressPage.navigationOptions = {
  title: 'Address'
};

AddressPage.propTypes = {};

AddressPage.defaultProps = {};

export default AddressPage;
