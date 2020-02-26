import { StyleSheet} from 'react-native';

export default StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
  },
  setOverFlow:{
    height: 150,
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: 'blue'
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  img:{
    width:'100%',
    height:'100%'
  }
});