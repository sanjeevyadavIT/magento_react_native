import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Text } from '../src/common';

export const Divider = () => <View style={{ flex: 1, height: 1, backgroundColor: '#d9d9d9' }} />;

export const StorySection = ({ title, children, style }) => (
  <>
    <Text type="subheading">{title}</Text>
    <View style={StyleSheet.flatten([styles.card, style])}>{children}</View>
    <Divider />
  </>
);

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#d9d9d9',
    borderRadius: 4,
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
  },
});
