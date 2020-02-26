import { StyleSheet } from 'react-native'
import globalStyle from '../../assets/global-style'
export default StyleSheet.create({
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff'
  },
  firstLine: {
    width: '100%',
    height: 46,
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: '#fff'
  },
  playContainer: {
    flexDirection: 'row',
    alignItems: "center",
    paddingVertical: 10
  },
  collectContainer: {
    flexDirection: "row",
    borderRadius: 20,
    backgroundColor: globalStyle['theme-color'],
    alignItems: "center",
  },
  songListItem: {
    paddingVertical: 10,
    paddingRight: 10,
    flexDirection: "row",
    width: '100%',
    height: 60,
    // backgroundColor: 'green',
  },
  indexContainer: {
    height: '100%',
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'red',
  },
  desc: {
    flex: 1,
    // backgroundColor: '#ddd'
  }
})