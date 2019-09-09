import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Resource from '.';
import Text from '../../atoms/Text';
import { ThemeProvider, theme } from '../../../config';
import Status from '../../../magento/Status';

storiesOf('Resource', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>{getStory()}</ThemeProvider>
  ))
  .add('default', () => (
    <Resource status={Status.DEFAULT}>
      <Text>This is child component of Resource, which will be shown if status == &apos;success&apos;</Text>
    </Resource>
  ))
  .add('with loading', () => (
    <Resource status={Status.LOADING}>
      <Text>This is child component of Resource, which will be shown if status == &apos;success&apos;</Text>
    </Resource>
  ))
  .add('with success', () => (
    <Resource status={Status.SUCCESS}>
      <Text>This is child component of Resource, which will be shown if status == &apos;success&apos;</Text>
    </Resource>
  ))
  .add('with error', () => (
    <Resource networkConnected status={Status.ERROR} errorMessage="This error message will be shown, if status == 'error'">
      <Text>This is child component of Resource, which will be shown if status == &apos;success&apos;</Text>
    </Resource>
  ));
