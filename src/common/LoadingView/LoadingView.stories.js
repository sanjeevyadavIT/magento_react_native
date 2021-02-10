import React from 'react';
import { storiesOf } from '@storybook/react-native';
import LoadingView from './LoadingView';

storiesOf('LoadingView', module)
  .add('default', () => <LoadingView />)
  .add('with size = small', () => <LoadingView size="small" />)
  .add('with size = large', () => <LoadingView size="large" />)
  .add('with pink background color', () => (
    <LoadingView backgroundColor="pink" />
  ));
