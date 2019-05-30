import React from 'react';
import { DrawerHeader, DrawerTemplate } from '../..';
import { CategoryTreeContainer } from '../../../containers';

// FIXME: This component is rerendering multiple times, without state changes
// NOTE: Recat.memo is having no effect, still rendering multiple times
const DrawerPage = () => {
  console.log('ALERT: Inside Navigation Drawer render function');
  return (
    <DrawerTemplate 
      headerView={<DrawerHeader />}
      categoryTree={<CategoryTreeContainer />}
    />
  );
};

DrawerPage.propTypes = {};

DrawerPage.defaultPorps = {};

export default DrawerPage;
