import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Spinner from '.';
import { ThemeProvider, theme } from '../../../config';

storiesOf('Spinner', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>{getStory()}</ThemeProvider>
  ))
  .add('default', () => (
    <Spinner />
  ))
  .add('large', () => (
    <Spinner size="large" />
  ))
  .add('small', () => (
    <Spinner size="small" />
  ));
