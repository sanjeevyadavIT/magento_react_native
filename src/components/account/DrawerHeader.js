import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { magento } from '../../magento';
import NavigationService from '../../navigation/NavigationService';
import { NAVIGATION_LOGIN_SCREEN_PATH, NAVIGATION_ACCOUNT_SCREEN_PATH } from '../../navigation/types';

const DrawerHeader = () => {
  let welcomeText = '';
  let NAVIGATION_PATH = null;
  const { accountSection, upperContainer, lowerContainer } = styles;

  if (magento.isCustomerLogin()) {
    welcomeText = 'Hello user!';
    NAVIGATION_PATH = NAVIGATION_ACCOUNT_SCREEN_PATH;
  } else {
    welcomeText = 'Login!';
    NAVIGATION_PATH = NAVIGATION_LOGIN_SCREEN_PATH;
  }

  return (
    <TouchableOpacity
      style={accountSection}
      onPress={() => NavigationService.navigate(NAVIGATION_PATH)}
    >
      <View style={upperContainer}>
        <Icon style={{ padding: 2 }} name="close" size={24} color="#BFffffff" onPress={NavigationService.closeDrawer} />
      </View>
      <View style={lowerContainer}>
        <Text>{welcomeText}</Text>
        <Icon name="chevron-right" size={30} color="#fff" />
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  accountSection: {
    height: 100,
    backgroundColor: '#607d8b',
  },
  upperContainer: {
    alignItems: 'flex-end',
  },
  lowerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  }
};

export default DrawerHeader;
