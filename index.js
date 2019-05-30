import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

// commeny out below line and uncomment export default from './storybook to render stories
AppRegistry.registerComponent(appName, () => App);

// export default from './storybook';
