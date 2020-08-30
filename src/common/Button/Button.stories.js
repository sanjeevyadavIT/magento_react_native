import React from 'react';
import { ScrollView } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { StorySection } from '../../../storybook/Decorator';
import Button from './Button';
import Text from '../Text/Text';
import Divider from '../Divider/Divider';
import { ThemeProvider, lightTheme as theme } from '../../theme';

storiesOf('Button', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>{getStory()}</ThemeProvider>
  ))
  .add('All', () => (
    <ScrollView>
      <Text type="h2">Stories</Text>
      <Divider />
      {/* ============================================= */}
      {/* ================== Types ==================== */}
      {/* ============================================= */}
      <StorySection title="types">
        <Button type="solid" title="solid" onPress={action('solid')} />
        <Button type="outline" title="outline" onPress={action('outline')} />
        <Button type="clear" title="clear" onPress={action('clear')} />
      </StorySection>
      {/* ============================================= */}
      {/* ================= Loading =================== */}
      {/* ============================================= */}
      <StorySection title="loading">
        <Button loading type="solid" title="solid" onPress={action('solid')} />
        <Button
          loading
          type="outline"
          title="outline"
          onPress={action('outline')}
        />
        <Button loading type="clear" title="clear" onPress={action('clear')} />
      </StorySection>
      {/* ============================================= */}
      {/* ================ Disabled =================== */}
      {/* ============================================= */}
      <StorySection title="disabled">
        <Button
          disabled
          type="solid"
          title="solid"
          onPress={action('solid')}
          icon={{ type: 'material', name: 'face' }}
        />
        <Button
          disabled
          type="outline"
          title="outline"
          onPress={action('outline')}
          icon={{ type: 'material', name: 'face' }}
        />
        <Button
          disabled
          type="clear"
          title="clear"
          onPress={action('clear')}
          icon={{ type: 'material', name: 'face' }}
        />
      </StorySection>
      {/* ============================================= */}
      {/* =============== tintColor =================== */}
      {/* ============================================= */}
      <StorySection title="tintColor">
        <Button
          tintColor="#FF9800"
          type="solid"
          title="Orange Button"
          onPress={action('solid')}
          icon={{ type: 'font-awesome', name: 'facebook' }}
        />
        <Button
          tintColor="#4CAF50"
          type="outline"
          title="Green Button"
          onPress={action('outline')}
          icon={{ type: 'font-awesome', name: 'google' }}
        />
        <Button
          tintColor="#673AB7"
          type="clear"
          title="Blue Button"
          onPress={action('clear')}
          icon={{ type: 'font-awesome', name: 'twitter' }}
        />
      </StorySection>
    </ScrollView>
  ))
  .add('default', () => (
    <Button onPress={action('default button clicked')} title="Default button" />
  ))
  .add('solid button', () => (
    <Button
      type="solid"
      onPress={action('solid button clicked')}
      title="Solid button"
    />
  ))
  .add('outline button', () => (
    <Button
      type="outline"
      onPress={action('outline button clicked')}
      title="Outline button"
    />
  ))
  .add('clear button', () => (
    <Button
      type="clear"
      onPress={action('clear button clicked')}
      title="Clear button"
    />
  ))
  .add('loading solid button', () => (
    <Button
      loading
      onPress={action('Loading button clicked')}
      title="Loading solid button"
    />
  ))
  .add('loading outline button', () => (
    <Button
      loading
      type="outline"
      onPress={action('Loading button clicked')}
      title="Loading outline button"
    />
  ))
  .add('loading clear button', () => (
    <Button
      loading
      type="clear"
      onPress={action('Loading button clicked')}
      title="Loading clear button"
    />
  ))
  .add('disabled solid button', () => (
    <Button
      disabled
      onPress={action('Disabled button clicked')}
      title="Disabled solid button"
    />
  ))
  .add('disabled outline button', () => (
    <Button
      disabled
      type="outline"
      onPress={action('Disabled button clicked')}
      title="Disabled outline button"
    />
  ))
  .add('disabled clear button', () => (
    <Button
      disabled
      type="clear"
      onPress={action('Disabled button clicked')}
      title="Disabled clear button"
    />
  ));
