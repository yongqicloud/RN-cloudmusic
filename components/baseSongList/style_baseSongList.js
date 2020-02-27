import { StyleSheet, } from 'react-native'
import globalStyle from '../../assets/global-style'
import { Dimensions } from 'react-native'
// 获取设备宽度
const { width} = Dimensions.get('window');
const itemWidth = Math.floor((Math.floor(width) -2 * globalStyle['safety-padding-horizontal'] - 3 * 13) / 3)
export default StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: 'nowrap',
    paddingHorizontal: globalStyle['safety-padding-horizontal'],
    
  },
  itemContainer: {
    width: itemWidth,
    height: itemWidth,
    // backgroundColor: 'green',
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
    
  },
  touchableOpacity: {
    marginRight: 10,
    width: itemWidth,
  },
  shadow: {
    height: '20%',
    width: '100%',
    position: "absolute",
    top: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: "flex-end",
    // backgroundColor: 
  },  
  playCount: {
    paddingHorizontal: 10,
    height: '100%',
    flexDirection: 'row',
    alignItems: "center"
  },
  playCountText: {
    color: '#fff',
    fontSize: 12,
  },
  img:{
    width: '100%',
    height: '100%'
  },
  text: {
    fontSize: 13,
    paddingTop:5,
    lineHeight: 20
  }
})