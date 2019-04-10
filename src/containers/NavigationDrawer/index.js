import React from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CategoryTree from '../../components/catalog/CategoryTree';
import { NAVIGATION_LOGIN_SCREEN_PATH, NAVIGATION_ACCOUNT_SCREEN_PATH } from '../../routes/types';
import { magento } from '../../magento';

class NavigationDrawer extends React.PureComponent {
  renderAccountSection(navigation) {
    if (magento.isCustomerLogin()) {
      return (
        <TouchableOpacity style={styles.accountSection} onPress={() => navigation.navigate(NAVIGATION_ACCOUNT_SCREEN_PATH)}>
          <Text>Hello user!</Text>
          <Icon name="chevron-right" size={30} color="#fff" />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity style={styles.accountSection} onPress={() => navigation.navigate(NAVIGATION_LOGIN_SCREEN_PATH)}>
        <Text>Login!</Text>
        <Icon name="chevron-right" size={30} color="#fff" />
      </TouchableOpacity>
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {console.log('Inside Navigation Drawer function : Problem')}
        {this.renderAccountSection(navigation)}
        <Button
          title="Close"
          onPress={navigation.closeDrawer}
        />
        <CategoryTree navigate={navigation.navigate} />
      </View>
    );
  }
}

const styles = {
  accountSection: {
    height: 100,
    backgroundColor: '#607d8b',
    flexDirection: 'row',
  }
};

export default NavigationDrawer;
