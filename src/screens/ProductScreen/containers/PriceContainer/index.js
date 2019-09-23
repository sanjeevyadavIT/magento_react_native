import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Price } from '../../../../components';
import { Price as PricePojo, getPriceFromChildren } from '../../../../utils/products';

/**
 * @todo In future PriceContianer can show other information,
 * like with or without tax
 */
const PriceContainer = ({
  /**
   * @redux prices of the product
   */
  startingPrice,
  /**
   * @redux, in case of `configurable type product
   */
  endingPrice,
  /**
   * @redux currency symbol to display along side price
   */
  currencySymbol,
}) => {
  const getPriceProps = () => {
    const priceProps = {
      basePrice: startingPrice,
    };
    if (startingPrice !== endingPrice) {
      priceProps.startingPrice = startingPrice;
      priceProps.endingPrice = endingPrice;
    }
    return priceProps;
  };

  return (
    <Price {...getPriceProps()} currencySymbol={currencySymbol} />
  );
};

PriceContainer.propTypes = {
  startingPrice: PropTypes.number, // redux
  endingPrice: PropTypes.number, // redux
  currencySymbol: PropTypes.string.isRequired, // redux
};

PriceContainer.defaultProps = {
  startingPrice: 0,
  endingPrice: 0,
};

const mapStateToProps = (state) => {
  const { detail: { price: basePrice, type_id: type, children }, selectedProduct } = state.product;
  const { currency: { default_display_currency_symbol: currencySymbol } } = state.magento;
  let price = new PricePojo(basePrice, basePrice);

  if (type === 'configurable') {
    if (selectedProduct) {
      price = new PricePojo(selectedProduct.price, selectedProduct.price);
    } else if (children) {
      price = getPriceFromChildren(children);
    }
  }

  return {
    startingPrice: price.starting,
    endingPrice: price.ending,
    currencySymbol,
    children,
  };
};

export default connect(mapStateToProps)(PriceContainer);
