import React from 'react';
import { ScrollView } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { StorySection } from '../../../storybook/Decorator';
import Text from '../Text/Text';
import Divider from '../Divider/Divider';
import TextInput from './TextInput';
import Icon from '../Icon/Icon';

const styles = {
  customInputContainer: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 2,
    backgroundColor: 'black',
  },
  customInputText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
  },
};

storiesOf('TextInput', module)
  .add('All', () => (
    <ScrollView>
      <Text type="h2">Stories</Text>
      <Divider />
      {/* ============================================= */}
      {/* ================ Default ==================== */}
      {/* ============================================= */}
      <StorySection title="default" style={styles.cardStyle}>
        <TextInput placeholder="Enter Name" multiline />
      </StorySection>
      {/* ============================================= */}
      {/* ================ With label ==================== */}
      {/* ============================================= */}
      <StorySection title="with label" style={styles.cardStyle}>
        <TextInput placeholder="James Arthur" label="Enter Name" />
      </StorySection>
      {/* ============================================= */}
      {/* ============ With error message ============= */}
      {/* ============================================= */}
      <StorySection title="with error Message" style={styles.cardStyle}>
        <TextInput
          placeholder="James Arthur"
          errorMessage="Enter atleast 3 characters"
        />
      </StorySection>
      {/* ============================================= */}
      {/* ============ with left icon ============= */}
      {/* ============================================= */}
      <StorySection title="with left icon" style={styles.cardStyle}>
        <TextInput
          placeholder="Enter email"
          leftIcon={<Icon name="email" size={30} color="#4caf50" />}
        />
      </StorySection>
      {/* ============================================= */}
      {/* ============== with right icon ============== */}
      {/* ============================================= */}
      <StorySection title="with right icon" style={styles.cardStyle}>
        <TextInput
          placeholder="Enter Phone number"
          rightIcon={<Icon name="local-phone" size={30} color="#4caf50" />}
        />
      </StorySection>
      {/* ============================================= */}
      {/* ============= with custom style ============= */}
      {/* ============================================= */}
      <StorySection
        title="with custom input & container style"
        style={styles.cardStyle}
      >
        <TextInput
          containerStyle={styles.customInputContainer}
          inputStyle={styles.centerText}
          placeholder="Enter name"
          placeholderTextColor="red"
        />
      </StorySection>
    </ScrollView>
  ))
  .add('default', () => <TextInput placeholder="Enter Name" />)
  .add('with label', () => (
    <TextInput placeholder="James Arthur" label="Enter Name" />
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
      leftIcon={<Icon name="email" size={30} color="#4caf50" />}
    />
  ))
  .add('with right icon', () => (
    <TextInput
      label="Enter Phone number"
      placeholder="123456789"
      rightIcon={<Icon name="local-phone" size={30} color="#4caf50" />}
    />
  ))
  .add('with custom input container style', () => (
    <TextInput
      containerStyle={styles.customInputContainer}
      inputStyle={styles.customInputText}
      placeholder="James Arthur"
      placeholderTextColor="#ccc"
    />
  ));
