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
import Ionicons from '../components/icon/Ionicons';
import useUserStore from '../store/useUserStore';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigation = (): React.JSX.Element => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Categories') {
            iconName = focused ? 'apps' : 'apps-outline';
          } else {
            iconName = focused ? 'cart' : 'cart-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: 'black', // TODO: Use Brand color here
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = (): React.JSX.Element => {
  const userToken = useUserStore(state => state.userToken)
  const navigation = useNavigation();
  const isLoggedIn = !!userToken

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
          headerRight: () => (
            <Ionicons
              onPress={openProfile}
              name="person-circle-outline"
              size={30}
            />
          ),
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
