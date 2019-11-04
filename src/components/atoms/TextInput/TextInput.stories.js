import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import TextInput from '.';
import { ThemeProvider, theme } from '../../../theme';

storiesOf('TextInput', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>
      <View style={{ borderWidth: 10, borderColor: 'pink'}}>
        {getStory()}
      </View>
    </ThemeProvider>
  ))
  .add('default', () => (
    <TextInput placeholder="Enter Name" />
  ))
  .add('with label', () => (
    <TextInput placeholder="James Arthur" label="Enter Name" />
  ))
  .add('with error Message', () => (
    <TextInput placeholder="James Arthur" label="Enter Name" errorMessage="Enter atleast 3 characters" />
  ));
