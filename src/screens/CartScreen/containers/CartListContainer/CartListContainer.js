import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CartList } from '../../components';

const CartListContainer = ({
  items,
  extra,
  currencySymbol,
  currencyRate,
}) => (
    <CartList
      items={items}
      extra={extra}
      currencySymbol={currencySymbol}
      currencyRate={currencyRate}
    />
  );

CartListContainer.propTypes = {
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
  items: PropTypes.array,
  extra: PropTypes.object,
};

CartListContainer.defaultProps = {
  items: [],
  extra: {},
};

const mapStateToProps = ({ cart, magento }) => {
  const { cart: { items }, products: extra } = cart;
  const {
    displayCurrencySymbol: currencySymbol,
    displayCurrencyExchangeRate: currencyRate,
  } = magento.currency;
  return {
    items,
    extra,
    currencySymbol,
    currencyRate,
  };
};

export default connect(mapStateToProps)(CartListContainer);
