import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Price from '.';
import { ThemeProvider, theme } from '../../../config';

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
  ));
