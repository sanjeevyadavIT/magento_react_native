import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GenericTemplate, Button, MessageView } from '../../common';
import { NAVIGATION_TO_EDIT_ACCOUNT_ADDRESS_SCREEN } from '../../navigation/routes';
import Status from '../../magento/Status';
import { translate } from '../../i18n';
import { SPACING } from '../../constants';
import { addressType } from '../../utils';
import Address from './Address';

const propTypes = {
  addresses: PropTypes.arrayOf(addressType),
  customerId: PropTypes.number,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const defaultProps = {
  customerId: -1,
  addresses: [],
};

const AddressScreen = ({ addresses, customerId, navigation }) => {
  return (
    <GenericTemplate
      status={Status.SUCCESS}
      footer={
        <Button
          style={styles.footer}
          title={translate('addressScreen.addNew')}
          onPress={() => {
            navigation.navigate(NAVIGATION_TO_EDIT_ACCOUNT_ADDRESS_SCREEN, {
              customerId,
            });
          }}
        />
      }
    >
      <FlatList
        data={addresses}
        renderItem={({ item }) => <Address address={item} />}
        keyExtractor={item => String(item.item_id)}
        ListEmptyComponent={
          <MessageView message={translate('addressScreen.noAddress')} />
        }
        contentContainerStyle={styles.flatListConatiner}
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
  }
});

AddressScreen.propTypes = propTypes;

AddressScreen.defaultProps = defaultProps;

const mapStateToProps = ({ account }) => {
  const {
    customer: { id: customerId, addresses },
  } = account;
  return {
    customerId,
    addresses,
  };
};

export default connect(mapStateToProps)(AddressScreen);
