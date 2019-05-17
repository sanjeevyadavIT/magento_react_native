import React, { useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getOrderList } from '../../../actions';
import { ACCOUNT } from '../../../reducers/types';
import { GenericTemplate, OrderListItem } from '../..';
import Status from '../../../magento/Status';

// TODO: Refresh orders, to reflect new orders
const OrdersPage = ({
  navigation,
}) => {
  const dispatch = useDispatch();
  const status = useSelector(state => state[ACCOUNT].orderStatus);
  const errorMessage = useSelector(state => state[ACCOUNT].errorMessage);
  const orders = useSelector(state => state[ACCOUNT].orders);

  useEffect(() => {
    // componentDidMount
    if (status === Status.DEFAULT) {
      const customerId = navigation.getParam('customerId', -1);
      dispatch(getOrderList(customerId));
    }
  }, []);

  const renderItem = ({ item }) => (<OrderListItem item={item} />);

  return (
    <GenericTemplate isScrollable={false} status={status} errorMessage={errorMessage}>
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
