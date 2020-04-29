import React, { useContext } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text/Text';
import { isNumber, formatPrice } from './utils';
import { ThemeContext } from '../../theme';

/**
 * Component to display price of the product
 * If {@link startingPrice} is mentioned, {@link basePrice} & {@link discountPrice}
 * will not be rendered.
 *
 * @param {Object} props                             - props of the component
 * @param {number} [props.basePrice = 0]             - default selling price of the product type `simple`
 * @param {number} [props.startingPrice = undefined] - in case of `configurable` type product,
 *                                                     show lowest price, as configurable type product
 *                                                     can have different prices, based on option selected
 * @param {number} [props.endingPrice = undefined]   - in case of `configurable` type product, maximum price of it's child
 * @param {number} [props.discountPrice = 0]         - special or discount price for the product
 * @param {string} props.currencySymbol              - currency symbol to append before price
 * @param {string} props.currencyRate                - currency rate which must be multiply with the actual price.
 *
 * @return React component
 */
const Price = ({
  currencySymbol,
  currencyRate,
  basePrice,
  discountPrice,
  startingPrice,
  endingPrice,
}) => {
  const theme = useContext(ThemeContext);
  const isBold = () => discountPrice && discountPrice < basePrice;
  const renderDiscountPrice = () => (discountPrice === basePrice ? null : <Text type="label" bold={isBold()} style={styles.discountPriceText(theme)}>{`${currencySymbol}${formatPrice(discountPrice)}`}</Text>);

  if (isNumber(startingPrice)) {
    return (
      <View style={styles.container}>
        { !isNumber(endingPrice) ? <Text>From </Text> : null }
        <Text type="label" bold>{`${currencySymbol}${formatPrice(startingPrice, currencyRate)}`}</Text>
        { isNumber(endingPrice) ? <Text type="label" bold>{` - ${currencySymbol}${formatPrice(endingPrice, currencyRate)}`}</Text> : null}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {discountPrice ? renderDiscountPrice() : null}
      <Text type="label" bold={!isBold()} style={styles.basePriceText(basePrice, discountPrice)}>{`${currencySymbol}${formatPrice(basePrice, currencyRate)}`}</Text>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row'
  },
  discountPriceText: theme => ({
    marginEnd: theme.spacing.tiny,
  }),
  basePriceText: (basePrice, discountPrice) => ({
    textDecorationLine: discountPrice && discountPrice < basePrice ? 'line-through' : 'none',
  }),
};

Price.propTypes = {
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
  basePrice: PropTypes.number,
  discountPrice: PropTypes.number,
  startingPrice: PropTypes.oneOfType([
    PropTypes.number,
    undefined
  ]),
  endingPrice: PropTypes.oneOfType([
    PropTypes.number,
    undefined
  ]),
};

Price.defaultProps = {
  basePrice: 0,
  discountPrice: 0,
  startingPrice: undefined,
  endingPrice: undefined,
};

export default Price;
