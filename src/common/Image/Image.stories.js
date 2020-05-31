import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Image from './Image';
import { ThemeProvider, lightTheme as theme } from '../../theme';

storiesOf('Image', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>{getStory()}</ThemeProvider>
  ))
  .add('default', () => (
    <Image
      style={{ width: 100, height: 100 }}
      source={{
        uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
      }}
    />
  ));
