import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import Divider from './Divider';

storiesOf('Divider', module).add('default', () => (
  <View style={{ backgroundColor: 'white', padding: 16 }}>
    <Divider />
  </View>
));
