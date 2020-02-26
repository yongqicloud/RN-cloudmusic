import { StyleSheet } from 'react-native'
import globalStyle from 'assets/global-style'

export default StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: globalStyle['safety-padding-horizontal'],
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  item: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent:"center",
    alignItems: "center",
    backgroundColor: globalStyle['theme-color']
  },
  text: {
    color: '#fff',
    fontSize: 30, 
    color: '#fff' 
  },
  touchableOpacity: {
    flexDirection: 'column',
    alignItems: "center"
  }
})