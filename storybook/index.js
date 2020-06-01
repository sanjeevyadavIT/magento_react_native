/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
import { getStorybookUI, configure } from '@storybook/react-native';
import { loadStories } from './storyLoader';

import './addons';
import './rn-addons';

// import stories
configure(() => {
  loadStories();
}, module);

// Refer to https://github.com/storybooks/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  asyncStorage: require('@react-native-community/async-storage').default || null
});

export default StorybookUIRoot;
