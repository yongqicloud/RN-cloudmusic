import React from "react";
import { View, Text, Image } from 'react-native'
import styles, { HEADER_HEIGHT } from './style_header'
interface Props{
  title: string
}

function Header(props: Props) {
  const { title } = props
  return(
    <View
      style={ styles.headerWrap }
    >
      <Text style={{ fontFamily: 'iconfont', fontSize: 28, color: '#fff' }}>&#xe65c;</Text>
      <Text style={styles.text}>{title}</Text>
      <Text style={{ fontFamily: 'iconfont', fontSize: 26, color: '#fff' }}>&#xe62b;</Text>
    </View>
  )
}
export {
  HEADER_HEIGHT
}

export default React.memo(Header)