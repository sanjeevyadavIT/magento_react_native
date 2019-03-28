import React from 'react';
import { View, Text, Button } from 'react-native';
import CategoryTree from '../../components/catalog/CategoryTree';

const NavigationDrawer = props => (
  <View style={{ flex: 1 }}>
    { console.log('Inside Navigation Drawer function : Problem')}
    <Button
      title="Close"
      onPress={props.navigation.closeDrawer}
    />
    <CategoryTree navigate={props.navigation.navigate} />
  </View>
);

export default NavigationDrawer;
