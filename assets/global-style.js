
import { NativeModules, StatusBar  } from 'react-native';
console.log('StatusBar: ', StatusBar.currentHeight);
 
const { StatusBarManager } = NativeModules;

// 'theme-color': '#d44439',
export default {
  'theme-color': '#C71585',
  'safety-padding-horizontal': 10,
  'bangs-height': StatusBarManager.HEIGHT
}