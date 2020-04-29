import React from 'react';
import { storiesOf } from '@storybook/react-native';
import GenericTemplate from './GenericTemplate';
import Text from '../Text/Text';
import { ThemeProvider, theme } from '../../theme';
import Status from '../../magento/Status';

storiesOf('GenericTemplate', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>{getStory()}</ThemeProvider>
  ))
  .add('default', () => (
    <GenericTemplate status={Status.DEFAULT}>
      <Text>This is child component of GenericTemplate, which will be shown if status == 'success'</Text>
    </GenericTemplate>
  ))
  .add('with loading', () => (
    <GenericTemplate status={Status.LOADING}>
      <Text>This is child component of GenericTemplate, which will be shown if status == 'success'</Text>
    </GenericTemplate>
  ))
  .add('with success', () => (
    <GenericTemplate status={Status.SUCCESS}>
      <Text>This is child component of GenericTemplate, which will be shown if status == 'success'</Text>
    </GenericTemplate>
  ))
  .add('with error', () => (
    <GenericTemplate status={Status.ERROR} errorMessage="This error message will be shown, if status == 'error'">
      <Text>This is child component of GenericTemplate, which will be shown if status == 'success'</Text>
    </GenericTemplate>
  ));
