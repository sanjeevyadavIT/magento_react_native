import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import DrawerTemplate from '.';
import Text from '../../atoms/Text';
import { ThemeProvider, theme } from '../../../theme';

const HeaderView = () => (
  <View style={{ backgroundColor: 'pink' }}>
    <Text>I am a header view</Text>
  </View>
);

const CategoryTree = () => (
  <View style={{ backgroundColor: 'orange' }}>
    <Text>I am a category tree</Text>
  </View>
);

const ChildCompoent = () => (
  <View style={{ backgroundColor: 'red' }}>
    <Text>I am a child component</Text>
  </View>
);

storiesOf('DrawerTemplate', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>{getStory()}</ThemeProvider>
  ))
  .add('default', () => (
    <DrawerTemplate
      headerView={<HeaderView />}
      categoryTree={<CategoryTree />}
    >
      <ChildCompoent />
    </DrawerTemplate>
  ));
