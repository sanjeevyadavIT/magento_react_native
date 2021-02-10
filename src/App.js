import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { Appearance, AppearanceProvider } from 'react-native-appearance';
import FlashMessage from 'react-native-flash-message';
import { TYPOGRAPHY } from './constants';
import { ThemeProvider, lightTheme, darkTheme } from './theme';
import { Spinner } from './common';
import RootNavigator from './navigation';
import store from './store';

const App = () => {
  const [ready, setReady] = useState(false);
  const [colorScheme, setColorScheme] = useState();

  useEffect(() => {
    const subscription = Appearance.addChangeListener(
      ({ colorScheme: newColorScheme }) => {
        setColorScheme(newColorScheme);
        const theme = newColorScheme === 'dark' ? darkTheme : lightTheme;
        FlashMessage.setColorTheme({
          success: theme.colors.success,
          info: theme.colors.info,
          warning: theme.colors.warning,
          danger: theme.colors.error,
        });
      },
    );

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    setColorScheme(Appearance.getColorScheme());
    setReady(true);
  }, []);

  if (ready) {
    return (
      <StoreProvider store={store}>
        <ThemeProvider theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
          <AppearanceProvider>
            <RootNavigator />
          </AppearanceProvider>
          <FlashMessage
            position="top"
            titleStyle={TYPOGRAPHY.flashMessageTitle}
          />
        </ThemeProvider>
      </StoreProvider>
    );
  }

  // TODO: SplashScreen logic
  return <Spinner />;
};

export default App;
