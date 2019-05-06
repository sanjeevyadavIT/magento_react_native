import React, { useEffect } from 'react';
import { View } from 'react-native';
import { connect, useSelector, useActions } from 'react-redux';
import { CART } from '../../../reducers/types';
import { CART_PAGE_TITLE } from '../../../constants';
// import CartList from '../../components/cart/CartList';
import { getCustomerCart } from '../../../actions';
import Status from '../../../magento/Status';
import { GenericTemplate, Text } from '../..';
import { CartListContainer } from '../../../containers';

// FIXME: If new user try to get cart, it return error
const CartPage = ({ navigation }) => {
  const status = useSelector(state => state[CART].status);
  const errorMessage = useSelector(state => state[CART].errorMessage);
  const getCurrentCustomerCart = useActions(() => getCustomerCart(), []);

  useEffect(() => {
    // componentDidMount
    if (status === Status.DEFAULT) {
      getCurrentCustomerCart();
    }
  }, []);

  return (
    <GenericTemplate isScrollable status={status} errorMessage={errorMessage}>
      <CartListContainer />
    </GenericTemplate>
  );
};

CartPage.navigationOptions = {
  title: CART_PAGE_TITLE,
};

CartPage.propTypes = {};

CartPage.defaultProps = {};

export default CartPage;
