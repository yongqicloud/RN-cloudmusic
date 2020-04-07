import React, { useCallback, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList} from 'react-native'
import { connect } from 'react-redux'
import { getName } from '../../api/utils'
import styles from './style_songList'
import { 
  changePlayList, 
  changeCurrentIndex, 
  changeSequecePlayList 
} from '../../components/player/store/actionCreators';
interface Props{
  songs:Array<object>,
  collectCount: number,
  showCollect: boolean,
  changePlayListDispatch: any,
  changeCurrentIndexDispatch: any,
  changeSequecePlayListDispatch: any,
}
function SongList(props: Props) {
  const { songs, collectCount } = props
  const totalCount = songs.length
  const { changePlayListDispatch, changeCurrentIndexDispatch, changeSequecePlayListDispatch } = props;
  const [isRefresh,setRefresh] = useState(false)
  // console.log(props)
  const _handleSelected = (index) => {
    changePlayListDispatch(songs);
    changeSequecePlayListDispatch(songs);
    changeCurrentIndexDispatch(index);
  }
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
        onPress={()=>{_handleSelected(index)}}
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
          onPress={()=>{_handleSelected(0)}}
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
// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
  fullScreen: state.getIn(['player', 'fullScreen']),
  playing: state.getIn(['player', 'playing']),
  currentSong: state.getIn(['player', 'currentSong']),
  scrollY: state.getIn(['album', 'scrollY'])  
});
// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => {
  return {
    changePlayListDispatch(data){
      dispatch(changePlayList(data));
    },
    changeCurrentIndexDispatch(data) {
      dispatch(changeCurrentIndex(data));
    },
    changeSequecePlayListDispatch(data) {
      dispatch(changeSequecePlayList(data))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SongList));
