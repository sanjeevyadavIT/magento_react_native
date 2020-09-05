import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from '../../common';
import { SPACING } from '../../constants';
import { addressType, isNonEmptyString } from '../../utils';
import { translate } from '../../i18n';

const propTypes = {
  address: addressType.isRequired,
};

const defaultProps = {};

const Address = ({ address }) => {
  return (
    <Card style={styles.container}>
      <Text
        bold
        type="subheading"
        style={styles.name}
      >{`${address.firstname} ${address.lastname}`}</Text>
      {address.street.map(street => (
        <Text>{street}</Text>
      ))}
      <Text>{`${address.city} - ${address.postcode}`}</Text>
      {isNonEmptyString(address.region.region) && (
        <Text>{address.region.region}</Text>
      )}
      <Text style={styles.mobile}>{`${translate('common.mobile')}: ${address.telephone}`}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.large,
    marginBottom: SPACING.large,
  },
  name: {
    marginBottom: SPACING.small,
    textTransform: 'capitalize',
  },
  mobile: {
    marginTop: SPACING.small,
  }
});

Address.propTypes = propTypes;

Address.defaultProps = defaultProps;

export default Address;
