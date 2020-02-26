import { StyleSheet } from 'react-native'
import * as Device from 'expo-device';
import globalStyles from '../../assets/global-style'
console.log(Device.productName )
export default StyleSheet.create({
  layoutWrap:{
    flex: 1,
    backgroundColor:'#fff',
  },
  img: {
    width: 30,
    height: 30
  },
  text: {
    color: '#777',
    fontSize: 30
  },
  selectedText: {
    fontSize: 30,
    color: globalStyles['theme-color']
  },
  selectedTitleText: {
    fontSize: 10,
    color: globalStyles['theme-color']
  }
})
