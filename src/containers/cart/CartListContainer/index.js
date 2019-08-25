import React from 'react';
import { useSelector } from 'react-redux';
import { CartList } from '../../../components';

const CartListContainer = () => {
  const items = useSelector(state => state.cart.cart.items);
  const extra = useSelector(state => state.cart.products);
  const currencySymbol = useSelector(state => state.magento.currency.default_display_currency_symbol);
  return (
    <CartList items={items} extra={extra} currencySymbol={currencySymbol} />
  );
};

export default CartListContainer;
