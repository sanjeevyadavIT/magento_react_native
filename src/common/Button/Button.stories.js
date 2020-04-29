import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import Button from './Button';
import { ThemeProvider, theme } from '../../theme';

storiesOf('Button', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>{getStory()}</ThemeProvider>
  ))
  .add('default', () => (
    <Button onPress={action('default button clicked')} title="Default button" />
  ))
  .add('solid button', () => (
    <Button type="solid" onPress={action('solid button clicked')} title="Solid button" />
  ))
  .add('outline button', () => (
    <Button type="outline" onPress={action('outline button clicked')} title="Outline button" />
  ))
  .add('clear button', () => (
    <Button type="clear" onPress={action('clear button clicked')} title="Clear button" />
  ))
  .add('loading solid button', () => (
    <Button loading onPress={action('Loading button clicked')} title="Loading solid button" />
  ))
  .add('loading outline button', () => (
    <Button loading type="outline" onPress={action('Loading button clicked')} title="Loading outline button" />
  ))
  .add('loading clear button', () => (
    <Button loading type="clear" onPress={action('Loading button clicked')} title="Loading clear button" />
  ))
  .add('disabled solid button', () => (
    <Button disabled onPress={action('Disabled button clicked')} title="Disabled solid button" />
  ))
  .add('disabled outline button', () => (
    <Button disabled type="outline" onPress={action('Disabled button clicked')} title="Disabled outline button" />
  ))
  .add('disabled clear button', () => (
    <Button disabled type="clear" onPress={action('Disabled button clicked')} title="Disabled clear button" />
  ));
