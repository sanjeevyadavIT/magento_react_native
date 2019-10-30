import React from 'react';
import { storiesOf } from '@storybook/react-native';
import TextInput from '.';
import { ThemeProvider, theme } from '../../../theme';

storiesOf('TextInput', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>{getStory()}</ThemeProvider>
  ))
  .add('default', () => (
    <TextInput />
  ));
