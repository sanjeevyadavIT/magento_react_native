import React from 'react';
import { storiesOf } from '@storybook/react-native';
import MessageView from './MessageView';
import { ThemeProvider, lightTheme as theme } from '../../theme';

storiesOf('MessageView', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>{getStory()}</ThemeProvider>
  ))
  .add('info', () => (
    <MessageView type="info" message="This is a normal information!" />
  ))
  .add('success', () => (
    <MessageView type="success" message="Hurrah! the transaction is successful." />
  ))
  .add('error', () => (
    <MessageView type="error" message="Oh no! Looks like something went wrong." />
  ));
