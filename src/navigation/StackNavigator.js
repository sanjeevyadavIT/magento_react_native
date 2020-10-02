import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons } from '../common';
import { ThemeContext } from '../theme';
import {
  SplashScreen,
  ForgetPasswordScreen,
  SearchScreen,
  CategoryProductsScreen,
  AddEditAddressScreen,
  CheckoutAddressScreen,
  LoginScreen,
  SignupScreen,
  ShippingScreen,
  PaymentScreen,
  OrdersScreen,
  ProductScreen,
  OrderDetailScreen,
  OrderAcknowledgementScreen,
  SettingScreen,
  AddressScreen,
  EditProfileScreen,
} from '../screens';
import {
  NAVIGATION_TO_SPLASH_SCREEN,
  NAVIGATION_TO_FORGOT_PASSWORD_SCREEN,
  NAVIGATION_TO_HOME_SCREEN,
  NAVIGATION_TO_CATEGORY_PRODUCT_LIST_SCREEN,
  NAVIGATION_TO_PRODUCT_SCREEN,
  NAVIGATION_TO_SEARCH_SCREEN,
  NAVIGATION_TO_LOGIN_SCREEN,
  NAVIGATION_TO_SIGNUP_SCREEN,
  NAVIGATION_TO_ORDERS_SCREEN,
  NAVIGATION_TO_ORDER_DETAIL_SCREEN,
  NAVIGATION_TO_CHECKOUT_ADDRESS_SCREEN,
  NAVIGATION_TO_ADD_EDIT_ADDRESS_SCREEN,
  NAVIGATION_TO_SHIPPING_SCREEN,
  NAVIGATION_TO_PAYMENT_SCREEN,
  NAVIGATION_TO_ORDER_CONFIRMATION_SCREEN,
  NAVIGATION_TO_SETTING_SCREEN,
  NAVIGATION_TO_ADDRESS_SCREEN,
  NAVIGATION_TO_EDIT_PROFILE_SCREEN,
} from './routes';
import { translate } from '../i18n';
import { isObject } from '../utils';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

const propTypes = {};

const defaultProps = {};

const StackNavigator = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName={NAVIGATION_TO_SPLASH_SCREEN}
      screenOptions={{
        headerTintColor: theme.appbar.tintColor,
        headerStyle: {
          backgroundColor: theme.appbar.backgroundColor,
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name={NAVIGATION_TO_SPLASH_SCREEN}
        component={SplashScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        component={BottomTabNavigator}
        name={NAVIGATION_TO_HOME_SCREEN}
        options={({ navigation }) => ({
          title: translate('homeScreen.title'),
          headerLeft: () => (
            <HeaderButtons>
              <HeaderButtons.Item
                title={translate('homeScreen.menu.drawer')}
                iconName="menu"
                onPress={() => navigation.toggleDrawer()}
              />
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons>
              <HeaderButtons.Item
                title={translate('homeScreen.menu.search')}
                iconName="search"
                onPress={() => navigation.navigate(NAVIGATION_TO_SEARCH_SCREEN)}
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name={NAVIGATION_TO_CATEGORY_PRODUCT_LIST_SCREEN}
        component={CategoryProductsScreen}
        options={({
          route: {
            params: { title = translate('common.brandName') },
          },
        }) => ({
          title,
          headerRight: () => (
            <HeaderButtons>
              <HeaderButtons.Item
                title={translate('categoryListScreen.menu.sort')}
                iconName="sort"
                onPress={() => console.log('Show Sort dialog')}
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name={NAVIGATION_TO_SEARCH_SCREEN}
        component={SearchScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_TO_LOGIN_SCREEN}
        component={LoginScreen}
        options={{
          title: translate('loginScreen.title'),
        }}
      />
      <Stack.Screen
        name={NAVIGATION_TO_SIGNUP_SCREEN}
        component={SignupScreen}
        options={{
          title: translate('signupScreen.title'),
        }}
      />
      <Stack.Screen
        name={NAVIGATION_TO_ORDERS_SCREEN}
        component={OrdersScreen}
        options={{
          title: translate('ordersScreen.title'),
        }}
      />
      <Stack.Screen
        name={NAVIGATION_TO_ORDER_DETAIL_SCREEN}
        component={OrderDetailScreen}
        options={({ route }) => {
          const { order, orderId } = route.params;
          const orderNumber =
            isObject(order) && Object.keys(order).length > 0
              ? order.increment_id
              : orderId;
          return {
            title: `${translate('orderDetailScreen.title')}: ${orderNumber}`,
          };
        }}
      />
      <Stack.Screen
        name={NAVIGATION_TO_PRODUCT_SCREEN}
        component={ProductScreen}
        options={({
          route: {
            params: { title = translate('productScreen.title') },
          },
        }) => ({
          title,
        })}
      />
      <Stack.Screen
        name={NAVIGATION_TO_CHECKOUT_ADDRESS_SCREEN}
        component={CheckoutAddressScreen}
        options={{
          title: translate('addressScreen.title'),
        }}
      />
      <Stack.Screen
        name={NAVIGATION_TO_SHIPPING_SCREEN}
        component={ShippingScreen}
        options={{
          title: translate('shippingScreen.title'),
        }}
      />
      <Stack.Screen
        name={NAVIGATION_TO_PAYMENT_SCREEN}
        component={PaymentScreen}
        options={{
          title: translate('paymentScreen.title'),
        }}
      />
      <Stack.Screen
        name={NAVIGATION_TO_ORDER_CONFIRMATION_SCREEN}
        component={OrderAcknowledgementScreen}
        options={{
          title: translate('orderAcknowledgementScreen.title'),
        }}
      />
      <Stack.Screen
        name={NAVIGATION_TO_FORGOT_PASSWORD_SCREEN}
        component={ForgetPasswordScreen}
        options={{
          title: translate('forgetPasswordScreen.title'),
        }}
      />
      <Stack.Screen
        name={NAVIGATION_TO_SETTING_SCREEN}
        component={SettingScreen}
        options={{
          title: translate('settingScreen.title'),
        }}
      />
      <Stack.Screen
        name={NAVIGATION_TO_ADD_EDIT_ADDRESS_SCREEN}
        component={AddEditAddressScreen}
        options={({ route }) => ({
          title: translate(
            route.params.mode === 'edit'
              ? 'addEditAddressScreen.editTitle'
              : 'addEditAddressScreen.newAddressTitle',
          ),
        })}
      />
      <Stack.Screen
        name={NAVIGATION_TO_ADDRESS_SCREEN}
        component={AddressScreen}
        options={{
          title: translate('addressScreen.title'),
        }}
      />
      <Stack.Screen
        name={NAVIGATION_TO_EDIT_PROFILE_SCREEN}
        component={EditProfileScreen}
        options={{
          title: translate('addressScreen.title'),
        }}
      />
    </Stack.Navigator>
  );
};

StackNavigator.propTypes = propTypes;

StackNavigator.defaultProps = defaultProps;

export default StackNavigator;
