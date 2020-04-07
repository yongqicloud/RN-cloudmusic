import React from 'react'
import { View } from 'react-native'
interface Props{
  percent: number,
  style?: Object,
  barStyle?: Object
}
export default function Progress(props: Props) {
  const { percent, style, barStyle } = props
  return (
    <View style={[{height: 2, width: '100%', backgroundColor: '#ddd'}, style]}>
      <View style={[{height: '100%', width: `${percent}%`, backgroundColor: 'red'}, barStyle]}></View>
    </View>
  )
}
