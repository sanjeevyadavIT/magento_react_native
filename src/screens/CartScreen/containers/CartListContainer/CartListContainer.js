import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CartList } from '../../../../components';

const CartListContainer = ({
  items,
  extra,
  currencySymbol,
}) => (
  <CartList
    items={items}
    extra={extra}
    currencySymbol={currencySymbol}
  />
);

CartListContainer.propTypes = {
  currencySymbol: PropTypes.string.isRequired,
  items: PropTypes.array,
  extra: PropTypes.object,
};

CartListContainer.defaultProps = {
  items: [],
  extra: {},
};

const mapStateToProps = ({ cart, magento }) => {
  const { cart: { items }, products: extra } = cart;
  const { default_display_currency_symbol: currencySymbol } = magento.currency;
  return {
    items,
    extra,
    currencySymbol
  };
};

export default connect(mapStateToProps)(CartListContainer);
