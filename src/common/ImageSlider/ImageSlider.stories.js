import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ImageSlider from './ImageSlider';

// TODO: Use smaller dimension Image
const media = [
  {
    key: 'Image 1',
    source: {
      uri:
        'https://images.unsplash.com/photo-1454123253751-1fe2b9e0c10d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
    },
  },
  {
    key: 'Image 2',
    source: {
      uri:
        'https://images.unsplash.com/photo-1475775030903-8cba2e973b5c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
    },
  },
  {
    key: 'Image 3',
    source: {
      uri:
        'https://images.unsplash.com/photo-1531318994313-daaafadd83e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
    },
  },
];

storiesOf('ImageSlider', module)
  .add('default with ImageHeight = 200', () => (
    <ImageSlider height={200} media={media} />
  ))
  .add('with resizeMode = cover', () => (
    <ImageSlider height={200} media={media} resizeMode="cover" />
  ))
  .add('with resizeMode = contain', () => (
    <ImageSlider height={200} resizeMode="contain" media={media} />
  ))
  .add('with resizeMode = stretch', () => (
    <ImageSlider height={200} resizeMode="stretch" media={media} />
  ))
  .add('with autoplay', () => (
    <ImageSlider autoplay height={200} media={media} />
  ));
