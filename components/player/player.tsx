import React, {useEffect,useState, useReducer } from 'react'
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
function Player(props) {
  let { fullScreen } = props
  const { toggleFullScreenDispatch } = props
  // mock数据
  const currentSong = {
    al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
    name: "木偶人",
    ar: [{name: "薛之谦"}]
  }

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

  const onPlaybackStatusUpdate = (e)=>{
    let flag = false
    if(!flag){
      flag = true
      console.log(e)
    }
  }
  const _onFullScreen = () => {
    // dispatch({type:'zoom'})
    toggleFullScreenDispatch(true)
  }
  const _onMiniSizeScreen =()=>{
    toggleFullScreenDispatch(false)
  }
  return (
      <View 
        style={styles.playerContainer}
        // pointerEvents={fullScreen ? 'auto' : 'box-none'}
        pointerEvents={ 'box-none'}
      >
        <NormalPlayer song={currentSong} onMiniSizeScreen={_onMiniSizeScreen}></NormalPlayer>
        <MiniPlayer song={currentSong} onFullScreen={_onFullScreen}></MiniPlayer>


        {/* <Video 
          // source={{uri: "http://vfx.mtime.cn/Video/2019/03/21/mp4/190321153853126488.mp4" }} 
          source={{uri: "http://win.web.rh01.sycdn.kuwo.cn/9ab9bba8ae01e47922503311b96fb112/5e86e6ba/resource/n3/94/53/2526909011.mp3" }} 
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
          style={styles.backgroundVideo}
        >
        </Video> */}
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
