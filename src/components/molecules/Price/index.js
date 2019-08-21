import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../../atoms/Text';
import { formatPrice } from './utils';
import { withTheme } from '../../../config';

const Price = ({
  /**
   * The product's base price
   */
  basePrice,
  /**
   * if offer available, show discount price
   */
  discountPrice,
  /**
   * Currency symbol to display along side of prices
   */
  currencySymbol,
  /**
   * App level theme
   */
  theme,
}) => {
  const isBold = () => discountPrice && discountPrice < basePrice;
  const renderDiscountPrice = () => (discountPrice === basePrice ? null : <Text type="label" bold={isBold()} style={styles.discountPriceText(theme)}>{`${currencySymbol}${formatPrice(discountPrice)}`}</Text>);
  return (
    <View style={styles.container}>
      { discountPrice ? renderDiscountPrice() : null}
      <Text type="label" bold={!isBold()} style={styles.basePriceText(basePrice, discountPrice)}>{`${currencySymbol}${formatPrice(basePrice)}`}</Text>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row'
  },
  discountPriceText: theme => ({
    marginEnd: theme.spacing.four,
  }),
  basePriceText: (basePrice, discountPrice) => ({
    textDecorationLine: discountPrice && discountPrice < basePrice ? 'line-through' : 'none',
  }),
};

Price.propTypes = {
  basePrice: PropTypes.number,
  discountPrice: PropTypes.number,
  currencySymbol: PropTypes.string.isRequired,
};

Price.defaultProps = {
  basePrice: 0,
  discountPrice: 0,
};

export default withTheme(Price);
