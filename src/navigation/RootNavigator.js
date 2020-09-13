import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeContext } from '../theme';
import {
  DrawerScreen,
} from '../screens';
import StackNavigator from './StackNavigator';

const Drawer = createDrawerNavigator();

const RootNavigator = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={theme.appbar.barStyle}
        backgroundColor={theme.appbar.statusBarColor}
      />
      <NavigationContainer>
        <Drawer.Navigator drawerContent={props => <DrawerScreen {...props} />}>
          <Drawer.Screen
            name="Drawer"
            component={StackNavigator}
            options={{
              swipeEnabled: false,
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootNavigator;
