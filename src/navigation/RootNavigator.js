import React, { useContext } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HeaderButtons, TextInput } from '../common';
import { ThemeContext } from '../theme';
import {
  SplashScreen,
  DrawerScreen,
  ForgetPasswordScreen,
  HomeScreen,
  ProductScreen,
  SearchScreen,
  CartScreen,
  CategoryListScreen,
  EditAccountAddressScreen,
  AccountScreen,
  CheckoutAddressScreen,
  SignInScreen,
  SignUpScreen,
  ShippingScreen,
  PaymentScreen,
  OrdersScreen,
  OrderDetailScreen,
  OrderAcknowledgementScreen,
  SettingScreen,
} from '../screens';
import {
  NAVIGATION_TO_SPLASH_SCREEN,
  NAVIGATION_TO_FORGOT_PASSWORD_SCREEN,
  NAVIGATION_TO_HOME_SCREEN,
  NAVIGATION_TO_CATEGORY_LIST_SCREEN,
  NAVIGATION_TO_PRODUCT_SCREEN,
  NAVIGATION_TO_SEARCH_SCREEN,
  NAVIGATION_TO_LOGIN_SCREEN,
  NAVIGATION_TO_SIGNUP_SCREEN,
  NAVIGATION_TO_ACCOUNT_SCREEN,
  NAVIGATION_TO_ORDERS_SCREEN,
  NAVIGATION_TO_ORDER_DETAIL_SCREEN,
  NAVIGATION_TO_CART_SCREEN,
  NAVIGATION_TO_CHECKOUT_ADDRESS_SCREEN,
  NAVIGATION_TO_EDIT_ACCOUNT_ADDRESS_SCREEN,
  NAVIGATION_TO_SHIPPING_SCREEN,
  NAVIGATION_TO_PAYMENT_SCREEN,
  NAVIGATION_TO_ORDER_CONFIRMATION_SCREEN,
  NAVIGATION_TO_SETTING_SCREEN,
} from './routes';
import { translate } from '../i18n';
import { magento } from '../magento';

const Stack = createStackNavigator();

// TODO: access isLogged in from redux state or Aysnc storage, not magento variable
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
        component={HomeScreen}
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
              {/* <HeaderButtons.Item
                title={translate('homeScreen.menu.search')}
                iconName="search"
                onPress={() => navigation.navigate(NAVIGATION_TO_SEARCH_SCREEN)}
              /> */}
              <HeaderButtons.Item
                title={translate('homeScreen.menu.cart')}
                iconName="shopping-cart"
                onPress={() =>
                  magento.isCustomerLogin()
                    ? navigation.navigate(NAVIGATION_TO_CART_SCREEN)
                    : navigation.navigate(NAVIGATION_TO_LOGIN_SCREEN)
                }
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name={NAVIGATION_TO_CATEGORY_LIST_SCREEN}
        component={CategoryListScreen}
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
        options={({ route }) => ({
          headerTitle: () => (
            <View>
              <TextInput
                autoFocus
                placeholder={translate('searchScreen.searchHint')}
                onChangeText={route.params.setSearchText}
                onSubmitEditing={route.params.onSubmitted}
              />
            </View>
          ),
          headerRight: () => (
            <HeaderButtons>
              <HeaderButtons.Item
                iconName="sort"
                title={translate('searchScreen.menu.sort')}
                onPress={route.params.showSortDialog}
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name={NAVIGATION_TO_LOGIN_SCREEN}
        component={SignInScreen}
        options={{
          title: translate('signInScreen.title'),
        }}
      />
      <Stack.Screen
        name={NAVIGATION_TO_SIGNUP_SCREEN}
        component={SignUpScreen}
        options={{
          title: translate('signUpScreen.title'),
        }}
      />
      <Stack.Screen
        name={NAVIGATION_TO_ACCOUNT_SCREEN}
        component={AccountScreen}
        options={{
          title: translate('accountScreen.title'),
        }}
      />
      <Stack.Screen
        name={NAVIGATION_TO_ORDERS_SCREEN}
        component={OrdersScreen}
        options={{
          title: translate('orderScreen.ordersScreenTitle'),
        }}
      />
      <Stack.Screen
        name={NAVIGATION_TO_ORDER_DETAIL_SCREEN}
        component={OrderDetailScreen}
        options={({ route }) => {
          const { item, orderId } = route.params;
          const orderNumber = item ? item.increment_id : orderId;
          return {
            title: `${translate(
              'orderScreen.orderDetailScreenTitle',
            )}: ${orderNumber}`,
          };
        }}
      />
      <Stack.Screen
        name={NAVIGATION_TO_PRODUCT_SCREEN}
        component={ProductScreen}
        options={({
          navigation,
          route: {
            params: { title = translate('productScreen.title') },
          },
        }) => ({
          title,
          headerRight: () => (
            <HeaderButtons>
              <HeaderButtons.Item
                title={translate('productScreen.menu.cart')}
                iconName="shopping-cart"
                onPress={() =>
                  magento.isCustomerLogin()
                    ? navigation.navigate(NAVIGATION_TO_CART_SCREEN)
                    : navigation.navigate(NAVIGATION_TO_LOGIN_SCREEN)
                }
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name={NAVIGATION_TO_CART_SCREEN}
        component={CartScreen}
        options={{
          title: translate('cartScreen.title'),
        }}
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
          title: translate('orderScreen.orderPlacedScreenTitle'),
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
        name={NAVIGATION_TO_EDIT_ACCOUNT_ADDRESS_SCREEN}
        component={EditAccountAddressScreen}
        options={{
          title: translate('editAddressScreen.title'),
        }}
      />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const RootNavigator = () => (
  <SafeAreaProvider>
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

export default RootNavigator;
