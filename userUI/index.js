import { AppRegistry } from 'react-native';
import App from './App'; // Assuming your main component is App.js
//import SignIn from './src/components'
import { name as appName } from './app.json';

// Register the main component of your app
AppRegistry.registerComponent(appName, () => App);
