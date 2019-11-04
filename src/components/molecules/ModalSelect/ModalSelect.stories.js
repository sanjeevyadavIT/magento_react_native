import React from 'react';
import { View } from 'react-native';
import ModalSelect from './ModalSelect';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import { ThemeProvider, theme } from '../../../theme';

let index = 0;
const data = [
  { key: index++, section: true, label: 'Fruits' },
  { key: index++, label: 'Red Apples' },
  { key: index++, label: 'Cherries' },
  { key: index++, label: 'Cranberries', accessibilityLabel: 'Tap here for cranberries' },
  // etc...
  // Can also add additional custom keys which are passed to the onChange callback
  { key: index++, label: 'Vegetable', customKey: 'Not a fruit' }
];

storiesOf('ModalSelect', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>
      <View style={{ backgroundColor: 'white', flex: 1, minHeight: 200, paddingTop: 40 }}>
        {getStory()}
      </View>
    </ThemeProvider>
  )).add('default', () => (
    <ModalSelect
      data={data}
      onChange={(option) => { }}
    />
  )).add('disabled', () => (
    <ModalSelect
      disabled={true}
      data={data}
      onChange={(option) => { }}
    />
  ));

