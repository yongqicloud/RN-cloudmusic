import React from 'react'
import { View, Text, Image, ImageBackground } from 'react-native'
import LinearCount from '../../baseUI/linearCount/linearCount'
import SongList from '../../pages/songList/SongList'
import { HEADER_HEIGHT }from '../../baseUI/backHeader/BackHeader'
import { isEmptyObject } from '../../api/utils'
import styles from './style_albumDetail'
export default function AlbumDetail(props) {
  const { currentAlbum } = props

  // const renderTopDesc = ()=>{
  //   return (

  //   )
  // }

  const menu = () => {
    return (
      <View style={styles.menuContainer}>
      <View style={styles.menuItem}>
        <Text style={[{ fontFamily: 'iconfont' }, styles.iconfontText]}>&#xe6ad;</Text>
        <Text style={styles.menuText}>评论</Text>
      </View>
      <View style={styles.menuItem}>
        <Text style={[{ fontFamily: 'iconfont' }, styles.iconfontText]}>&#xe86f;</Text>
        <Text style={styles.menuText}>喜欢</Text>
      </View>
      <View style={styles.menuItem}>
        <Text style={[{ fontFamily: 'iconfont' }, styles.iconfontText]}>&#xe62d;</Text>
        <Text style={styles.menuText}>收藏</Text>
      </View>
      <View style={styles.menuItem}>
        <Text style={[{ fontFamily: 'iconfont' }, styles.iconfontText]}>&#xe606;</Text>
        <Text style={styles.menuText}>更多</Text>
      </View>
    </View>
    )
  }
  const renderSongList = () => {
    return (
      <SongList
        songs={currentAlbum.tracks}
        collectCount={currentAlbum.subscribedCount}
        showCollect={true}
      ></SongList>
    )
  }
  if(isEmptyObject(currentAlbum)){
    return null
  }
  return (
    <View>
      <View style={styles.topContainer}>
        <ImageBackground
          blurRadius={25}
          style={styles.imgBackground}
          source={{ uri: currentAlbum.coverImgUrl }}
        >
          <View style={{
            backgroundColor: 'rgba(7, 17, 27, 0.2)',
            width: '100%',
            height: '100%'
          }}>
            <View
              style={{
                width: '100%',
                height: HEADER_HEIGHT
              }}
            >
            </View>
            <View style={styles.descContainer}>
              <View style={styles.imgContainer}>
                <Image
                  source={{uri: currentAlbum.coverImgUrl }}
                  style={styles.coverImg}
                />
                <LinearCount count={ currentAlbum.subscribedCount }></LinearCount>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoName}>{currentAlbum.name}</Text>
                <View style={styles.infoAuthor}>
                  <View style={styles.avatarContainer}>
                    <Image
                      source={{ uri: currentAlbum.creator.avatarUrl }}
                      style={styles.avatar}
                    />
                  </View>
                  <Text style={styles.authorName}>
                    {currentAlbum.creator.nickname}
                  </Text>
                </View>
              </View>
            </View>
            {
              menu()
            }
          </View>
        </ImageBackground>
      </View>
      {
        renderSongList()
      }
      {/* <SongList></SongList> */}
    </View>
  )
}
