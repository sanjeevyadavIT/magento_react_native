import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { CART_PAGE_TITLE } from '../../constants';
import { getCustomerCart } from '../../store/actions';
import { GenericTemplate } from '../../components';
import { CartListContainer } from './containers';
import Status from '../../magento/Status';

const CartPage = ({
  status,
  errorMessage,
  getCustomerCart: _getCustomerCart
}) => {
  useEffect(() => {
    // componentDidMount
    if (status === Status.DEFAULT) {
      _getCustomerCart();
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

const mapStateToProps = ({ cart }) => {
  const { status, errorMessage } = cart;
  return {
    status,
    errorMessage,
  };
};

export default connect(mapStateToProps, {
  getCustomerCart
})(CartPage);
