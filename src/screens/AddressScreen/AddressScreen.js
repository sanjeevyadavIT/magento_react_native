import React, { useState, useContext } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import { GenericTemplate, Button, Text } from '../../common';
import { NAVIGATION_TO_ADD_EDIT_ADDRESS_SCREEN } from '../../navigation/routes';
import Status from '../../magento/Status';
import { updateCustomer} from '../../store/actions';
import { magento } from '../../magento';
import { translate } from '../../i18n';
import { SPACING, DIMENS } from '../../constants';
import { customerType } from '../../utils';
import Address from './Address';
import { ThemeContext } from '../../theme';
import AddressImage from '../../assets/images/address.svg';

const propTypes = {
  customer: customerType.isRequired,
  updateCustomer: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const defaultProps = {};

const AddressScreen = ({ customer, updateCustomer: _updateCustomer, navigation }) => {
  const { addresses } = customer;
  const [apiStatus, setApiStatus] = useState(Status.DEFAULT);
  const [selectedAddress, setSelectedAddress] = useState(-1);
  const { theme } = useContext(ThemeContext);

  const editAddress = index =>
    navigation.navigate(NAVIGATION_TO_ADD_EDIT_ADDRESS_SCREEN, {
      mode: 'edit',
      address: addresses[index],
    });

  const setDefaultAddress = index => {
    setApiStatus(Status.LOADING);
    const address = {
      ...addresses[index],
      default_billing: true,
      default_shipping: true,
    };
    let addressList = addresses.filter(item => item.id !== address.id);
    addressList = addressList.map(item => ({
      ...item,
      default_billing: false,
      default_shipping: false,
    }));
    updateProfile([...addressList, address]);
  };

  const onDelete = index => {
    setApiStatus(Status.LOADING);
    const addressId = addresses[index].id;
    const addressList = addresses.filter(item => item.id !== addressId);
    updateProfile(addressList);
  };

  const updateProfile = newAddressList => {
    const customerData = {
      customer: {
        ...customer,
        addresses: newAddressList,
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
  }

  return (
    <GenericTemplate
      status={Status.SUCCESS}
      footer={
        <Button
          style={styles.footer}
          title={translate('addressScreen.addNew')}
          onPress={() => {
            navigation.navigate(NAVIGATION_TO_ADD_EDIT_ADDRESS_SCREEN, {
              mode: 'new',
            });
          }}
        />
      }
    >
      <FlatList
        data={addresses}
        keyExtractor={item => String(item.id)}
        renderItem={({ item, index }) => (
          <Address
            address={item}
            disabled={apiStatus === Status.LOADING}
            active={selectedAddress === index}
            onPress={() => setSelectedAddress(index)}
            onEdit={() => editAddress(index)}
            onDelete={() => onDelete(index)}
            setDefaultAddress={() => setDefaultAddress(index)}
          />
        )}
        ListEmptyComponent={
          (
            <View style={styles.emptyContainer}>
              <AddressImage
                width={DIMENS.addressScreen.emptyImageSize}
                height={DIMENS.addressScreen.emptyImageSize}
              />
              <Text style={styles.centerText} type="heading" bold>
                {translate('addressScreen.noAddressTitle')}
              </Text>
              <Text style={styles.centerText}>
              {translate('addressScreen.noAddressMessage')}
              </Text>
            </View>
          )}
        contentContainerStyle={[
          styles.flatListConatiner,
          addresses.length === 0 && { flex: 1 },
        ]}
        refreshControl={
          <RefreshControl
            refreshing={apiStatus === Status.LOADING}
            tintColor={theme.primaryColor}
            colors={[theme.primaryColor]}
          />
        }
      />
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  flatListConatiner: {
    paddingHorizontal: SPACING.large,
    paddingTop: SPACING.large,
  },
  footer: {
    borderRadius: 0,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    textAlign: 'center',
    marginTop: SPACING.small,
  },
});

AddressScreen.propTypes = propTypes;

AddressScreen.defaultProps = defaultProps;

const mapStateToProps = ({ account }) => {
  const {
    customer,
  } = account;
  return {
    customer,
  };
};

export default connect(mapStateToProps, { updateCustomer })(AddressScreen);
