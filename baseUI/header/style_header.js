import { StyleSheet } from 'react-native'

import globalStyles from '../../assets/global-style'
const HEADER_HEIGHT = 50 + globalStyles['bangs-height']
export default StyleSheet.create({
  headerWrap:{
    width:'100%',
    height: HEADER_HEIGHT,
    paddingHorizontal: globalStyles['safety-padding-horizontal'],
    paddingTop: globalStyles['bangs-height'],
    backgroundColor: globalStyles['theme-color'],
    flexDirection:"row",
    // justifyContent: "space-between",
    justifyContent:"center",
    alignItems:"center",
  },
  img:{
    width:20,
    height:20,
  },
  text:{
    color:'#fff',
    fontSize:18
  }
})

export {
  HEADER_HEIGHT
}