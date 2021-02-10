import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Spinner from './Spinner';

storiesOf('Spinner', module)
  .add('default', () => <Spinner />)
  .add('large', () => <Spinner size="large" />)
  .add('small', () => <Spinner size="small" />)
  .add('custom color', () => <Spinner color="pink" />);
