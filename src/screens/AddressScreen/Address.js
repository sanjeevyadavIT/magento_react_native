import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from '../../common';
import { SPACING, DIMENS } from '../../constants';
import { addressType, isNonEmptyString } from '../../utils';
import { translate } from '../../i18n';
import { ThemeContext } from '../../theme';

const propTypes = {
  address: addressType.isRequired,
};

const defaultProps = {};

const Address = ({ address }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Card style={styles.container}>
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
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.large,
    marginBottom: SPACING.large,
  },
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
});

Address.propTypes = propTypes;

Address.defaultProps = defaultProps;

export default Address;
