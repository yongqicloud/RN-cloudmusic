import { StyleSheet} from 'react-native'
export default StyleSheet.create({
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
})