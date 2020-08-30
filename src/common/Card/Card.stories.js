import React from 'react';
import { View, StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import Card from './Card';
import Text from '../Text/Text';
import { ThemeProvider, lightTheme as theme } from '../../theme';

storiesOf('Card', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>
      <View style={{ padding: 16 }}>{getStory()}</View>
    </ThemeProvider>
  ))
  .add('default', () => (
    <Card style={styles.card}>
      <Text>This is a basic Card</Text>
    </Card>
  ))
  .add('with outline', () => (
    <Card type="outline" style={styles.card}>
      <Text>This is a basic Card with type=&quot;outline&quot;</Text>
    </Card>
  ))
  .add('with clear', () => (
    <Card type="clear" style={styles.card}>
      <Text>This is a basic Card with type=&quot;clear&quot;</Text>
    </Card>
  ))
  .add('with shadow', () => (
    <Card type="shadow" style={styles.card}>
      <Text>This is a basic Card with type=&quot;shadow&quot;</Text>
    </Card>
  ));

const styles = StyleSheet.create({
  card: {
    minHeight: 100,
  },
});
