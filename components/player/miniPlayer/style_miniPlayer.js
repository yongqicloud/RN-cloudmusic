import { StyleSheet } from 'react-native'
import styles from '../../../assets/global-style'
export default StyleSheet.create({
  miniContainer: {
    position: 'absolute',
    display: 'flex',
    bottom: 60,
    left: 0,
    zIndex: 501,
    width: '100%',
    height: 52,
    // flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: "center",
    paddingHorizontal: styles['safety-padding-horizontal']
  },
  iconfont:{
    fontFamily: 'iconfont',
    fontSize: 28, 
    color: styles['theme-color']
  },   
  icon: {
    height: 40,
    width: 60,
    paddingHorizontal: 10,
    backgroundColor:'#fff'
  },
  imgWrapper: {
    height: 40,
    width: 40,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: styles['theme-color'],
    borderStyle: "solid"
  },
  img: {
    height: '100%',
    width: '100%'
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    lineHeight: 20,
    overflow: 'hidden',
  },
  playBtnWrapper: {
    paddingHorizontal: 10
  },
  expandBtnWrapper: {
    paddingLeft: 10
  },
  progress: {
    backgroundColor:'#ddd'
  },
  progressBar: {
    // height: '100%',
    backgroundColor:styles['theme-color']
  }
})