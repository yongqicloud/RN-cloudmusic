
import { NativeModules, StatusBar  } from 'react-native';
console.log('StatusBar: ', StatusBar.currentHeight);
 
const { StatusBarManager } = NativeModules;

export default {
  'theme-color': '#d44439',
  'safety-padding-horizontal': 10,
  'bangs-height': StatusBarManager.HEIGHT
}