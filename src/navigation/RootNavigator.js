import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeContext } from '../theme';
import { NAVIGATION_TO_ALERT_DIALOG, NAVIGATION_TO_MEDIA_VIEWER } from './routes';
import { DrawerScreen, AlertDialog, MediaViewer } from '../screens';
import StackNavigator from './StackNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={props => <DrawerScreen {...props} />}>
    <Drawer.Screen
      name="drawer"
      component={StackNavigator}
      options={{
        swipeEnabled: false,
      }}
    />
  </Drawer.Navigator>
);

const Stack = createStackNavigator();

/**
 * Explanation: Add only Modals/Dialogs here, which need to be render over the screen,
 * and need to have transparent or semi-transparent background with no toolbar
 *
 * If you need to add normal screens, add it in StackNavigator.js
 */
const RootNavigator = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={theme.appbar.barStyle}
        backgroundColor={theme.appbar.statusBarColor}
      />
      <NavigationContainer>
        <Stack.Navigator
          mode="modal"
          headerMode="none"
          screenOptions={{
            cardStyle: { backgroundColor: 'transparent' },
            cardOverlayEnabled: false,
          }}
        >
          <Stack.Screen
            name="modal"
            component={DrawerNavigator}
          />
          <Stack.Screen
            name={NAVIGATION_TO_ALERT_DIALOG}
            component={AlertDialog}
          />
          <Stack.Screen
            name={NAVIGATION_TO_MEDIA_VIEWER}
            component={MediaViewer}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootNavigator;
