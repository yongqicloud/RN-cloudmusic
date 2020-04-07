import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native'
import styles from '../../../assets/global-style'
const { width, height} = Dimensions.get('window');
let CD_WIDTH = width * 0.7 
let IMG_WIDTH = CD_WIDTH * 0.75
let TRANSFORM_X = IMG_WIDTH * 0.5
let TRANSFORM_Y = IMG_WIDTH * 0.47
export const THEME_COLOR = styles['theme-color']
export default StyleSheet.create({
  normalContainer: {
    position: 'absolute',
    width,
    height: height + styles['bangs-height'],
    top: 0,
    left: 0,
    zIndex: 1000,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  background: {
    width: '100%',
    height: '100%',
  },
  body: {
    backgroundColor: 'rgba(7, 17, 27, 0.2)',
    width: '100%',
    height: '100%',
    paddingTop: styles['bangs-height']
  },
  header: {
    display: 'flex',
    height: 50,
    flexDirection: 'row',
    alignItems: "center",
    // backgroundColor: 'green',
    paddingHorizontal: styles['safety-padding-horizontal']
  },
  close: {
    paddingRight: 15,
    // backgroundColor:'#fff'
  },
  middle: {
    width: '100%',
    height: '60%',
    // backgroundColor: 'pink',
    alignItems: "center",
  },
  cdBackground: {
    position: "relative",
    marginTop: '16%',
    width: CD_WIDTH,
    height: CD_WIDTH,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: '#fff'
  },
  image: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    // translateX: - (IMG_WIDTH / 2),
    // translateY: - (IMG_WIDTH / 2),
    transform: [{translateX: - TRANSFORM_X},{translateY: - TRANSFORM_Y}],
    width: IMG_WIDTH,
    height: IMG_WIDTH,
    borderRadius: IMG_WIDTH / 2,
  },
  songTextWrapper: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 4 * styles['safety-padding-horizontal'],
  },
  songText: {
    color: '#eae7d9',
    fontSize: 16,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 28,
    // width: CD_WIDTH,
  },
  footer: {
    display: 'flex',
    // backgroundColor: '#fff',
    alignItems: "center",
    paddingHorizontal: 45
  },
  rateWrapper: {
    display: 'flex',
    width: '80%',
    margin: 'auto',
    height: 30,
    flexDirection: 'row',
    justifyContent:'space-evenly',
    alignItems: "center",
    marginVertical: 10,
    // backgroundColor:'green',

  },
  rateBtnWrapper: {
    display: 'flex',
    paddingHorizontal: 5,
    paddingVertical: 5,
    // marginHorizontal: 5,
  },
  rateText: {
    color: '#eae7d9'
  },
  progressWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    alignItems: 'center',
    marginVertical: 20,
  },  
  btnWrapper: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    // paddingHorizontal: 40,
  },
  playBtnIcon: {
    fontFamily: 'iconfont',
    fontSize: 32,
    color: '#eae7d9'
  }
})