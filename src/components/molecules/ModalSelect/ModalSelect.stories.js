import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import ModalSelect from './ModalSelect';
import { ThemeProvider, theme } from '../../../theme';

const data = [
  { key: 1, label: 'Red Apples' },
  { key: 2, label: 'Cherries' },
  { key: 3, label: 'Cranberries', accessibilityLabel: 'Tap here for cranberries' },
  // Can also add additional custom keys which are passed to the onChange callback
  { key: 4, label: 'Vegetable', customKey: 'Not a fruit' }
];

const styles = {
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 40
  },
  customModalStyle: {
    borderWidth: 2,
    borderColor: theme.colors.secondaryDark,
    backgroundColor: theme.colors.secondary,
  },
  customTextStyle: {
    color: 'white'
  }
};

storiesOf('ModalSelect', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        {getStory()}
      </View>
    </ThemeProvider>
  ))
  .add('default', () => (
    <ModalSelect
      data={data}
      label="Select Fruit"
      onChange={option => action(option)}
    />
  ))
  .add('with attribute', () => (
    <ModalSelect
      data={data}
      label="Select Fruit"
      attribute="Fruit"
      onChange={option => action(option)}
    />
  ))
  .add('disabled', () => (
    <ModalSelect
      disabled
      label="Select Fruit"
      data={data}
      onChange={option => action(option)}
    />
  ))
  .add('custom style', () => (
    <ModalSelect
      label="Select Fruit"
      data={data}
      onChange={option => action(option)}
      style={styles.customModalStyle}
      textStyle={styles.customTextStyle}
      placeholderTextColor="white"
    />
  ));
