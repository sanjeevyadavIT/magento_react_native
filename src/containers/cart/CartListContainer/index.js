import React from 'react';
import { useSelector } from 'react-redux';
import { CartList } from '../../../components';
import { CART } from '../../../reducers/types';

const CartListContainer = () => {
  const items = useSelector(state => state[CART].cart.items);
  return (
    <CartList items={items} />
  );
};

export default CartListContainer;
