import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text, Card } from '../../..';
import { magento } from '../../../../magento';
import NavigationService from '../../../../navigation/NavigationService';
import { NAVIGATION_LOGIN_SCREEN_PATH, NAVIGATION_ACCOUNT_SCREEN_PATH } from '../../../../navigation/types';
import { ThemeContext } from '../../../../config';

const DrawerHeader = () => {
  let welcomeText = '';
  let NAVIGATION_PATH = null;
  const theme = useContext(ThemeContext);

  if (magento.isCustomerLogin()) {
    welcomeText = 'Hello user!';
    NAVIGATION_PATH = NAVIGATION_ACCOUNT_SCREEN_PATH;
  } else {
    welcomeText = 'Login!';
    NAVIGATION_PATH = NAVIGATION_LOGIN_SCREEN_PATH;
  }

  return (
    <Card
      style={styles.container(theme)}
      onPress={() => NavigationService.navigate(NAVIGATION_PATH)}
    >
      <View style={styles.lowerContainer(theme)}>
        <Text style={styles.text(theme)}>{welcomeText}</Text>
        <Icon name="chevron-right" size={30} color={theme.colors.white} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    backgroundColor: theme.colors.primary,
    borderWidth: 0,
  }),
  lowerContainer: theme => ({
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.sixteen,
  }),
  text: theme => ({
    color: theme.colors.white,
  }),
});

export default DrawerHeader;
