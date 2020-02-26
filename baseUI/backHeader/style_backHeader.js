import { StyleSheet} from 'react-native'
import globalStyle from '../../assets/global-style'
const HEIGHT = 50
const HEADER_HEIGHT = HEIGHT + globalStyle['bangs-height']

export default StyleSheet.create({
  container: {
    // position: "absolute",
    top: 0,
    left: 0,
    paddingTop: globalStyle['bangs-height'],
    paddingHorizontal: globalStyle['safety-padding-horizontal'],
    width: '100%',
    // backgroundColor: globalStyle['theme-color'],
    zIndex: 100,
    backgroundColor: 'transparent'
  },
  textContainer: {
    width: '100%',
    height: HEIGHT,
    flexDirection: 'row',
    alignItems: "center",
  },
  touchableOpacity: {
    width: 40,
    height: '100%',
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
  },
  titleText: {
    color: '#fff',
    fontSize: 18
  }
})

export {
  HEADER_HEIGHT
}