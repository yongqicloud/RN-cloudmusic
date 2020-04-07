import React, {useState, useEffect} from 'react'
import {View, Text, TextInput, TouchableOpacity} from 'react-native'

import styles from './style_search'
interface Props{
  onInput:(value: String) => void
}
export default function Search(props: Props) {
  
  const { onInput } = props
  const [value, setValue] = useState(null)
  
  const onChangeText = (val): void => {
    // console.log(val)
    setValue(val)
    onInput(val)
  }
  const clearText = ()=>{
    setValue(null)
    onInput('')
  }
  
  return (
    <View style={styles.searchContainer}>
      <View style={styles.inputWrapper}>
        <Text style={styles.iconfont}>&#xe62b;</Text>
        <TextInput 
          onChangeText={onChangeText}
          value={value}
          style={styles.textInput}
          placeholder={'请输入歌曲、歌手、歌单...'}
        ></TextInput>
        <TouchableOpacity
          style={[
            styles.clearText,
            {
              display: value === null ? 'none' : 'flex'
            }
          ]}
          onPress={clearText}
        >
          <Text style={[styles.iconfont,{fontSize: 18,paddingHorizontal:10}]}>&#xe600;</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
