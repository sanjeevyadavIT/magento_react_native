import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextInput from './TextInput';
import { ThemeProvider, lightTheme as theme } from '../../theme';

const styles = {
  customInputContainer: _theme => ({
    borderWidth: 1,
  }),
  centerText: {
    textAlign: 'center',
  }
};

storiesOf('TextInput', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>
      <View style={{ borderWidth: 10, borderColor: 'pink'}}>
        {getStory()}
      </View>
    </ThemeProvider>
  ))
  .add('default', () => (
    <TextInput placeholder="Enter Name" />
  ))
  .add('with label', () => (
    <TextInput
      placeholder="James Arthur"
      label="Enter Name"
    />
  ))
  .add('with error Message', () => (
    <TextInput
      label="Enter Name"
      placeholder="James Arthur"
      errorMessage="Enter atleast 3 characters"
    />
  ))
  .add('with left icon', () => (
    <TextInput
      label="Enter Email"
      placeholder="james@gmail.com"
      leftIcon={
        <Icon name="email" size={30} color="#4caf50" />
      }
    />
  ))
  .add('with right icon', () => (
    <TextInput
      label="Enter Phone number"
      placeholder="123456789"
      rightIcon={
        <Icon name="local-phone" size={30} color="#4caf50" />
      }
    />
  ))
  .add('with custom input container style', () => (
    <TextInput
      inputContainerStyle={styles.customInputContainer(theme)}
      inputStyle={styles.centerText}
      placeholder="James Arthur"
    />
  ));
