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
  onFullScreen: () => void
}

export default function MiniPlayer(props: Props) {
  const { song, onFullScreen: propsFullScreen } = props

  // return (
  //   <View style={styles.miniContainer}>
  //     <TouchableOpacity>
  //       <Text>你好你死哦都市的</Text>
  //     </TouchableOpacity>
  //   </View>
  // )
  return (
    <View style={styles.miniContainer} pointerEvents={'auto'}>
      <View style={{flex: 1, flexDirection: 'row',}}>
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
        <View style={styles.playBtnWrapper}>
          <Text style={styles.iconfont }>&#xe650;</Text>
        </View>
        <View style={styles.expandBtnWrapper}>
          <Text style={styles.iconfont}>&#xe640;</Text>
        </View>
      </View>
      <View style={{height: 2, width: '100%'}}>
        {/* <Progress 
          percent={50} 
          position={'normal'}
          style={styles.progress}
          barStyle={{backgroundColor: '#ddd'}}
        /> */}
        <MyProgress 
          percent={20}
          style={styles.progress}
          barStyle={styles.progressBar}  
        ></MyProgress>
      </View>
    </View>
  )
}
