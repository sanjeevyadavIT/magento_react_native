import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import Address from './Address';
import { ThemeProvider, lightTheme as theme } from '../../theme';

const address = {
  city: 'Wringer',
  country_id: 'US',
  customer_id: 3,
  default_billing: false,
  default_shipping: false,
  firstname: 'David',
  id: 5,
  lastname: 'Blake',
  postcode: '223344',
  region: {
    region: 'New York',
    region_code: 'NY',
    region_id: 3,
  },
  region_id: 3,
  street: ['House No 1. west wing'],
  telephone: '213-222-4325',
};

storiesOf('Address', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}><View style={{ borderWidth: 10, borderColor: 'pink'}}>{getStory()}</View></ThemeProvider>
  ))
  .add('non-default address', () => <Address address={address} />)
  .add('default address', () => (
    <Address
      address={{ ...address, default_billing: true, default_shipping: true }}
    />
  ));
