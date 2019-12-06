import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Image from '.';
import { ThemeProvider, theme } from '../../../theme';

const styles = {
  imageStyle: {
    width: 100,
    height: 100,
  },
};

storiesOf('Image', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>{getStory()}</ThemeProvider>
  ))
  .add('default', () => (
    <Image
      style={styles.imageStyle}
      source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
    />
  ));
