import React from 'react';
import AppNavigation from './navigation/AppNavigation';
import { ThemeProvider } from './theme';

function App(): React.JSX.Element {
  return (
    <ThemeProvider initialTheme='light'>
        <AppNavigation />
    </ThemeProvider>
  );
}


export default App;
