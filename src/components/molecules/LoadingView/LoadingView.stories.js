import React from 'react';
import { storiesOf } from '@storybook/react-native';
import LoadingView from '.';
import { ThemeProvider, theme } from '../../../theme';

storiesOf('LoadingView', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>{getStory()}</ThemeProvider>
  ))
  .add('default', () => (
    <LoadingView />
  ))
  .add('with size = small', () => (
    <LoadingView size="small" />
  ))
  .add('with size = large', () => (
    <LoadingView size="large" />
  ))
  .add('with pink background color', () => (
    <LoadingView backgroundColor="pink" />
  ));
