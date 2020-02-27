import React, { useCallback, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList} from 'react-native'
import { getName } from '../../api/utils'
import styles from './style_songList'
interface Props{
  songs:Array<object>,
  collectCount: number,
  showCollect: boolean,
}
function SongList(props: Props) {
  const { songs, collectCount } = props
  const totalCount = songs.length

  const [isRefresh,setRefresh] = useState(false)
  // console.log(props)
  const collect = (count: number)=>{
    return (
      <TouchableOpacity
        style={styles.collectContainer}
      >
          <Text style={{fontFamily: 'iconfont',color: '#fff', fontSize: 16,paddingHorizontal: 10}}>&#xe62d;</Text>
          <Text style={{paddingRight: 20, color: '#fff'}}>收藏({Math.floor(count/1000)/10})万</Text>
      </TouchableOpacity>
    )
  }
  const _handleRenderItem = useCallback(({item, index}) => {
    return (
      <TouchableOpacity 
        key={item.id.toString()}
        style={styles.songListItem}
      >
        <View style={styles.indexContainer}>
          <Text style={{fontSize: 12, color: '#999'}}>{index + 1}</Text>
        </View>
        <View style={styles.desc}>
          <Text 
            style={{fontSize: 16}} 
            numberOfLines={1}
          >{item.name}</Text>
          <Text 
            style={{fontSize: 12, color: '#999'}} 
            numberOfLines={1}
          >
          { item.ar ? getName(item.ar): getName(item.artists) } - { item.al ? item.al.name : item.album.name}
          </Text>
        </View>
      </TouchableOpacity>
    )
  },[songs])

  const _handleRefresh = () => {
    setRefresh(true)
    console.log(4)
    setTimeout(()=>{
      setRefresh(false)
    },2000)
  }
  const _handleReachEnd = ()=> {
    console.log('_handleReachEnd')
  }
  const songListItem = (list) => {
    
    return (
      <View >
        <FlatList
          data={list.slice(0,25)}
          refreshing={isRefresh}
          onRefresh={_handleRefresh}
          renderItem={_handleRenderItem}
          onEndReachedThreshold={0.1}
          onEndReached={_handleReachEnd}
        >
        </FlatList>
        </View>
    )
  }

  return (
    <View style= {styles.container}>
      <View style={styles.firstLine}>
        <TouchableOpacity
          style={styles.playContainer}
        >
          <Text style={{fontFamily: 'iconfont',color: '#000', fontSize: 20,paddingHorizontal: 10}}>&#xe6e3;</Text>
          <Text style={{fontSize: 14}}>播放全部</Text>
          <Text style={{fontSize: 12,paddingLeft: 5, color: '#999'}}>(共{totalCount}首)</Text>
        </TouchableOpacity>
        {
          collect(collectCount)
        }
      </View>
      {
        songListItem(songs)
      }
    </View>
  )
}

export default React.memo(SongList)
