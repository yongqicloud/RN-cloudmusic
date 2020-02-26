import React from 'react'
import { View, Text} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { getCount,} from '../../api/utils'
import styles from './style_linearCount'

interface Props{
  count: number
}
export default function LinearCount(props: Props) {
  const { count } = props
  return (
    <LinearGradient colors={['#555', 'transparent']} style={styles.shadow}>
      <View
        style={styles.playCount}
      >
        <Text style={[styles.playCountText,{fontFamily: 'iconfont', fontSize: 16}]}>&#xe885;</Text>
        <Text style={[styles.playCountText]}>{ getCount(count) }</Text>
      </View>
    </LinearGradient>
  )
}
