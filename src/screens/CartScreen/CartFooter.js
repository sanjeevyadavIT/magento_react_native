import React, { useContext } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { getCustomerCart } from '../../store/actions';
import { Text, Button, Price } from '../../common';
import { DIMENS, SPACING } from '../../constants';
import { NAVIGATION_TO_CHECKOUT_ADDRESS_SCREEN } from '../../navigation/routes';
import Status from '../../magento/Status';
import { translate } from '../../i18n';
import { ThemeContext } from '../../theme';
import { cartItemType } from '../../utils';

const propTypes = {
  /**
   * Tells about the status of the fetch user cart api call
   *
   * @source redux
   */
  status: PropTypes.oneOf(Object.values(Status)).isRequired,
  /**
   * Products in cart
   */
  items: PropTypes.arrayOf(cartItemType),
  extra: PropTypes.object,
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
};

const defaultProps = {
  items: [],
  extra: {},
};

const CartFooter = ({ status, items, extra, currencySymbol, currencyRate }) => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);

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
    <View style={styles.container(theme)}>
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
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.small,
    borderTopWidth: DIMENS.common.borderWidth,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  }),
  totalPrice: {
    fontSize: DIMENS.cartScreen.totalPriceFontSize,
  },
  placeOrder: {
    flex: 1,
    marginStart: SPACING.large,
  },
});

CartFooter.propTypes = propTypes;

CartFooter.defaultProps = defaultProps;

const mapStateToProps = ({ cart, product, magento }) => {
  const {
    status,
    cart: { items },
  } = cart;
  const { cachedProductDetails: extra } = product;
  const {
    displayCurrencySymbol: currencySymbol,
    displayCurrencyExchangeRate: currencyRate,
  } = magento.currency;
  return {
    status,
    items,
    extra,
    currencySymbol,
    currencyRate,
  };
};

export default connect(mapStateToProps, {
  getCustomerCart,
})(CartFooter);
