import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { GenericTemplate, Text, Button } from '../../common';
import { NAVIGATION_TO_ORDER_DETAIL_SCREEN } from '../../navigation/routes';
import { resetCheckoutState } from '../../store/actions';
import Status from '../../magento/Status';
import { translate } from '../../i18n';
import { DIMENS, SPACING } from '../../constants';
import OrderCompleteScreen from '../../assets/images/order_complete.svg';

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

const OrderAcknowledgementScreen = ({
  navigation,
  route: {
    params: {
      orderId,
      status = Status.ERROR,
      errorMessage = translate('orderAcknowledgementScreen.orderNotPlace'),
    }
  },
  resetCheckoutState: _resetCheckoutState,
}) => {
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
      style={styles.container}
      footer={
        <View style={styles.footer}>
          <Button
            title={translate('orderAcknowledgementScreen.viewOrderButton')}
            onPress={() =>
              navigation.navigate(NAVIGATION_TO_ORDER_DETAIL_SCREEN, {
                orderId,
              })
            }
          />
          <Button
            style={styles.button}
            title={translate('orderAcknowledgementScreen.continueButton')}
            onPress={navigation.popToTop}
          />
        </View>
      }
    >
      <OrderCompleteScreen width={DIMENS.orderAcknowledgementScreen.orderImageSize} height={DIMENS.orderAcknowledgementScreen.orderImageSize} />
      <Text style={styles.title} type="heading" bold>
        {translate('orderAcknowledgementScreen.orderPlaced')}
      </Text>
      <Text style={styles.message}>
        {translate('orderAcknowledgementScreen.orderPlacedMessage')}
      </Text>
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
  footer: {
    padding: SPACING.small
  },
  button: {
    marginTop: SPACING.small,
  },
  title: {
    textAlign: 'center',
    marginTop: SPACING.large,
  },
  message: {
    marginTop: SPACING.tiny,
    textAlign: 'center',
  },
});

OrderAcknowledgementScreen.propTypes = propTypes;

OrderAcknowledgementScreen.defaultProps = defaultProps;

export default connect(null, {
  resetCheckoutState,
})(OrderAcknowledgementScreen);
