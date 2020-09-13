import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon } from '../common';
import { ThemeContext } from '../theme';
import { HomeScreen, ProfileScreen, CartScreen } from '../screens';
import { CategoryTreeContainer } from '../screens/DrawerScreen/components';
import {
  NAVIGATION_TO_HOME_SCREEN,
  NAVIGATION_TO_CART_SCREEN,
  NAVIGATION_TO_CATEGORIES_SCREEN,
  NAVIGATION_TO_PROFILE_SCREEN,
  NAVIGATION_TO_ALERT_DIALOG,
} from './routes';
import { translate } from '../i18n';

const Tab = createBottomTabNavigator();

const propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  cartItemsCount: PropTypes.number,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const defaultProps = {
  cartItemsCount: 0,
};

// TODO: Create a New Screen called CategoryScreen
const BottomTabNavigator = ({ loggedIn, cartItemsCount, navigation }) => {
  const { theme } = useContext(ThemeContext);

  const showLoginPrompt = () =>
    navigation.navigate(NAVIGATION_TO_ALERT_DIALOG, {
      loginMode: true,
    });

  return (
    <Tab.Navigator
      lazy
      tabBarOptions={{
        activeTintColor: theme.primaryColor,
      }}
    >
      <Tab.Screen
        name={NAVIGATION_TO_HOME_SCREEN}
        component={HomeScreen}
        options={{
          tabBarLabel: translate('common.home'),
          tabBarIcon: ({ color, focused }) => (
            <Icon
              type="ionicon"
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={NAVIGATION_TO_CATEGORIES_SCREEN}
        component={CategoryTreeContainer}
        options={{
          tabBarLabel: translate('common.categories'),
          tabBarIcon: ({ color, focused }) => (
            <Icon
              type="antdesign"
              name={focused ? 'appstore1' : 'appstore-o'}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={NAVIGATION_TO_PROFILE_SCREEN}
        component={ProfileScreen}
        options={{
          tabBarLabel: translate('common.profile'),
          tabBarIcon: ({ color, focused }) => (
            <Icon
              type="font-awesome"
              name={focused ? 'user' : 'user-o'}
              color={color}
            />
          ),
        }}
        listeners={{
          tabPress: e => {
            if (!loggedIn) {
              // Prevent default action
              e.preventDefault();
              showLoginPrompt();
            }
          },
        }}
      />
      <Tab.Screen
        name={NAVIGATION_TO_CART_SCREEN}
        component={CartScreen}
        options={{
          ...(cartItemsCount > 0 && {
            tabBarBadge: cartItemsCount < 10 ? cartItemsCount : '9+',
          }),
          tabBarLabel: translate('common.cart'),
          tabBarIcon: ({ color, focused }) => (
            <Icon
              type="material-community"
              name={focused ? 'cart' : 'cart-outline'}
              color={color}
            />
          ),
        }}
        listeners={{
          tabPress: e => {
            if (!loggedIn) {
              // Prevent default action
              e.preventDefault();
              showLoginPrompt();
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};

BottomTabNavigator.propTypes = propTypes;

BottomTabNavigator.defaultProps = defaultProps;

const mapStateToProps = ({ account, cart }) => {
  const { loggedIn } = account;
  const { cart: { items_qty: cartItemsCount } = {} } = cart;
  return {
    loggedIn,
    cartItemsCount,
  };
};

export default connect(mapStateToProps)(BottomTabNavigator);
