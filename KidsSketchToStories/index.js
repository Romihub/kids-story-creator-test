// index.js (in root)
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

// Initialize Firebase configuration if needed
import { initializeApp } from '@react-native-firebase/app';

// Initialize Firebase - The config is optional for native apps
// as it's included in the google-services.json and GoogleService-Info.plist
initializeApp();


AppRegistry.registerComponent(appName, () => App);