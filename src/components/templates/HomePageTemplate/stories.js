import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import HomePageTemplate from '.';
import Text from '../../atoms/Text';
import { ThemeProvider, theme } from '../../../config';

const ImageSlider = () => (
  <View style={{ flex: 1, backgroundColor: '#239B56' }}>
    <Text style={styles.text} type="heading">I am a ImageSlider</Text>
  </View>
);

const FeaturedCategories = () => [
  { title: 'Men Section', backgroundColor: '#D35400' },
  { title: 'Women Section', backgroundColor: '#E67E22' },
  { title: 'Kids Section', backgroundColor: '#F39C12' },
].map(category => (
  <View style={styles.featurCategory(category.backgroundColor)}>
    <Text style={styles.text} type="heading">{category.title}</Text>
  </View>
));

const ChildCompoent = () => (
  <View style={{ backgroundColor: '#58D68D' }}>
    <Text style={styles.text} type="heading">I am a child component</Text>
  </View>
);

const FooterCompoent = () => (
  <View style={{ height: 100, padding: 16, backgroundColor: '#2C3E50' }}>
    <Text style={styles.text} type="heading">I am a sticky Footer component</Text>
  </View>
);

storiesOf('HomePageTemplate', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>{getStory()}</ThemeProvider>
  ))
  .add('default', () => (
    <HomePageTemplate
      isScrollable
      imageSlider={<ImageSlider />}
      featuredCategories={<FeaturedCategories />}
      footer={<FooterCompoent />}
    >
      <ChildCompoent />
    </HomePageTemplate>
  ));

const styles = {
  featurCategory: backgroundColor => ({
    backgroundColor,
    height: 150,
  }),
  text: {
    color: 'white',
  }
};
