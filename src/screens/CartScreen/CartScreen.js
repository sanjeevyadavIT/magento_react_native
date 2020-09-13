import React, { useEffect, useContext } from 'react';
import { StyleSheet, FlatList, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCustomerCart } from '../../store/actions';
import {
  GenericTemplate,
  Text,
  Button,
  Price,
} from '../../common';
import { DIMENS, SPACING } from '../../constants';
import CartListItem from './CartListItem';
import { NAVIGATION_TO_CHECKOUT_ADDRESS_SCREEN } from '../../navigation/routes';
import Status from '../../magento/Status';
import { translate } from '../../i18n';
import { ThemeContext } from '../../theme';
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
  getCustomerCart: PropTypes.func.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
  items: PropTypes.array,
  extra: PropTypes.object,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const defaultProps = {
  errorMessage: '',
  items: [],
  extra: {},
};

// FIXME: For some products the price in items[i] are 0 and for some actual value, hence need to fetch each item price individually
// FIXME: The logic has become two complex, extract into smaller components
const CartScreen = ({
  status,
  errorMessage,
  getCustomerCart: _getCustomerCart,
  items,
  extra,
  currencySymbol,
  currencyRate,
  navigation,
}) => {
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    // componentDidMount
    if (status === Status.DEFAULT) {
      _getCustomerCart();
    }
  }, []);

  const allItemPricesAvailable = () => {
    for (let i = 0; i < items.length; i += 1) {
      const { [items[i].sku]: product } = extra;
      if (!items[i].price) {
        // don't nest below if with above if
        if (!product || !product.price) {
          return false;
        }
      }
    }
    return true;
  };

  const renderTotal = () => {
    let sum = 0;
    if (items) {
      items.forEach(({ price, sku, qty }) => {
        const { [sku]: product } = extra;
        if (!price && product && product.price) {
          price = product.price;
        }

        sum += price * qty;
      });
    }
    return parseFloat(sum.toFixed(2));
  };

  const handlePlaceOrder = () => {
    if (allItemPricesAvailable()) {
      navigation.navigate(NAVIGATION_TO_CHECKOUT_ADDRESS_SCREEN);
    } else {
      Alert.alert(translate('cartScreen.priceNotAvailable'));
    }
  };

  return (
    <GenericTemplate
      status={status}
      errorMessage={errorMessage}
      footer={
        items.length > 0 && (
          <View style={styles.footer(theme)}>
            <Text type="heading" bold>
              {`${translate('common.total')} : `}
            </Text>
            <Price
              basePrice={renderTotal()}
              basePriceStyle={styles.totalPrice}
              currencyRate={currencyRate}
              currencySymbol={currencySymbol}
            />
            <Button
              disabled={status === Status.LOADING}
              style={styles.placeOrder}
              loading={!allItemPricesAvailable()}
              title={translate('cartScreen.placeOrderButton')}
              onPress={handlePlaceOrder}
            />
          </View>
        )
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
  footer: theme => ({
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.small,
    borderTopWidth: DIMENS.common.borderWidth,
    borderColor: theme.borderColor,
    backgroundColor: theme.surfaceColor,
  }),
  totalPrice: {
    fontSize: DIMENS.cartScreen.totalPriceFontSize,
  },
  placeOrder: {
    flex: 1,
    marginStart: SPACING.large,
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
    products: extra,
  } = cart;
  const {
    displayCurrencySymbol: currencySymbol,
    displayCurrencyExchangeRate: currencyRate,
  } = magento.currency;
  return {
    status,
    errorMessage,
    items,
    extra,
    currencySymbol,
    currencyRate,
  };
};

export default connect(mapStateToProps, {
  getCustomerCart,
})(CartScreen);
