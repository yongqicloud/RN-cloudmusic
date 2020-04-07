import React, { useState, useEffect, useReducer } from 'react'
import { View, Text, Image, Animated, Easing, ImageBackground, TouchableOpacity } from 'react-native'
import { getName, formatPlayTime } from '../../../api/utils'
import { connect } from 'react-redux'
import {
  changePlayingState,
  changeShowPlayList,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayList,
  changePlayMode,
  changeFullScreen
} from "../store/actionCreators";
import styles, {THEME_COLOR} from './style_normalPlayer'
import { playMode } from '../../../api/config'
import {  Slider, WhiteSpace, Toast } from '@ant-design/react-native'

function NormalPlayer(props) {
  const { song, mode, playing, percent, duration, currentTime, fullScreen} = props
  const {
    clickPlaying, 
    onMiniSizeScreen: propsOnMiniSizeScreen,
    changeProgress,
    handlePrev,
    handleNext,
    changePlayMode
  } = props
  const [rotate, setRotate] = useState(new Animated.Value(0))
  let _spin = () => {
      rotate.setValue(0)
      Animated.timing(rotate,{
        toValue: 1, // 最终值 为1，这里表示最大旋转 360度
        duration: 4000,
        easing: Easing.linear
    }).start(() => _spin)
  }
  useEffect(()=>{
    if(playing){
      // _spin()
    }else{
      _spin = null
    }
    // mode === playMode.sequence
    //             ? Toast.info('This is a toast tips 1 !!!', 4)
    //             : mode === playMode.loop
    //               ? Toast.info('This is a toast tips 1 !!!', 4)
    //               : Toast.info('This is a toast tips 1 !!!', 4)
  },[playing,mode])
  const _renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={propsOnMiniSizeScreen}
          style={styles.close}
        >
          <Text style={{ fontFamily: 'selffont', fontSize: 32, color: '#fff' }}>&#xe659;</Text>
        </TouchableOpacity>
        <View>
          <Text style={{color: '#fafafa', fontSize: 16}}>{song.name}</Text>
          <Text style={{color: '#bba8a8', fontSize: 14}}>{getName(song.ar)}</Text>
        </View>
      </View>
    )
  }
  const _renderMiddle = () => {
    const animate = rotate.interpolate({
      inputRange: [0, 1],//输入值
      outputRange: ['0deg', '360deg'] //输出值
    })
    return (
      <View style={styles.middle}>
        <ImageBackground
          style={styles.cdBackground}
          source={require('../../../assets/images/disc.png')}
        >
          <Animated.Image 
            style={[
              styles.image,
              {transform: [...styles.image.transform,{rotate: animate }]},
            ]} 
            source={{uri: song.al.picUrl}}
          />
        </ImageBackground>
        <View style={styles.songTextWrapper}>
          <Text 
            numberOfLines={3}
            style={styles.songText}
          >我是歌词我是歌词我是歌词我是歌词我是歌词我是歌词</Text>
        </View>
      </View>
    )
  }
  const _renderFooter = () => {
    return (
      <View style={styles.footer}>
        <View style={styles.rateWrapper}>
          <View style={{paddingRight: 10}}>
            <Text style={styles.rateText}>倍速播放:</Text>
          </View>
          <TouchableOpacity style={styles.rateBtnWrapper}>
            <Text style={styles.rateText}>0.75</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rateBtnWrapper}>
            <Text style={styles.rateText}>正常</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rateBtnWrapper}>
            <Text style={styles.rateText}>0.75</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rateBtnWrapper}>
            <Text style={styles.rateText}>0.75</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.progressWrapper}>
            <Text style={{color: '#fcfcfc'}} >{formatPlayTime(currentTime)}</Text>
            <View style={{flex: 1,  marginHorizontal: 15}}>
              <Slider 
                min={1} 
                max={100} 
                value={percent}
                minimumTrackTintColor={THEME_COLOR}
                maximumTrackTintColor={'#000'}
                onAfterChange={changeProgress}
              ></Slider>
            </View>
            <Text style={{color: '#fcfcfc'}}>{formatPlayTime(duration)}</Text>
        </View>
        <View style={styles.btnWrapper}>
          <TouchableOpacity onPress={changePlayMode}>
            {
              mode === playMode.sequence
                ? (<Text style={styles.playBtnIcon}>&#xe625;</Text>)
                : mode === playMode.loop
                  ? (<Text style={styles.playBtnIcon}>&#xe653;</Text>)
                  : (<Text style={styles.playBtnIcon}>&#xe61b;</Text>)
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePrev}>
            <Text style={styles.playBtnIcon}>&#xe6e1;</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={clickPlaying}>
            {
              playing 
                ? (<Text style={styles.playBtnIcon}>&#xe650;</Text>)
                : (<Text style={styles.playBtnIcon}>&#xe61e;</Text>)
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext}>
            <Text style={styles.playBtnIcon}>&#xe718;</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.playBtnIcon}>&#xe640;</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  if(!fullScreen){
    return null
  }
  return (
    <View
      // pointerEvents={'auto'}
      style={[ styles.normalContainer,{ display: fullScreen ? 'flex' : 'none' }]}
    >
      <ImageBackground
        source={{ uri: song.al.picUrl }}
        style={styles.background}
        blurRadius={25}
      >
        <View style={styles.body}>
          {
            _renderHeader()
          }
          {
            _renderMiddle()
          }
          {
            _renderFooter()
          }
        </View>
      </ImageBackground>
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
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(NormalPlayer))
