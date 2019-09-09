import React from 'react';
import { storiesOf } from '@storybook/react-native';
import GenericTemplate from '.';
import Text from '../../atoms/Text';
import { ThemeProvider, theme } from '../../../config';
import Status from '../../../magento/Status';

storiesOf('GenericTemplate', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>{getStory()}</ThemeProvider>
  ))
  .add('default', () => (
    <GenericTemplate networkConnected status={Status.DEFAULT}>
      <Text>This is child component of GenericTemplate, which will be shown if status == &apos;success&apos;</Text>
    </GenericTemplate>
  ))
  .add('default with networkConnected = false', () => (
    <GenericTemplate networkConnected={false} status={Status.DEFAULT}>
      <Text>This is child component of GenericTemplate, which will be shown if status == &apos;success&apos;</Text>
    </GenericTemplate>
  ))
  .add('with loading', () => (
    <GenericTemplate status={Status.LOADING}>
      <Text>This is child component of GenericTemplate, which will be shown if status == &apos;success&apos;</Text>
    </GenericTemplate>
  ))
  .add('with success', () => (
    <GenericTemplate status={Status.SUCCESS}>
      <Text>This is child component of GenericTemplate, which will be shown if status == &apos;success&apos;</Text>
    </GenericTemplate>
  ))
  .add('with error', () => (
    <GenericTemplate networkConnected status={Status.ERROR} errorMessage="This error message will be shown, if status == 'error'">
      <Text>This is child component of GenericTemplate, which will be shown if status == &apos;success&apos;</Text>
    </GenericTemplate>
  ))
  .add('with error & networkConnected = false', () => (
    <GenericTemplate networkConnected={false} status={Status.ERROR} errorMessage="This error message will be shown, if status == 'error'">
      <Text>This is child component of GenericTemplate, which will be shown if status == &apos;success&apos;</Text>
    </GenericTemplate>
  ));
