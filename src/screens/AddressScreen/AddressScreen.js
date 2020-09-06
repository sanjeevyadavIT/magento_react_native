import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GenericTemplate, Button, MessageView } from '../../common';
import { NAVIGATION_TO_ADD_EDIT_ADDRESS_SCREEN } from '../../navigation/routes';
import Status from '../../magento/Status';
import { translate } from '../../i18n';
import { SPACING } from '../../constants';
import { addressType } from '../../utils';
import Address from './Address';

const propTypes = {
  addresses: PropTypes.arrayOf(addressType),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const defaultProps = {
  addresses: [],
};

const AddressScreen = ({ addresses, navigation }) => {
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
        renderItem={({ item }) => <Address address={item} />}
        ListEmptyComponent={
          <MessageView message={translate('addressScreen.noAddress')} />
        }
        contentContainerStyle={[
          styles.flatListConatiner,
          addresses.length === 0 && { flex: 1 },
        ]}
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
});

AddressScreen.propTypes = propTypes;

AddressScreen.defaultProps = defaultProps;

const mapStateToProps = ({ account }) => {
  const {
    customer: { addresses },
  } = account;
  return {
    addresses,
  };
};

export default connect(mapStateToProps)(AddressScreen);
