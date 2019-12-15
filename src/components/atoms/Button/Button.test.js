import React from 'react';
import { render } from 'react-native-testing-library';
import Button from './Button';
import { ThemeProvider, theme } from '../../../theme';

describe('<Button />', () => {
  test('component render without error', () => {
    // Setup
    const buttonTitle = 'Press Me';
    const { getByText, getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Button title={buttonTitle} />
      </ThemeProvider>
    );

    // Exercise
    const container = getByTestId('Button-Touch-Receptor');
    const element = getByText(buttonTitle);

    // Verify
    expect(container).toBeDefined();
    expect(element).toBeDefined();
  });
});
