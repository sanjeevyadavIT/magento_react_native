import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Spinner from './Spinner';
import { ThemeProvider, lightTheme as theme } from '../../theme';

storiesOf('Spinner', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>{getStory()}</ThemeProvider>
  ))
  .add('default', () => <Spinner />)
  .add('large', () => <Spinner size="large" />)
  .add('small', () => <Spinner size="small" />)
  .add('custom color', () => <Spinner color="pink" />);
