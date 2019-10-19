import { AppRegistry } from 'react-native';
import App from './src/App';
import StorybookUIRoot from './storybook';
import { name as appName } from './app.json';

// Should we show storybook instead of our app?
//
// ⚠️ Leave this as `false` when checking into git.
const SHOW_STORYBOOK = false;

const RootComponent = SHOW_STORYBOOK && __DEV__ ? StorybookUIRoot : App;
AppRegistry.registerComponent(appName, () => RootComponent);
