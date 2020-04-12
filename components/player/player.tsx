import React, {useEffect, useRef, useState, useReducer } from 'react'
import { View, StyleSheet } from 'react-native'
import { Audio, Video } from 'expo-av'
import { connect } from 'react-redux'
import NormalPlayer from './normalPlayer/NormalPlayer'
import MiniPlayer from './miniPlayer/MiniPlayer'
import styles from './style_player'
import {
  changePlayingState,
  changeShowPlayList,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayList,
  changePlayMode,
  changeFullScreen
} from "./store/actionCreators";
import { getSongUrl, isEmptyObject, findIndex, shuffle }from '../../api/utils'
import { playMode } from '../../api/config'
import { isImmutable } from 'immutable'
// import { playList } from './mock.js'
function Player(props) {
  const [isUpdateProgress, setIsUpdateProgress] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [songUrl, setSongUrl]= useState('')
  //目前播放时间
  const [currentTime, setCurrentTime] = useState(0);
  //歌曲总时长
  const [duration, setDuration] = useState(0);
  //歌曲播放进度
  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration * 100;
  // console.log('percent', percent)
  let { 
    fullScreen, 
    mode,//播放模式
    currentSong : immutableCurrentSong, 
    currentIndex,
    playing,
    playList: immutablePlayList,
    sequencePlayList: immutableSequencePlayList
  } = props // mapState
  // console.log('是否是不可变数据:::',isImmutable(immutableCurrentSong))
  let currentSong, playList, sequencePlayList
  if(isImmutable(immutableCurrentSong)){
    currentSong = immutableCurrentSong.toJS()
  }else{
    currentSong = immutableCurrentSong
  }
  if(isImmutable(immutablePlayList)){
    playList = immutablePlayList.toJS();
  }else{
    playList = immutablePlayList
  }
  if(isImmutable(immutableSequencePlayList)){
    sequencePlayList = immutableSequencePlayList.toJS();
  }else{
    sequencePlayList = immutableSequencePlayList
  }
  // const currentSong = immutableCurrentSong.toJS()
  // console.log('immutableCurrentSong::::',immutableCurrentSong)
  // const playList = immutablePlayList.toJS();
  // const sequencePlayList = immutableSequencePlayList.toJS();
  const { 
    toggleFullScreenDispatch, 
    togglePlayingDispatch,
    changeCurrentIndexDispatch,
    changeCurrentDispatch,
    changeModeDispatch,
    changePlayListDispatch
  } = props

  // const id = 1416767593;
  const videoRef: any = useRef()
 
  
  const _onFullScreen = () => {
    // dispatch({type:'zoom'})
    toggleFullScreenDispatch(true)
  }
  const _onMiniSizeScreen =()=>{
    toggleFullScreenDispatch(false)
  }
  const _clickPlaying = () => {
    togglePlayingDispatch(!playing)
  }
  const _changeProgress = (value) => {
    // console.log(value)
    setIsUpdateProgress(true)
    const current = duration * value / 100
    setCurrentTime(current)
    videoRef.current.setPositionAsync(current * 1000)
    if(!playing){
      togglePlayingDispatch(true)
    }
  }
  const _handleLoop = () => {
    // videoRef.current.setPositionAsync(0)
    videoRef.current && videoRef.current.replayAsync()
    // if(!isLooping){
    //   setIsLooping(true)
    // }
    togglePlayingDispatch(true)
    // if(!playing){
    // }
  }
  const _handlePrev = () => {
    if(playList.length === 1){
      _handleLoop()
      return
    }
    let index = currentIndex - 1
    if (index < 0) {
      index = playList.length - 1
    }
    if(!playing){
      togglePlayingDispatch(true)
    }
    changeCurrentIndexDispatch(index)
  }
  const _handleNext = () => {
    if(playList.length === 1){
      _handleLoop()
      return
    }
    let index = currentIndex + 1
    if(index > playList.length){
      index = 0
    }
    if(!playing){
      togglePlayingDispatch(true)
    }

    changeCurrentIndexDispatch(index)
  }
  const _changePlayMode = () => {
    let newMode = (mode + 1) % 3
    if(newMode === 0){
      let index = findIndex(currentSong, sequencePlayList)
      changePlayListDispatch(sequencePlayList)
      changeCurrentIndexDispatch(index)
    }else if(newMode === 1){
      changePlayListDispatch(sequencePlayList)
    }else if(newMode === 2){
      let newList = shuffle(sequencePlayList)
      let index =findIndex(currentSong, newList)
      changePlayListDispatch(newList)
      changeCurrentIndexDispatch(index)
    }
    changeModeDispatch(newMode)
  }
  const _onVideoStop = () => {
    console.log('播放完成')
    // _handleNext();
    if (mode === playMode.loop) {
      _handleLoop();
    } else {
      _handleNext();
    }
  }
  const _onPlaybackStatusUpdate = (e)=> {
    // 单曲播放结束
    if(e.didJustFinish){
      console.log('statue::', e)
      togglePlayingDispatch(false)
      _onVideoStop()
      return 
    }
    let currentPosition = e.positionMillis / 1000
    // 如果当前在拖动进度条修改时间，则不理睬
    setCurrentTime(currentPosition)
    // console.log('e:::::',e)
  }
  
  useEffect(()=>{
    console.log('播放状态:::',playing)
    videoRef.current
      ? playing 
        ? videoRef.current.playAsync()
        : videoRef.current.pauseAsync()
      : null
  },[playing])

  // useEffect(()=>{
  //   if(!playList.length || currentIndex === -1 || !playList[currentIndex] ) {
  //     console.log('error:::::')
  //     return
  //   }
  //   let current = playList[0];
  //   changeCurrentIndexDispatch(0)
  //   changeCurrentDispatch(current);//赋值currentSong
  //   setCurrentTime(0);//从头开始播放
  //   setDuration((current.dt / 1000) | 0);//时长
  //   setSongUrl(getSongUrl(current.id));
  //   if(!playing){
  //     togglePlayingDispatch(true);//播放状态;
  //   }
  // },[])

  useEffect(()=>{
    if(!playList.length || currentIndex === -1 || !playList[currentIndex] ) {
      console.log('暂无资源:::::')
      return
    }
    let current = playList[currentIndex];
    changeCurrentDispatch(current);//赋值currentSong
    setCurrentTime(0);//从头开始播放
    setDuration((current.dt / 1000) | 0);//时长
    videoRef.current && 
    videoRef.current.loadAsync({uri: getSongUrl(current.id)}).playAsync;
    setTimeout(()=>{
      videoRef.current.playAsync()
    },500)
    if(!playing){
      togglePlayingDispatch(true);//播放状态;
    }
  },[currentIndex,playList])

  if(isEmptyObject(currentSong)){
    console.log('空对象,return')
    return null
  }
  // console.log('可以播放：：：',currentIndex)
  return (
      <View 
        style={styles.playerContainer}
        pointerEvents={fullScreen ? 'auto' : 'box-none'}
      >
        <NormalPlayer 
          song={currentSong} 
          onMiniSizeScreen={_onMiniSizeScreen}
          duration={duration}
          currentTime={currentTime}
          playing={playing}
          percent={percent}
          mode={mode}
          clickPlaying={_clickPlaying}
          changeProgress={_changeProgress}
          handlePrev={_handlePrev}
          handleNext={_handleNext}
          changePlayMode={_changePlayMode}
        ></NormalPlayer>
        <MiniPlayer 
          song={currentSong} 
          percent={percent}
          onFullScreen={_onFullScreen}
          fullScreen={fullScreen}
          playing={playing}
          clickPlaying={_clickPlaying}
        ></MiniPlayer>
        <Video 
          ref={videoRef}
          // source={{uri: songUrl }} 
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          onPlaybackStatusUpdate={_onPlaybackStatusUpdate}
          style={styles.backgroundVideo}
        >
        </Video>
      </View>
  )
}

const mapStateToProps = state => ({
  fullScreen: state.getIn (["player", "fullScreen"]),
  playing: state.getIn (["player", "playing"]),
  currentSong: state.getIn (["player", "currentSong"]),
  showPlayList: state.getIn (["player", "showPlayList"]),
  mode: state.getIn (["player", "mode"]),
  currentIndex: state.getIn (["player", "currentIndex"]),
  playList: state.getIn (["player", "playList"]),
  sequencePlayList: state.getIn (["player", "sequencePlayList"])
});

// 映射 dispatch 到 props 上
const mapDispatchToProps = dispatch => {
  return {
    togglePlayingDispatch (data) {
      dispatch (changePlayingState (data));
    },
    toggleFullScreenDispatch (data) {
      dispatch (changeFullScreen (data));
    },
    togglePlayListDispatch (data) {
      dispatch (changeShowPlayList (data));
    },
    changeCurrentIndexDispatch (index) {
      dispatch (changeCurrentIndex (index));
    },
    changeCurrentDispatch (data) {
      dispatch (changeCurrentSong (data));
    },
    changeModeDispatch (data) {
      dispatch (changePlayMode (data));
    },
    changePlayListDispatch (data) {
      dispatch (changePlayList (data));
    }
  };
};

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Player));
