import { StyleSheet} from 'react-native'
import globalStyles from '../../assets/global-style'
import { Dimensions } from 'react-native'
// 获取设备宽度
const { width} = Dimensions.get('window')
const ITEM_WIDTH = (width - 2 * globalStyles['safety-padding-horizontal'] - 20)/ 3
console.log('width: ', width);
export default StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: globalStyles['safety-padding-horizontal'],
  },
  titleContainer: {
    // backgroundColor: 'green',
    width: '100%',
    height: 30,
    flexDirection: 'row',
    alignItems: "center"
  },
  titleText: {
    fontSize: 16
  },
  officialItem: {
    width: '100%',
    height: 100,
    // backgroundColor: 'yellow',
    flexDirection: "row",
    marginBottom: 10,
  },
  imgContainer: {
    width: 100,
    height: 100,
    borderRadius: 5,
    overflow: "hidden",
    // backgroundColor: 'green',
    position: "relative",
  },
  img: {
    width: '100%',
    height: '100%',
  },
  linearGradient: {
    position: "absolute",
    flexDirection: 'row',
    alignItems: "center",
    paddingHorizontal: 10,
    zIndex: 1,
    left: 0,
    height: 30,
    width: '100%',
    bottom: 0,
  },
  songListContainer: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
    // backgroundColor: '#ddd',
    justifyContent: 'space-between',
    // borderBottomColor: '#333',
    // borderBottomWidth: 0.5
  },
  songItemContainer: {
    flexDirection: 'row',
    alignItems: "center",
  },
  globalRankContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  globalRankItem: {
    // backgroundColor: 'green',
    
  },
  globalImgContainer: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    borderRadius: 10,
    overflow: "hidden",
  },
  nameContainer: {
    width: ITEM_WIDTH,
    height: 40
  }
})