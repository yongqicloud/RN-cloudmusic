import { StyleSheet } from 'react-native'
import styles from '../../assets/global-style'
export default StyleSheet.create({
  searchContainer: {
    width: '100%',
    display: 'flex',
    backgroundColor: '#ccc',
    paddingHorizontal: styles['safety-padding-horizontal'],
    paddingVertical: 5,
    backgroundColor: styles['theme-color'],
  },
  inputWrapper: {
    height: 40,
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: '#777',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: '#fff',
  },
  iconfont: {
    // height: '100%',
    // flexDirection: 'row',
    // alignItems: "center",
    fontFamily: 'iconfont', 
    fontSize: 24,
    color: '#000',
    paddingHorizontal: 5,
    backgroundColor: '#fcfcfc'
  },
  textInput: {
    height: '100%',
    flex: 1,
    backgroundColor: '#fff',
  },
  clearText: {
    // backgroundColor: '#ddd'
  }
})