import React, { useCallback, forwardRef } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles, { HEADER_HEIGHT } from './style_backHeader'
interface Props{
  title: string,
  position?: string,
  fontColor?: string,
  handleGoBack: Function,
  opacity?: number,
  backgroundColor?: string,
}
const BackHeader = forwardRef((props: Props, ref: any) => {
  const { title, position, fontColor, handleGoBack, backgroundColor, opacity } = props
  const goBack = useCallback(
    () => {
      handleGoBack()
    },
    [],
  )
  return (
    <View 
      ref={ref} 
      style={[
        styles.container,
        {
          position: position,
          backgroundColor: backgroundColor, 
          opacity: opacity
        }
      ]}
    >
      <View style={styles.textContainer}>
        <TouchableOpacity 
          style={styles.touchableOpacity}
          onPress={goBack}
        >
          <Text style={{fontFamily: 'iconfont', color: fontColor || "#fff", fontSize: 20}}>&#xe655;</Text>
        </TouchableOpacity>
        <Text style={[styles.titleText, {color: fontColor || '#fff'}]} numberOfLines={1}>{title}</Text>
      </View>
    </View>
  )
})
export default BackHeader
export {
  HEADER_HEIGHT
}