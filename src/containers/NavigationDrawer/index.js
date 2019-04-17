import React from 'react';
import { View } from 'react-native';
import CategoryTree from '../../components/catalog/CategoryTree';
import DrawerHeader from '../../components/account/DrawerHeader';

const NavigationDrawer = () => {
  // FIXME: This component is rerendering multiple times, without state changes
  console.log('Inside Navigation Drawer render function : Problem');
  return (
    <View style={{ flex: 1 }}>
      <DrawerHeader />
      <CategoryTree />
    </View>
  );
};

export default NavigationDrawer;
