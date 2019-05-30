import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ImageSlider, { ImageSliderItem } from '.';

// TODO: Use smaller dimension Image
const slider = [
  new ImageSliderItem('Image 1', 'https://images.unsplash.com/photo-1454123253751-1fe2b9e0c10d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80', null),
  new ImageSliderItem('Image 2', 'https://images.unsplash.com/photo-1475775030903-8cba2e973b5c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80', null),
  new ImageSliderItem('Image 3', 'https://images.unsplash.com/photo-1531318994313-daaafadd83e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80', null),
];

storiesOf('ImageSlider', module)
  .add('default with ImageHeight = 200', () => (
    <ImageSlider imageHeight={200} slider={slider} baseUrl="" />
  ))
  .add('with resizeMode = cover', () => (
    <ImageSlider imageHeight={200} resizeMode="cover" slider={slider} baseUrl="" />
  ))
  .add('with resizeMode = contain', () => (
    <ImageSlider imageHeight={200} resizeMode="contain" slider={slider} baseUrl="" />
  ))
  .add('with resizeMode = stretch', () => (
    <ImageSlider imageHeight={200} resizeMode="stretch" slider={slider} baseUrl="" />
  ))
  .add('with resizeMode = repeat', () => (
    <ImageSlider imageHeight={200} resizeMode="repeat" slider={slider} baseUrl="" />
  ))
  .add('with resizeMode = center', () => (
    <ImageSlider imageHeight={200} resizeMode="center" slider={slider} baseUrl="" />
  ));
