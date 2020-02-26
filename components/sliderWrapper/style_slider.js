import { StyleSheet } from 'react-native'
import globalStyle from '../../assets/global-style'

export default StyleSheet.create({
  header: {
    paddingHorizontal: globalStyle['safety-padding-horizontal'],
  },
  miniTitle: {
    color: '#bbb',
    fontSize: 12,
  },
  mainTitle: {
    color: '#000',
    fontSize: 20
  },
  subWrapper: {
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingBottom: 5,
    alignItems: "center",
  },
  touchableOpacity: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eee',
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 12,
    color: '#000',
    fontWeight: '300'
  },
  scrollView: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#eee'
  }
})