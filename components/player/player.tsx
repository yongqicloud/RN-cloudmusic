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
// import { playList } from './mock.js'
function Player(props) {
  const [isUpdateProgress, setIsUpdateProgress] = useState(false)
  const [isLooping, setIsLooping] = useState(true)
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
  // const currentSong = immutableCurrentSong.toJS()
  const currentSong = immutableCurrentSong.toJS()
  // console.log('immutableCurrentSong::::',immutableCurrentSong)
  const playList = immutablePlayList.toJS();
  const sequencePlayList = immutableSequencePlayList.toJS();
  const { 
    toggleFullScreenDispatch, 
    togglePlayingDispatch,
    changeCurrentIndexDispatch,
    changeCurrentDispatch,
    changeModeDispatch,
    changePlayListDispatch
  } = props

  console.log('currentIndex:::',currentIndex)
  // mock数据
  const id = 1416767593;
  // const currentSong = {
  //   al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
  //   name: "木偶人",
  //   ar: [{name: "薛之谦"}]
  // }
  const videoRef: any = useRef()
  // useEffect(()=>{
  //   const loadAudio = async ()=> {
  //     const soundObject = new Audio.Sound();
  //     try {
  //       await soundObject.loadAsync({
  //         uri: 'http://win.web.rh01.sycdn.kuwo.cn/9ab9bba8ae01e47922503311b96fb112/5e86e6ba/resource/n3/94/53/2526909011.mp3'
  //       });
  //       const result = await soundObject.getStatusAsync()
  //       console.log('result:::::',result)
  //       // 自动播放
  //       await soundObject.playAsync();
  //       setTimeout(()=>{
  //         soundObject.pauseAsync();
  //       },3000)
  //     } catch (error) {
  //       console.warn("ERROR LOADING AUDIO: ", error);
  //     }
  //   }
  //   // loadAudio()
  // },[])

  const onPlaybackStatusUpdate = (e)=> {
    let currentPosition = e.positionMillis / 1000
    // 如果当前在拖动进度条修改时间，则不理睬
    setCurrentTime(currentPosition)
    // console.log('e:::::',e)
  }
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
    setIsUpdateProgress(true)
    const current = duration * value / 100
    setCurrentTime(current)
    videoRef.current.setPositionAsync(current * 1000)
    togglePlayingDispatch(true)
  }
  const _handleLoop = () => {
    // videoRef.current.setPositionAsync(0)
    // videoRef.current.playAsync()
    if(!isLooping){
      setIsLooping(true)
    }
    if(!playing){
      togglePlayingDispatch(true)
    }
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
      changePlayListDispatch(sequencePlayList)
      let index = findIndex(currentSong, sequencePlayList)
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
  
  useEffect(()=>{
    videoRef.current
      ? playing 
        ? videoRef.current.playAsync()
        : videoRef.current.pauseAsync()
      : null
  },[playing])

  useEffect(()=>{
    if (
        !playList.length ||
        currentIndex === -1 ||
        !playList[currentIndex] 
        // playList[currentIndex].id === preSong.id ||
      ) {
        console.log('error:::::')
        return
      }
    changeCurrentIndexDispatch(currentIndex)
    let current = playList[currentIndex];
    // console.log('current::::',current.id)
    // changeCurrentDispatch(current);//赋值currentSong
    // setSongUrl(getSongUrl(current.id))
    // togglePlayingDispatch(true);//播放状态
    // setCurrentTime(0);//从头开始播放
    // setDuration((current.dt / 1000) | 0);//时长
  },[currentIndex, playList])

  if(isEmptyObject(currentSong)){
    return null
  }
  return (
      <View 
        style={styles.playerContainer}
        pointerEvents={fullScreen ? 'auto' : 'box-none'}
        // pointerEvents={ 'box-none'}
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
          // source={{uri: `https://music.163.com/song/media/outer/url?id=${id}.mp3` }} 
          source={{uri: songUrl }} 
          // source={{uri: `http://vfx.mtime.cn/Video/2019/03/19/mp4/190319212559089721.mp4` }} 
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          ref={videoRef}
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
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
