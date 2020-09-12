import React, { useEffect, useContext } from 'react';
import { StyleSheet, FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOrders } from '../../store/actions';
import { GenericTemplate, MessageView, Spinner, Button } from '../../common';
import OrderListItem from './OrderListItem';
import Status from '../../magento/Status';
import { SPACING } from '../../constants';
import { translate } from '../../i18n';
import { orderType } from '../../utils';
import { ThemeContext } from '../../theme';

const propTypes = {
  orders: PropTypes.arrayOf(orderType),
  getOrders: PropTypes.func.isRequired,
  ordersStatus: PropTypes.oneOf(Object.values(Status)).isRequired,
  ordersErrorMessage: PropTypes.string,
  moreOrdersStatus: PropTypes.oneOf(Object.values(Status)).isRequired,
  moreOrdersErrorMessage: PropTypes.string,
  totalOrders: PropTypes.number.isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      customerId: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

const defaultProps = {
  orders: [],
  ordersErrorMessage: '',
  moreOrdersErrorMessage: '',
};

// TODO: Show error message in case of error
const OrdersScreen = ({
  ordersStatus,
  moreOrdersStatus,
  totalOrders,
  ordersErrorMessage,
  moreOrdersErrorMessage,
  route: {
    params: { customerId },
  },
  orders,
  getOrders: _getOrders,
  navigation,
}) => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    // componentDidMount
    if (ordersStatus === Status.DEFAULT) {
      refreshList();
    }
  }, []);

  const refreshList = (offset = 0) => {
    _getOrders(customerId, offset);
  };

  const renderItem = ({ item }) => <OrderListItem item={item} navigation={navigation} />;

  const renderFooter = () => {
    if (moreOrdersStatus === Status.LOADING) {
      return <Spinner size="small" style={styles.spaceBottom} />;
    }

    if (
      totalOrders !== 0 &&
      moreOrdersStatus !== Status.ERROR &&
      orders.length < totalOrders
    ) {
      return (
        <Button
          type="clear"
          style={styles.loadmore}
          title={translate('common.loadMore')}
          onPress={() => refreshList(orders.length)}
        />
      );
    }

    return <></>;
  };

  return (
    <GenericTemplate status={Status.SUCCESS}>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          ordersStatus === Status.SUCCESS && (
            <MessageView message={translate('ordersScreen.orderEmptyMessage')} />
          )
        }
        ListFooterComponent={renderFooter}
        contentContainerStyle={[
          styles.flatListConatiner,
          orders.length === 0 && { flex: 1 },
        ]}
        refreshControl={
          <RefreshControl
            refreshing={
              ordersStatus === Status.DEFAULT || ordersStatus === Status.LOADING
            }
            onRefresh={() => refreshList()}
            title={translate('common.pullToRefresh')}
            tintColor={theme.primaryColor}
            colors={[theme.primaryColor]}
          />
        }
      />
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  flatListConatiner: {
    paddingHorizontal: SPACING.large,
    paddingTop: SPACING.large,
  },
  loadmore: {
    paddingVertical: 0,
    marginBottom: SPACING.small,
  },
});

OrdersScreen.propTypes = propTypes;

OrdersScreen.defaultProps = defaultProps;

const mapStateToProps = ({ account }) => {
  const {
    orders,
    ordersStatus,
    ordersErrorMessage,
    moreOrdersStatus,
    moreOrdersErrorMessage,
    totalOrders,
  } = account;
  return {
    orders,
    ordersStatus,
    ordersErrorMessage,
    moreOrdersStatus,
    moreOrdersErrorMessage,
    totalOrders,
  };
};

export default connect(mapStateToProps, {
  getOrders,
})(OrdersScreen);
