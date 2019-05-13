import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CART } from '../../../reducers/types';
import { CART_PAGE_TITLE } from '../../../constants';
import { getCustomerCart } from '../../../actions';
import { GenericTemplate } from '../..';
import { CartListContainer } from '../../../containers';
import Status from '../../../magento/Status';

// FIXME: If new user try to get cart, it return error
const CartPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector(state => state[CART]);

  useEffect(() => {
    // componentDidMount
    if (status === Status.DEFAULT) {
      dispatch(getCustomerCart());
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
