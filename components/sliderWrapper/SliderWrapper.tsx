import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import styles from './style_slider'
interface Props{
  miniTitle: string,
  mainTitle: string,
  buttonText: string,
  children?: any,

}
export default function SliderWrapper(props: Props) {
  const { miniTitle, mainTitle, buttonText} = props
  return (
    <View
      style={{
        marginBottom: 20
      }}
    >
      <View style={ styles.header }>
        <Text style={styles.miniTitle}>{miniTitle}</Text>
        <View style={styles.subWrapper}>
          <Text style={styles.mainTitle}>{mainTitle}</Text>
          <TouchableOpacity
            style={styles.touchableOpacity}
          >
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView 
        style={styles.scrollView}
        horizontal={true}  
        showsHorizontalScrollIndicator={false}
      >
        {
          props.children
        }
      </ScrollView>
    </View>
  )
}
