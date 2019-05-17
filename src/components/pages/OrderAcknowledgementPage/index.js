import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CHECKOUT } from '../../../reducers/types';
import { GenericTemplate, Text, Button } from '../..';
import { NAVIGATION_ORDER_DETAIL_SCREEN_PATH } from '../../../navigation/types';
import Status from '../../../magento/Status';

// TODO: Extract strings in strings.js
const OrderAcknowledgementPage = ({ navigation }) => {
  const status = navigation.getParam('status', Status.ERROR);
  const errorMessage = navigation.getParam('errorMessage', 'Sorry for the inconvenience, unable to place your order!');
  const orderId = useSelector(state => state[CHECKOUT].orderId);

  const renderFooter = () => (
    <View>
      <Button title="View Order" onPress={() => navigation.navigate(NAVIGATION_ORDER_DETAIL_SCREEN_PATH, { orderId })} />
      <View style={styles.space} />
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
        <Text style={styles.text}>Order Confirmed</Text>
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
  text: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  space: {
    flex: 1,
    marginTop: 8,
  }
});

OrderAcknowledgementPage.navigationOptions = {
  title: 'CONFIRMATION',
};

OrderAcknowledgementPage.propTypes = {};

OrderAcknowledgementPage.defaultProps = {};

export default OrderAcknowledgementPage;
