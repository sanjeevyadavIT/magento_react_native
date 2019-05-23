import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CART_PAGE_TITLE } from '../../../constants';
import { getCustomerCart } from '../../../store/actions';
import { GenericTemplate } from '../..';
import { CartListContainer } from '../../../containers';
import Status from '../../../magento/Status';

const CartPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const status = useSelector(state => state.cart.status);
  const errorMessage = useSelector(state => state.cart.errorMessage);

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
