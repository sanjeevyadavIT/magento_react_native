import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../../../atoms/Text';
import { withTheme } from '../../../../config';

const Price = ({
  /**
   * The product's base price
   */
  displayPrice,
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
  const isBold = () => discountPrice && discountPrice < displayPrice;
  const formatNumber = price => (Number.isInteger(price) ? price : parseFloat(price).toFixed(2));
  const renderDiscountPrice = () => (discountPrice === displayPrice ? null : <Text type="label" bold={isBold()} style={styles.discountPriceText(theme)}>{`${currencySymbol}${formatNumber(discountPrice)}`}</Text>);
  return (
    <View style={styles.container}>
      { discountPrice ? renderDiscountPrice() : null}
      <Text type="label" bold={!isBold()} style={styles.displayPriceText(displayPrice, discountPrice)}>{`${currencySymbol}${formatNumber(displayPrice)}`}</Text>
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
  displayPriceText: (displayPrice, discountPrice) => ({
    textDecorationLine: discountPrice && discountPrice < displayPrice ? 'line-through' : 'none',
  }),
};

Price.propTypes = {
  displayPrice: PropTypes.number,
  discountPrice: PropTypes.number,
  currencySymbol: PropTypes.string.isRequired,
};

Price.defaultProps = {
  displayPrice: 0,
  discountPrice: 0,
};

export default withTheme(Price);
