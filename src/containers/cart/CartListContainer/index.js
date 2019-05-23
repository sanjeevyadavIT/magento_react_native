import React from 'react';
import { useSelector } from 'react-redux';
import { CartList } from '../../../components';

const CartListContainer = () => {
  const items = useSelector(state => state.cart.cart.items);
  return (
    <CartList items={items} />
  );
};

export default CartListContainer;
