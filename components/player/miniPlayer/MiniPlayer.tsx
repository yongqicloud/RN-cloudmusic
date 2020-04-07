import React from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import { getName } from '../../../api/utils'
import styles from './style_miniPlayer'
import { Progress, WhiteSpace } from '@ant-design/react-native'
import  MyProgress from '../../../baseUI/progress/Progress'
interface Props{
  song: {
    al:any,
    ar:any,
    name: string
  },
  onFullScreen: () => void,
  clickPlaying: any,
  fullScreen: any,
  playing: any,
  percent: any,
}

export default function MiniPlayer(props: Props) {
  const { song, onFullScreen: propsFullScreen } = props
  console.log('song:::::', song)
  const { fullScreen, playing, percent } = props;
  const { clickPlaying, } = props;
  return (
    <View style={styles.miniContainer} pointerEvents={'auto'}>
      <View style={{flex: 1, flexDirection: 'row', alignItems: "center"}}>
        <TouchableOpacity
          style={{flexDirection: 'row', flex: 1,}}
          onPress={propsFullScreen}
        >
          <View style={styles.icon}>
            <View style={styles.imgWrapper}>
              <Image 
                source={{uri: song.al.picUrl}}
                style={{width: 40, height: 40,}}
              />
            </View>
          </View>
          <View style={styles.textWrapper} pointerEvents={'none'}>
            <Text numberOfLines={1}>{song.name}</Text>
            <Text numberOfLines={1}>{getName(song.ar)}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={clickPlaying} style={styles.playBtnWrapper}>
          {
            playing 
              ? (<Text style={styles.iconfont}>&#xe723;</Text>)
              : (<Text style={styles.iconfont}>&#xe6e3;</Text>)
          }
        </TouchableOpacity>
        <TouchableOpacity style={styles.expandBtnWrapper}>
          <Text style={styles.iconfont }>&#xe640;</Text>
        </TouchableOpacity>
      </View>
      <View style={{height: 2, width: '100%'}}>
        <MyProgress 
          percent={percent}
          style={styles.progress}
          barStyle={styles.progressBar}  
        ></MyProgress>
      </View>
    </View>
  )
}
