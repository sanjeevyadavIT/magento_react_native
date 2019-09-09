import React, { useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useNetInfo } from '@react-native-community/netinfo';
import { getOrderList } from '../../../store/actions';
import { GenericTemplate, OrderListItem } from '../..';
import Status from '../../../magento/Status';

// TODO: Refresh orders, to reflect new orders
const OrdersPage = ({
  navigation,
}) => {
  const dispatch = useDispatch();
  const netInfo = useNetInfo();
  const status = useSelector(state => state.account.orderStatus);
  const errorMessage = useSelector(state => state.account.ordersErrorMessage);
  const orders = useSelector(state => state.account.orders);

  useEffect(() => {
    // componentDidMount
    if (status === Status.DEFAULT || status === Status.ERROR) {
      const customerId = navigation.getParam('customerId', -1);
      dispatch(getOrderList(customerId));
    }
  }, [netInfo.isConnected]);

  const renderItem = ({ item }) => (<OrderListItem item={item} />);

  return (
    <GenericTemplate
      networkConnected={netInfo.isConnected}
      isScrollable={false}
      status={status}
      errorMessage={errorMessage}
    >
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({});

OrdersPage.navigationOptions = ({ navigation }) => ({
  title: 'My Orders',
});

OrdersPage.propTypes = {};

export default OrdersPage;
