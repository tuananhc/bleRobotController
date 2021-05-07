/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/navigations/navigator';
//'./src/screens/landingPage' //'./src/navigations/navigator';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
