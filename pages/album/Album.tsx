import React, {useState, useEffect, useRef, useCallback, useReducer } from 'react'
import { View, Text, Image, ImageBackground, ScrollView } from 'react-native'
import { getAlbumList } from './store/actionCreators'
import { connect } from 'react-redux';
import BackHeader, { HEADER_HEIGHT }from '../../baseUI/backHeader/BackHeader'
// import LinearCount from '../../baseUI/linearCount/linearCount'
import AlbumDetail from '../../components/albumDetail/AlbumDetail'
// import SongList from '../songList/SongList'
import styles from './style_album'
import globalStyles from '../../assets/global-style'

function Album(props) {
  const { id, titleType } = props.route.params
  const { currentAlbum,  totalCount } = props;
  const { getAlbumDataDispatch } = props;
  const backHeaderRef = useRef()
  const currentAlbumJs = currentAlbum.toJS()
  const [headerProps,setHeaderProps] = useState({
    opacity:1,
    backgroundColor: 'transparent',
    title: '歌单'
  })
  
  useEffect(() => {
    getAlbumDataDispatch(id);
  }, [getAlbumDataDispatch, id])
  
  const handleGoBack = useCallback(()=>{
    props.navigation.goBack()
  },[])

  const handleScroll = useCallback((e)=>{
    // 原生事件 值：{x:number, y: number}
    const pos = e.nativeEvent.contentOffset 
    let minScrollY = 50 // HEADER_HEIGHT;
    let percent = Math.abs(pos.y / minScrollY);
    if(pos.y > minScrollY) {
      let opacity =  Math.min(1, (percent-1)/2)
      setHeaderProps({
        opacity,
        backgroundColor: globalStyles['theme-color'],
        title: currentAlbumJs.name
      })
    } else{
      setHeaderProps({
        opacity: 1,
        backgroundColor: 'transparent',
        title: titleType
      })
    }
  },[currentAlbumJs, titleType])

  return (
    <View style={styles.pageContainer}>
      <BackHeader
        ref={backHeaderRef}
        position={'absolute'}
        title={headerProps.title || '歌单'}
        opacity={headerProps.opacity}
        backgroundColor= {headerProps.backgroundColor}
        handleGoBack={handleGoBack}
      />
      <ScrollView 
        style={{ flex: 1, backgroundColor: '#fff' }}
        onScroll={handleScroll}
        stickyHeaderIndices={[1]}
        snapToAlignment='center'
      >
        <AlbumDetail currentAlbum={currentAlbumJs}></AlbumDetail>
      </ScrollView>
    </View>
  )
}

// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
  currentAlbum: state.getIn(['album', 'currentAlbum']),
  startIndex: state.getIn(['album', 'startIndex']),
  totalCount: state.getIn(['album', 'totalCount']),
  // songsCount: state.getIn(['player', 'playList']).size
});
// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => {
  return {
    getAlbumDataDispatch(id) {
      dispatch(getAlbumList(id));
    },
  }
};
// export default Album
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album));