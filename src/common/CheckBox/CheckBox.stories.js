import React, { useState } from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import CheckBox from './CheckBox';
import { ThemeProvider, lightTheme as theme } from '../../theme';

storiesOf('CheckBox', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>{getStory()}</ThemeProvider>
  ))
  .add('disabled', () => (
    <CheckBox disabled title="This checkbox is disabled" onPress={action('CheckBox Clicked!')} />
  ))
  .add('with title', () =>
    React.createElement(() => {
      const [value, toggleValue] = useState(false);
      return (
        <CheckBox
          checked={value}
          onPress={() => {
            toggleValue(prevState => !prevState);
          }}
          title="I accept all Terms & Conditions"
        />
      );
    }),
  )
  .add('with icon on right', () =>
    React.createElement(() => {
      const [value, toggleValue] = useState(false);
      return (
        <CheckBox
          iconRight
          checked={value}
          onPress={() => {
            toggleValue(prevState => !prevState);
          }}
          title="I accept all Terms & Conditions wefwejjweif wefowefojiwef qefioqefououqe qefioqefiooiqe qefoqeuuoqefi"
        />
      );
    }),
  )
  .add('with custom size ', () =>
    React.createElement(() => {
      const [value, toggleValue] = useState(false);
      return (
        <CheckBox
          checked={value}
          onPress={() => {
            toggleValue(prevState => !prevState);
          }}
          title="I accept all Terms & Conditions"
          size={15}
        />
      );
    }),
  );
