import React, { useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOrderList } from '../../store/actions';
import { GenericTemplate, MessageView } from '../../common';
import { OrderListItem } from './components';
import Status from '../../magento/Status';
import { translate } from '../../i18n';

// TODO: Refresh orders, to reflect new orders
const OrdersScreen = ({
  status,
  errorMessage,
  route,
  navigation,
  orders,
  getOrderList: _getOrderList,
}) => {
  useEffect(() => {
    // componentDidMount
    if (status === Status.DEFAULT) {
      const { customerId = -1 } = route.params;
      _getOrderList(customerId);
    }
  }, []);

  const renderItem = ({ item }) => (<OrderListItem item={item} />);

  return (
    <GenericTemplate scrollable={false} status={status} errorMessage={errorMessage}>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<MessageView message={translate('orderScreen.orderEmptyMessage')} />}
      />
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({});

OrdersScreen.navigationOptions = ({ navigation }) => ({

});

OrdersScreen.propTypes = {
  orders: PropTypes.array,
  getOrderList: PropTypes.func.isRequired,
  status: PropTypes.oneOf(Object.values(Status)).isRequired,
  errorMessage: PropTypes.string,
};

OrdersScreen.defaultProps = {
  orders: [],
  errorMessage: '',
};

const mapStateToProps = ({ account }) => {
  const { orders, orderStatus: status, ordersErrorMessage: errorMessage } = account;
  return {
    orders,
    status,
    errorMessage,
  };
};

export default connect(mapStateToProps, {
  getOrderList,
})(OrdersScreen);
