import 'react-native-gesture-handler';
import React, { useEffect, useContext } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { Appearance, AppearanceProvider } from 'react-native-appearance';
import FlashMessage from 'react-native-flash-message';
import { DARK_THEME_LK, TYPOGRAPHY } from './constants';
import { ThemeContext, ThemeProvider, lightTheme, darkTheme } from './theme';
import { loadThemeType } from './utils';
import RootNavigator from './navigation';
import store from './store';

const App = () => {
  const { setTheme } = useContext(ThemeContext);

  useEffect(() => {
    async function initializeTheme() {
      try {
        const userThemePreference = await loadThemeType(); // has user manually set theme
        const appearance = Appearance.getColorScheme(); // system current color preference
        let theme;
        if (userThemePreference) {
          theme =
            userThemePreference === DARK_THEME_LK ? darkTheme : lightTheme;
        } else {
          theme = appearance === DARK_THEME_LK ? darkTheme : lightTheme;
        }
        handleThemeChange(theme);
      } catch (error) {
        // Something went wrong
      }
    }

    initializeTheme();
  }, []);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(
      async ({ colorScheme: newColorScheme }) => {
        const userThemePreference = await loadThemeType();
        if (userThemePreference == null) {
          const theme = newColorScheme === 'dark' ? darkTheme : lightTheme;
          handleThemeChange(theme);
        }
      },
    );

    return () => subscription.remove();
  }, []);

  const handleThemeChange = theme => {
    FlashMessage.setColorTheme({
      success: theme.colors.success,
      info: theme.colors.info,
      warning: theme.colors.warning,
      danger: theme.colors.error,
    });
    setTheme(theme);
  };

  return (
    <>
      <RootNavigator />
      <FlashMessage position="top" titleStyle={TYPOGRAPHY.flashMessageTitle} />
    </>
  );
};

const RootWrapper = () => {
  return (
    <StoreProvider store={store}>
      <AppearanceProvider>
        <ThemeProvider theme={lightTheme}>
          <App />
        </ThemeProvider>
      </AppearanceProvider>
    </StoreProvider>
  );
};

export default RootWrapper;
