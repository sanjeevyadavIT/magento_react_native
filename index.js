import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

/**
 * =========================================
 * =========== To Run Storybook ============
 * =========================================
 *
 * Instructions:
 * 1. Comment out line containing text `AppRegistry.registerComponent(appName, () => App);`
 * 2. Uncomment line containing text `export default from './storybook';`
 * 3. Refresh App
 */
AppRegistry.registerComponent(appName, () => App);

// export default from './storybook';
