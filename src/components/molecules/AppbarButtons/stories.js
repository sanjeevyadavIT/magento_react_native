/*
 ERROR 
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { MaterialAppbarButtons, Item } from '.';
import { ThemeProvider, theme } from '../../../config';

storiesOf('AppbarButtons', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>{getStory()}</ThemeProvider>
  ))
  .add('default', () => (
    <MaterialAppbarButtons>
      <Item title="menu" iconName="menu" onPress={action('MaterialAppbarButton clicked!')} />
    </MaterialAppbarButtons>
  ));

  */