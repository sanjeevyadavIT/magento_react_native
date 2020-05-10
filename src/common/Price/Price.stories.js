import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Price from './Price';
import { ThemeProvider, lightTheme as theme } from '../../theme';

storiesOf('Price', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>{getStory()}</ThemeProvider>
  ))
  .add('with basePrice', () => (
    <Price basePrice={300} currencySymbol="$" />
  ))
  .add('with integer basePrice & discountPrice', () => (
    <Price basePrice={300} discountPrice={200} currencySymbol="$" />
  ))
  .add('with discountPrice > basePrice', () => (
    <Price basePrice={300} discountPrice={400} currencySymbol="$" />
  ))
  .add('with discountPrice = basePrice', () => (
    <Price basePrice={300} discountPrice={300} currencySymbol="$" />
  ))
  .add('with decimal basePrice & discountPrice', () => (
    <Price basePrice={350.999} discountPrice={299.999} currencySymbol="$" />
  ))
  .add('with startingPrice', () => (
    <Price startingPrice={299} currencySymbol="$" />
  ))
  .add('with startingPrice mentioned, basePrice & discountPrice won\'t render', () => (
    <Price startingPrice={299} basePrice={299} discountPrice={149} currencySymbol="$" />
  ))
  .add('with startingPrice and endingPrice', () => (
    <Price startingPrice={299} endingPrice={399} currencySymbol="$" />
  ));
