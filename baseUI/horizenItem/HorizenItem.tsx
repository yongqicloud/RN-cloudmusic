import React from 'react'
import { View, ScrollView, Text, TouchableOpacity} from 'react-native'
import globalStyles from '../../assets/global-style'
import styles from './style_horizen'
interface Props{
  title: string,
  list:Array<object>,
  selectedVal: string,
  handlePress: any | Function,
}

interface ITEM{
  key: string | number,
  name: string
}
function HorizenItem(props: Props ){
  const { list, title, handlePress, selectedVal } = props

  const Item = (item: any) => {
    // const value = selectedVal === item.name ? globalStyles['theme-color'] : 'transparent'
    return (
        <TouchableOpacity 
          key={item.key}
          style={[styles.itemContainer,{
            borderColor:  selectedVal === item.key ? globalStyles['theme-color'] : 'transparent'
          }]}
          onPress={()=>{handlePress(item.key)}}
        >
          <Text>{item.name}</Text>
        </TouchableOpacity>
    )
  }
  return (
    <View style={styles.pageContainer}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.lineContainer}>
            <Text style={styles.title}>{title}</Text>
            {
              list.map( item =>{
                return Item(item)
              })
            }
            
        </View>
      </ScrollView>
    </View>
  )
}

export default React.memo(HorizenItem)
