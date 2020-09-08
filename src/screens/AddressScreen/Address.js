import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Card, Text, Button, Divider } from '../../common';
import { SPACING, DIMENS } from '../../constants';
import { addressType, isNonEmptyString } from '../../utils';
import { translate } from '../../i18n';
import { ThemeContext } from '../../theme';

const propTypes = {
  address: addressType.isRequired,
  /**
   * Whether this address is selected or not
   *
   * when address is active, it will show extra
   * buttons to perform various operations
   */
  active: PropTypes.bool,
  /**
   * Callback function when entire address container is called
   */
  onPress: PropTypes.func,
  /**
   * Callback function to be called when click on "Edit" button
   */
  onEdit: PropTypes.func,
  /**
   * Callback function to set current address as default address
   */
  setDefaultAddress: PropTypes.func,
  /**
   * Callback functions to delete current address
   */
  onDelete: PropTypes.func,
  /**
   * Disable all click operations
   */
  disabled: PropTypes.func,
};

const defaultProps = {
  onPress: null,
  active: false,
  onEdit: () => {},
  onDelete: () => {},
  setDefaultAddress: () => {},
  disabled: false,
};

const Address = ({
  disabled,
  address,
  active,
  onPress,
  onEdit,
  onDelete,
  setDefaultAddress,
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Card style={styles.container} {...(!active && { onPress, disabled })}>
      <View style={styles.addressContainer(active)}>
        <View style={styles.nameContainer}>
          <Text
            bold
            type="subheading"
            style={styles.name}
          >{`${address.firstname} ${address.lastname}`}</Text>
          {address.default_billing && address.default_shipping && (
            <Text style={styles.default(theme)}>
              {translate('addressScreen.defaultAddress')}
            </Text>
          )}
        </View>
        {address.street.map(street => (
          <Text>{street}</Text>
        ))}
        <Text>{`${address.city} - ${address.postcode}`}</Text>
        {isNonEmptyString(address.region.region) && (
          <Text>{address.region.region}</Text>
        )}
        <Text style={styles.mobile}>{`${translate('common.mobile')}: ${
          address.telephone
        }`}</Text>
      </View>
      {!address.default_billing && !address.default_shipping && active && (
        <Button
          size="sm"
          type="clear"
          disabled={disabled}
          onPress={setDefaultAddress}
          title={translate('addressScreen.setDefaultAddress')}
        />
      )}
      {active && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Button
            type="clear"
            onPress={onEdit}
            disabled={disabled}
            style={styles.stretch}
            title={translate('common.edit')}
          />
          <Divider vertical style={styles.divider} />
          <Button
            type="clear"
            onPress={onDelete}
            disabled={disabled}
            style={styles.stretch}
            title={translate('common.delete')}
          />
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.large,
  },
  addressContainer: active => ({
    paddingHorizontal: SPACING.large,
    paddingTop: SPACING.large,
    paddingBottom: active ? SPACING.small : SPACING.large,
  }),
  nameContainer: {
    flexDirection: 'row',
  },
  name: {
    flex: 1,
    marginBottom: SPACING.small,
    textTransform: 'capitalize',
  },
  default: theme => ({
    fontSize: 10,
    color: theme.successColor,
    textAlign: 'center',
    borderWidth: DIMENS.common.borderWidth,
    borderColor: theme.successColor,
    paddingHorizontal: SPACING.tiny,
    marginTop: SPACING.tiny,
    borderRadius: 5,
    alignSelf: 'flex-start',
  }),
  mobile: {
    marginTop: SPACING.small,
  },
  stretch: {
    flex: 1,
  },
  divider: {
    height: '70%',
  },
});

Address.propTypes = propTypes;

Address.defaultProps = defaultProps;

export default Address;
