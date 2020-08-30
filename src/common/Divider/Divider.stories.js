import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import Divider from './Divider';
import { ThemeProvider, lightTheme as theme } from '../../theme';

storiesOf('Divider', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>
      <View style={{ padding: 16 }}>{getStory()}</View>
    </ThemeProvider>
  ))
  .add('default', () => <Divider />);
