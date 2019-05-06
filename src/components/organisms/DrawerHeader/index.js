import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text, Card, CardMode } from '../..';
import { magento } from '../../../magento';
import NavigationService from '../../../navigation/NavigationService';
import { NAVIGATION_LOGIN_SCREEN_PATH, NAVIGATION_ACCOUNT_SCREEN_PATH } from '../../../navigation/types';

const DrawerHeader = () => {
  let welcomeText = '';
  let NAVIGATION_PATH = null;
  const { container, lowerContainer } = styles;

  if (magento.isCustomerLogin()) {
    welcomeText = 'Hello user!';
    NAVIGATION_PATH = NAVIGATION_ACCOUNT_SCREEN_PATH;
  } else {
    welcomeText = 'Login!';
    NAVIGATION_PATH = NAVIGATION_LOGIN_SCREEN_PATH;
  }

  return (
    <Card
      mode={CardMode.DEFAULT_MODE}
      style={container}
      onPress={() => NavigationService.navigate(NAVIGATION_PATH)}
    >
      <View style={lowerContainer}>
        <Text>{welcomeText}</Text>
        <Icon name="chevron-right" size={30} color="#fff" />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#607d8b',
  },
  lowerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  }
});

export default DrawerHeader;
