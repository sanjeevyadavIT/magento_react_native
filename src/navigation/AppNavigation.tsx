import React from 'react';
import {Button} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabParamList, RootStackParamList} from './types';
import HomeScreen from '../screens/home/HomeScreen';
import CategoriesScreen from '../screens/categories/CategoriesScreen';
import CartScreen from '../screens/cart/CartScreen';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import LoginScreen from '../screens/login/LoginScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SignupScreen from '../screens/signup/SignupScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigation = (): React.JSX.Element => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = (): React.JSX.Element => {
  const isLoggedIn = false; // TODO: Dynamically update this value
  const navigation = useNavigation();

  const openProfile = () => {
    navigation?.navigate(isLoggedIn ? 'Profile' : 'Login');
  };

  function getHeaderTitle(route: any) {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Feed" as that's the first screen inside the navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

    switch (routeName) {
      case 'Home':
        return 'MageCart';
      case 'Categories':
        return 'Categories';
      case 'Cart':
        return 'Cart';
    }
  }

  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="BottomTab"
        component={BottomTabNavigation}
        options={({route}) => ({
          headerTitle: getHeaderTitle(route),
          headerRight: () => <Button title="Profile" onPress={openProfile} />,
        })}
      />
      {isLoggedIn ? (
        <RootStack.Group>
          <RootStack.Screen name="Profile" component={ProfileScreen} />
        </RootStack.Group>
      ) : (
        <RootStack.Group>
          <RootStack.Screen name="Login" component={LoginScreen} />
          <RootStack.Screen name="Signup" component={SignupScreen} />
        </RootStack.Group>
      )}
    </RootStack.Navigator>
  );
};

const AppNavigation = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
};

export default AppNavigation;
