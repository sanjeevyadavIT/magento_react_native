import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { GenericTemplate, Text, Button } from '../../common';
import { NAVIGATION_TO_ORDER_DETAIL_SCREEN } from '../../navigation/routes';
import { resetCheckoutState } from '../../store/actions';
import Status from '../../magento/Status';
import { translate } from '../../i18n';
import { ThemeContext } from '../../theme';
import { SPACING } from '../../constants';

const propTypes = {
  orderId: PropTypes.number.isRequired,
  resetCheckoutState: PropTypes.func.isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      status: PropTypes.oneOf(Object.values(Status)).isRequired,
      orderId: PropTypes.number,
      errorMessage: PropTypes.string,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    popToTop: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const defaultProps = {};

// TODO: Extract strings in strings.js
const OrderAcknowledgementScreen = ({
  navigation,
  route,
  resetCheckoutState: _resetCheckoutState,
}) => {
  const {
    status = Status.ERROR,
    orderId,
    errorMessage = translate('orderAcknowledgementScreen.orderNotPlace'),
  } = route.params;
  const { theme } = useContext(ThemeContext);

  useEffect(
    () => () => {
      // componentDidUnmount: Reset entire checkout state
      _resetCheckoutState();
    },
    [],
  );

  return (
    <GenericTemplate
      status={status}
      errorMessage={errorMessage}
      footer={
        <View>
          <Button
            title={translate('orderAcknowledgementScreen.viewOrderButton')}
            onPress={() =>
              navigation.navigate(NAVIGATION_TO_ORDER_DETAIL_SCREEN, { orderId })
            }
          />
          <View style={styles.space} />
          <Button
            title={translate('orderAcknowledgementScreen.continueButton')}
            onPress={() => navigation.popToTop()}
          />
        </View>
      }
    >
      <View style={styles.container}>
        <Icon size={30} name="verified-user" color={theme.successColor} />
        <Text type="subheading" bold>
          {translate('orderAcknowledgementScreen.orderPlaced')}
        </Text>
        <Text style={styles.text}>
          {translate('orderAcknowledgementScreen.orderPlacedMessage')}
        </Text>
      </View>
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.large,
  },
  space: {
    flex: 1,
    marginTop: SPACING.small,
  },
  text: {
    textAlign: 'center',
  }
});

OrderAcknowledgementScreen.propTypes = propTypes;

OrderAcknowledgementScreen.defaultProps = defaultProps;

export default connect(null, {
  resetCheckoutState,
})(OrderAcknowledgementScreen);
