import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import Button from '.';
import { ThemeProvider, theme } from '../../../theme';

storiesOf('Button', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>{getStory()}</ThemeProvider>
  ))
  .add('default', () => (
    <Button onPress={action('default button clicked')} title="Default button" />
  ))
  .add('solid', () => (
    <Button type="solid" onPress={action('solid button clicked')} title="Solid button" />
  ))
  .add('outline', () => (
    <Button type="outline" onPress={action('outline button clicked')} title="Outline button" />
  ))
  .add('loading with solid button', () => (
    <Button loading onPress={action('Loading button clicked')} title="Loading with solid button" />
  ))
  .add('loading with outline button', () => (
    <Button loading type="outline" onPress={action('Loading button clicked')} title="Loading with outline button" />
  ));
