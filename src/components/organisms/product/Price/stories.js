import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Price from '.';
import { ThemeProvider, theme } from '../../../../config';

storiesOf('Price', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>{getStory()}</ThemeProvider>
  ))
  .add('with displayPrice', () => (
    <Price displayPrice={300} currencySymbol="$" />
  ))
  .add('with integer displayPrice & discountPrice', () => (
    <Price displayPrice={300} discountPrice={200} currencySymbol="$" />
  ))
  .add('with discountPrice > displayPrice', () => (
    <Price displayPrice={300} discountPrice={400} currencySymbol="$" />
  ))
  .add('with discountPrice = displayPrice', () => (
    <Price displayPrice={300} discountPrice={300} currencySymbol="$" />
  ))
  .add('with decimal displayPrice & discountPrice', () => (
    <Price displayPrice={350.999} discountPrice={299.999} currencySymbol="$" />
  ));
