import React from 'react';
import { ThemeConsumer } from './ThemeProvider';

const withTheme = Component => props => (
  <ThemeConsumer>
    {theme => <Component theme={theme} {...props} />}
  </ThemeConsumer>
);

export default withTheme;
