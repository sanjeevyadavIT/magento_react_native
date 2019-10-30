import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { GenericTemplate, Text, Button } from '../../components';
import { NAVIGATION_ORDER_DETAIL_SCREEN } from '../../navigation/types';
import Status from '../../magento/Status';
import { ThemeContext } from '../../theme';
import { ORDER_ACKNOWLEDGEMENT_SCREEN_TITLE } from '../../constants';

// TODO: Extract strings in strings.js
const OrderAcknowledgementScreen = ({
  orderId,
  navigation
}) => {
  const status = navigation.getParam('status', Status.ERROR);
  const errorMessage = navigation.getParam('errorMessage', 'Sorry for the inconvenience, unable to place your order!');
  const theme = useContext(ThemeContext);

  const renderFooter = () => (
    <View>
      <Button title="View Order" onPress={() => navigation.navigate(NAVIGATION_ORDER_DETAIL_SCREEN, { orderId })} />
      <View style={styles.space(theme)} />
      <Button title="Continue Shopping" onPress={() => navigation.popToTop()} />
    </View>
  );

  return (
    <GenericTemplate
      isScrollable={false}
      status={status}
      errorMessage={errorMessage}
      footer={renderFooter()}
    >
      <View style={styles.container}>
        <Icon name="verified-user" size={30} color="#4caf50" />
        <Text type="subheading" bold>Order Confirmed</Text>
        <Text>You will receive an order confirmation email shortly.</Text>
      </View>
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  space: theme => ({
    flex: 1,
    marginTop: theme.spacing.small,
  })
});

OrderAcknowledgementScreen.navigationOptions = {
  title: ORDER_ACKNOWLEDGEMENT_SCREEN_TITLE,
};

OrderAcknowledgementScreen.propTypes = {
  orderId: PropTypes.number.isRequired
};

OrderAcknowledgementScreen.defaultProps = {};

const mapStateToProps = ({ checkout }) => {
  const { orderId } = checkout;
  return {
    orderId,
  };
};

export default connect(mapStateToProps)(OrderAcknowledgementScreen);
