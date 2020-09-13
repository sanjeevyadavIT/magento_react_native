import React, { useEffect } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCustomerCart } from '../../store/actions';
import {
  GenericTemplate,
  Text,
} from '../../common';
import { DIMENS, SPACING } from '../../constants';
import CartListItem from './CartListItem';
import CartFooter from './CartFooter';
import Status from '../../magento/Status';
import { translate } from '../../i18n';
import { cartItemType } from '../../utils';
import EmptyCartImage from '../../assets/images/empty_cart.svg';

const propTypes = {
  /**
   * Tells about the status of the fetch user cart api call
   *
   * if status === Status.DEFAULT => api hasn't been hit yet
   * if status === Status.LOADING => api is currently being executed
   * if status === Status.SUCCESS => success response from api
   * if status === Status.ERROR   => error response from api or error
   *
   * @source redux
   */
  status: PropTypes.oneOf(Object.values(Status)).isRequired,
  /**
   * Error message if api failed to fetch cart
   */
  errorMessage: PropTypes.string,
  /**
   * Redux action to fetch customer cart
   */
  /**
   * Products in cart
   */
  items: PropTypes.arrayOf(cartItemType),
  getCustomerCart: PropTypes.func.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const defaultProps = {
  errorMessage: '',
  items: [],
};

// FIXME: For some products the price in items[i] are 0 and for some actual value, hence need to fetch each item price individually
// FIXME: The logic has become two complex, extract into smaller components
const CartScreen = ({
  status,
  errorMessage,
  getCustomerCart: _getCustomerCart,
  items,
  currencySymbol,
  currencyRate,
}) => {
  useEffect(() => {
    // componentDidMount
    if (status === Status.DEFAULT) {
      _getCustomerCart();
    }
  }, []);

  return (
    <GenericTemplate
      status={status}
      errorMessage={errorMessage}
      footer={
        items.length > 0 && <CartFooter />
      }
    >
      <FlatList
        data={items}
        renderItem={({ item, index }) => (
          <CartListItem
            item={item}
            index={index}
            currencySymbol={currencySymbol}
            currencyRate={currencyRate}
          />
        )}
        contentContainerStyle={[
          styles.flatListConatiner,
          items.length === 0 && styles.fullScreen,
        ]}
        keyExtractor={item => String(item.item_id)}
        ListEmptyComponent={
          status === Status.SUCCESS && (
            <View style={styles.emptyContainer}>
              <EmptyCartImage
                width={DIMENS.cartScreen.emptyCartImageSize}
                height={DIMENS.cartScreen.emptyCartImageSize}
              />
              <Text style={styles.centerText} type="heading" bold>
                {translate('cartScreen.cartEmptyTitle')}
              </Text>
              <Text style={styles.centerText}>
                {translate('cartScreen.cartEmptyMessage')}
              </Text>
            </View>
          )
        }
      />
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  flatListConatiner: {
    paddingHorizontal: SPACING.large,
    paddingTop: SPACING.large,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    textAlign: 'center',
    marginBottom: SPACING.small,
  },
});

CartScreen.propTypes = propTypes;

CartScreen.defaultProps = defaultProps;

const mapStateToProps = ({ cart, magento }) => {
  const {
    status,
    errorMessage,
    cart: { items },
  } = cart;
  const {
    displayCurrencySymbol: currencySymbol,
    displayCurrencyExchangeRate: currencyRate,
  } = magento.currency;
  return {
    status,
    errorMessage,
    items,
    currencySymbol,
    currencyRate,
  };
};

export default connect(mapStateToProps, {
  getCustomerCart,
})(CartScreen);
