import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  topContainer: {
    width: '100%',
    height: 314,
    // overflow: "hidden",
    position: 'relative',
  }, 
  imgBackground: {
    width: '100%',
    height: 400,
  },
  descContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  imgContainer: {
    width: 130,
    height: 130,
  },
  coverImg: {
    width: 130,
    height: 130
  },
  infoContainer:{
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "space-between"
  },
  infoName: {
    color: '#fff',
    fontSize: 18
  },
  infoAuthor: {
    color: '#fff',
    fontSize: 16,
    flexDirection: "row",
    alignItems: "center"
  },  
  avatarContainer: {
    width: 26,
    height: 26,
    borderRadius: 13,
    overflow: 'hidden',
  },
  avatar: {
    width: 30,
    height: 30,
  },
  authorName: {
    paddingLeft: 10,
    color: '#eee',
    fontSize: 14
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: "space-around",
    paddingVertical: 20,
  },
  menuItem: {
    flexDirection: "column",
    alignItems: "center",  
  },
  iconfontText: {
    fontSize: 20,
    color: '#fff'
  },
  menuText: {
    fontSize: 13,
    color: '#fff',
    lineHeight: 24
  }
})