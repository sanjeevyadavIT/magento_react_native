import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import HomePageTemplate from '.';
import Text from '../../atoms/Text';
import { ThemeProvider, theme } from '../../../theme';

const ImageSlider = () => (
  <View style={{ backgroundColor: 'pink' }}>
    <Text>I am a ImageSlider</Text>
  </View>
);

const FeaturedCategories = () => (
  <View style={{ backgroundColor: 'orange' }}>
    <Text>I am featured categories</Text>
  </View>
);

const ChildCompoent = () => (
  <View style={{ backgroundColor: 'red' }}>
    <Text>I am a child component</Text>
  </View>
);

storiesOf('HomePageTemplate', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>{getStory()}</ThemeProvider>
  ))
  .add('default', () => (
    <HomePageTemplate
      imageSlider={<ImageSlider />}
      featuredCategories={<FeaturedCategories />}
    >
      <ChildCompoent />
    </HomePageTemplate>
  ));
