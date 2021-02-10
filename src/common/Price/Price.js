import React, { useContext } from 'react';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text/Text';
import { isNumber, formatPrice } from './utils';
import { ThemeContext } from '../../theme';
import { SPACING } from '../../constants';

const propTypes = {
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
  basePrice: PropTypes.number,
  discountPrice: PropTypes.number,
  containerStyle: ViewPropTypes.style,
  startingPrice: PropTypes.oneOfType([PropTypes.number, undefined]),
  endingPrice: PropTypes.oneOfType([PropTypes.number, undefined]),
  basePriceStyle: Text.propTypes.style,
};

const defaultProps = {
  basePrice: 0,
  discountPrice: 0,
  startingPrice: undefined,
  endingPrice: undefined,
  basePriceStyle: {},
  containerStyle: {},
};

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
  basePriceStyle,
  containerStyle,
}) => {
  const { theme } = useContext(ThemeContext);
  const isBold = () => discountPrice && discountPrice < basePrice;
  const renderDiscountPrice = () =>
    discountPrice === basePrice ? null : (
      <Text
        bold={isBold()}
        style={styles.discountPriceText}
      >{`${currencySymbol}${formatPrice(discountPrice)}`}</Text>
    );

  if (isNumber(startingPrice)) {
    return (
      <View style={styles.container}>
        {!isNumber(endingPrice) ? <Text>From </Text> : null}
        <Text type="label" bold>{`${currencySymbol}${formatPrice(
          startingPrice,
          currencyRate,
        )}`}</Text>
        {isNumber(endingPrice) ? (
          <Text type="label" bold>{` - ${currencySymbol}${formatPrice(
            endingPrice,
            currencyRate,
          )}`}</Text>
        ) : null}
      </View>
    );
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {discountPrice ? renderDiscountPrice() : null}
      <Text
        bold={!isBold()}
        style={[
          styles.basePriceText(basePrice, discountPrice, theme),
          basePriceStyle,
        ]}
      >{`${currencySymbol}${formatPrice(basePrice, currencyRate)}`}</Text>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
  },
  discountPriceText: {
    marginEnd: SPACING.tiny,
  },
  basePriceText: (basePrice, discountPrice, theme) => ({
    color: theme.colors.gray600,
    textDecorationLine:
      discountPrice && discountPrice < basePrice ? 'line-through' : 'none',
  }),
};

Price.propTypes = propTypes;

Price.defaultProps = defaultProps;

export default Price;
