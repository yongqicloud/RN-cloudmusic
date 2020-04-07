import { StyleSheet } from 'react-native'
// import styles from '../../../assets/global-style'
import { Dimensions } from 'react-native'
const { width, height} = Dimensions.get('window');
export default StyleSheet.create({
  playerContainer:{
    position: 'absolute',
    width,
    height,
    top: 0,
    left: 0,
    zIndex: 500,
    backgroundColor: 'transparent',
    // backgroundColor:'pink',
  }
})